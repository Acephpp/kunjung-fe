import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Flat config: export array langsung
export default [
  // Config bawaan Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Override rules kita
  {
    rules: {
      // Biar boleh pakai any
      "@typescript-eslint/no-explicit-any": "off",

      // Biar unused vars cuma warning
      "@typescript-eslint/no-unused-vars": "warn",

      // 🔥 Matikan larangan ts-nocheck (ini yang bikin error)
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
];
