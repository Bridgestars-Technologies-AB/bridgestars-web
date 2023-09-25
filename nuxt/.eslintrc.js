module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  overrides: [
    // Use `overrides` so ESLint can check both JS and TS files.
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
    },
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    // adding typescript config ex: "@typescript-eslint/no-unused-vars": "error",
    "no-undef": "off",
    "vue/multi-word-component-names": "off",
  },
  globals: {
    $nuxt: true,
  },
};
