'use strict';


module.exports = {
	app: {
		title: 'Plan de masa',
		description: 'Afla ce gatesti azi',
		keywords: 'ce gatesc azi, plan de masa, planificarea mesei, reteta zilei, reteta',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'UA-62226020-1'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'scotchscot',
	sessionCollection: 'sessions'
};
