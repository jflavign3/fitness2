const {MongoClient} = require("mongodb");

exports.handler = async (event, context) => {
  
  
  try {
  const mongoClient = new MongoClient(process.env.MONGODB_URI);
  console.log(process.env.MONGODB_URI);
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("FITNESS");
  const collection = database.collection("USER");
  const results = await collection.find({}).limit(100).toArray();
  return {
    statusCode: 200,
    body: JSON.stringify(results),
  };
} catch (err) {
    return { statusCode: 422, body: err.stack };
  }
};
