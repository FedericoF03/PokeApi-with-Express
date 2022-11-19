import mongoose  from 'mongoose';
import dotenv from 'dotenv/config.js';
try {
    let connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }); 
} catch (error) { 
    console.log(error);
} finally {
    console.log('Conexion establecida');
}

export default './Connection.js'