import Input from "./Input";
import Messages from "./Messages";
const ChatDialogBox = () => {
  return (
    <div className="flex-[3] flex flex-col justify-between rounded-md">
      <div className="bg-stone-800 text-teal-400 h-14 border-b-2 border-black rounded-tr-lg">
        <h1 className="p-4">User Name</h1>
      </div>
      <div className="overflow-auto overflow-x-hidden scroll">
        <div className="bg-stone-800 text-teal-400">
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
          <Messages />
        </div>
      </div>
      <Input />
    </div>
  );
};

export default ChatDialogBox;
