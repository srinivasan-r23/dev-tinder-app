import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showSignUp, setShowSignUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const url = showSignUp ? "/signup" : "/login";
      const response = await fetch(BASE_URL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(
          showSignUp
            ? { email, password, firstName, lastName }
            : { email, password }
        ),
      });
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      if (data?.user) {
        dispatch(addUser(data?.user));
        navigate("/");
      } else {
        setShowSignUp(false);
      }
    } catch (error: any) {
      setError(error?.message ?? "An error occurred");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-1/2 bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4">
          {showSignUp && (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  className="input input-bordered w-full"
                  onChange={(e) => setFirstName(e?.target?.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  className="input input-bordered w-full"
                  onChange={(e) => setLastName(e?.target?.value)}
                />
              </div>
            </>
          )}
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
            {showSignUp ? "Sign up now" : "Login"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {showSignUp ? (
            <p>
              Already have an Account?{" "}
              <a
                className="underline cursor-pointer"
                onClick={() => setShowSignUp(!showSignUp)}
              >
                Login
              </a>
            </p>
          ) : (
            <p>
              New to DevTinder ?{" "}
              <a
                onClick={() => setShowSignUp(!showSignUp)}
                className="underline cursor-pointer"
              >
                Sign up now
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
