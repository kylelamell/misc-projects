import { Octokit } from "@octokit/core";
import { config } from "./config.js";

const args = process.argv.slice(2);
const username = args[0];
if (username) {
  console.log("github username given: " + username);
  console.log("\n");

  const octokit = new Octokit ({
    auth: config.githubAPI
  });

  const response = await octokit.request("GET /users/{username}/events", {
    username: username,
    headers : {
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });

  const data = response.data;

  const dataAgg = [];

  for (const d of data) {
    dataAgg.push({
      type: d.type,
      repo: d.repo.name
    })
  }

  const uniqueCounts = dataAgg.reduce((acc, curr) => {
    const key = `${curr.type}-${curr.name}`;
    if (acc[key]) {
      acc[key].count++;
    } else {
      acc[key] = { ...curr, count: 1 };
    }
    return acc;
  }, {});
  
  const result = Object.values(uniqueCounts);
  
  console.log(result);
}
