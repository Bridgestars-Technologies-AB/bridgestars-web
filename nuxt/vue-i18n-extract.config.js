module.exports = {
  "vueFiles":
    "./?(components|pages|composables|js|layouts|server|util)/**/*.?(js|vue)",
  "languageFiles": "./localization/lang/**/*.?(json|yaml|yml|js)",
  "exclude": ["node_modules/"],
  "output": false,
  "add": true,
  "remove": false,
  "ci": false,
  "separator": ".",
  "noEmptyTranslation": "",
  missingTranslationString: "MISSING",
};
