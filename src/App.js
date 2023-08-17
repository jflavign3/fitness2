import "./App.scss";
import { useState, useEffect } from 'react';
import Home from './components/ExerciseList/Home';
import Setup from './components/Setup/Setup';
import MenuBar from "./components/MenuBar/MenuBar";
import {GetAllUsers} from "./Users";
import Login from './components/Login/Login';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
 
  const [users, setUsers] = useState([]);  
  const [user, setUser] = useState(null);  
  const [page, setPage] = useState(null);  

  const GetListOfUsers = async () => {   
    console.log(`Getting list of all users`);
    let allUsers = await GetAllUsers();
    setUsers(allUsers);       
  };

  const SetCurrentPage = async(page) => {
   // debugger;
    
    console.log(`Page ${page.name} was selected.`);
    sessionStorage.setItem("__page",page.name);
    setPage(page);
  
   
  }


  const SetCurrentUser = async (user) => {
    
     console.log(`User ${user.name} was selected. Load home data.`);
     
     sessionStorage.setItem("__userId",user.userId);     
     sessionStorage.setItem("userName",user.name);     
     setUser(user.userId);
     sessionStorage.setItem("__page","Home");     
     setPage("Home");

  };
  
  console.log('Session:page= ' + page);

//debugger;
useEffect(() => {
  console.log("useEffect app");
  GetListOfUsers();

  //on first rerender take page from session
  var pageSession = sessionStorage.getItem("__page");
  if (pageSession){
    setPage(pageSession);
  }

  //on first rerender take user from session
  var userSession = sessionStorage.getItem("__userId");
  if (!user && users && userSession){
   
    setUser(userSession);
  }

},[]);



 return (   

<>   
<ToastContainer
   autoClose={2000}
   hideProgressBar={true}
   position="top-center"
/>

    {
        !user && users
          ? <main> <section className='containerLogin'>
            <Login users={users} setCurrentUser={SetCurrentUser}></Login>
          </section></main>: (
           

<main>            
    <div className="leftMenuForBigScreen">
      <MenuBar setCurrentPage={SetCurrentPage}></MenuBar>
    </div>

    {page === "Home" ? (
      <Home/>   
 
    ) : (<Setup/>)
    
    }


      <div id="bottomMenuForSmallScreen">
        <div id="spacer"></div>
        <MenuBar setCurrentPage={SetCurrentPage}></MenuBar>
      </div>

    </main>)}

 

    </>
    )
}

export default App;
