import GetProperties from './Components/GetProperties';
import UpdateProperties from './Components/UpdateProperties';
import DeleteProperties from './Components/DeleteProperties';
import PostProperties from './Components/PostProperties';
import Interests from './Components/Interests';
import {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import GoogleLogin from 'react-google-login';
  <link rel="stylesheet" href="style.css"></link>

function App() {

  const [token, setToken] = useState("");

  const onResponse = (response) => {
    console.log(response);
    setToken(response);
  }

  const fetchDataFromApi = async () => {
    let result = await fetch("https://localhost:44317/api/Properties", 
      {headers: {
        Authorization: token
      }}
    );

    let data = await result.json();
    
    console.log(data);

  }

  const dropDown = (
    <div class="dropdown">
      <a class="dropbtn" >Profil</a>
    <div class="dropdown-content">
        
    </div>
  </div>
  );

  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link class="navbar-brand" to="/">Bo Bra</Link>
      <div>
        <ul class="navbar-nav">
          <li>
            {token && 
              <Link class="nav-link" to="/PostProperties">Ny annons<span class="sr-only"></span></Link>
            }
          </li>
          <li>
            <GoogleLogin
            clientId={"1031462782801-lvbli5d3mq83t8rrc10bgsk6b2t5efir.apps.googleusercontent.com"}
            onSuccess={onResponse}
            ></GoogleLogin>
          </li>
        </ul>
      </div>
    </nav>
    <Switch>

    <Route path='/GetProperties'>
    <GetProperties />
    </Route>

    {token && 
    <Route path="/UpdateProperties/:id">
    <UpdateProperties />
    </Route>
    }

    {token && 
    <Route path="/DeleteProperties/:id">
    <DeleteProperties />
    </Route>
    }

    {token && 
    <Route path="/PostProperties">
    <PostProperties />
    </Route>
    }
    
    <Route path="/Interests">
    <Interests />
    </Route>
    <>
    {token &&
      <GetProperties/>
    }
    </>

    </Switch>
    </Router>
    

  )
  console.log();
}

export default App;