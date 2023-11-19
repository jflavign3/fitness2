import {Stat} from "./../Types";

export const UpsertStat = async(stat:Stat) => {
  
    const url = "/.netlify/functions/UpsertStats";    

    let result = await fetch(url, {
  method: 'POST',
  body: JSON.stringify(stat),  
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
  }).then(response => response.json());   
  
    return result;
};


export const GetAllStats = async() => {
  
  const url = "/.netlify/functions/GetStats";
  
  let result = await fetch(url).then(response => response.json());   

  return result;
};