module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: ["react-app", "plugin:prettier/recommended"],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    React: true,
    JSX: true,
  },
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],
  },
  overrides: [
    {
      files: ["*.jsx", "*.js"],
    },
  ],
};
