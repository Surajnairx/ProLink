/* eslint-disable react/prop-types */
const ButtonComponent = ({ title, onClick }) => {
  return (
    <button
      className=" mt-3 border-2 border-black w-auto p-2 rounded-xl hover:bg-black hover:text-teal-400"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ButtonComponent;
