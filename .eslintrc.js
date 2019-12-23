module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'globals': {},
    'extends': 'eslint:recommended',
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 2017
    },
    'rules': {
        'space-before-function-paren': [0, 'always'],
        'indent': [2, 4, {'SwitchCase': 1}],
        'camelcase': 0,
        'handle-callback-err': [2, '^(err|error)$'],
        'no-unused-vars': 0,
        'semi': [0]
    }
};

