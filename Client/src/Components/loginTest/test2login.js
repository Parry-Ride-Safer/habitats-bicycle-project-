import React, { useState, useEffect } from "react";
import Axios from "axios";

const Test2login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userTest, setUserTest] = useState([]);
  const [infoTest, setinfoTest] = useState([]);

  let user = JSON.parse(localStorage.getItem("user-info"));

  const handleClickInfo = (e) => {
    e.preventDefault();
    getInfoTest();
  };

  const logout = async () => {
    try {
      localStorage.clear();
      await getUserTest();
      setinfoTest(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(userTest, "TESTE DA VANIA PLEASE WORK");
  }, [userTest]);

  const register = async () => {
    let item = { email, password };
    try {
      let result = await Axios.post(
        "http://localhost:4000/auth/register",
        item
      );
      localStorage.setItem("user-info", JSON.stringify(result.data));
      await getUserTest(result.data.id);
      setPassword("");
      setEmail("");
      console.log(localStorage, "lllllllddddd");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = (e) => {
    if (email <= 0 || password <= 0) {
      console.log("please enter something( email or password is missing) ");
    } else {
      register();
    }
  };

  const login = async () => {
    let item = { email, password };
    try {
      let result = await Axios.post("http://localhost:4000/auth/login", item);
      localStorage.setItem("user-info", JSON.stringify(result.data));
      console.log(result, "LLLLLLLLLLLLLLLLLLLoooooooo");
      setPassword("");
      setEmail("");
      await getUserTest(result.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserTest = async (log = null) => {
    if (log) {
      try {
        const response = await Axios.get(`http://localhost:4000/users/${log}`);
        setUserTest(response.data.email);
      } catch (err) {
        console.log(err);
      }
    } else setUserTest([]);
  };

  const getInfoTest = async () => {
    try {
      const resp2 = await Axios.get(
        `http://localhost:4000/users/${userTest[0].id}/reports`
      );
      console.log(resp2.data);
      setinfoTest(resp2.data);
    } catch (err) {
      console.log("no data found this day");
    }
  };

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
          <p>
            {" "}
            user do login vem daqui :{" "}
            {userTest.length ? userTest[0].id : "Please log in"}{" "}
          </p>
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
export default Test2login;
