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
import statistics

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
cwd = os.getcwd()

p2p_array = [[8, 0], [0, 7], [10, 9], [12, 11], [24, 23], [12, 24], [11, 23],
            [12, 14], [14, 16], [11, 13], [13, 15], [24, 26], [26, 28], [28, 30],
            [30, 32], [32, 28], [23, 25], [25, 27], [27, 29], [29, 31], [31, 27]]

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians*180.0/np.pi)
    if angle > 180.0:
        angle = 360 - angle
    return angle

def slope(a, b):
    a = np.array(a)
    b = np.array(b)
    delta_x = a[0] - b[0]
    delta_y = a[1] - b[1]
    slope = delta_y / delta_x
    return slope

class scoring:
    def score_deep_squat(landmark_dict):
        # default score if N/A
        total_score = 0
        
        # default angles
        min_l_hip_angle = 180
        min_r_hip_angle = 180
        squat_depth = False

        # Variables where angles over time will be recorded
        all_knee_distances = list()
        all_l_tibia_angles = list()
        all_l_torso_angles = list()
        all_r_tibia_angles = list()
        all_r_torso_angles = list()

        starting_knee_distance = None
        knee_distance = 1
        knee_distance_threshold = .2 

        # Initialize requirements to score the results
        parallelism_threshold = 7
        parallel = True
        knees_caved_in = True

        for frame in landmark_dict:
            l_shoulder = landmark_dict[frame][11]
            l_hip = landmark_dict[frame][23]
            l_knee = landmark_dict[frame][25]
            l_ankle = landmark_dict[frame][27]
            r_shoulder = landmark_dict[frame][12]
            r_hip = landmark_dict[frame][24]
            r_knee = landmark_dict[frame][26]
            r_ankle = landmark_dict[frame][28]

            # Calculate the joint angles 
            l_torso_angle = float(calculate_angle(l_shoulder, l_hip, l_knee))
            l_tibia_angle = float(calculate_angle(l_hip, l_knee, l_ankle))
            r_torso_angle = float(calculate_angle(r_shoulder, r_hip, r_knee))
            r_tibia_angle = float(calculate_angle(r_hip, r_knee, r_ankle))

            l_hip_angle = float(calculate_angle(l_shoulder, l_hip, l_knee))
            r_hip_angle = float(calculate_angle(r_shoulder, r_hip, r_knee))
            knee_distance = float(np.linalg.norm(np.array(l_knee) - np.array(r_knee)))

            # Get intilal ankle position
            if starting_knee_distance is None:
                starting_knee_distance = knee_distance
            
            # record the distance between knee's to find standard deviation later
            all_knee_distances.append(knee_distance)

            # Record angles of tibia and torso angles
            all_r_tibia_angles.append(r_tibia_angle)
            all_l_tibia_angles.append(l_tibia_angle)
            all_r_torso_angles.append(r_torso_angle)
            all_l_torso_angles.append(l_torso_angle)

            # Look through exercise and check both r & l hip angles to see if they passs 90 degrees
            if l_hip_angle < min_l_hip_angle:
                min_l_hip_angle = l_hip_angle
                
            if r_hip_angle < min_r_hip_angle:
                min_r_hip_angle = r_hip_angle
            ## End of for loop
        stddev_knee_distance = statistics.stdev(all_knee_distances)
        if stddev_knee_distance < knee_distance_threshold:
            knees_caved_in = False
        
        # Determine squat depth based on left and right hip angle
        if min_l_hip_angle <= 90 and min_r_hip_angle <= 90:
            squat_depth = True

        # Takes left and right tibia angles, finds the difference between the two, and determines whether or not they are parallell
        l_angle_difference = abs(statistics.mean(all_l_tibia_angles) - statistics.mean(all_r_torso_angles))
        r_angle_difference= abs(statistics.mean(all_r_tibia_angles) - statistics.mean(all_r_torso_angles))
        angle_difference = (l_angle_difference + r_angle_difference)/2
        
        if angle_difference >= parallelism_threshold:
            parallel = False
        
        # Scores the test by adding a point for each of the criteria that it satisfies
        if squat_depth:
            total_score =  total_score + 1
        if parallel:
            total_score = total_score + 1
        if knees_caved_in == False :
            total_score = total_score + 1
        
        return total_score
        
    def score_hurdle_step(landmark_dict):
        # default score if N/A
        score = 0
        
        return score
        
    def score_active_straight_leg(landmark_dict):
        # default score if N/A
        score = 0
        
        return score
        
    def score_inline_lunge(landmark_dict):
        # default score if N/A
        score = 0
        
        return score
    
    def score_rotary_stability(landmark_dict):
        # default score if N/A
        score = 0
        
        return score
        
    def score_shoulder_mobility(landmark_dict):
        # default score if N/A
        score = 0
        
        return score
        
    def score_trunk_stability(landmark_dict):
        # default score if N/A
        score = 0
        
        return score

