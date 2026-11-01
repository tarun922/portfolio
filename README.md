# Portfolio

React + Vite. Run `npm install` then `npm run dev`.

3D scene lives in `src/three/` (scroll drives the camera). Edit content only in `src/data/` (profile, projects, skills). Each section and component has its own small file.
Deploy: `npm run build`, then publish `dist/` (Vercel, GitHub Pages, Render static site).

## Screenshots
Drop images into `src/assets/projects/<project id>/` (ids: seeky, buddy, seeky-anim, agent). Any number, any of png/jpg/webp/avif/gif, sorted by file name.
They show up in that project's carousel and in the rotating 3D ring in the background. New project? add it to `src/data/projects.js`, create a folder with the same id, and add an icon in `src/components/projectIcons.js`.

## Sakura scene
A cherry-blossom branch hangs from the top-right corner (buds bloom as you scroll the first screen) and petals fall; scrolling fast makes the wind stronger. Edit the branch shape in `src/three/Branch.jsx`.

## Optional: dancing anime character
Disabled by default. Models are in `extras/dancer-models/`. To enable: copy them into `public/models/` and set `dancer: true` in `src/three/sceneConfig.js`. Tune with `src/three/dancerConfig.js`. Credits in `extras/dancer-models/CREDITS.txt`.
