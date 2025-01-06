# tcp authentication project
This project will explore using an intermediary that 
authenticates user messages via tokens to ensure that a 
client cannot directly send data to a server.

The motivation behind this project is not really to just make 
a way for clients to only connect to our server via the 
intermediary, as we will see that the server still will have 
to do something to authenticate the incoming message. That 
will be another project, where we will specifically refuse 
all message not coming from specific addresses.

Instead I am motivated to explore how I can implement simple 
token based authentication so that I can build on it later. 
Really this project is a foundation for further study.

## client.js
Will try to send data to the server via the intermediary. And 
hopefully will recieve back an expected response.

It will also try to act as a bad actor and connect directly 
to the server to get a repsonse back, and hopefully the 
server and intermediary will be able to handle that.

## intermediary.js
Will authenticate a message recieved by the cleint by adding 
an authentication token to the message. This token will be 
stored in a cache, probably Redis since thats what I have 
used before, and then sending the message and authentication 
token to the server. 

## server.js
Will recieve data, and then check if the data has an 
authentication token. If it doesn't then it will just end the 
connection. If it does, then it will look at the cache to see 
if the token is valid. If the token is not valid we also end 
the connection.

The server will hopefully recieve an authenticaed message, 
then we will send back some information that the client 
expects to recieve (for testing purposes).