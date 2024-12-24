import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const logoutHandler = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const response = await fetch(BASE_URL + "/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (data) navigate("/login");
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder 👨🏻‍💻</a>
      </div>
      {user?.photoUrl && (
        <div className="flex-none gap-2 mx-3">
          <p className="text-lg">Welcome, {user?.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="avatar" src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
