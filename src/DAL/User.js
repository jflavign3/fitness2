export const UpdatePoints = async(userId, points) => {
  
  const url = `/.netlify/functions/UpdateUser?userId=${userId}&points=${points}`;    

  let result = await fetch(url, {
method: 'GET'
}).then(response => response.json());   

  return result;
};
