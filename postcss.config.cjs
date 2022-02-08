module.exports = ( context ) => ( {
	plugins: {
		autoprefixer:     context.env === "production" ? {} : false,
		'postcss-import': {},
		tailwindcss:      {}
	}
} );
