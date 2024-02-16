import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  age: Number,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'usuario'],
    default: 'usuario'
  },
  cartID: {   //utilizo esto para obtener el id despues, creo que no es buena practica poner esta logica en el usuario pero es lo que se me ocurrio por el momento 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);