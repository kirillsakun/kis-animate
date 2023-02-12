module.exports = {
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	ignorePatterns: ['dist/**/*.*'],
	plugins: [
		'@typescript-eslint',
		'prettier',
	],
	rules: {
		'prettier/prettier': [1],
		'@typescript-eslint/type-annotation-spacing': [1, {}],
	},
};
