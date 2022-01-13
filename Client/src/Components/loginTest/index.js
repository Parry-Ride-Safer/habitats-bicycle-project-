import React, { useState, useEffect } from "react";
import "./style.css";
import Axios from "axios";
import { useGlobalMapContext } from "../../Context/mapContext";

const LoginTest = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    userTest,
    setUserTest,
    log,
    setLog,
    infoTest,
    setinfoTest,
    info,
    setinfo,
  } = useGlobalMapContext();
  /*  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userTest, setUserTest] = useState([]);
  const [log, setLog] = useState("");
  const [infoTest, setinfoTest] = useState([]); */

  const handleClickInfo = (e) => {
    e.preventDefault();
    setinfoTest(null);
    console.log(infoTest);
    // getUserTest();
    getInfoTest();
  };

  let user = JSON.parse(localStorage.getItem("user-info"));
  console.log(user, "this is the logged user ");

  const logout = async (e) => {
    try {
      e.preventDefault();
      localStorage.clear();

      setUserTest(null);
      setinfoTest(null);

      console.log(userTest, "this is user state after logout");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(userTest, "TESTE DA VANIA PLEASE WORK");
  }, [userTest]);

  useEffect(() => {
    if (user) {
      setLog(user.id);
      getUserTest();
    }
  }, [user]);

  /* const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    /*  if (!user) {
      getUserTest();
      getInfoTest();
    } 
    setUserTest(null);
    setinfoTest(null);

    console.log(userTest, "this is usertest state after logout");
  }; */

  const register = async () => {
    let item = { email, password };
    let result = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    console.log(email, password);
  };

  const handleRegister = (e) => {
    if (email <= 0 || password <= 0) {
      console.log("please enter something( email or password is missing) ");
    } else {
      register();
    }
  };

  const login = async () => {
    /* await Axios.post("http://localhost:4000/users/").then((response) => {
      console.log(response.data);
    }) */ console.log(email, password, "if its empty then no user was found");
    let item = { email, password };
    let result = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });

    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));

    await getUserTest();
  };

  const getUserTest = async () => {
    try {
      return await Axios.get(`http://localhost:4000/users/${log}`).then(
        (response) => {
          /* console.log(response.data);
          console.log(response.data.email); */
          console.log(userTest, "this is userTest state on setuserTest");
          return setUserTest(response.data.email);

          /* if (user) {
            console.log(userTest, "this is userTest state");
            return setUserTest(response.data.email);
          } else {
            console.log(userTest, "this is userTest state ON ELSE");
            return setUserTest(null);
          } */
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getInfoTest = async () => {
    try {
      const resp2 = await Axios.get(
        `http://localhost:4000/users/${log}/reports/`
      ).then((response) => {
        if (!response) {
          return console.log("no data found this day");
        } else {
          console.log(response.data);
          return setinfoTest(response.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* useEffect(() => {
    if (user) {
      setLog(user.id);
      getUserTest();
    }

    
  }, [user]); */

  /* useEffect(() => {
    // handleClickUser;
    setUserTest(null);
  }, []); */

  return (
    <div>
      <form>
        <div>
          <label htmlFor="username">email</label>
          <input
            type="text"
            name="username"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={login} type="button" className="btn">
          Login
        </button>
        <button onClick={logout} type="button" className="btn">
          Logout
        </button>
        {!localStorage.getItem("user-info") ? (
          <button onClick={handleRegister} type="button" className="btn">
            Register
          </button>
        ) : null}
        <div>
          {localStorage.getItem("user-info") ? (
            <button onClick={handleClickInfo}>get info</button>
          ) : null}
          <p> user do login vem daqui : {user && user.id ? userTest : null} </p>
        </div>
      </form>
      <h3>login name:{user && user.id ? user.email : null}</h3>
      <div>
        {infoTest
          ? infoTest.map((contact) => (
              <div className="your-spots-container" key={contact.address_id}>
                <ul>
                  <li>
                    <span className="img-div">img </span>
                  </li>
                  <li> information :{contact.information}</li>
                  <li> voting : {contact.voting}</li>
                  <li> category : {contact.category_id}</li>
                </ul>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default LoginTest;
