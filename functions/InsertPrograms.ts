const {MongoClient} = require("mongodb");

exports.handler = async (event, context) => {
  
  const mongoClient = new MongoClient("mongodb+srv://m001-student:q1w2e3r4@mycluster.izglnnd.mongodb.net");
  
  try {
  
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("FITNESS");
  const collection = database.collection("Program");
  
  const { userId, weekday, exerciseId, lastCompletionDate } = JSON.parse(event.body);
  

  const results = await collection.insertOne({
    weekday:weekday,
    userId:userId,
    exerciseId:exerciseId,
    lastCompletionDate: lastCompletionDate });
  
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

