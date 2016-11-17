'use strict'

class ItemController{
    * index(request, response){
        yield response.sendView('main', {
           //categories: categories.toJSON()
        })
    }
}

module.exports = ItemController