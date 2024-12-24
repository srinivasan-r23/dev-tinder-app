import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((slice: any) => slice?.connection);
  const fetchConnections = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/connections", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data?.data);
      dispatch(addConnections(data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections?.length === 0) return <h1>No connections found.</h1>;
  return (
    <div className=" text-center my-10">
      <h1 className="text-3xl text-bold">Connections</h1>
      {connections?.map((connection: any) => (
        <div
          className="flex mx-auto w-1/2 items-center m-4 p-4 rounded-lg bg-base-300"
          key={connection._id}
        >
          <div>
            <img
              src={connection?.photoUrl}
              alt="avatar"
              className="rounded-3xl w-20 h-20"
            />
          </div>
          <div className="text-left mx-4">
            <h2 key={connection?._id} className="font-bold text-xl">
              {connection?.firstName} {connection?.lastName}
            </h2>
            <p>
              {connection?.age} - {connection?.gender}
            </p>
            <p>{connection?.about}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
