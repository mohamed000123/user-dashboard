// styling
import styles from "./login.module.css";
// react
import { useEffect, useState, useRef } from "react";
// routing
import { NavLink, useNavigate } from "react-router-dom";
// uuid
const Signup = () => {
  //logged in user redirect
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValiedMail, setIsValidMail] = useState(false);
  const [isValiedPassword, setIisValiedPassword] = useState(false);
  const warning = useRef();
  const passwordWarning = useRef();
  const mailWarning = useRef();
  const passwordConfirmWarning = useRef();

  async function signUp(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailIsValid = emailRegex.test(email);
    if (!email || !emailIsValid) {
      mailWarning.current.style.display = "block";
    } else {
      setIsValidMail(true);
      mailWarning.current.style.display = "none";
    }
    if (password.length <= 8) {
      passwordWarning.current.style.display = "block";
    }
    if (password !== confirmPassword) {
      passwordConfirmWarning.current.style.display = "block";
    } else {
      setIisValiedPassword(true);
      passwordWarning.current.style.display = "none";
      passwordConfirmWarning.current.style.display = "none";
    }
    if (isValiedMail && isValiedPassword) {
      const type = "User";
      try {
        const res = await fetch("http://localhost:8000/signup", {
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
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <h3>Sign Up Here</h3>
          <label>Email</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p ref={mailWarning} className={styles.mailWarning}>
            Please enter valid mail
          </p>
          <p ref={warning} className={styles.warning}>
            already used email
          </p>
          <label>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p ref={passwordWarning} className={styles.passwordWarning}>
            password must be more than 5 characters
          </p>
          <label>Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <p ref={passwordConfirmWarning} className={styles.passwordWarning}>
            unmatched password
          </p>
          <button id="btn" onClick={signUp}>
            Sign Up
          </button>
          <NavLink to="/">already have account?</NavLink>
        </form>
      </div>
    </>
  );
};

export default Signup;
