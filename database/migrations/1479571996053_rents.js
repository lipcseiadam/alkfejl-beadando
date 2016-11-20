'use strict'

const Schema = use('Schema')

class RentsTableSchema extends Schema {

  up () {
    this.create('rents', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 254).notNullable().references('name').inTable('users')
      table.string('email', 254).notNullable().references('email').inTable('users')
      table.string('roomnumber', 60).notNullable().references('roomnumber').inTable('users')
      table.integer('item_id').unsigned().references('id').inTable('items')
      table.string('item_name').notNullable().references('name').inTable('items')
      table.integer('quantity').unsigned().notNullable().references('quantity').inTable('items')
      table.integer('category_id').unsigned().notNullable().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('rents')
  }

}

module.exports = RentsTableSchema
