/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict'

import User from '../api/user/user.model'
import Question from '../api/question/question.model'
import Thing from '../api/thing/thing.model'

User.find({}).removeAsync()
	.then(() => {
		User.createAsync({
				provider: 'local',
				name: 'Test User',
				email: 'test@example.com',
				password: 'test'
			}, {
				provider: 'local',
				role: 'admin',
				name: 'Admin',
				email: 'admin@example.com',
				password: 'admin'
			})
			.then(() => {
				console.log('Finished populating users')
			})
	})

Question.find({}).remove()
	.then(() => {
		Question.create({
				title: 'Why Node.js?',
				content: 'Cool kids are using Node.js these days. Why?'
			}, {
				title: 'How to setup Node.js server and any client integration?',
				content: 'I am working on a super complex app that requires these.'
			}, {
				title: 'What is NoSQL?',
				content: 'Also, what are the key differences between that and SQL.'
			}, {
				title: 'Which way to modular structure?',
				content: 'The modular, the better, they said.'
			}, {
				title: 'Optimizing Node.js for production build?',
				content: 'Need all of the best practice on modules.'
			}, {
				title: 'Is Node.js production-ready?',
				content: 'Seems like it, right.'
			})
			.then(() => {
				console.log('Finished populating questions')
			})
	})

Thing.find({}).removeAsync()
	.then(() => {
		Thing.create({
				name: 'Development Tools',
				info: 'Integration with popular tools'
			}, {
				name: 'Server and Client integration',
				info: 'Built with a powerful and fun stack'
			}, {
				name: 'Smart Build System',
				info: 'Build system can have tests alongside code'
			}, {
				name: 'Modular Structure',
				info: 'Best practice client and server structures'
			}, {
				name: 'Optimized Build',
				info: 'Build process packs up your templates as a single JavaScript payload'
			}, {
				name: 'Deployment Ready',
				info: 'Easily deploy your app'
			})
			.then(() => {
				console.log('Finished populating things')
			})
	})
