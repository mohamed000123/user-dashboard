// react
import { useEffect, useState, useRef, useContext } from "react";
// styling
import styles from "./login.module.css";
// routing
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../App";
const Login = () => {
  // logged in user redirect
  const navigate = useNavigate();
  useEffect(() => {
    if (document.cookie) {
      navigate("/");
    }
  }, []);
  //
  const { setUserId } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isValiedMail, setIsValidMail] = useState(false);
  const [isValiedPassword, setIisValiedPassword] = useState(false);
  const mailWarning = useRef();
  const passwordWarning = useRef();
  // login
  async function login(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailIsValid = emailRegex.test(email);
    if (!emailIsValid) {
      mailWarning.current.style.display = "block";
    } else {
      mailWarning.current.style.display = "none";
      setIsValidMail(true);
    }
    if (password.length < 8) {
      passwordWarning.current.style.display = "block";
    } else {
      passwordWarning.current.style.display = "none";
      setIisValiedPassword(true);
    }

    if (isValiedMail && isValiedPassword) {
      try {
        const type = "User";
        const res = await fetch("http://localhost:8000/login", {
          method: "POST",
          body: JSON.stringify({ email, password, type }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        if (data.userId) {
          setUserId(data.userId);
          navigate("/");
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.log(err);
      }
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
          <p ref={mailWarning} className={styles.warning}>
            Please enter valid mail
          </p>
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p ref={passwordWarning} className={styles.warning}>
            Password should be at least 8 characters long
          </p>
          {error && <p style={{ color: "red" }}>{error}</p>}
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
