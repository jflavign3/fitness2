const {MongoClient,ObjectId} = require("mongodb");

exports.handler = async (event, context) => {
  
  const mongoClient = new MongoClient("mongodb+srv://m001-student:q1w2e3r4@mycluster.izglnnd.mongodb.net");
  
  try {
  
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("FITNESS");
  var collection = database.collection("Program");

  const querystring = event.queryStringParameters;
  const id = querystring.programid; 

  
  let results1 = await collection.deleteOne({ _id: new ObjectId(id)});
  
  collection = database.collection("ExerciseDetails");
  
  let results2 = await collection.deleteOne({ ProgramId: id});

  
  return {
    statusCode: 200,
    body: JSON.stringify(results1)//  + ' ' + JSON.stringify(results2),
  };
} catch (err) {
    return { statusCode: 422, body: err.stack };
  }finally{
    mongoClient.close();

  }
};

