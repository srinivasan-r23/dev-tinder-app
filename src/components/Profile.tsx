import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    // Perform logout logic here
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Profile</h2>
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              value="John Doe"
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value="john.doe@example.com"
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <button onClick={logoutHandler} className="btn btn-primary w-full">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
