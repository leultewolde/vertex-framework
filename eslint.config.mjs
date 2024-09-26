import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['node_modules', 'dist'],
        languageOptions: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...require('@typescript-eslint/eslint-plugin').configs.recommended.rules,
            'prettier/prettier': 'error',
        },
        settings: {},
    },
];
