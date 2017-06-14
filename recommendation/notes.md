# How the reacommendation works 
This prgam uses users insterest ratings to make a predection on what the user will like
___
# movie one
// to calcuate users insrest 
num1 = 5*-5 = -25
num2 = -2 * 5 = -10
num3 = 1*1 = 1
num4 = -5 * 4 = -20
num5 = 5 * -5 = -25
score = num1+num2+num3+num4+num5 = -79

# movie two
// to calcuate users insrest 
num1 = 5 * 5 = 25
num2 = -2 * -2 = 4
num3 = 1 * 0 = 0
num4 = -5 * 5 = 25
num5 = 5 * -4 = 20
score = num1+num2+num3+num4+num5 = 74


74 < -79

the user would get number one 

This uses martix multplaction 
```
    Martix multplaction 
    
    U X M  = Movie ratings

[5,-2,1,-5,5] X [5,-5] 
                [-2,5] =[74,-79] 
                [0,1]
                [-5,4]
                [4,-5]
