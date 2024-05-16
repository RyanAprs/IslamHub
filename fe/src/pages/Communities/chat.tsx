import SideBarGroupChat from "./communityList";

const Chat = () => {
  return (
    <div className="min-h-screen flex gap-5">
      <SideBarGroupChat />
      <div className="flex text-2xl">choose your community</div>
    </div>
  );
};

export default Chat;
