module.exports = {
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    overrides: [
        {
            files: ['docs/**/*.md', 'docs/src/pages/**/*.{js,tsx}', 'docs/data/**/*.{js,tsx}'],
            options: {
                // otherwise code blocks overflow on the docs website
                printWidth: 85,
            },
        },
    ],
};
