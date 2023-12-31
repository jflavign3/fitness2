const {MongoClient,ObjectId} = require("mongodb");

exports.handler = async (event, context) => {
  
  const mongoClient = new MongoClient("mongodb+srv://m001-student:q1w2e3r4@mycluster.izglnnd.mongodb.net");
  
  try {

  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("FITNESS");
  const collection = database.collection("Program");
  
  let program = JSON.parse(event.body);
  /*
  const test = await collection.find({_id : new ObjectId(program._id)});
  console.log('test'+ JSON.stringify(test));
  */

  const filter = { _id: new ObjectId(program._id)};
  const options = { upsert: false };
  const updateDoc = {
    $set: {
      weekday : program.weekday,
      userId : program.userId,
      exerciseId : program.exerciseId,
      order : program.order,
      lastCompletionDate : new Date(program.lastCompletionDate)
    },
  };


  //console.log(JSON.stringify(program));

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

