import React, {useState, useRef} from "react";
import SignInCSS from './style-modules/Signin.module.css';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext, ROLES } from "../contexts/AuthContextProvider";

import logIn from "../images/loginImg.png";
import AuthService from "../services/AuthService";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const { user, setToken } = useAuthContext();
  const eyeRef = useRef();
  const pswdInputRef = useRef();

  const validateEmail = () => {
    let result = false;
    if (email.trim().length < 1) {
      setEmailError("Please enter your email address.");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      result = true;
    }
    return result;
  };

  const validatePassword = () => {
    let result = false;
    if (password.trim().length < 1) {
      setPasswordError("Please enter your password.");
    } else if (password.trim().length < 1) {
      setPasswordError("Password must be 6 or more characters.");
    } else {
      setPasswordError("");
      result = true;
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = validateEmail() && validatePassword();

    if (isValid) {
      try {
        const response = await AuthService.login(email, password);

        const { token } = response.data;

        if (token) {
          setToken(token);
          // TODO: user object is not created after login instantly
          if (user?.role === ROLES.Admin) {
            navigate("/admin-dashboard", { replace: true });
          } else if (user?.role === ROLES.User) {
            navigate("/user-dashboard", { replace: true });
          } else if (location?.state?.from?.pathname) {
            navigate(location?.state?.from?.pathname, { replace: true });
          } else {
            navigate("/");
          }
        }
      } catch (err) {
        console.log(err);
        if (!err?.response) {
          setError("Server not responding!");
        } else if (err.response?.status === 401) {
          setError("Invalid credentials!");
        } else {
          setError("Login failed!\n" + err);
        }
      } finally {
        // Reset form values
        setEmail("");
        setEmailError("");

        setPassword("");
        setPasswordError("");
      }
    }
  };

  function toggleEye () {
    const eye = eyeRef.current.classList;

    if ( eye[2] === 'fa-eye') {
      eye.remove('fa-eye');
      eye.add('fa-eye-slash');
      pswdInputRef.current.type= "password";
  } else if ( eye[2] === 'fa-eye-slash') {
      eye.remove('fa-eye-slash');
      eye.add('fa-eye');
      pswdInputRef.current.type= "text";
  }
  }

  return (
    <>
      <section className={`pb-4 pt-4 `}>
        <div className={`container  `}>
          <div className="row justify-content-end py-5">
            <div className="col-md-6 d-none d-md-block">
              <img className="img-fluid" src={logIn} alt="Sign in" />
            </div>
            <div className="col-md-6 px-5">
              <form id="form" className={` `} onSubmit={handleSubmit}>
                <h1 className="pb-5">Sign In</h1>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="form-floating  mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      emailError.length > 0 ? "is-invalid" : ""
                    }`}
                    id="floatingInput"
                    placeholder="name@example.com"
                    onBlur={validateEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                  <div className="invalid-feedback">{emailError}</div>
                </div>

                <div className="form-floating">
                  <input
                    ref={pswdInputRef}
                    type="password"
                    className={`form-control ${
                      passwordError.length > 0 ? "is-invalid" : ""
                    }`}
                    id="floatingPassword"
                    placeholder="Password"
                    onBlur={validatePassword}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <i 
                    ref={eyeRef} 
                    className={`${SignInCSS.eyePosition} fas fa-eye-slash`} 
                    onClick={toggleEye}>
                  </i>

                  <label htmlFor="floatingPassword">Password</label>
                  <div className="invalid-feedback">{passwordError}</div>
                </div>
                <div className="col-12 mt-3 pt-2 d-flex align-items-center justify-content-between">
                  <button type="submit" className={`btn btn-primary`}>
                    Submit
                  </button>
                  <div className="col-auto">
                    <NavLink to="/sign-up">Sign Up</NavLink>
                    &nbsp; or &nbsp;
                    <NavLink to="">Forgot password?</NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="mainBody">
        <div className="grid-box">
          <div className="grid-box-item ImgDiv"></div>
        </div>
      </section>
    </>
  );
};

export default Signin;
