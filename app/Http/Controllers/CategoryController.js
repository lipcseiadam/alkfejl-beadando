'use strict'

const Category = use('App/Model/Category')
const Item = use('App/Model/Item')
const Validator = use('Validator')

class CategoryController{
    * create(request, response) {
        yield response.sendView('createCategory', { });
    }

    * doCreate(request, response) {
        const categoryData = request.except('_csrf');
        const rules = {
            name: 'required',
        }
        const validation = yield Validator.validateAll(categoryData, rules);
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            response.redirect('back')
            return
        }

        yield Category.create(categoryData);

        response.redirect('/categories/create');
    }

    * show(request,response){
        const categories = yield Category.all()

       yield response.sendView('categorylist', {
           categories: categories.toJSON()
       })
    }

     * doDeleteCategory(request,response){
        const id = request.param('id')        
        const category = yield Category.find(id)
        const item = yield Item.findBy('category_id', id)

        console.log(category.id)
        console.log(item.category_id)
        if(!category){
            response.notFound('category does not found')
            return
        }
        if(category.id == item.category_id){
            response.redirect('back')
        }
        else{
            yield category.delete()
            response.redirect('/categories/list')
        }
    }
}

module.exports = CategoryController