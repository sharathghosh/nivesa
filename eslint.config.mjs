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
    ignores: ['.next/**', 'node_modules/**']
  },
  {
    rules: {
      // Disable the rule for unescaped entities since React handles this safely
      "react/no-unescaped-entities": "off",
      // Silence unused param warnings for catch clauses
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      // Allow img tags in specific cases where Image component isn't suitable
      "@next/next/no-img-element": "warn"
    }
  }
];

export default eslintConfig;
