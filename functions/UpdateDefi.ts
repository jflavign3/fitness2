const {MongoClient, ObjectId} = require("mongodb");

exports.handler = async (event, context) => {
  
  const mongoClient = new MongoClient(process.env.MONGODB_URI);
  
  try {
  
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("FITNESS");
  const collection = database.collection("Defi");
  
  const { _id, total, startDate, endDate } = JSON.parse(event.body);

console.log('u:' + _id);
  const filter = { _id: new ObjectId(_id)};

  const options = { upsert: false };
  const updateDoc = {
    $set: {

      total : total,
      startDate : startDate,
      endDate : endDate
    },
  };
    
  const results = await collection.updateOne(filter, updateDoc, options);

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

