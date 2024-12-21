import { Octokit } from "@octokit/core";
import { config } from "./config.js";

// get command line inputs
const args = process.argv.slice(2);
const username = args[0];
if (username) {
  // display the username
  console.log("github username given: " + username);
  console.log("\n");

  // stup octokit to interface with the github api
  const octokit = new Octokit ({
    auth: config.githubAPI
  });

  // await the response from the api
  const response = await octokit.request("GET /users/{username}/events", {
    username: username,
    headers : {
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });

  // get the relevant data from the api
  const data = response.data;

  // aggregate the data to only include the event type and the repo
  const dataAgg = [];
  for (const d of data) {
    dataAgg.push({
      type: d.type,
      repo: d.repo.name
    })
  }

  // store unique data and their counts
  const uniqueCounts = dataAgg.reduce((acc, curr) => {
    const key = `${curr.type}-${curr.name}`;
    if (acc[key]) {
      acc[key].count++;
    } else {
      acc[key] = { ...curr, count: 1 };
    }
    return acc;
  }, {});
  
  // turn into array we can manip
  const result = Object.values(uniqueCounts);
  
  // return results
  console.log(result);
}
