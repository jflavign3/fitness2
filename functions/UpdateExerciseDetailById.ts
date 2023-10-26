import { log } from "console";
const {MongoClient,ObjectId} = require("mongodb");

exports.handler = async (event, context) => {
  
  const mongoClient = new MongoClient("mongodb+srv://m001-student:q1w2e3r4@mycluster.izglnnd.mongodb.net");
  
  try {
  
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("FITNESS");
  const collection = database.collection("ExerciseDetails");  
  
  
  let d = JSON.parse(event.body);
  console.log('test'+ JSON.stringify(d));
  
  const filter = { _id: new ObjectId(d._id)};
  const options = { upsert: false };
  const updateDoc = {
    $set: {
      Value : d.Value,
      LastUpdateDate : new Date(d.LastUpdateDate)
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

