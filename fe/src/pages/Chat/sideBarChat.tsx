import { Link } from "react-router-dom";

const chanels = [
  {
    title: "ANJAY",
  },
  {
    title: "WKWK",
  },
  {
    title: "WLLW asdkjabdkas dbadbs ad sb",
  },
];

const SideBarChat = () => {
  return (
    <div className="min-h-screen overflow-y-auto w-[200px] bg-gray-400 border-[1px] border-black">
      <div className="flex items-center justify-center p-4 border-[1px] border-black">
        <h1 className="font-bold">Channels</h1>
      </div>
      {chanels.map((channel, index) => {
        return (
          <Link to="" key={index} className="flex p-2 hover:bg-gray-500">
            <h1>{channel.title}</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBarChat;
