const {MongoClient} = require("mongodb");

exports.handler = async (event, context) => {
  
  const mongoClient = new MongoClient(process.env.MONGODB_URI);
  
  try {
  
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("FITNESS");
  const collection = database.collection("Stats");
  
  
  const { userId, totalReps, totalSeconds, exerciseId, totalCompletions, lastUpdateDate, lbs } = JSON.parse(event.body);
  
  console.log('values:'  + userId);
  const filter = { "userId": userId, "exerciseId": exerciseId};
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      totalReps : totalReps,
      userId : userId,
      exerciseId : exerciseId,
      lbs: lbs,
      totalSeconds: totalSeconds,
      totalCompletions: totalCompletions,
      lastUpdateDate : new Date(lastUpdateDate)
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

