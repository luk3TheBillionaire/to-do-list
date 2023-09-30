const  Item = require('../models/dbItemSchema');

const item1 = new Item ({
    name:"Welclome to your to dolist"
  });
  
  const item2 = new Item ({
    name:"Hit the + button to add an item"
  });
  
  const item3 = new Item ({
    name:"<--- Hit this to delete"
  });
  
  const defaultItems=[item1,item2,item3];
  
  module.exports=defaultItems