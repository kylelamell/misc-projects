export function writePosts(posts) {
  const jsonString = JSON.stringify(array, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "../posts.json";
  link.click();
}