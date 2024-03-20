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

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
app = Flask(__name__)

# variable definitions for MP_Operations
#angles_dict = {}
#knee_distance = {}
'''parallelism_angles = {}

min_l_hip_angle = 180
min_r_hip_angle = 180
squat_depth = False

starting_knee_distance = None
knee_distance = 1
knee_distance_threshold = .2 
knees_caved_in = False

min_torso_angle = 180
min_tibia_angle = 180

parallelism_threshold = 15
parallel = True

squat_score = 0'''

'''class MP_Operations():
    def calculate_angle(a, b, c):
        a = np.array(a)
        b = np.array(b)
        c = np.array(c)
        
        radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
        angle = np.abs(radians*180.0/np.pi)
        
        if angle > 180.0:
            angle = 360 - angle
        
        return angle

    def deep_squat_score(x, y, z):
        if x == True and y == True and z == True:
            return 3
        elif  x == True and y == True and z == False:
            return 2
        elif  x == False and y == False and z == False:
            return 1
        else:
            return 10

    def process_calculations(landmarks):
        # Extract landmarks (aka positions of individual pose joints)
        try:
            # Get coordinates
            l_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            l_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
            l_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
            l_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
            
            r_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
            r_hip = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]
            r_knee = [landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y]
            r_ankle = [landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y]
            
            # Calculate angles (see defined function above)
            torso_angle = MP_Operations.calculate_angle(l_shoulder, l_hip, l_knee)
            tibia_angle = MP_Operations.calculate_angle(l_hip, l_knee, l_ankle)
            # Find Minimum Angle
            if torso_angle < min_torso_angle:
                min_torso_angle = torso_angle
                
            #parallelism_angles["torso_angle"] = torso_angle

            if tibia_angle < min_tibia_angle:
                min_tibia_angle = tibia_angle
                
            #parallelism_angles["tibia_angle"] = tibia_angle
                
            angle_difference = abs(tibia_angle - torso_angle)
                
            # Checking if torso and tibia are parallel
            if angle_difference >= parallelism_threshold:
                parallel = False
                    
            # Calculate Hip Angle
            l_hip_angle = MP_Operations.calculate_angle(l_shoulder, l_hip, l_knee)
            r_hip_angle = MP_Operations.calculate_angle(r_shoulder, r_hip, r_knee)
                
            #Loop and breakdownn into each frame and calculate hip angle
            if l_hip_angle < min_l_hip_angle:
                min_l_hip_angle = l_hip_angle
                
            #angles_dict['min_l_hip_angle'] = min_l_hip_angle
                
            if r_hip_angle < min_r_hip_angle:
                min_r_hip_angle = r_hip_angle
                
            #angles_dict['min_r_hip_angle'] = min_r_hip_angle
                
            # Checking if depth has been reached
            if (min_l_hip_angle + min_r_hip_angle)/2 <= 90:
                squat_depth = True
                
            # Calculate Distance Between Elbows
            knee_distance = np.linalg.norm(np.array(l_knee) - np.array(r_knee))

            # Record the starting elbow distance
            if starting_knee_distance is None:
                starting_knee_distance = knee_distance

            # Take Minimum Distance Between Knees
            if knee_distance < min_knee_distance:
                min_knee_distance = knee_distance

            #knee_distance['min_knee_distance'] = min_knee_distance
            #knee_distance['starting_knee_distance'] = starting_knee_distance
                
            # Check if knees have caved in 
            if (starting_knee_distance - min_knee_distance) > knee_distance_threshold:
                knees_caved_in = True
                 
            # Visualize Angle          
            #cv2.putText(image, str(r_hip_angle),
            #           tuple(np.multiply(r_hip, [640, 480]).astype(int)),
            #                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 2, cv2.LINE_AA)        
        except:
            pass 
            
        # score the squat for diagnostic purposes
        squat_score = MP_Operations.deep_squat_score(squat_depth, parallel, knees_caved_in)

    def plot_landmarks(frame):
        with mp_pose.Pose(min_detection_confidence = 0.5, min_tracking_confidence = 0.5) as pose:
            # get data from media pipe
            frame.flags.writeable = False
            results = pose.process(frame)
            frame.flags.writeable = True
            
            # Now we extract the landmarks
            try:
                landmarks = results.pose_landmarks.landmark
                # TODO: implement a record for the landmark positioning and do not process them
                # at run time; do it in the background or something?
                #MP_Operations.process_calculations(landmarks)
                
                mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                mp_drawing.DrawingSpec(color = (245, 117, 66), thickness = 2, circle_radius = 2),
                                mp_drawing.DrawingSpec(color = (245, 66, 230), thickness = 2, circle_radius = 2))
            except:
                print("Ah Beans\n")
                pass
            
        return frame
'''

def gen_frames():
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
    processed_data_file = fms_helper.process_landmark_data(landmark_buffer, frame_size)
    processed_frames = fms_helper.create_gif_of_landmark_data(processed_data_file)
    # still need to write scoring function(s)
    # we will need a way to select which scoring function to use
    
    # once processed, we need to output what the computer saw and score it
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

@app.route('/')
def index():
    return redirect(url_for('login'))
    
@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Route for handling the login page logic
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:
            return redirect(url_for('home'))
    return render_template('login.html', error=error)

@app.route('/home')
def home():
    return render_template('index.html', name='index.html')
    
if __name__ == "__main__":
    app.run(debug=True)