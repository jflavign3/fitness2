const {MongoClient} = require("mongodb");

exports.handler = async (event, context) => {
  
  const mongoClient = new MongoClient(process.env.MONGODB_URI);
  
  try {
  
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("FITNESS");
  const collection = database.collection("Program");
  
  const { userId, weekday, exerciseId } = JSON.parse(event.body);
  

  const results = await collection.insertOne({
    weekday:weekday,
    userId:userId,
    exerciseId:exerciseId});
  
  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
} catch (err) {
    return { statusCode: 422, body: err.stack };
  }finally{
    mongoClient.close();

  }
};

