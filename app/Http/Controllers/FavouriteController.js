'use strict'

const Category = use('App/Model/Category')
const Item = use('App/Model/Item')
const User = use('App/Model/User')
const Validator = use('Validator')
const Favourite = use('App/Model/Favourite')

class FavouriteController{

    * doFavourite(request, response){
        const itemData = request.except('_csrf');
        const validation = yield Validator.validateAll(itemData);
        if(validation.fails()){
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            response.redirect('back')
            return
        }

        const id = request.param('id')        
        const item = yield Item.find(id)
        const favourite = new Favourite();
        const user = request.currentUser

        if(!request.currentUser){
            response.unauthorized()
            return
        }

        favourite.user_id = user.id
        favourite.item_id = item.id
        favourite.item_name = item.name
        favourite.category_id = item.category_id

        yield favourite.save();

        response.redirect('/items/list');
    }       

    * myFavourites(request,response){
        const categories = yield Category.all();
        const users = yield User.all();
        const id = request.currentUser.id;
        const favourites = yield Favourite.all(id)

        if(!favourites) {
            yield response.sendView('main', {
            })
            return
        }
        yield response.sendView('myFavourites', {
            categories: categories.toJSON(),
            favourites: favourites.toJSON()

        })
    } 
}

module.exports = FavouriteController