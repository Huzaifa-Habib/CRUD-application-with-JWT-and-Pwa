import './App.css';
import {Route,Routes,Link,Navigate} from "react-router-dom"
import Home from "./components/home/home"
import Login from "./components/login/login"
import Signup from "./components/signup/signup"
import ContextProvider from "./context/context"
import {useState,useEffect,useContext} from "react"
import axios from 'axios';
import { GlobalContext } from './context/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

axios.defaults.withCredentials = true

function App() {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    let baseUrl = ""
    if (window.location.href.split(":")[0] === "http") {
      baseUrl = "http://localhost:3000";
      
    }
    else{
      baseUrl = "https://lazy-blue-clownfish-wig.cyclic.app"
    }

    const getProfile = async () => {

      try {
        let response = await axios.get(`${baseUrl}/api/v1/products`, {
          withCredentials: true
        })

        console.log("response: ", response);


        dispatch({
          type: 'USER_LOGIN'
        })
      } catch (error) {

        console.log("axios error: ", error);

        dispatch({
          type: 'USER_LOGOUT'
        })
      }



    }
    getProfile();

  }, [])




  

  return (
    <div>
 
         {
         (state.isLogin === true) ?
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

            </Routes>   
          :
            null
        } 


        {     
         (state.isLogin === false) ?
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Login/>}/>



              

            </Routes>   
          :
            null
        }  
         

         { 
         (state.isLogin === null) ?
          <div className='loadingScreen'>
              <Spinner animation="border" variant="danger" />
                <p>Loading...</p>

          
            
          </div>
           
          :
            null
         }   




    </div>
      
  );
}

export default App;