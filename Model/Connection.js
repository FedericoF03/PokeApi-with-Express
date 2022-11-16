import mongoose  from 'mongoose';
import dotenv from 'dotenv/config.js';
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
try {
    let connection = await mongoose.connect('mongodb+srv://Marlon:Gk8dr3RXhbS7b8ft@pokemongo.etftzof.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }); 
} catch (error) { 
    console.log(error);
} finally {
    console.log('Conexion establecida');
}

export default './Connection.js'