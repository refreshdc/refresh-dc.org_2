require("dotenv").config();

module.exports = {
  projectToken: process.env.POSTHOG_PROJECT_TOKEN,
  projectId: process.env.POSTHOG_PROJECT_ID,
};
