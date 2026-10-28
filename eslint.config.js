const js = require("@eslint/js");
const globals = require("globals");
const prettier = require("eslint-config-prettier");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  // Vitest solo se puede importar con import, así que las pruebas son módulos ES
  {
    files: ["tests/**"],
    languageOptions: { sourceType: "module" },
  },
  // Va al final: apaga las reglas de ESLint que chocan con Prettier
  prettier,
];
