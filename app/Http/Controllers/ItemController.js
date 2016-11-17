'use strict'

const Database = use('Database')

class ItemController{
    * index(request, response){
        yield response.sendView('main', {
           //const categories = yield Database.from('categories').select('*')
        })
    }
}

module.exports = ItemController