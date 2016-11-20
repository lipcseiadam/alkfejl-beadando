'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Item = use('App/Model/Item')
const User = use('App/Model/User')
const Validator = use('Validator')
const Rent = use('App/Model/Rent')

class RentController{

    *rent(request,response){
        const categories = yield Category.all();
        const id = request.param('id')        
        const item = yield Item.find(id)

        if(!request.currentUser){
            response.unauthorized('Nincs jog')
            return
        }

        if(!item){
            response.notFound('item does not found')
            return
        }

        yield response.sendView('rentItem', {
            categories: categories.toJSON(),
            item: item.toJSON(),
        });
    }

    * doRent(request, response){
        const itemData = request.except('_csrf');
        const rules = {
            quantity: 'required',
        }
        const validation = yield Validator.validateAll(itemData, rules);
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
        const rent = new Rent();
        const user = request.currentUser

        if(!request.currentUser){
            response.unauthorized()
            return
        }

        if(itemData.quantity <= item.quantity){
            item.quantity = item.quantity-itemData.quantity
            item.rented = (item.rented)+(itemData.quantity)
            rent.user_id = user.id
            rent.name = user.name
            rent.roomnumber = user.roomnumber
            rent.email = user.email
            rent.item_id = item.id
            rent.quantity = itemData.quantity
            rent.item_name = item.name
            rent.category_id = item.category_id
        }
        else{response.redirect('back'); return}

        yield item.save();
        yield rent.save();

        response.redirect('/items/list');
    }       

    * showRenteditems(request,response){
        const rents = yield Rent.all()
        yield response.sendView('showRenteditems', {
            rent: rents.toJSON()
        })
    }

    //TODO
    * myitems(request,response){
        const categories = yield Category.all();
        const users = yield User.all();
        const id = request.currentUser.id;
        const rents = yield Rent.all(id)
        //const rents = yield Rent.findBy('user_id', id);
        
        console.log(categories)
        console.log(rents)
        if(!rents) {
            yield response.sendView('main', {
            })
            return
        }
        yield response.sendView('myItems', {
            categories: categories.toJSON(),
            rents: rents.toJSON()

        })
    } 

    * doDeleteRent(request,response){
        const id = request.param('id')        
        const rent = yield Rent.find(id)
        const item_id = rent.item_id
        const item = yield Item.find(item_id)
        console.log(item)
        if(!rent){
            response.notFound('rent does not found')
            return
        }
        if(!item){
            response.notFound('item does not found')
            return
        }
        item.quantity = item.quantity+rent.quantity
        item.rented = item.rented-rent.quantity
        yield item.save();
        yield rent.delete()
        response.redirect('/items/rented')
    }

}

module.exports = RentController