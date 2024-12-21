import fetchActivity from "./api/fetchActivity.js";

function compileData(data) {
  if (data.length === 0) {
    console.log("No activity fro the specified user");
    return;
  }

  data.forEach((d) => {
    if (d.type === "PushEvent") {
      console.log(`Pushed ${d.payload.commits.length} commits to ${d.repo.name}`);
    }
    else if (d.type === "CreateEvent") {
      console.log(`Created ${d.payload.ref_type} in ${d.repo.name}`);
    }
    else if (d.type === "WatchEvent") {
      console.log(`Is watching ${d.repo.name}`);
    }
    else if (d.type === "IssuesEvent") {
      console.log(`Interacted with an issue in ${d.repo.name}`);
    }
    else if (d.type === "ForkEvent") {
      console.log(`Forked ${d.repo.name}`);
    }
    else {
      console.log(`${d.type} in ${d.repo.name}`);
    }
  });
};

const args = process.argv.slice(2);
const username = args[0];

console.log(username);

if (username) {
  const data = await fetchActivity(username);
  compileData(await data);
}
else if (!username || username === "\n") {
  console.log("no username specified");
}