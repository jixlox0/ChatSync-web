module.exports = {
  env: {
    node: true,
  },
  extends: [
    // add more generic rulesets here, such as:
    "eslint:recommended",
    "plugin:vue/recommended",
    "prettier",
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    "vue/require-default-prop": "off",
    "vue/html-self-closing": "off",
  },
};
