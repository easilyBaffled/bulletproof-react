module.exports = {
    darkMode: false,
    mode: 'jit',
    plugins: [],
    purge: ['./src/**/*.jsx', './src/**/*.js', './public/index.html'],
    // or 'media' or 'class'
    theme: {
        extend: {},
        fontFamily: {
            body: ['Roboto', 'sans-serif'],
            sans: ['Roboto', 'sans-serif'],
            serif: ['"Roboto Slab"', 'serif'],
        },
    },
    variants: {
        extend: {},
    },
};
