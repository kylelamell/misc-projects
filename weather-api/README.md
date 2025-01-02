# Weather API app
- this project will utilize an api to fetch weather data
  - visual crossing weather api: https://www.visualcrossing.com/weather-api
- the app will make use of caching and .env files to store api keys to make it more robust
- our .env file will be accessed from config.js but neither will be in the repo (hopefully)
- the app makes use of Node.js to deploy our webpage and backend

# Modules
- express
  - express: handles the app setup and allows for us to use a backend
  - urlencoded: allows for information to by passes and parses between the webpages and backend
  - rateLimit: prevents abuse of our weather api to spam requests to the backend and to the 3rd party weather api
- url/path
  - fileURLToPath/dirname: sets up of directory name that the backend will make use of to serve the webpages
- axios
  - axios: allows our backend to make http requests to the 3rd party weather api