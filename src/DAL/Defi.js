
export const UpdateDefi = async(defi) => {
  

  const url = "/.netlify/functions/UpdateDefi";    

  let result = await fetch(url, {
method: 'POST',
body: JSON.stringify(defi),
headers: {
  'Content-type': 'application/json; charset=UTF-8',
}
}).then(response => response.json());   

  return result;
};


export const GetAllDefis = async() => {
  
  const url = "/.netlify/functions/GetDefis";
  
  let result = await fetch(url).then(response => response.json());   

  return result;
};