def gen_line(point1, point2):
        all_points_between = []
        dtop = point2[0] - point1[0]
        dbot = point2[1] - point1[1]
        m = dtop / (dbot + 0.0000000000000001)
        b = point1[0] - (m * point1[1])
        if point1[1] < point2[1]:
            for i in range(point1[1], point2[1]):
                hy = (m*i)+b
                hy = round(hy, 2)
                hy = math.trunc(hy)
                hold = [int(hy), int(i)]
                all_points_between.append(hold)
            if point1[0] < point2[0]:
                for j in range(point1[0], point2[0]):
                    hx = (j-b)/m
                    hx = round(hx, 2)
                    hx = math.trunc(hx)
                    hold = [int(j), int(hx)]
                    all_points_between.append(hold)
            if point1[0] > point2[0]:
                for j in range(point2[0], point1[0]):
                    hx = (j-b)/m
                    hx = round(hx, 2)
                    hx = math.trunc(hx)
                    hold = [int(j), int(hx)]
                    all_points_between.append(hold)
        if point1[1] > point2[1]:
            for i in range(point2[1],point1[1]):
                hy = (m*i)+b
                hy = math.trunc(hy)
                hold = [int(hy), int(i)]
                all_points_between.append(hold)
            if point1[0] < point2[0]:
                for j in range(point1[0], point2[0]):
                    hx = (j-b)/m
                    hx = round(hx, 2)
                    hx = math.trunc(hx)
                    hold = [int(j), int(hx)]
                    all_points_between.append(hold)
            if point1[0] > point2[0]:
                for j in range(point2[0], point1[0]):
                    hx = (j-b)/m
                    hx = round(hx, 2)
                    hx = math.trunc(hx)
                    hold = [int(j), int(hx)]
                    all_points_between.append(hold)
        return all_points_between

def ensure_output_fldr():
    if "output" not in os.listdir(cwd):
        os.mkdir("output")
    return

def get_landmark_data(filename_to_access):
    landmark_dict = {}
    
    read_landmark_data = open(filename_to_access, "r")
    entire_file = []
    entire_file = read_landmark_data.read().split("\n")
    frame_size = entire_file.pop(0).split(", ")
    frame_size.pop(0)
    frame_width = int(frame_size[0])
    frame_height = int(frame_size[1])
    entire_file.pop(len(entire_file)-1)
    
    for line in entire_file:
        frame, landmark_ID, x, y, z, visibility= line.split(", ")
        if frame in landmark_dict:
            landmark_dict[frame][int(landmark_ID)] = [float(x), float(y), float(z), float(visibility)]
        else:
            landmark_dict[frame] = {}
            landmark_dict[frame][int(landmark_ID)] = [float(x), float(y), float(z), float(visibility)]
    
    # landmark_dict["frame"][landmark_ID] = [x, y, z, vis]
    return landmark_dict

