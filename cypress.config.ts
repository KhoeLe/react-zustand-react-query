import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents() {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
  },

  projectId: "yktcch",

  retries: {
    runMode: 2,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
