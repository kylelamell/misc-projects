import { Octokit } from "@octokit/core";
import { config } from "./config.js";

const args = process.argv.slice(2);
const username = args[0];
if (username) {
  console.log("github username given: " + username);

  const octokit = new Octokit ({
    auth: config.githubAPI
  });

  const response = await octokit.request("GET /users/{username}/events", {
    username: username,
    headers : {
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });

  const data = JSON.parse(response);
  console.log(data);
}
