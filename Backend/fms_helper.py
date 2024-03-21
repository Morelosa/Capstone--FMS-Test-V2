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

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
cwd = os.getcwd()

p2p_array = [[8, 0], [0, 7], [10, 9], [12, 11], [24, 23], [12, 24], [11, 23],
            [12, 14], [14, 16], [11, 13], [13, 15], [24, 26], [26, 28], [28, 30],
            [30, 32], [32, 28], [23, 25], [25, 27], [27, 29], [29, 31], [31, 27]]

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
        #new_image = np.empty((frame_height,frame_width,3))
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