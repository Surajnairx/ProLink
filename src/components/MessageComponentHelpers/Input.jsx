import { IoMdAttach } from "react-icons/io";
const Input = () => {
  return (
    <div className="flex items-center rounded-md bg-stone-800 border-t-2 ">
      <input
        className="p-5 w-3/4 text-teal-400 bg-stone-800 flex-1"
        type="text"
        placeholder="Type Something"
      />
      <div className="flex justify-between items-center gap-2 mx-7 px-4 ">
        <IoMdAttach size={30} color="white" />
        <input className=" hidden" type="file" id="file" />
        <button className="border-2 px-4 py-3 bg-teal-400">Send</button>
      </div>
    </div>
  );
};

export default Input;
