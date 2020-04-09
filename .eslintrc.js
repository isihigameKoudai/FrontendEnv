module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/eslint-recommended"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        bracketSpacing: true
      }
    ]
  }
};
