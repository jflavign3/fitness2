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


export const deleteProgram = async(id) => {
  

  const url = "/.netlify/functions/DeleteProgram?programid="+id;    

  let result = await fetch(url, {
method: 'DELETE'
}).then(response => response.json());   

  return result;
};

