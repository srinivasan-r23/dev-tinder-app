import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((slice: any) => slice?.request);
  const fetchRequests = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/requests/received", {
        credentials: "include",
      });
      const data = await response.json();
      dispatch(addRequest(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequests = async (status: string, id: string) => {
    try {
      const response = await fetch(
        BASE_URL + "/request/review/" + status + "/" + id,
        {
          credentials: "include",
          method: "POST",
        }
      );
      await response?.json();
      dispatch(removeRequest(id));
    } catch (error) {
      console.log(error);
    }
  };
  if (requests?.length === 0)
    return (
      <p className="text-2xl text-center text-gray-400">
        No connection request.
      </p>
    );
  return (
    <>
      {requests?.map((request: any) => (
        <div
          className="flex justify-between mx-auto w-1/2 items-center m-4 p-4 rounded-lg bg-base-300"
          key={request._id}
        >
          <div>
            <img
              src={request?.fromUserId?.photoUrl}
              alt="avatar"
              className="rounded-3xl w-20 h-20"
            />
          </div>
          <div className="text-left mx-4">
            <h2 className="font-bold text-xl">
              {request?.fromUserId?.firstName} {request?.fromUserId?.lastName}
            </h2>
            <p>
              {request?.fromUserId?.age} - {request?.fromUserId?.gender}
            </p>
            <p>{request?.fromUserId?.about}</p>
          </div>
          <div className="flex m-2 space-x-3">
            <button
              className="btn btn-active btn-primary"
              onClick={() => reviewRequests("rejected", request?._id)}
            >
              Reject
            </button>
            <button
              className="btn btn-active btn-secondary"
              onClick={() => reviewRequests("accepted", request?._id)}
            >
              Accept
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Requests;
