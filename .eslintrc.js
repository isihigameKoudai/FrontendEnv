module.exports = {
    "parser": "babel-eslint",
    "extends": [
      "airbnb",
      "prettier",
      "prettier/react",
      "plugin:flowtype/recommended"
    ],
    "plugins": [
      "prettier"
    ],
    "rules": {
      "prettier/prettier": ["error", {
        "singleQuote": true,
        "bracketSpacing": true,
        "jsxBracketSameLine": true
      }]
    }
  };
  