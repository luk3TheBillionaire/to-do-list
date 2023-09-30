const { default: mongoose } = require("mongoose");
const item = require("./dbItemSchema");

const ListSchema = {
    'name':String,
    'items':[]
};

const List = mongoose.model('List',ListSchema);

module.exports=List