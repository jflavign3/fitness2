export const UpdatePoints = async(userId: number, points: number) => {
  
  const url = `/.netlify/functions/UpdateUser?userId=${userId}&points=${points}`;    

  let result = await fetch(url, {
method: 'GET'
}).then(response => response.json());   

  return result;
};


export const GetAllUsers = async () => {

  //debugger;
  const url = "/.netlify/functions/GetUsers";
  
  let result = await fetch(url).then(response => response.json());   

  return result;
};

