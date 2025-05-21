module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        'semi': [2, 'never'],
        'comma-dangle': [2, 'never'],
        // 禁止使用 var
        'no-var': 'error',
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/ban-ts-comment': ['off'],
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface'
        ]
    }
}