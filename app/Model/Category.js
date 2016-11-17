'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    items () {
        return this.hasMany('App/Model/Item')
  }
}

module.exports = Category