import mongoose from 'mongoose'

async function connectDatabase() {
  await mongoose.connect(
    'mongodb+srv://joaomatheus012:l1pdIF5ePrJXqcfl@cluster0.ggmrvll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  )
}


export default connectDatabase