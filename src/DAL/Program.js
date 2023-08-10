export const InsertProgram = async(program) => {
  
    const url = "/.netlify/functions/InsertPrograms";    

    let result = await fetch(url, {
  method: 'POST',
  body: JSON.stringify(program),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
  }).then(response => response.json());   
  
    return result;
};

export const UpdateProgram = async(program) => {
  
  const url = "/.netlify/functions/UpdatePrograms";    

  let result = await fetch(url, {
method: 'POST',
body: JSON.stringify(program),
headers: {
  'Content-type': 'application/json; charset=UTF-8',
}
}).then(response => response.json());   

  return result;
};

