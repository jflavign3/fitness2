const {MongoClient} = require("mongodb");

exports.handler = async (event, context) => {
  
  const mongoClient = new MongoClient(process.env.MONGODB_URI);
  
  try {
  
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("FITNESS");
  const collection = database.collection("User");
  
  const querystring = event.queryStringParameters;
  const id = querystring.userId;
  const points = Number(querystring.points);

console.log('u:' + id);
  const filter = { "userId": Number(id)};
  const options = { upsert: false };
  const updateDoc = {
    $set: {
      points : points
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

