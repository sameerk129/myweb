import path from "node:path";
import { fileURLToPath } from "node:url";

// Pin the Tailwind resolver to THIS project directory.
// Without this, @tailwindcss/postcss walks up and gets confused by any
// stray package.json / node_modules sitting higher in the tree
// (e.g. ~/package.json, ~/node_modules), which causes:
//   "Can't resolve 'tailwindcss' in '/Users/.../workspace'"
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: projectRoot,
    },
  },
};

export default config;
