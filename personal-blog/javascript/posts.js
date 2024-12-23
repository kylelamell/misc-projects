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

export function writePosts(posts, filePath) {
  const jsonString = JSON.stringify(array, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filePath;
  link.click();
};