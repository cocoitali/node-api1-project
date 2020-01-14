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
		.catch(() => {
			res.status(500).json({
				errorMessage: 'The users information could not be retrieved.'
			})
		})
})

//GET/:id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
	db.findById(id)
		.then(user => {
			if (user) {
				res.status(200).json(user)
			} else {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' })
			}
		})
		.catch(() => {
			res.status(500).json({
				errorMessage: 'The user information could not be retrieved.'
			})
		})
})

//POST
server.post('/api/users', (req, res) => {
	const userInfo = req.body
	db.insert(userInfo)
		.then(users => {
			res.status(201).json(users)
		})
		.catch(() => {
			res.status(500).json({
				errorMessage: 'There was an error while saving the user to the database.'
			})
		})
})

//PUT
// server.update('/api/users/:id', (req,res) => {

// })

//DELETE
server.delete('/api/users/:id', (req, res) => {
	const id = req.params.id
	db.remove(id)
		.then(user => {
			if (user) {
				res.status(200).json({ message: `User with id ${id} deleted.` })
			} else {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' })
			}
		})
		.catch(() => {
			res.status(500).json({
				errorMessage: 'The user could not be removed.'
			})
		})
})

const port = 8000
server.listen(port, () => {
	console.log('\n=== API on port 8000 ===\n')
})
