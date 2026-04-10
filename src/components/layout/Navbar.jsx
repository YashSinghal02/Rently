import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.js";
import { themeActions } from "../../redux/theme/themeSlice.js";
import { authActions } from "../../redux/auth/authSlice.js";
import { LoginModal } from "../auth/LoginModal.jsx";
import { Button } from "../common/Button.jsx";
import { toast } from "react-hot-toast";
import "./Navbar.css";
import logo from "../../assets/logo.png"
import { Sun, Moon } from "lucide-react";


function Avatar({ name, color }) {
  const initials = useMemo(() => {
    const parts = name?.split(" ").filter(Boolean) ?? [];
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }, [name]);

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30"
      style={{ background: `linear-gradient(135deg, ${color}, #0f1514)` }}
    >
      <span className="text-sm font-semibold text-white">{initials}</span>
    </div>
  );
}

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);
  const mode = useAppSelector((s) => s.theme.mode);

  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const onToggleTheme = () => {
    dispatch(themeActions.toggleTheme());
    toast.success("Theme updated");
  };

  const onLogout = () => {
    setMenuOpen(false);
    setMobileOpen(false);
    toast.success("Signed out");
    dispatch(authActions.logout());
    navigate("/");
  };

  const navItemClass = ({ isActive }) =>
    `block px-4 py-2 rounded-xl text-sm font-medium transition ${
      isActive
        ? "bg-violet-500/20 text-violet-400"
        : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-navbar mx-auto mt-3 w-[min(1220px,calc(100%-24px))] rounded-2xl px-4 py-3">

        {/* TOP ROW */}
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-14 w-24 overflow-hidden p-3 rounded-xl bg-violet-800/30 border border-violet-500/30 flex items-center justify-center">
              <img src={logo} alt="Rently logo" className="logo-navbar" />
            </div>
            <div>
              <div className="text-sm font-semibold text-black dark:text-white">
                Rently
              </div>
              <div className="text-xs text-violet-500">
                Premium Rentals
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navItemClass}>Home</NavLink>
            <NavLink to="/cars" className={navItemClass}>Cars</NavLink>
            <NavLink to="/dashboard" className={navItemClass}>Dashboard</NavLink>
            <NavLink to="/contact" className={navItemClass}>Contact</NavLink>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* THEME */}
            <button
              onClick={onToggleTheme}
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-800/20 hover:bg-violet-500/20"
            >
                {mode === "dark" ? (
    <Sun className="w-5 h-5 text-yellow-400" />
  ) : (
    <Moon className="w-5 h-5 text-zinc-700" />
  )}
            </button>

            {/* AUTH DESKTOP */}
            <div className="hidden md:block">
              {auth.status === "authenticated" && auth.user ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-800/20 px-2 py-2"
                  >
                    <Avatar name={auth.user.name} color={auth.user.avatarColor} />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl glass-dropdown">
                      <div className="p-2 border border-black/50 dark:border-white/50  bg-white/100 dark:bg-[#1a1a1adb] rounded-lg"   style={{ backdropFilter: "blur(20px)" }}>
                        <button
                          className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg"
                          onClick={() => navigate("/dashboard")}
                        >
                          Dashboard
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                          onClick={onLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button onClick={() => setLoginOpen(true)}>Sign in</Button>
              )}
            </div>

            {/* HAMBURGER */}
            <button
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
  {mobileOpen && (
  <div className="md:hidden mt-4 space-y-2 border-t border-white/10 pt-4">

    <NavLink to="/" className={navItemClass} onClick={() => setMobileOpen(false)}>
      Home
    </NavLink>

    <NavLink to="/cars" className={navItemClass} onClick={() => setMobileOpen(false)}>
      Cars
    </NavLink>

    <NavLink to="/dashboard" className={navItemClass} onClick={() => setMobileOpen(false)}>
      Dashboard
    </NavLink>

    <NavLink to="/contact" className={navItemClass} onClick={() => setMobileOpen(false)}>
      Contact
    </NavLink>

    {/* THEME TOGGLE (MOBILE) */}
    <button
      onClick={onToggleTheme}
        className="flex sm:hidden w-full items-center justify-between px-4 py-2 rounded-xl border border-violet-400/20 bg-violet-500/10 hover:bg-violet-500/20 transition"

    >
      <span className="text-sm">
        {mode === "dark" ? "Dark Mode" : "Light Mode"}
      </span>
      <span className="text-lg">
          {mode === "dark" ? (
    <Sun className="w-5 h-5 text-yellow-400" />
  ) : (
    <Moon className="w-5 h-5 text-zinc-700" />
  )}
      </span>
    </button>

    {/* AUTH */}
    <div className="pt-2 border-t border-white/10">
      {auth.status === "authenticated" ? (
        <>
          <button
            className="w-full text-left px-4 py-2 rounded-xl hover:bg-white/5"
            onClick={() => {
              setMobileOpen(false);
              navigate("/dashboard");
            }}
          >
            Dashboard
          </button>

          <button
            className="w-full text-left px-4 py-2 rounded-xl text-red-500 hover:bg-red-500/10"
            onClick={onLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <Button
          className="w-full"
          onClick={() => {
            setMobileOpen(false);
            setLoginOpen(true);
          }}
        >
          Sign in
        </Button>
      )}
    </div>

  </div>
)}
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}