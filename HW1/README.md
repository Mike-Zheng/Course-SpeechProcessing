# Course-SpeechProcessing

## homework1 

![homework1.jpg](homework1.jpg)

 ####Question1: 
 
 #####-Find the probability P(up, up, unchanged, down, unchanged, down, up|λ)
 

 
   P(up, up, unchanged, down, unchanged, down, up|λ)
   
   =P(S1)P(S1|S1)P(S3|S1)P(S2|S3)P(S3|S2)P(S2|S3)P(S1|S2)
   
   = 0.5 0.6 0.2 0.1 0.2 0.1 0.5
   
   = 0.00006

####Question2: 
 #####-Find the optimal state sequence of the model which generates the observation sequence: (up, up, unchanged, down, unchanged, down, up)





   Best case of observation sequence: (up, up, unchanged, down, unchanged, down, up)
   
   = State sequence[ 's1', 's1', 's3', 's3', 's3', 's3', 's1' ]
   
   = P(S1,up)P(S1, up |S1)P(S3, unchanged |S1)P(S3, down |S3)P(S3, unchanged |S3)P(S3, down |S3)P(S1, up |S3)
   
   = 0.7 0.5 0.6 0.7 0.2 0.4 0.5 0.3 0.5 0.4 0.5 0.3 0.4 0.7
   
   = 0.0000148176
