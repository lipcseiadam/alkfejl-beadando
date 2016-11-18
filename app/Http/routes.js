'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

//Route.on('/').render('main')
Route.get('/', 'ItemController.index')
Route.get('/items/list', 'ItemController.list')
Route.get('/items', 'ItemController.search')
Route.get('/myitems', '')
Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
Route.get('/logout', 'UserController.doLogout')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')

Route.get('/items/create', 'ItemController.create').middleware('auth')
Route.post('/items/create', 'ItemController.doCreate').middleware('auth')

Route.get('/items/:id', 'ItemController.show').middleware('auth')