'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }
  apiTokens () {
    return this.hasMany('App/Model/Item')
  }
  apiTokens () {
    return this.hasMany('App/Model/Rent')
  }

}

module.exports = User
