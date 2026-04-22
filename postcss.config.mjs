const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // Keep scanning rooted at the actual execution directory (project root
      // in both local runs and Vercel builds).
      base: process.cwd(),
    },
  },
};

export default config;
