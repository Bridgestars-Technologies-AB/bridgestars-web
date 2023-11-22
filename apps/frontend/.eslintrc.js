//This is the config file for ESLint, here we specify which plugins and parsers to use, and also which
//rule sets ESLint follows
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parser: "vue-eslint-parser",
  // typescript parser needs to be under parserOptions so not to override vue-eslint-parser
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
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
      rules: {
        // adding typescript config ex: "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-namespace": "off",
      },
    },
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "no-undef": "off",
    "vue/multi-word-component-names": "off",
    "vue/attribute-hyphenation": "off",
    "vue/v-on-event-hyphenation": "off",
    "vue/require-default-prop": "off",
  },
  globals: {
    $nuxt: true,
  },
};
