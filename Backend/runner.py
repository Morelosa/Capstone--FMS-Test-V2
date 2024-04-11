# FMS Test project
# author (this application): Ben Baber
# og authors (library creators): Antonio Morelos & Matthew Castillo
# contributors: Carina Gallegos, Neha Das

from flask import Flask, render_template, Response, redirect, url_for, request
import mediapipe as mp
import time
import cv2
import numpy
from PIL import Image
import fms_helper
import inlinelunge

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
app = Flask(__name__)

def gen_frames(which_test):
    camera = cv2.VideoCapture(0)
    frame_size = (640, 480)
    camera.set(cv2.CAP_PROP_FRAME_WIDTH, frame_size[0])
    camera.set(cv2.CAP_PROP_FRAME_HEIGHT, frame_size[1])
    landmark_buffer = []
    landmark_record = True
    start_time = time.time()
    
    while landmark_record:
        success, frame = camera.read()  # read the camera frame
        if time.time()-start_time > 30:
            landmark_record = False
        if not success:
            break
        else:
            frame, landmarks = plot_landmarks(frame)
            if landmark_record == True:
                landmark_buffer.append(landmarks)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result
    
    # we now need to process the frames
    processed_data_file_name = fms_helper.process_landmark_data(landmark_buffer, frame_size)
    # initialize to a default that is not what it should be
    score = 0
    # switch case so that we score according to which page was called from the python webserver
    match which_test:
        case "deep_squat":
            score = fms_helper.scoring.score_deep_squat(fms_helper.get_landmark_data(processed_data_file_name))
        case "hurdle_step":
            score = fms_helper.scoring.score_hurdle_step(fms_helper.get_landmark_data(processed_data_file_name))
        case "active_straight_leg":
            score = fms_helper.scoring.score_active_straight_leg(fms_helper.get_landmark_data(processed_data_file_name))
        case "inline_lunge":
            score = fms_helper.scoring.score_inline_lunge(fms_helper.get_landmark_data(processed_data_file_name))
        case "rotary_stability":
            score = fms_helper.scoring.score_rotary_stability(fms_helper.get_landmark_data(processed_data_file_name))
        case "shoulder_mobility":
            score = fms_helper.scoring.score_shoulder_mobility(fms_helper.get_landmark_data(processed_data_file_name))
        case "trunk_stability":
            score = fms_helper.scoring.score_trunk_stability(fms_helper.get_landmark_data(processed_data_file_name))
    
    print(which_test+ " score: "+str(score)) # need to figure out the method to post processed score...
    processed_frames = fms_helper.create_gif_of_landmark_data(processed_data_file_name)
    # display processed gif
    frame_counter = 0
    while frame_counter < len(processed_frames):
        ret, buffer = cv2.imencode('.jpg', processed_frames[frame_counter])
        output_frame = buffer.tobytes()
        yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + output_frame + b'\r\n')  # concat frame one by one and show result
        time.sleep(0.1)
        frame_counter+=1
        if frame_counter >= len(processed_frames):
            frame_counter = 0
    # end of gen_frames!
    
def plot_landmarks(frame):
    with mp_pose.Pose(min_detection_confidence = 0.5, min_tracking_confidence = 0.5) as pose:
        # get data from media pipe
        frame.flags.writeable = False
        results = pose.process(frame)
        frame.flags.writeable = True
        
        # Now we extract the landmarks
        try:
            landmarks = results.pose_landmarks.landmark
            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                            mp_drawing.DrawingSpec(color = (245, 117, 66), thickness = 2, circle_radius = 2),
                            mp_drawing.DrawingSpec(color = (245, 66, 230), thickness = 2, circle_radius = 2))
        except:
            pass
    return frame, landmarks
    
@app.route('/deep_squat')
def call_deep_squat():
    return Response(gen_frames("deep_squat"), mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/hurdle_step')
def call_hurdle_step():
    return Response(gen_frames("hurdle_step"), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/active_straight_leg')
def call_active_straight_leg():
    return Response(gen_frames("active_straight_leg"), mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/inline_lunge')
def call_inline_lunge():
    return Response(gen_frames("inline_lunge"), mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/rotary_stability')
def call_rotary_stability():
    return Response(gen_frames("rotary_stability"), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/shoulder_mobility')
def call_shoulder_mobility():
    return Response(gen_frames("shoulder_mobility"), mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/trunk_stability')
def call_trunk_stability():
    return Response(gen_frames("trunk_stability"), mimetype='multipart/x-mixed-replace; boundary=frame')
    
if __name__ == "__main__":
    app.run(debug=True)