import React from "react";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

// New - import the React Router components, and the Profile page component
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Profile from "./components/Profile";
import createAuth0Client from "@auth0/auth0-spa-js";
import {clientId, domain} from './auth_config';


function App() {

  const connect = async () => {
    const auth0 = await createAuth0Client({
      domain,
      client_id: clientId
    });

    const user = await auth0.getUser();
    //logged in. you can get the user profile like this:
    // const user = await auth0.getUser();
    console.log(user.sub);

    // const {token} = JSON.parse(localStorage.getItem('auth'));
    // console.log(token);
    fetch(`http://localhost:5000/auth?token=${user.sub}`).then(res => res.json()).then(console.log)
  };

  return (
    <div className="App">
      {/* New - use BrowserRouter to provide access to /profile */}
      <BrowserRouter>
        <header>
          <NavBar/>
        </header>
        <Switch>
          <Route path="/" exact component={() => {
            return (
              <div>
                {/*<NavBar/>*/}
                <div>HELLO HOME!</div>
                <div>
                  <button onClick={connect}>
                    CONNECT
                  </button>
                </div>
              </div>
            )
          }}/>
          <PrivateRoute path="/profile" component={Profile}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
