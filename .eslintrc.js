module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['@nuxtjs/eslint-config-typescript', 'plugin:vue/vue3-recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
    overrides: [
        {
            files: [
                '**/pages/**/*.{js,ts,vue}',
                '**/layouts/**/*.{js,ts,vue}',
                '**/app.{js,ts,vue}',
                '**/error.{js,ts,vue}',
                '/myFetch.js',
            ],
            rules: {
                'vue/multi-word-component-names': 'off',
                'no-console': 'off',
            },
        },
    ],
}
