'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Item = use('App/Model/Item')
const User = use('App/Model/User')

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
        //console.log(recipes.toJSON())
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
}

module.exports = ItemController