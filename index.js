const express = require('express')
const cors = require('cors');
const db = require('./data/db.js')

const server = express()
server.use(express.json(), cors()) // teaches express how to read json
// server.use(cors())

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
    const user = req.body
    const { id } = req.params
	if (user.name && user.bio) {
		db.insert(user, id)
			.then(user => {
				res.status(201).json(user)
			})
			.catch(() => {
				res.status(500).json({
					error: 'There was an error while saving the user to the database'
				})
			})
	} else {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' })
	}
})

//PUT
server.put('/api/users/:id', (req, res) => {
	const user = req.body
	const { id } = req.params
	if (user.name && user.bio) {
		db.update(id, user)
			.then(count => {
				if (count) {
					db.findById(id).then(user => {
						res.json(user)
					})
				} else {
					res.status(404).json({
						message: 'The user with the specified ID does not exist.'
					})
				}
			})
			.catch(err => {
				res
					.status(500)
					.json({ error: 'The user information could not be modified.' })
			})
	} else {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' })
	}
})
// server.put('/api/users/:id', (req, res) => {
// 	const { id } = req.params
// 	const user = req.body
// 	db('users')
// 		.where({ id })
// 		.update(user)
// 		.then(user => {
// 			res.status(200).json(user)
// 		})
// 		.catch(() => {
// 			res
// 				.status(500)
// 				.json({ errorMessage: 'The user information could not be modified.' })
// 		})
// })

//DELETE
server.delete('/api/users/:id', (req, res) => {
	const id = req.params.id
	db.remove(id)
		.then(user => {
			if (user) {
				res.status(204).json({ message: `User with id ${id} deleted.` })
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
