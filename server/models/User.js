const Model = require('objection').Model;
const Itinerary = require('./Itinerary')
const Entry = require('./Entry')
const Pictures = require('./Pictures')

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [ 'firstName', 'lastName', 'email', 'fbID' ],

      properties: {
        id:         { type: 'integer'},
        firstName:  { type: 'string', minLength: 1, maxLength: 255 },
        lastName:   { type: 'string', minLength: 1, maxLength: 255 },
        email:      { type: 'string', minLength: 1, maxLength: 255 },
        fbID:       { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {

      // A user will create multiple itineraries over time
      itineraries: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/Itinerary',
        join: {
          from: 'users.id',
          to: 'itineraries.ownerID'
        }
      },

       friends: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/Friends',
        join: {
          from: 'users.id',
          to: 'users.id'
        }
      },
      //A user contributes many entries (to their own itineraires, and to those of others)
      entries: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/Entry',
        join: {
          from: 'users.id',
          to: 'entries.contributorID'
        }
      },

      pictures: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/Pictures',
        join: {
          from: 'users.id',
          to: 'pictures.picUserID'
        }
      }


    }
  }

}

module.exports = User;
