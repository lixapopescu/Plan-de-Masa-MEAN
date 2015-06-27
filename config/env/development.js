'use strict';

module.exports = {
	db: 'mongodb://localhost/plandemasa',
	app: {
		title: 'Plan de masa - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1568699036724253',
		clientSecret: process.env.FACEBOOK_SECRET || '7eee9ab8d992fcd8e788aa6e183ca0eb',
		callbackURL: '/api/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '417525330820-enlmvffuibnsk0dk18srit92dl4r00uh.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || '8ubY2U97Y1UbkKNZuMIsBam0',
		callbackURL: '/api/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'Alexandra [PlandeMasa] <plandemasa@gmail.com>',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'SendGrid',
			auth: {
				// user: process.env.MAILER_EMAIL_ID || 'plandemasa@gmail.com',
				//pass: process.env.MAILER_PASSWORD || 'lixa200399'
				user: 'lixa',
				pass: 'lixa200399'
			}
		}
	}
};
