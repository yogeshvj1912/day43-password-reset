import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";


function App() {
  const [data, setData] = useState(false);
  const { logindata, setLoginData } = useContext(LoginContext)


  const history = useNavigate();
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken")

    const res = await fetch("http://localhost:8000/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    if (data.status == 401 || !data) {

   console.log("user not valide");
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/dash")
    }
  }

  useEffect(() => {
    setTimeout(()=>{
      DashboardValid();
      setData(true)
    },2000)
  
  }, [])
  return (
    <>
      {
        data ? (<>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loding...
          <CircularProgress />
        </Box>
      }


    </>
  );
}

export default App;
