import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginV5() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ADDED: caps lock is the one thing a password field really should tell you
  const [caps, setCaps] = useState(false);
  // ADDED: without a landing state the 1500ms just snaps back to idle
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // login logic here
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => setDone(false), 1700);
    }, 1500);
  };

  // ADDED: the card is translucent, so give the light somewhere to come from
  const track = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const field =
    'peer w-full h-14 px-4 pt-6 pb-2 rounded-xl bg-zinc-950/60 text-white ' +
    'border border-zinc-800 outline-none placeholder-transparent ' +
    'transition-all duration-200 hover:border-zinc-700 ' +
    'focus:border-zinc-600 focus:bg-zinc-950/85 focus:ring-4 focus:ring-white/5';

  const label =
    'absolute left-4 top-4 origin-left text-zinc-500 pointer-events-none ' +
    'transition-all duration-300 ease-out ' +
    'peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-zinc-300 ' +
    'peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-75';

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div
        onPointerMove={track}
        className="group relative w-full max-w-md p-8 rounded-2xl border border-zinc-800
                   bg-zinc-900/70 backdrop-blur-xl
                   animate-[rise_.7s_cubic-bezier(.22,1,.36,1)_both]"
      >
        {/* pointer-tracked sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
                     transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(340px circle at var(--mx,50%) var(--my,0%), rgb(255 255 255 / .06), transparent 60%)',
          }}
        />

        <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
        <p className="text-zinc-400 text-center mb-6">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Form fields and button go here */}
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              autoComplete="username"
              className={field}
            />
            <label htmlFor="email" className={label}>Email</label>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => setCaps(e.getModifierState?.('CapsLock') ?? false)}
              onBlur={() => setCaps(false)}
              placeholder=" "
              autoComplete="current-password"
              className={`${field} pr-12`}
            />
            <label htmlFor="password" className={label}>Password</label>

            {caps && (
              <span className="absolute right-14 top-1/2 -translate-y-1/2 px-1.5 py-px rounded
                               text-[9px] font-semibold tracking-widest text-amber-200
                               bg-amber-200/10 border border-amber-200/30">
                CAPS
              </span>
            )}

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center
                         w-9 h-9 rounded-lg text-zinc-500 transition-colors
                         hover:text-zinc-300 hover:bg-white/5"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-zinc-400 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <span className="grid place-items-center w-[18px] h-[18px] rounded-md
                               border border-zinc-700 bg-zinc-950/60 transition-colors
                               peer-checked:bg-white peer-checked:border-white">
                <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-black"
                     fill="none" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m4 12.5 5 5L20 6.5" />
                </svg>
              </span>
              Remember me
            </label>
            <a href="#none" className="text-zinc-400 hover:text-white transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`relative w-full h-13 py-3.5 rounded-xl font-semibold overflow-hidden
                        transition-all duration-300 disabled:cursor-default
                        hover:-translate-y-0.5 active:translate-y-0
                        ${done
                          ? 'bg-emerald-400 text-emerald-950 shadow-[0_14px_40px_-12px_rgb(52_211_153/.6)]'
                          : 'bg-white text-black shadow-[0_10px_30px_-12px_rgb(255_255_255/.35)]'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5 animate-spin">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor"
                          strokeWidth="2.6" strokeLinecap="round" strokeDasharray="34 22" />
                </svg>
                Signing in
              </span>
            ) : done ? (
              <span className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none"
                     stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m4 12.5 5 5L20 6.5" />
                </svg>
                Welcome back
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Don&apos;t have an account?{' '}
          <a href="#none" className="text-white font-medium hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
