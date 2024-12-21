import { Octokit } from "@octokit/core";
import { config } from "./config.js";

function compileData(object) {
  if (object.type === "PushEvent") {
    return `There were ${object.commits} commits to ${object.repo}`;
  }
  else if (object.type === "CreateEvent") {
    return `There were ${object.count} changes to ${object.repo}`;
  }
  else if (object.type === "WatchEvent") {
    return `There is ${object.count} people watching ${object.repo}`;
  }
  else {
    return "unkown event type: " + Object.values(object).toString();
  }
}

// get command line inputs
const args = process.argv.slice(2);
const username = args[0];
if (username) {
  // display the username
  console.log("github username given: " + username);
  console.log("");

  // stup octokit to interface with the github api
  const octokit = new Octokit ({
    auth: config.githubAPI
  });

  // await the response from the api
  const response = await octokit.request("GET /users/{username}/events/public", {
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
      repo: d.repo.name,
      commits: d.payload.distinct_size,
    })
  }

  // store unique data and their counts
  const uniqueCounts = dataAgg.reduce((acc, curr) => {
    // define a key we cna search for
    const key = `${curr.type}-${curr.name}`;
    if (acc[key]) {
      // if found: increase that count
      acc[key].commits += curr.commits;
      acc[key].count++;
    } else {
      // if not found: spread that object into the new object and initialize a count field to be 1
      acc[key] = { ...curr, count: 1 };
    }
    return acc;
  }, {});
  
  // turn into array we can manip, this gets rid of the key constisting of the type and name
  const uniqueData = Object.values(uniqueCounts);
  
  // return results
  for (const d of uniqueData) {
    console.log(compileData(d));
    console.log("");
  }
}
