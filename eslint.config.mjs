// eslint.config.mjs

import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    {
        // Specify the files ESLint should lint
        files: ['src/**/*.ts', 'test/**/*.ts'],
        ignores: ['node_modules', 'dist'],
        languageOptions: {
            // Set the parser to '@typescript-eslint/parser'
            parser: typescriptEslintParser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
                ecmaVersion: 'latest',
            },
        },
        plugins: {
            // Include necessary plugins
            '@typescript-eslint': typescriptEslintPlugin,
            prettier: eslintPluginPrettier,
        },
        // Extend recommended rules
        rules: {
            // Include recommended rules from TypeScript ESLint plugin
            ...typescriptEslintPlugin.configs.recommended.rules,

            // Adjust the no-unused-vars rule
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_', // Ignore variables starting with '_'
                    varsIgnorePattern: '^_', // Ignore variables starting with '_'
                    args: 'after-used', // Only report unused variables after the last used argument
                    ignoreRestSiblings: true, // Ignore rest siblings
                },
            ],
            '@typescript-eslint/no-explicit-any': 'off',

            // Include Prettier recommended config
            ...eslintConfigPrettier.rules,

            // Add Prettier as an ESLint rule
            'prettier/prettier': 'error',
        },
    },
];
