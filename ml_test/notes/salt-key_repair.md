# How to fix the error with salt 
when you get to step 

6. Accept the salt minion key 
```
salt-key -A
```
First step 

check if your key is listed 
with this 
```
salt-key -L
```
if you don't have this line 
___
<div style="background:#222; height:50px">
<span style="color:#ff6e67;">Unaccepted Keys:</span>
<br>
<span style="color:#c91b00;">sisaweb.local</span>
</div>

___

Then you need to make the key with this 

```
 salt-key  --gen-keys=GEN_KEYS
```
it should return this or something like this  
<div style="background:#222; height:50px">
<span style="color:#00c5c7;">return:</span>
<br>
<span style="color:#00a000;">   08:16:e9:c9:72:3e:72:15:88:ba:c7:22:d5:c8:a8:eb:6d:53:73:80:ba:52:b4:51:97:29:44:ae:53:c7:9d:de</span>
</div>
<br/>

Then stop the minton 

```
service salt-minion stop
```

Then start the minton 
```
service salt-minion start
```

Then list the keys again 

```
salt-key -L
```

Then accept the key 

```
 salt-key -A
 ```

 Then test salt with this 

 ```
 salt '*' test.ping
 ```