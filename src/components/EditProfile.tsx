import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((slice: any) => slice?.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + "/profile/edit", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          gender,
          about,
          photoUrl,
        }),
      });

      const data = await response.json();
      setShowToast(true);
      dispatch(addUser(data?.user));
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(error);
    }
  };
  return (
    <>
      {showToast && (
        <div className="alert alert-success w-1/3 text-center mx-auto">
          <span>Updated successfully.</span>
        </div>
      )}
      <div className="flex">
        <div className="flex justify-center bg-base-200 min-h-screen flex-1 rounded-lg p-4">
          <div className="w-full max-w-md space-y-6 bg-base-200 rounded-lg shadow-md pb-96 overflow-y-auto">
            <h2 className="text-2xl font-bold text-center">Profile</h2>
            <form className="space-y-4" onSubmit={updateHandler}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  onChange={(e: any) => setFirstName(e?.target?.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e: any) => setLastName(e?.target?.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full"
                  onChange={(e: any) => setPhotoUrl(e?.target?.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full"
                  onChange={(e: any) => setGender(e?.target?.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">About</span>
                </label>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full"
                  onChange={(e: any) => setAbout(e?.target?.value)}
                />
              </div>

              <button className="btn btn-neutral" type="submit">
                Update
              </button>
              {error && <p className="text-red-500">{error?.toString()}</p>}
            </form>
          </div>
        </div>
        <div className="flex-1">
          <UserCard user={{ firstName, lastName, gender, about, photoUrl }} />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
