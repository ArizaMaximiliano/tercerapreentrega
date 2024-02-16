import mongoose from 'mongoose';
import config from '../config/config.js';

export const URI = config.db.mongodbUri;

export const init = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Conexion exitosa con la base de datos');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
  }
}
