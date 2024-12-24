import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = (props: any) => {
  const { user } = props;
  const dispatch = useDispatch();
  const handleSendRequest = async (status: string, id: string) => {
    const response = await fetch(
      BASE_URL + "/request/send/" + status + "/" + id,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await response.json();
    dispatch(removeFeed(id));
    console.log(data);
  };
  return (
    <div className="card glass m-10">
      <figure>
        <img src={user?.photoUrl} alt="avatar" className="w-48" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user?.firstName} {user?.lastName}
        </h2>
        <p>{user?.gender}</p>
        <p>{user?.about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", user?._id)}
          >
            Interested
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("ignored", user?._id)}
          >
            Ignored
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
