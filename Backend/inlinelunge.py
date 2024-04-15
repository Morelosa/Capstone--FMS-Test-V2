#This page is purely to test and develop new scoring algorithms. If not a developer of such algorithms, please carry on :)
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

def slope(a, b):
    a = np.array(a)
    b = np.array(b)

    delta_x = a[0] - b[0]
    delta_y = a[1] - b[1]

    slope = delta_y / delta_x
    
    return slope

def z_slope(a,b):
    a = np.array(a)
    b = np.array(b)

    delta_z = a[2] - b[2]
    delta_x = a[0] - b[0]

    z_slope = delta_z/delta_x

    return z_slope

#Exercise to be developed: Trunk Stability Push Up

#Arms overhead extended & shoulder width apart Thumbs down and aligned with forehead
#Chin for women

#Toes to shins
#Basically a wierd pushup positoin

#Rep with thumbs aligned with chin / forehead

#body lifts as a unit

#Essentially, this exercise checks to see if the body moves all together
#The less it does it, the worse the score
#Calculate the angle of the exercise
#3: 180
#2: 180 and thumbs misaligned from start position 
#1: Not 180 and thumbs misalialigned

#Note: User will have to Begin From the floor while also facing the camera
#IDK how that's gonna work. Wish opencv didnn't have to do that lol