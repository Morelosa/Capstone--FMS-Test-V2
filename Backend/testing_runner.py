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

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
cwd = os.getcwd()
test_fldr = cwd + "\\testing\\"

hurdle_step_demo_fn = test_fldr + "hurdle_step.mp4"

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

def read_video_4_diagnostics(filename):
    landmark_buffer = []
    frame_size = (0, 0)
    video_file = cv2.VideoCapture(filename)
    if video_file.isOpened() == False:
        print("Error opening file")
    while video_file.isOpened():
        ret, frame = video_file.read()
        if ret == True:
            #cv2.imshow("Frame", frame)
            #if cv2.waitKey(25) & 0xFF == ord('q'):
            #    break
            frame_size = (int(video_file.get(3)), int(video_file.get(4)))
            frame, landmarks = plot_landmarks(frame)
            landmark_buffer.append(landmarks)
            print(len(landmark_buffer))
            #cv2.imshow("Frame", frame)
            #if cv2.waitKey(25) & 0xFF == ord('q'):
            #    break
        else:
            break
            
    processed_data_file = process_landmark_data(landmark_buffer, frame_size)
    processed_frames = create_gif_of_landmark_data(processed_data_file)
    i = 0
    while cv2.waitKey(25) & 0xFF != ord('q'):
        cv2.imshow("Processed Frame", processed_frames[i])
        i += 1
        if i == len(processed_frames)-1:
            i = 0
    
    video_file.release()
    cv2.destroyAllWindows()
    return
    
read_video_4_diagnostics(hurdle_step_demo_fn)