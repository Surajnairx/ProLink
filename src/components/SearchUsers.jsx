/* eslint-disable react/prop-types */
const SearchUsers = ({ setSearchInput }) => {
  return (
    <div className="">
      <input
        className="px-2 py-1 rounded-md bg-slate-300"
        placeholder="Search Users..."
        type="text"
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default SearchUsers;
