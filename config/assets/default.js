'use strict';

module.exports = {
	client: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/angular-material/angular-material.css',
				'public/lib/mdi/css/materialdesignicons.min.css',
				'http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
				'public/lib/bootstrap-daterangepicker/daterangepicker-bs3.css'
			],
			js: [
				'public/lib/underscore/underscore.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-aria/angular-aria.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-material/angular-material.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-file-upload/angular-file-upload.js',
				'public/lib/ui-router-extras/release/ct-ui-router-extras.js',
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/moment/min/moment.min.js',
				'public/lib/moment/locale/ro.js',
				'public/lib/bootstrap-daterangepicker/daterangepicker.js',
				'public/lib/angular-daterangepicker/js/angular-daterangepicker.min.js',
				'public/lib/moment-duration-format/lib/moment-duration-format.js'
			],
			tests: ['public/lib/angular-mocks/angular-mocks.js']
		},
		css: [
			'modules/*/client/css/*.css'
		],
		less: [
			'modules/*/client/less/*.less'
		],
		sass: [
			'modules/*/client/scss/*.scss'
		],
		js: [
			'modules/core/client/app/config.js',
			'modules/core/client/app/init.js',
			'modules/core/client/*.js',
			'modules/core/client/controllers/*.js',
			'modules/*/client/*.js',
			'modules/*/client/**/*.js'
		],
		views: ['modules/*/client/views/**/*.html']
	},
	server: {
		allJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
		models: 'modules/*/server/models/**/*.js',
		routes: ['modules/*[!core]/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
		sockets: 'modules/*/server/sockets/**/*.js',
		config: 'modules/*/server/config/*.js',
		policies: 'modules/*/server/policies/*.js',
		views: 'modules/*/server/views/*.html'
	}
};
