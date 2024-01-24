import { useContext,useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext, AppContextType } from "./lib/contextLib";
import { AuthService } from "./services/AuthService.ts";
import Routes from "./Routes.tsx";
import { onError } from "./lib/errorLib";
import "./App.css";
import { DataService } from "./services/DataService.ts";

function App() {

  const authService = new AuthService();
  const dataService = new DataService();
  const nav = useNavigate();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const status = await authService.getSignedInStatus();
      if(status){
        userHasAuthenticated(true);
      }
      
    } catch (error) {
      if (error !== "No current user") {
        onError(error);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await authService.logOut();

    userHasAuthenticated(false);

    nav("/login");
  }

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold text-muted">Note.app</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={{ isAuthenticated, authService,userHasAuthenticated } as AppContextType}
        >
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;