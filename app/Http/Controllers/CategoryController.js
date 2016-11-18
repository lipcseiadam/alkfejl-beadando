'use strict'

const Category = use('App/Model/Category')
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

        response.redirect('/createcategory');
    }
}

module.exports = CategoryController