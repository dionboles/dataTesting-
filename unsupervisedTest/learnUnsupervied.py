import tensorflow as tf
a = tf.constant(2,name="A")
b = tf.constant(3,name="B")
x = tf.add(a, b)
with tf.Session() as sess:
# add this line to use TensorBoard.
    writer = tf.summary.FileWriter('./graphs', sess.graph)
    print(sess.run(x))
    writer.close()