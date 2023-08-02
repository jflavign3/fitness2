//const bodyParser = require("body-parser");

exports.handler = async (event, context) => {
   
 
      return {
        statusCode: 200,
        body: JSON.stringify("hello"),
      };
  
  };
  
  //how to set an env variable, like a api key : https://www.youtube.com/watch?v=J7RKx8f4Frs
  