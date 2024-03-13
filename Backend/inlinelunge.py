#Testing inline Lunge in openCV and mediapipe
#2 Angles required: 1 from the side, and one from the front
#Author of this page: Antonio Morelos


#Conditions for proper score:
# Minimal torso movement (Technically a stick is supposed to be involved but torso movement does the same)
# Feet must remain in sagital plane
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


import cv2
import mediapipe as mp

# Initialize MediaPipe Pose model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils


# Open webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert the image to RGB and process it
    image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)

    if results.pose_landmarks:
        # Extract key points
        # Use the key points to calculate posture metrics

        # Draw the detected landmarks on the frame
        mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

    # Show the frame
    cv2.imshow('Back Posture Tracking', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close windows
cap.release()
cv2.destroyAllWindows()
