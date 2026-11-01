// Auto-discovers screenshots: src/assets/projects/<project id>/*.png|jpg|webp...
// Add or remove files and the carousels update. No code changes needed.
const files = import.meta.glob("../assets/projects/*/*.{png,jpg,jpeg,webp,avif,gif}", {
  eager: true,
  query: "?url",
  import: "default",
});

const byProject = {};
Object.keys(files)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .forEach((path) => {
    const id = path.split("/").slice(-2, -1)[0];
    (byProject[id] ||= []).push(files[path]);
  });

export const imagesFor = (id) => byProject[id] ?? [];
