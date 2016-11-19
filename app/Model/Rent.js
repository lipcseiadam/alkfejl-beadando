'use strict'

const Lucid = use('Lucid')

class Rent extends Lucid {
    items () {
        return this.belongsToMany('App/Model/Item')
  }
    user () {
        return this.belongsTo('App/Model/User')
  }
}

module.exports = Rent