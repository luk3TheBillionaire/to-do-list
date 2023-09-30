const { default: mongoose } = require("mongoose");

const ItemSchema = {
    'name':String
};

const Item = mongoose.model('Item',ItemSchema);

module.exports=Item