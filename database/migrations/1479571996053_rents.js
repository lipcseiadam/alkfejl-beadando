'use strict'

const Schema = use('Schema')

class RentsTableSchema extends Schema {

  up () {
    this.create('rents', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 254).notNullable()
      table.string('email', 254).notNullable()
      table.string('roomnumber', 60).notNullable()
      table.integer('item_id').unsigned().references('id').inTable('items')
      table.string('item_name').notNullable()
      table.integer('quantity').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('rents')
  }

}

module.exports = RentsTableSchema
