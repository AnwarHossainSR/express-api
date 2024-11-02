export default [
  {
    files: ['**/*.js'], 
    languageOptions: {
      ecmaVersion: 2020,  // Support ES6+ syntax
      sourceType: 'module',  // Use 'module' if you're using ES modules
      globals: {
        process: 'readonly',  // Allow process global variable
        __dirname: 'readonly', // Allow __dirname in Node.js
        require: 'readonly',   // Allow require in Node.js
        module: 'readonly',    // Allow module in Node.js
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-await-in-loop': ['off'],
    },
  }
];