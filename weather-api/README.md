# Weather API 
- this is the second attempt at the project, rebasing it
- it is purely just an api that fetches data from a third party api and caches it for a period
- to interact with this api refer to weather-app


# details
- this project will utilize an api to fetch weather data
  - visual crossing weather api: https://www.visualcrossing.com/weather-api
- the app will make use of caching and .env files to store api keys to make it more robust
- the app makes use of Node.js to deploy our webpage and backend

# note
- to use this api make sure you have redis installed on your machine, I am on wondows so I utilized docker to create the container for it so it may or may not work on another system, I dont have the experience yet to tell
- this api should default to localhost:3001, but if that is in use then it will go to 3000, and who knows after that
  - if using the weather-app project in conjunction make sure that you host them correctly , just use the convention of weather-app at port x000 and weather-api at port x001 to keep it simple
- also create a .env file with the following keys:
  - TIMELINE_WEATHER_API_KEY = [your key here]
  - REDIS_HOST = "127.0.0.1"
  - REDIS_PORT = 6379
  - PORT = 3001

# Modules
- express
  - express: handles the app setup and allows for us to use a backend
  - urlencoded: allows for information to by passes and parses between the webpages and backend
- express-rate-limti
  - rateLimit: limits abuse of api cals by limiting the requests per window
- redis
  - createClient: allows us to store json objects in a cache to reduce api calls
- axios
  - axios: allows our backend to make http requests to the 3rd party weather api

# goals
- this project is going to be my first time utilizing some caching methods, so ill use redis since it seems to be popular