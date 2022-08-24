import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

interface Props {}

const App: React.FC<Props> = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        console.log(userDetails);
        setUser(userDetails);
        navigate("/dashboard/home");
      } else {
        setUser(null);
      }
    });

    console.log(user);
    if (!user && !location.pathname.includes("/account")) {
      console.log("Signed out somehow, sending to login");
      navigate("/account/login");
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
