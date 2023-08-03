export const GetAllUsers = async () => {

  //debugger;
  const url = "/.netlify/functions/GetUsers";
  
  let result = await fetch(url).then(response => response.json());   

  return result;
};

