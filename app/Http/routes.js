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

Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
Route.get('/logout', 'UserController.doLogout')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/profile', 'UserController.showProfile').middleware('auth')
Route.post('/profile', 'UserController.editProfile').middleware('auth')

Route.get('/myitems', 'RentController.myitems').middleware('auth')
Route.get('/items/rented/', 'RentController.showRenteditems').middleware('auth')
Route.get('/items/rented/:id/delete', 'RentController.doDeleteRent').middleware('auth') 

Route.get('/categories/create', 'CategoryController.create').middleware('auth')
Route.post('/categories/create', 'CategoryController.doCreate').middleware('auth')
Route.get('/categories/list', 'CategoryController.show').middleware('auth')
Route.get('/categories/list/:id/delete', 'CategoryController.doDeleteCategory').middleware('auth')

Route.get('/items/create', 'ItemController.create').middleware('auth')
Route.post('/items/create', 'ItemController.doCreate').middleware('auth')
Route.get('/items/:id/edit', 'ItemController.edit').middleware('auth')
Route.post('/items/:id/edit', 'ItemController.doEdit').middleware('auth')
//Route.get('/items/:id/delete', 'ItemController.doDelete').middleware('auth') 

Route.get('/favourites', 'FavouriteController.myFavourites').middleware('auth')
Route.get('/items/:id/favourite', 'FavouriteController.doFavourite').middleware('auth')

Route.get('/items/:id/rent', 'RentController.rent').middleware('auth')
Route.post('/items/:id/rent', 'RentController.doRent').middleware('auth')

Route.get('/items/list', 'ItemController.list')
Route.get('/items/search', 'ItemController.search')
Route.get('/items/:id', 'ItemController.show').middleware('auth')

Route.get('/users', 'UserController.show').middleware('auth')



//ajax

Route.group('ajax', function () {
  Route.delete('/items/:id/delete', 'ItemController.ajaxDelete').middleware('auth')
  Route.post('/login', 'UserController.ajaxLogin')
  Route.post('/register', 'UserController.ajaxRegister')
  Route.post('/items/:id/rent', 'RentController.ajaxRent').middleware('auth')
}).prefix('/ajax')