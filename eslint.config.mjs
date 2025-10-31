import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Ignore helper Node scripts from type-aware frontend lint rules
      "setup-firebase.js",
      "test-firebase.js",
      "get_playlists.js",
    ],
    rules: {
      // Content-heavy site: allow natural apostrophes/quotes in text
      "react/no-unescaped-entities": "off",
      // Ease progressive typing; we still avoid any in core code
      "@typescript-eslint/no-explicit-any": "off",
      // Allow commonjs requires in ignored helper scripts
      "@typescript-eslint/no-require-imports": "off",
      // Not important for small util defaults
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default eslintConfig;
