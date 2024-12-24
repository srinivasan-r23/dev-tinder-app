import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-1/2 bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="input input-bordered w-full"
              onChange={(e) => setEmail(e?.target?.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e?.target?.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            type="submit"
            className="btn btn-primary w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
