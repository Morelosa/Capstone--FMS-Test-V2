# FMS Test project
# author (this application): Ben Baber
# og authors (library creators): Antonio Morelos & Matthew Castillo
# contributors: Carina Gallegos, Neha Das
# purpose: Handle background processing

import cv2
import mediapipe as mp
import numpy as np
import time
from PIL import Image
from tqdm import tqdm
import os
from datetime import datetime
import math
from fms_helper import *
import sys
import psutil

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
cwd = os.getcwd()
test_fldr = cwd + "\\testing\\"

hurdle_step_demo_fn = test_fldr + "hurdle_step.mp4"
active_straight_leg_demo_fn = test_fldr + "active_straight_leg.mp4"
deep_squat_demo_fn = test_fldr + "deep_squat.mp4"
inline_lunge_demo_fn = test_fldr + "inline_lunge.mp4"
rotary_stability_demo_fn = test_fldr + "rotary_stability.mp4"
shoulder_mobility_demo_fn = test_fldr + "shoulder_mobility.mp4"
trunk_stability_demo_fn = test_fldr + "trunk_stability.mp4"

class admin_esc:
    def admin_checker():
        run_check = admin_esc.has_admin()
        if run_check[1] == True:
            admin_esc.set_process_to_high()
    
    def set_process_to_high(): # contributed by bfontaine & XO-user-OX of stackoverflow
        os_used = sys.platform
        process = psutil.Process(os.getpid())  # Set highest priority for the python script for the CPU
        if os_used == "win32":  # Windows (either 32-bit or 64-bit)
            process.nice(psutil.REALTIME_PRIORITY_CLASS)
        elif os_used == "linux":  # linux
            process.nice(psutil.IOPRIO_HIGH)
        else:  # MAC OS X or other
            process.nice(20)
        
    def has_admin(): # contributed by taleinat & tahoar of stackoverflow
        if os.name == 'nt':
            try:
                # only windows users with admin privileges can read the C:\windows\temp
                temp = os.listdir(os.sep.join([os.environ.get('SystemRoot','C:\\windows'),'temp']))
            except:
                return (os.environ['USERNAME'],False)
            else:
                return (os.environ['USERNAME'],True)
        else:
            if 'SUDO_USER' in os.environ and os.geteuid() == 0:
                return (os.environ['SUDO_USER'],True)
            else:
                return (os.environ['USERNAME'],False)

admin_esc.admin_checker()

def plot_landmarks(frame):
    with mp_pose.Pose(min_detection_confidence = 0.5, min_tracking_confidence = 0.5) as pose:
        # get data from media pipe
        frame.flags.writeable = False
        results = pose.process(frame)
        frame.flags.writeable = True
        landmarks = None
        # Now we extract the landmarks
        try:
            landmarks = results.pose_landmarks.landmark
            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                            mp_drawing.DrawingSpec(color = (245, 117, 66), thickness = 2, circle_radius = 2),
                            mp_drawing.DrawingSpec(color = (245, 66, 230), thickness = 2, circle_radius = 2))
        except:
            pass
    return frame, landmarks

def read_video_4_diagnostics(filename): # uncomment things in this function if you would like to display the landmarks
    landmark_buffer = []
    frame_size = (0, 0)
    video_file = cv2.VideoCapture(filename)
    if video_file.isOpened() == False:
        print("Error opening file")
    while video_file.isOpened():
        ret, frame = video_file.read()
        if ret == True:
            frame_size = (int(video_file.get(3)), int(video_file.get(4)))
            frame, landmarks = plot_landmarks(frame)
            if landmarks:
                landmark_buffer.append(landmarks)
            print(len(landmark_buffer))
            #cv2.imshow("Frame", frame)
            #if cv2.waitKey(25) & 0xFF == ord('q'):
            #    break
        else:
            break
    processed_data_file = process_landmark_data(landmark_buffer, frame_size)
    #processed_frames = create_gif_of_landmark_data(processed_data_file)
    '''i = 0
    while cv2.waitKey(25) & 0xFF != ord('q'):
        cv2.imshow("Processed Frame", processed_frames[i])
        i += 1
        if i == len(processed_frames)-1:
            i = 0'''
    video_file.release()
    cv2.destroyAllWindows()
    return landmark_buffer
    
# if you wish to rerun the simulations for the demos/retrieve the landmark data, uncomment any of these lines
#hurdle_step_landmarks = read_video_4_diagnostics(hurdle_step_demo_fn)
#active_straight_leg_landmarks = read_video_4_diagnostics(active_straight_leg_demo_fn)
#deep_squat_landmarks = read_video_4_diagnostics(deep_squat_demo_fn)
#inline_lunge_landmarks = read_video_4_diagnostics(inline_lunge_demo_fn)
#rotary_stability_landmarks = read_video_4_diagnostics(rotary_stability_demo_fn)
#shoulder_mobility_landmarks = read_video_4_diagnostics(shoulder_mobility_demo_fn)
#trunk_stability_landmarks = read_video_4_diagnostics(trunk_stability_demo_fn)

