const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const cardSchema = Schema({
  title: String,
 content: String,
 tags: { type: [String], index: true },

});




const cards = mongoose.model('Cards', cardSchema);
module.exports = cards;
