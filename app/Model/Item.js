'use strict'

const Lucid = use('Lucid')

class Item extends Lucid {
    category () {
        return this.belongsTo('App/Model/Category')
  }

     user () {
        return this.belongsTo('App/Model/User')
  }
    rent() {
        return this.belongsToMany('App/Model/Rent')
    }
}

module.exports = Item