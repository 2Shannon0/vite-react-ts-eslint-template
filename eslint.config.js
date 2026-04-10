import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import cssPlugin from 'eslint-plugin-css-modules';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores([
        'node_modules',
        'dist',
        'build',
        '*.config.js',
        '*.config.mjs',
    ]),

    js.configs.recommended,

    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,

    importPlugin.flatConfigs.recommended,

    {
        plugins: {
            'simple-import-sort': simpleImportSort,
            ['css-modules']: cssPlugin,
        },

        settings: {
            'import/resolver': {
                typescript: {},
            },
        },

        languageOptions: {
            ecmaVersion: 'latest',

            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.commonjs,
            },
        },

        // this rules applies to all files
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'import/no-cycle': 'error',
            'import/no-duplicates': 'error',

            'no-var': 'error',

            'css-modules/no-unused-class': 'error',
            'css-modules/no-undef-class': 'error',

            'prefer-const': 'error',
        },
    },

    {
        files: ['**/*.{tsx,jsx}'],

        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        rules: {
            ...reactHooks.configs.recommended.rules,
            ...reactRefresh.configs.vite.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules,
        },
    },

    {
        files: ['**/*.{ts,tsx}'],

        languageOptions: {
            parser: tseslint.parser,

            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },

        rules: {
            '@typescript-eslint/consistent-type-imports': 'error',
        },
    },

    {
        files: ['**/*.{js,jsx,mjs}'],

        extends: [tseslint.configs.disableTypeChecked],
    },

    eslintPluginPrettierRecommended,
]);
