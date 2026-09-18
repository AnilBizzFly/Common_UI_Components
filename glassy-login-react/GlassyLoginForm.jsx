import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './GlassyLoginForm.css';

// NOTE: the source had `export default function GlassyLogin Form()` — a space
// in the identifier, which is a syntax error. Closed up here.
export default function GlassyLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle login logic here
    setTimeout(() => setIsLoading(false), 2000);
  };

  // the pane catches the light where the pointer is
  const track = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="glassy-room">
      <span className="blob b1" /><span className="blob b2" />
      <span className="blob b3" /><span className="blob b4" />

      <form className="glass-card" onSubmit={handleSubmit} onPointerMove={track} noValidate>
        <div className="mark">
          <svg viewBox="0 0 24 24">
            <path d="M12 2 4 6v6c0 5 3.4 9.2 8 10 4.6-.8 8-5 8-10V6Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <h1>Welcome back</h1>
        <p className="sub">Sign in to pick up where you left off.</p>

        <div className="field">
          <span className="lab">Email</span>
          <span className="wrap">
            <svg className="lead" viewBox="0 0 24 24">
              <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <input
              className="inp"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="username"
            />
          </span>
        </div>

        <div className="field">
          <span className="lab">
            Password <a className="lnk" href="#none">Forgot?</a>
          </span>
          <span className="wrap">
            <svg className="lead" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2.5" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              className="inp pad"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              className="peek"
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </span>
        </div>

        <div className="row">
          <label className="cbx">
            <input type="checkbox" defaultChecked /> Keep me signed in
          </label>
          <a className="lnk" href="#none">Need help?</a>
        </div>

        <button className="go" type="submit" disabled={isLoading} data-loading={isLoading}>
          <span className="go_lbl">Sign in</span>
          <span className="spin">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /></svg>
          </span>
        </button>

        <p className="rule">OR CONTINUE WITH</p>
        <div className="sso">
          <button type="button">Google</button>
          <button type="button">Apple</button>
        </div>

        <p className="foot">
          New here? <a className="lnk" href="#none">Create an account</a>
        </p>
      </form>
    </div>
  );
}
