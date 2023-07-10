module.exports = {
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: true,
        tsconfigRootDir: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/no-unsafe-member-access': 'warn',
    },
}
