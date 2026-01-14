import mongoose from "mongoose";


const connectDB = async ()=>{
    try{
        mongoose.connection.on('connected',()=>console.log("DB connected successfully"))
        let mongodbURI=process.env.MONGODB_URI
        
        if(!mongodbURI){
            throw new Error("Issue in Monogdb URI")
        }
        if(mongodbURI.endsWith('/')){
            mongodbURI=mongodbURI.slice(0,-1)
        }
        const projectName='Gigflow';
        await mongoose.connect(`${mongodbURI}/${projectName}`)
    }catch(err){
        console.log("Error in DB connection: ",err)
    }
}

export default connectDB
