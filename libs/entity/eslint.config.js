import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({ resolvePluginsRelativeTo: import.meta.dir });

export default [
  js.configs.recommended,
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.plugins("@typescript-eslint"),
  {
    ignores: ["out/*", "*.config.js"],
    rules: {
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/typedef": [
        "error",
        {
          variableDeclaration: true,
        },
      ],
    },
  },
];
