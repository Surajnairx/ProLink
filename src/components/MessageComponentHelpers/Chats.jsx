/* eslint-disable react/prop-types */
const Chats = ({ allUsers }) => {
  return (
    <div className="text-white">
      {allUsers.map((user) => (
        <div
          className="flex gap-3 p-5 border-b-2 border-black hover:bg-slate-950"
          key={user.userID}
        >
          <img
            className="object-cover object-center rounded-full ring-2 h-10 w-10 ring-gray-400 dark:ring-gray-400"
            src={user.imageLink}
            alt="userImage"
          />
          <div>
            <h1 className="text-md">{user.name}</h1>
            <p className="text-sm font-thin">Hello World</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
