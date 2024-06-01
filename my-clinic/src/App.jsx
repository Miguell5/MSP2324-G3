import { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import AppBar from "./components/AppBar";
import HomePage from "./pages/Home";
import Profile from "./pages/Profile";
import AgendaPage from "./pages/AgendaPage";
import HealthPage from "./pages/HealthPage";
import LoginPage from "./pages/Login";
import SignUp from "./pages/SignUp";
import RemoteTriage from "./pages/RemoteTriagePage";
import DisplayTriageData from "./pages/DisplayTriageData";
import SchedulePage from "./pages/Schedule";
import QueuePage from "./pages/QueueWaitTime";
import { Height, Schedule } from '@mui/icons-material';
import SearchDoctors from './pages/SearchDoctors';


function App() {
  const [loginState, setLoginState] = useState(true);
  
var parsedLoginAccount = {name:"rafael"};

  useEffect(() => {
    var loginAccount = localStorage.getItem('login');
    console.log("loginAccount (string):", loginAccount);

    if (loginAccount === null) {
      setLoginState(false);
    } else {
      parsedLoginAccount = JSON.parse(loginAccount);
      console.log("loginAccount (parsed):", parsedLoginAccount);
    }
  }, []);

  function logout(){
    localStorage.clear();
    setLoginState(false);
  }

  return (
    <>
  <div style={{Height:"110%"}}>


      {loginState && <AppBar name={parsedLoginAccount.name} logout={logout}/>}
      <Routes >
          {
            !loginState &&
          <>
          <Route path='/' element={
            <Suspense fallback={<Loading />}>
              <LoginPage setLoginState={setLoginState}/>
            </Suspense>
          }/>
          <Route path='/sign-up' element={
            <Suspense fallback={<Loading />}>
              <SignUp setLoginState={setLoginState}/>
            </Suspense>
          }/>
          <Route path='/*' element={
            <Suspense fallback={<Loading />}>
              <LoginPage setLoginState={setLoginState}/>
            </Suspense>
          }/>
          </>
          }
          {loginState && (
            <>
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loading />}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path="/search/doctors"
                element={
                  <Suspense fallback={<Loading />}>
                    <SearchDoctors/>
                  </Suspense>
                }
              />
              <Route
                path="/checkIn"
                element={
                  <Suspense fallback={<Loading />}>
                    <h1>Check-In</h1>
                  </Suspense>
                }
              />
              <Route
                path="/schedule"
                element={
                  <Suspense fallback={<Loading />}>
                    <SchedulePage />
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<Loading />}>
                    <Profile username={parsedLoginAccount.name}/>
                  </Suspense>
                }
              />
              <Route
                path="/agenda"
                element={
                  <Suspense fallback={<Loading />}>
                    <AgendaPage />
                  </Suspense>
                }
              />
              <Route
                path="/myHealth"
                element={
                  <Suspense fallback={<Loading />}>
                    <HealthPage />
                  </Suspense>
                }
              />
              <Route
                path="/queue"
                element={
                  <Suspense fallback={<Loading />}>
                    <QueuePage />
                  </Suspense>
                }
              />
              <Route
                path="/remoteTriage"
                element={
                  <Suspense fallback={<Loading />}>
                    <RemoteTriage />
                  </Suspense>
                }
              />
              <Route
                path="/triageInfo"
                element={
                  <Suspense fallback={<Loading />}>
                    <DisplayTriageData />
                  </Suspense>
                }
              />
            </>
          )}
        </Routes>
      </div>
      {loginState && <NavBar />}
    </>
  );
}

export default App;
