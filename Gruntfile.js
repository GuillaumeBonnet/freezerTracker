module.exports = function (grunt) {
	grunt.initConfig({
		svgstore: {
			options: {
				prefix: 'icon-', // This will prefix each ID
				svg: {
					// will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
					viewBox: '0 0 100 100',
					xmlns: 'http://www.w3.org/2000/svg',
				},
				includedemo: true,
			},
			default: {
				files: {
					'./svg/svgstoreOutput/svgstoreOutput.svg': [
						'./svg/batch1/*.svg',
						'./svg/batch2/*.svg',
						'./svg/handmade/*.svg',
					],
				},
			},
		},
	})

	grunt.loadNpmTasks('grunt-svgstore')
	grunt.registerTask('default', ['spriteMaking'])
}
