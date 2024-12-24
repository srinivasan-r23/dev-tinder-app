const UserCard = (props: any) => {
  const { user } = props;
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
          <button className="btn btn-primary">Interested</button>
          <button className="btn btn-secondary">Ignored</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
