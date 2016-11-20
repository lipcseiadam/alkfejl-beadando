'use strict'

const Schema = use('Schema')

class FavouritesTableSchema extends Schema {

  up () {
    this.create('favourites', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('item_id').unsigned().references('id').inTable('items')
      table.string('item_name').notNullable().references('name').inTable('items')
      table.integer('category_id').unsigned().notNullable().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('favourites')
  }

}

module.exports = FavouritesTableSchema
