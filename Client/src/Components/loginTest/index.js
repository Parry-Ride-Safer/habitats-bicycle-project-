import React, { useState, useEffect } from "react";
import "./style.css";
import Axios from "axios";

const LoginTest = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userTest, setUserTest] = useState([]);
  const [log, setLog] = useState("");
  const [infoTest, setinfoTest] = useState([]);

  const handleClickUser = (e) => {
    e.preventDefault();

    getUserTest();
    getInfoTest();
  };

  let user = JSON.parse(localStorage.getItem("user-info"));
  console.log(user, "this is the logged user ");

  const logout = () => {
    localStorage.clear();
  };

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
    }) */ console.log(email, password);
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
  };

  const getUserTest = async () => {
    try {
      const resp = await Axios.get(`http://localhost:4000/users/${log}`).then(
        (response) => {
          console.log(response.data);
          console.log(response.data.email);
          setUserTest(response.data.email);
          console.log(userTest, "userTest still empty");
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getInfoTest = () => {
    Axios.get(`http://localhost:4000/users/${log}/reports/`).then(
      (response) => {
        console.log(response.data);
        setinfoTest(response.data);
      }
    );
  };

  useEffect(() => {
    if (user) {
      setLog(user.id);
    }

    // if (localStorage.getItem("id"))
  }, []);

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
            <button onClick={handleClickUser}>get info</button>
          ) : null}
          <p> user do login vem daqui : {userTest} </p>
        </div>
      </form>
      <h3>login name:{user && user.id ? user.id : null}</h3>
      <div>
        {infoTest.map((contact) => (
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
        ))}
      </div>
    </div>
  );
};

export default LoginTest;
