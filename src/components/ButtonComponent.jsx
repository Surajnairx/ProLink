/* eslint-disable react/prop-types */
const ButtonComponent = ({ title, onClick }) => {
  return (
    <button
      className="  border-2 border-teal-400 p-1 rounded-xl hover:bg-black hover:text-teal-400 hover:border-black"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ButtonComponent;