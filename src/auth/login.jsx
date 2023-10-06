// react
import { useEffect, useState, useRef } from "react";
// styling
import styles from "./login.module.css";
// routing
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  // logged in user redirect
  const navigate = useNavigate();
  useEffect(() => {
    const userid = localStorage.getItem("user_id");
    if (userid) {
      navigate("/");
    }
  }, []);
  //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const warning = useRef();

  // login
  async function login(e) {
    e.preventDefault();
    const type = "User";
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ email, password, type }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data.userId) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <h3>Login Here</h3>
          <label for="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p ref={warning} className={styles.warning}>
            wrong password or email
          </p>
          <button id="loginBtn" onClick={login}>
            Log In
          </button>
          <NavLink to="/signup">don't have account?</NavLink>
        </form>
      </div>
    </>
  );
};

export default Login;
