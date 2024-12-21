import { config } from "./config.js";

const args = process.argv.slice(2);

const username = args[0];

if (username) {
  console.log("github username given: " + username);
  console.log("githubs api key given: " + config.githubAPI);
}
