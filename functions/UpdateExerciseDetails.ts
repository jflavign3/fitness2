import { log } from "console";

const {MongoClient} = require("mongodb");

exports.handler = async (event, context) => {
  
  const mongoClient = new MongoClient(process.env.MONGODB_URI);
  
  try {
  
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("FITNESS");
  const collection = database.collection("ExerciseDetails");  
  
  let details: string[] = [];
  details = JSON.parse(event.body);
  
  const filter = { ProgramId: details.ProgramId, Title: details.Title};
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      ProgramId : details.ProgramId,
      Title : details.Title,
      Value : details.Value,
      LastUpdateDate : new Date(details.LastUpdateDate)
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

