import tensorflow as tf
import numpy as np 
import matplotlib.pylab as p


# create input data using NUMPY. y = x* 0.1 + 0.3 + noise

x_data = np.random.rand(100).astype(np.float32)
noise = np.random.normal(scale=0.01 , size=len(x_data))
y_data = x_data * 0.1 + 0.3 + noise

# p.plot(x_data,y_data,'.')
# p.show()

W = tf.Variable(tf.random_uniform([1] ,0.0 ,1.0),name="user_weight")
b = tf.Variable(tf.zeros([1],name="user_bias"))
y = W * x_data + b

print(W)
print(b)

loss = tf.reduce_mean(tf.square(y-y_data))
optimizer = tf.train.Grandient 