def create_gif_of_landmark_data(filename_to_access):
    # each frame will have its own sub_dict
    landmark_dict = {}
    
    read_landmark_data = open(filename_to_access, "r")
    entire_file = []
    entire_file = read_landmark_data.read().split("\n")
    frame_size = entire_file.pop(0).split(", ")
    frame_size.pop(0)
    frame_width = int(frame_size[0])
    frame_height = int(frame_size[1])
    entire_file.pop(len(entire_file)-1)
    
    for line in entire_file:
        frame, landmark_ID, x, y, z, visibility= line.split(", ")
        if frame in landmark_dict:
            landmark_dict[frame][int(landmark_ID)] = [float(x), float(y), float(z), float(visibility)]
        else:
            landmark_dict[frame] = {}
            landmark_dict[frame][int(landmark_ID)] = [float(x), float(y), float(z), float(visibility)]
    
    # we need to make an array that will be our images...
    all_images = []
    for frame in landmark_dict:
        new_image = np.empty((frame_height,frame_width,3))
        new_image.fill(255)
        
        # we need to make sure that we plot all the trajectory vectors for our landmarks (point to point)
        # need to plot (21 total):
        '''
        [8->0][0->7][10->9][12->11][24->23][12->24][11->23]
        [12->14][14->16][11->13][13->15][24->26][26->28][28->30]
        [30->32][32->28][23->25][25->27][27->29][29->31][31->27]
        '''
        for p2p in p2p_array:
            point1_x = int(landmark_dict[frame][p2p[0]][0] * frame_width)
            point1_y = int(landmark_dict[frame][p2p[0]][1] * frame_height)
            point2_x = int(landmark_dict[frame][p2p[1]][0] * frame_width)
            point2_y = int(landmark_dict[frame][p2p[1]][1] * frame_height)
            p2p_line_to_draw = gen_line([point1_x, point1_y], [point2_x, point2_y])
            for point in p2p_line_to_draw:
                if point[0]+1 < frame_width and point[1]+1 < frame_height:
                    new_image[point[1]][point[0]][0] = 0
                    new_image[point[1]][point[0]][1] = 255
                    new_image[point[1]][point[0]][2] = 0
                else:
                    pass
            
        # then we need to make sure that we plot all of the landmarks that are visible
        for landmark in landmark_dict[frame]:
            x_position = int(landmark_dict[frame][landmark][0] * frame_width)
            y_position = int(landmark_dict[frame][landmark][1] * frame_height)
            
            if x_position+1 < frame_width and y_position+1 < frame_height:
                new_image[y_position][x_position][0] = 255
                new_image[y_position][x_position][1] = 0
                new_image[y_position][x_position][2] = 0
                
                new_image[y_position][x_position-1][0] = 0
                new_image[y_position][x_position-1][1] = 0
                new_image[y_position][x_position-1][2] = 0
                
                new_image[y_position][x_position+1][0] = 0
                new_image[y_position][x_position+1][1] = 0
                new_image[y_position][x_position+1][2] = 0
                
                new_image[y_position-1][x_position][0] = 0
                new_image[y_position-1][x_position][1] = 0
                new_image[y_position-1][x_position][2] = 0
                
                new_image[y_position+1][x_position][0] = 0
                new_image[y_position+1][x_position][1] = 0
                new_image[y_position+1][x_position][2] = 0
            else:
                pass
        all_images.append(new_image)
    return all_images

def process_landmark_data(landmarks, frame_size):
    # operations - writing landmark frames data to disk
    ensure_output_fldr()
    filename_string = cwd+"\\output\\"+datetime.now().strftime("%Y-%d-%m-%H-%M")+".csv"
    landmark_file_writer = open(filename_string, "w")
    landmark_file_writer.write("Frame_Size, "+str(frame_size[0])+", "+str(frame_size[1])+"\n")
    # output to csv will look like this - frame, landmark, x, y, z, visibility
    for frame_i in tqdm(range(len(landmarks))):
        # each landmark_frame is an accessible array that is 33 long
        # each landmark in that frame is a <class 'mediapipe.framework.formats.landmark_pb2.NormalizedLandmark'>
        # you can supposedly access the x,y,z,visibility elements via landmark_frame[0].x and so forth
        for landmark in landmarks[frame_i]:
            landmark_file_writer.write(str(frame_i)+", "+str(landmarks[frame_i].index(landmark))+", "+str(landmark.x)+", "+str(landmark.y)+", "+str(landmark.z)+", "+str(landmark.visibility)+"\n")
    
    landmark_file_writer.close()
    return filename_string