/** @type {import("@commitlint/types").UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "refactor",
        "style",
        "docs",
        "test",
        "chore",
        "ci",
        "build",
        "revert",
      ],
    ],
    "subject-case": [0],
    "header-max-length": [2, "always", 100],
  },
};
