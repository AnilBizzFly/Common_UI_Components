import { useState } from "react";
import "./Login.css";

const CardBackground = ({ activeView }) => (
  <div
    className={`card-bg ${activeView === "login" ? "login" : ""}`}
  />
);

const SocialButtons = () => (
  <div className="sso">
    <a className="fa-brands fa-facebook"></a>
    <a className="fa-brands fa-twitter"></a>
    <a className="fa-brands fa-linkedin"></a>
  </div>
);

const HeroPanel = ({ type, activeView, title, text, buttonText, onToggle }) => (
  <div className={`hero ${type} ${activeView === type ? "active" : ""}`}>
    <h2>{title}</h2>
    <p>{text}</p>
    <button type="button" onClick={onToggle}>
      {buttonText}
    </button>
  </div>
);

const RegisterForm = ({ activeView }) => (
  <div
    className={`form register ${activeView === "register" ? "active" : ""}`}
  >
    <h2>Sign Up</h2>
    <SocialButtons />
    <p>Or use your email address</p>
    <form>
      <input type="text" placeholder="Full name" />
      <input type="email" placeholder="Email address" />
      <input type="password" placeholder="Password" />
      <button>SIGN UP</button>
    </form>
  </div>
);

const LoginForm = ({ activeView }) => (
  <div className={`form login ${activeView === "login" ? "active" : ""}`}>
    <h2>Login</h2>
    <SocialButtons />
    <p>Or use your email address</p>
    <form>
      <input type="email" placeholder="Email" />
      {/* source had type="email" on this one -- masked it */}
      <input type="password" placeholder="Password" />
      <a style={{ paddingTop: 6, marginBottom: 7 }}>Forgot password?</a>
      <button>LOGIN</button>
    </form>
  </div>
);

export const Login = () => {
  const [activeView, setActiveView] = useState("login");

  const toggleView = () => {
    setActiveView(activeView === "login" ? "register" : "login");
  };

  return (
    <div className="card">
      <CardBackground activeView={activeView} />
      <HeroPanel
        type="register"
        activeView={activeView}
        title="Welcome back"
        text="Login to review your saved boards and pick up right where you left off."
        buttonText="LOGIN"
        onToggle={toggleView}
      />
      <RegisterForm activeView={activeView} />
      <HeroPanel
        type="login"
        activeView={activeView}
        title="Hello there"
        text="Begin your journey with us and get your workspace set up in a minute."
        buttonText="SIGN UP"
        onToggle={toggleView}
      />
      <LoginForm activeView={activeView} />
    </div>
  );
};
