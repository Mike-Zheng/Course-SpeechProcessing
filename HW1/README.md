# Course-SpeechProcessing

## homework1 

![homework1.jpg](homework1.jpg)


####Question1: 
 
#####-Find the probability P(up, up, unchanged, down, unchanged, down, up|λ)
 
   P(up, up, unchanged, down, unchanged, down, up|λ)
   =ΣP(S|λ)P(O|S, λ)
   BruteForce:
   = 0.00037439866445840796
   Forward:
   = 0.0004967268975999998


####Question2: 

#####-Find the optimal state sequence of the model which generates the observation sequence: (up, up, unchanged, down, unchanged, down, up)





   Best case of observation sequence: (up, up, unchanged, down, unchanged, down, up)
   
   = State sequence[ 's1', 's1', 's3', 's3', 's3', 's3', 's1' ]
   
   = P(S1,up)P(S1, up |S1)P(S3, unchanged |S1)P(S3, down |S3)P(S3, unchanged |S3)P(S3, down |S3)P(S1, up |S3)
   
   = 0.7 0.5 0.6 0.7 0.2 0.4 0.5 0.3 0.5 0.4 0.5 0.3 0.4 0.7
   
   = 0.0000148176
