module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
  ]
  ,
  plugins: ["jest", "@typescript-eslint", "prettier"],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    semi: "off",
    noConsole: "off",
    noPlusplus: "off",
    eqeqeq: "error",
    indent: ["error", 2, {SwitchCase: 1}],
    noParamReassign: "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/member-delimiter-style" : "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-extra-semi": ["error"],
    "@typescript-eslint/quotes": [
      2,
      "single",
      {
        "avoidEscape": true
      }
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        semi: false,
        singleQuote: true,
        printWidth: 100
      }
    ],
  },
  overrides: [
    {
      files: 'packages/jest-types/**/*',
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ]
}
