'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')
const Validator = use('Validator')

class UserController {

  * register (request, response) {
    yield response.sendView('register')
  }

  * doRegister(request, response) {
    const registerData = request.except('_csrf');
    const rules = {
      name: 'required',
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      roomnumber: 'required|alpha_numeric|unique:users',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    }
    const validation = yield Validator.validateAll(registerData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    const user = new User();
    
    user.name = registerData.name
    user.username = registerData.username
    user.email = registerData.email
    user.roomnumber = registerData.roomnumber
    user.password = yield Hash.make(registerData.password)

    yield user.save()

    yield request.auth.login(user)

    response.redirect('/');
  }

  * login(request,response){
        yield response.sendView('login')
    }

  * doLogin(request,response){
        const username = request.input('username')
        const password = request.input('password')

        try{
            const login = yield request.auth.attempt(username, password)
            if(login){
                response.redirect('/')
                return
            }
        }
        catch(err){
            yield request
                .withAll()
                .andWith({ errors: [err] })
                .flash()

            response.redirect('back')
            return            
        }
    }

  * doLogout (request, response) {
    yield request.auth.logout()
    response.redirect('/')
  }

  * show(request,response){
    const users = yield User.all()

       yield response.sendView('userlist', {
           users: users.toJSON()
       })
  }

}

module.exports = UserController