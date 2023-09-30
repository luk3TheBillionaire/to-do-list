const mongoose =require ('mongoose')
const handleError =(err)=>{mongoose.connection.on('error',error=>{console.log(error);})}

const dbConnect =async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
       
    } catch (error) {
        handleError(error);
    }
}

module.exports=dbConnect