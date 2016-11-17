'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Item = use('App/Model/Item')

class ItemController{
    * index(request, response){
        yield response.sendView('main', { })
    }

    * list(request, response){
        const categories = yield Category.all()

        console.log(categories.toJSON())

       for(let category of categories){
           const topItems = yield category.items().limit(3).fetch()
           category.topItems = topItems.toJSON()
       }

       yield response.sendView('itemlist', {
           categories: categories.toJSON()
       })
    }
}

module.exports = ItemController