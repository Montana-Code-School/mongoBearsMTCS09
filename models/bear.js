var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BearSchema = new Schema({
  name: String,
  age: Number,
  color: String,
  species: String,
  isHibernating: Boolean,
  isFriendly: Boolean
});

module.exports = mongoose.model('Bear', BearSchema);
