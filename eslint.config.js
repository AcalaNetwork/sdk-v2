import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tseslint.configs.recommended,
  pluginJs.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    ignores: [
      "coverage",
      "**/dist/**",
      "**/node_modules/**",
      "**/*.d.ts",
      "**/coverage/**",
    ],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
];
