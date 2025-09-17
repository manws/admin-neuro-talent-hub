module.exports = {
    root: true,

    env: {
        browser: true,
        node: true,
        es6: true,
    },

    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],

    parserOptions: {
        parser: 'babel-eslint',
    },

    plugins: [
        'vue'
    ],

    rules: {
        // 'no-console': 'off',
        // 'no-debugger': 'off',
        'vue/no-unused-vars': 'off',
        'no-useless-escape': 0,
        "no-unused-expressions": "off",
        "no-undef": "off",
        "vue/no-unused-components": "off",
        "no-mixed-spaces-and-tabs": "off",
        "no-tabs": "off",
        'no-undef': 'off',
        'camelcase': 'off',
        'semi': [2, 'never'],
        'semi-spacing': [4, {
            'before': false,
            'after': true
        }]
    },

    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/prettier'
    ]
};
