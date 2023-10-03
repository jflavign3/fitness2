export const GetAllExerciseDetails = async() => {
  
    const url = "/.netlify/functions/GetExerciseDetails";
    
    let result = await fetch(url).then(response => response.json());   
  
    return result;
};

export const InsertExerciseDetails = async(details) => {
  
    
    const url = "/.netlify/functions/InsertExerciseDetails";
  
    let result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
        }).then(response => response.json());   
  
    return result;
};
export const UpdateExerciseDetails = async(details) => {
  
    
    const url = "/.netlify/functions/UpdateExerciseDetails";
  
    let result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
        }).then(response => response.json());   
  
    return result;
};

export const UpdateExerciseDetailById = async(detail) => {
  

    const url = "/.netlify/functions/UpdateExerciseDetailById";    
  
    let result = await fetch(url, {
  method: 'POST',
  body: JSON.stringify(detail),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
  }).then(response => response.json());   
  
    return result;
  };
