'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Router Login
Route.post('/signin', 'SessionController.create')

// Router User
Route.post('/signup', 'UserController.create')
Route.get('/user', 'UserController.findOne')
Route.put('/user', 'UserController.update')
Route.delete('/user', 'UserController.delete')

// Router Item
Route.resource('items', 'ItemController').apiOnly().middleware(['auth'])