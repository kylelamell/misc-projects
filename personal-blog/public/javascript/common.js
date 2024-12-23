export async function readPosts(filePath) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath);
    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (error) {
          reject(new Error(`Error parsing JSON: ${error.message}`));
        }
      } else {
        reject(new Error(`HTTP error! status: ${xhr.status}`));
      }
    };
    xhr.onerror = () => {
      reject(new Error('Network request failed'));
    };
    xhr.send();
  });
};

export function writePosts(posts) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../blog-admin.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle the response from the PHP script (if any)
      const response = JSON.parse(xhr.responseText); 
      console.log(response); 
      // Do something with the response, e.g., display a message to the user
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.error("Error calling PHP script:", xhr.status, xhr.statusText);
      // Handle the error, e.g., display an error message to the user
    }
  };

  xhr.send(JSON.stringify(posts));
};

export function getNextId(posts) {
  let currId = 0;
  for (const post of posts) {
    if (post.id == currId) {
      ++currId;
    }
    else {
      break;
    }
  }
  return currId;
};

export function refactorPostId(posts, id) {
  for (const post of posts) {
    if (post.id > id) {
      --post.id;
    }
  }
  return posts;
}