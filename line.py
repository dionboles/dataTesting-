import cv2 
import numpy as np

def average_slope_intercept(image,lines):
    left_fit = []
    right_fit = []
    for line in lines:
        x1,y1,x2,y2 = line.reshape(4)
        parameters = np.polyfit((x1,x2),(y1,y2),1)
        slope = parameters[0]
        intercept = parameters[1]
        if slope < 0:
            left_fit.append((slope,intercept))
        else:
            right_fit.append((slope,intercept))
    left_fit_average = np.average(left_fit,axis=0)
    right_fit_average = np.average(right_fit,axis=0)
    left_line = mak_c
def canny(image):
    grey = cv2.cvtColor(image,cv2.COLOR_RGB2GRAY)
    blur = cv2.GaussianBlur(grey,(5,5),0)
    canny = cv2.Canny(blur,50,150)
    return canny
def diplay_lines(image,lines):
    lane_image = np.zeros_like(image)
    if lines is not None:
        for line in lines:
            x1,y1,x2,y2 = line.reshape(4)
            cv2.line(lane_image,(x1,y1), (x2,y2), (255,0,0),10)
    return lane_image
def regin_of_interest(image):
    height = image.shape[0]
    polygons = np.array([
        [(200,height),(1100,height),(550,250)]
    ])
    mask = np.zeros_like(image)
    cv2.fillPoly(mask,polygons,255)
    masked_image = cv2.bitwise_and(image,mask) 
    return masked_image


image = cv2.imread("test_image.jpg")
lane_image = np.copy(image)
canny_image = canny(lane_image)
cropped_image = regin_of_interest(canny_image)
lines = cv2.HoughLinesP(cropped_image,2,np.pi/180,100,np.array([]),minLineLength=40,maxLineGap=5)
averaged_lines = average_slope_intercept(lane_image,lines)
lines_image = diplay_lines(lane_image,lines)
combo_image = cv2.addWeighted(lane_image,0.8 , lines_image,1,1)
cv2.imshow("test", combo_image)
cv2.waitKey(0)
