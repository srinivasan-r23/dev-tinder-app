import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state: any) => state?.feed);

  const getFeed = async () => {
    try {
      const response = await fetch(BASE_URL + "/feed");
      const data = await response.json();
      dispatch(addFeed(data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return <>No New Requests available</>;
  return (
    <div className="flex items-center justify-center flex-col ">
      {feed?.map((user: any) => (
        <UserCard user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default Feed;
