'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/superqa-dev'
  },

  // Seed database on startup
  // TODO: config this as wish
  seedDB: true

};
