module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
    },
    // NOTE: WE ARE NOT APPLYING PRETTIER IN THIS OVERRIDE, ONLY @ANGULAR-ESLINT/TEMPLATE
    {
      files: ["*.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {},
    },
    // NOTE: WE ARE NOT APPLYING @ANGULAR-ESLINT/TEMPLATE IN THIS OVERRIDE, ONLY PRETTIER
    {
      files: ["*.html"],
      excludedFiles: ["*inline-template-*.component.html"],
      extends: ["plugin:prettier/recommended"],
      rules: {
        // NOTE: WE ARE OVERRIDING THE DEFAULT CONFIG TO ALWAYS SET THE PARSER TO ANGULAR (SEE BELOW)
        "prettier/prettier": ["error", { parser: "angular" }],
      },
    },
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": "off",
  },
};
