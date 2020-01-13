const express = require('express')
const db = require('./data/db.js')

const server = express()

server.get('/', (req, res) => {
	res.send('Hellowwwww')
})

//GET
server.get('/api/users', (req, res) => {
	db.find()
		.then(users => {
			res.status(200).json(users)
		})
		.catch(err => {
			res.status(500).json({
				errorMessage: 'The users information could not be retrieved.'
			})
		})
})

server.post('/api/users', (req, res) => {
	const userInfo = req.body
	db.insert(userInfo)
		.then(users => {
			res.status(201).json(users)
		})
		.catch(err => {
			res.status(500).json({
				errorMessage: 'There was an error while saving the user to the database'
			})
		})
})

const port = 8000
server.listen(port, () => {
	console.log('\n=== API on port 8000 ===\n')
})
