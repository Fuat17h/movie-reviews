// import logo from './logo.svg';
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
// import Movie from "./components/movie";
import Login from "./components/login";
import React from "react";
import Container from "react-bootstrap/esm/Container";
import Movie from "./components/movie";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    //default user to null
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Container>
        {/* Navbar section */}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link to={"/movies"}>Movies</Link>
              </Nav.Link>
              <Nav.Link>
                {user ? (
                  <Link onClick={logout}>Logout User</Link>
                ) : (
                  <Link to={"/login"}>Login</Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* Route section */}
        <Switch>
          <Route exact path={["/", "/movies"]} component={MoviesList}></Route>

          <Route
            path="/movies/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
          ></Route>

          <Route path="/movies/:id/" render={(props) => 
          <Movie {...props} user={user}/>
          }></Route>

          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          ></Route>
        </Switch>

        {/* Merhaba Dunya */}
      </Container>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
