import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const workspaceParent = fileURLToPath(new URL('../', import.meta.url));

export default defineConfig({
  server: {
    fs: {
      allow: [projectRoot, workspaceParent],
    },
  },
});
