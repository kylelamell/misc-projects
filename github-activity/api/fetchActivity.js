export async function fetchActivity(username) {
  const response = await fetch (
    `https://api.github.com/users/${username}/events`,
    {
      headers: {
        "User-Agent": "node.js",
      },
    },
  );

  if (!response.status === 200) {
    if (response.status === 404) {
      throw new Error("user not found");
    }
    else {
      throw new Error(`erro fethcing data: ${response.status}`);
    }
  }

  return response.json();
};