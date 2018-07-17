import cv2 

W = 1920//2
H = 1080//2
class featureExtractor(object):
    GY = 16//2
    GX = 16//2
    def __init__(self):
        self.orb = cv2.ORB_create(1000)
    
    def extract(self,img):
        sy = img.shape[0]//self.GY
        sx = img.shape[1]//self.GX
        akp = []
        for ry in range(0, img.shape[0], sy):
            for rx in range(0,img.shape[1],sx):
                img_chuck = img[ry:ry+sy,rx:rx+sx]
                kp = self.orb.detect(img_chuck,None)
                for p in kp:
                    p.pt = (p.pt[0]+rx,p.pt[1]+ry)
                    akp.append(p)
        return akp

fe = featureExtractor()
def main(mirror=False):
   
    cam = cv2.VideoCapture(0)
    while True:
        _,img = cam.read()
        if mirror:
            img = cv2.flip(img,1)
            img = cv2.resize(img,(W,H))
            kp = fe.extract(img)
            for p in kp:
                u,v = map(lambda x: int(round(x)),p.pt)
                cv2.circle(img, (u,v),color=(0,255,0),radius=3)
        cv2.imshow("tes",img)
        if cv2.waitKey(1) == 27:
            break
    cv2.destroyAllWindows()
if __name__ == '__main__':
    main(mirror=True)
    
