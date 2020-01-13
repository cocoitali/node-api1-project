const express = require('express')
const db = require('./data/db.js')

const server = express()
server.use(express.json()) // teaches express how to read json

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

//dynamic
server.delete('/api/users/:id', (req, res) => {
	const id = req.params.id
	db.remove(id)
		.then(user => {
			res.status(200).json({ message: `User with id ${id} deleted` })
		})
		.catch(err => {
			res.status(500).json({
				errorMessage: 'The user could not be removed'
			})
		})
})

const port = 8000
server.listen(port, () => {
	console.log('\n=== API on port 8000 ===\n')
})
