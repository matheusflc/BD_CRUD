import mongoose from 'mongoose'
import getLastPurchaseView from '../index.js'

async function connectDatabase() {
  await mongoose.connect(
    'mongodb+srv://joaomatheus012:l1pdIF5ePrJXqcfl@cluster0.ggmrvll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  ).then(() => {
    console.log('Conectado ao MongoDB');
    getLastPurchaseView(); // Chama a função aqui
  }).catch(err => console.error('Erro ao conectar com o MongoDB', err));
}


export default connectDatabase