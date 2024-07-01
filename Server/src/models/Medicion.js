import mongoose from 'mongoose'

const medicionSchema=new mongoose.Schema({
    id:{
        type:String,
        trim:true
    },
    temperatura:{
        type:String,
        trim:true
    },
    idSensor:{
        type:String,
        trim:true
    }
})

export default mongoose.model('Medicion',medicionSchema);


// export class Medicion{
//     id
//     temperatura
//     idSensor
// }