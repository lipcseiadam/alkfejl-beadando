'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Item = use('App/Model/Item')
const User = use('App/Model/User')
const Validator = use('Validator')
const Rent = use('App/Model/Rent')

class ItemController{
    * index(request, response){
        yield response.sendView('main', { })
    }

    * list(request, response){
        const categories = yield Category.all()

       for(let category of categories){
           const topItems = yield category.items().limit(3).fetch()
           category.topItems = topItems.toJSON()
       }

       yield response.sendView('itemlist', {
           categories: categories.toJSON()
       })
    }

    * show(request, response){
        const id = request.param('id')        
        const items = yield Item.find(id)
        if(!items){
            response.notFound('Item does not found')
            return
        }
        yield items.related('category').load()
        yield response.sendView('showItem', {
            item: items.toJSON()
        })
    }

    * search (request, response) {
        const page = Math.max(1, request.input('p'))
        const filters = {
            itemName: request.input('itemName') || '',
            category: request.input('category') || 0
        }

        const items = yield Item.query()
            .where(function () {
                if (filters.category > 0) this.where('category_id', filters.category)
                if (filters.itemName.length > 0) this.where('name', 'LIKE', `%${filters.itemName}%`)
            })
            .with('user')
            .paginate(page, 9)

        const categories = yield Category.all()
        const users = yield User.all()

        yield response.sendView('itemSearch', {
            items: items.toJSON(),
            categories: categories.toJSON(),
            users: users.toJSON(),
            filters
        })
    }

    * create(request, response) {
        const categories = yield Category.all();

        yield response.sendView('createItem', {
            categories: categories.toJSON()
        });
    }

    * doCreate(request, response) {
        const itemData = request.except('_csrf');
        const rules = {
            name: 'required',
            description: 'required',
            category_id: 'required',
            quantity: 'required',
        }
        const validation = yield Validator.validateAll(itemData, rules);
        if (validation.fails()) {
        yield request
            .withAll()
            .andWith({ errors: validation.messages() })
            .flash()

        response.redirect('back')
        return
        }

        itemData.user_id = request.currentUser.id
        yield Item.create(itemData);

        response.redirect('/items/create');
    }

     * edit(request, response){
        const categories = yield Category.all();
        const id = request.param('id')        
        const item = yield Item.find(id)

        if(request.currentUser.administrator != 1){
            response.unauthorized('Nincs jog')
            return
        }

        if(!item){
            response.notFound('item does not found')
            return
        }

        yield response.sendView('editItem', {
            categories: categories.toJSON(),
            item: item.toJSON()
        });
    }

    * doEdit(request, response){
        const itemData = request.except('_csrf');
        const rules = {
            name: 'required',
            description: 'required',
            quantity: 'required',
            category_id: 'required'
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

        if(request.currentUser.administrator != 1){
            response.unauthorized()
            return
        }

        item.name = itemData.name
        item.description = itemData.description
        item.quantity = itemData.quantity
        item.category_id = itemData.category_id

        yield item.save();

        response.redirect('/items/list');
    }

    *doDelete(request, response){
         const id = request.param('id')        
        const item = yield Item.find(id)
        if(!item){
            response.notFound('item does not found')
            return
        }
        yield item.delete()
        response.redirect('/items/list')
    }

}

module.exports = ItemController