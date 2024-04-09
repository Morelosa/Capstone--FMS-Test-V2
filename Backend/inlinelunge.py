#Testing inline Lunge in openCV and mediapipe
#2 Angles required: 1 from the side, and one from the front
#Author of this page: Antonio Morelos


#Conditions for proper score:
# Minimal torso movement (Technically a stick is supposed to be involved but torso movement does the same)
# Feet must remain in sagital plane (Straight)
# Knee must touch floor
# Front foot remains in place


# Must track: Knee to floor,Front foot, torso angle

#For torso
#1 Calculate angle between 11-23 and 23-25
#Check to make sure it doesn't move much
#Be sure to take the INITIAL torso angle as a refrenc

#For Front Foot
#Make sure it does not move. That is all  (Ensure  30-32 angle does not move)

#For knee
#TBD


##Ideas: To calculate the joint angles, just save related markers to an array for each of the markers
##Processing will take place AFTER the data collection
##In order to find the FMS value, take the standard deviation, insuring you compare it to the INITIAL
## pose position, & return from there
##In order to retrieve the initial values to compare the standard deviation, just take the first daatapoint in the array

##For this  exercie, you will need to get three instanes of standard deviation: Front foot movement,Torso movement, and
##Knee to floor (SOMEHOW IDK it's not related to standard deviation)

import mediapipe as mp
import numpy as np
from PIL import Image
import fms_helper
import statistics


def calculate_angle(a, b, c):

    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle > 180.0:
        angle = 360 - angle
    
    return angle

##New vrsion of deep squat calculation
def deep_Squat(landmark_dict):
    ##Initalize necisary joint variables
    min_l_hip_angle = 180
    min_r_hip_angle = 180
    squat_depth = False

    ##Variables where angles over time will be recorded
    all_knee_distances = list()

    all_l_tibia_angles = list()
    all_l_torso_angles = list()
    all_r_tibia_angles = list()
    all_r_torso_angles = list()

    starting_knee_distance = None
    knee_distance = 1
    knee_distance_threshold = .2 

    ##Initialize requirements to score the results
    parallelism_threshold = 7
    parallel = True
    knees_caved_in = True
    total_score = 0

    for frame in landmark_dict:

        l_shoulder = landmark_dict[frame][11]
        l_hip = landmark_dict[frame][23]
        l_knee = landmark_dict[frame][25]
        l_ankle = landmark_dict[frame][27]
            
        r_shoulder = landmark_dict[frame][12]
        r_hip = landmark_dict[frame][24]
        r_knee = landmark_dict[frame][26]
        r_ankle = landmark_dict[frame][28]

        ##Calculate the joint angles 
        l_torso_angle = float(calculate_angle(l_shoulder, l_hip, l_knee))
        print(l_torso_angle)
        l_tibia_angle = float(calculate_angle(l_hip, l_knee, l_ankle))
        r_torso_angle = float(calculate_angle(r_shoulder, r_hip, r_knee))
        r_tibia_angle = float(calculate_angle(r_hip, r_knee, r_ankle))

        l_hip_angle = float(calculate_angle(l_shoulder, l_hip, l_knee))
        r_hip_angle = float(calculate_angle(r_shoulder, r_hip, r_knee))
        knee_distance = float(np.linalg.norm(np.array(l_knee) - np.array(r_knee)))

        ##Get intilal ankle position
        if starting_knee_distance is None:
            starting_knee_distance = knee_distance
        
        ##record the distance between knee's to find standard deviation later
        all_knee_distances.append(knee_distance)

        ##Record angles of tibia and torso angles
        all_r_tibia_angles.append(r_tibia_angle)
        all_l_tibia_angles.append(l_tibia_angle)

        all_r_torso_angles.append(r_torso_angle)
        all_l_torso_angles.append(l_torso_angle)

        #Look through exercise and check both r & l hip angles to see if they passs 90 degrees
        if l_hip_angle < min_l_hip_angle:
            min_l_hip_angle = l_hip_angle
            
        if r_hip_angle < min_r_hip_angle:
            min_r_hip_angle = r_hip_angle
                    
        
        
        ## End of for loop

    ##Determining score criteria using standard deviation and the like
    print(all_l_torso_angles)
    print(len(all_l_torso_angles))
    ##Take all knee angles and find the sandard deviation to determin the ammount of movement in the knee joints

    '''Test Code bellow'''
    print("mean knee distances: "+ str(statistics.mean(list(all_knee_distances))))

    
    stddev_knee_distance = statistics.stdev(all_knee_distances)

    '''Test code bellow'''
    print("Standard deviation of knees: "+ str(stddev_knee_distance))

    if stddev_knee_distance < knee_distance_threshold:
        knees_caved_in = False
    
    '''Test Code'''
    print("Knees caved in? "+ str(knees_caved_in))

    

    print("Min left and right hip angle-> left: "+ str(min_l_hip_angle) +" right: "+ str(min_r_hip_angle))
    ##Determine squat depth based on left and right hip angle
    if min_l_hip_angle <= 90 and min_r_hip_angle <= 90:
        squat_depth = True
    
    '''Test Code'''
    print("Squat depth? "+str(squat_depth))



    '''Test code goes here'''
    print("Left Tibia angles mean: " + str(statistics.mean(all_l_tibia_angles)))
    print("Right Tibia angles mean: " + str(statistics.mean(all_r_tibia_angles)))
    print("Left Torso angles mean: " + str(statistics.mean(all_l_torso_angles)))
    print("Right Torso angles mean: " + str(statistics.mean(all_r_torso_angles)))

    ##Takes left and right tibia angles, finds the difference between the two, and determines whether or not they are parallell
    l_angle_difference = abs(statistics.mean(all_l_tibia_angles) - statistics.mean(all_r_torso_angles))
    r_angle_difference= abs(statistics.mean(all_r_tibia_angles) - statistics.mean(all_r_torso_angles))
    angle_difference = (l_angle_difference + r_angle_difference)/2

    '''Test code'''
    print("Left angle difference: "+ str(l_angle_difference))
    print("Right angle difference: " + str(r_angle_difference))
    print("Angle difference: "+ str(angle_difference))


    if angle_difference >= parallelism_threshold:
        parallel = False

    '''Test Code'''
    print("Parallell? " + str(parallel))
                

    ##Scores the test by adding a point for each of the criteria that it satisfies
    if squat_depth:
        total_score =  total_score + 1
    if parallel:
        total_score = total_score + 1
    if knees_caved_in == False :
        total_score = total_score + 1

    return total_score

'''Algorithms in progress'''









#Code that allows you to test the deep_squat
#data = fms_helper.get_landmark_data(r"C:\Users\Anton\.vscode\Code Storage\FMS-Test V2\Capstone--FMS-Test-V2\Backend\deep_squat.csv")
#score = deep_Squat(data)
#print(score)

