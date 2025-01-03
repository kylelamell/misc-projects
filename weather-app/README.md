# Weather API app
- this project makes use of our weather api, weather-api, to make requests to a 3rd part weather api and chache to results for a time.
- this was split from being the project that accomplishes that since I realized I was overreaching and could just deploy them seperately.
- i reuires that the other server is running on localhost:3001, however it will default to 3000 so make surer you run this on another in case, while this can run on any other.
- the app makes use of Node.js to deploy our webpage and backend

# note
- to use this api make sure you have redis installed on your machine, I am on wondows so I utilized docker to create the container for it so it may or may not work on another system, I dont have the experience yet to tell
- this app should default to localhost:3000,
  - if using the weather-api project in conjunction make sure that you host them correctly, just use the convention of weather-app at port x000 and weather-api at port x001 to keep it simple
- also create a .env file with the following keys:
  - TIMELINE_WEATHER_API_KEY = [your key here]
  - PORT = 3000
  - API_PORT = 3001

# goals
- this project will serve to be a proof on concept that our weather-api project works
- also to gain some more practice with webpages and backend