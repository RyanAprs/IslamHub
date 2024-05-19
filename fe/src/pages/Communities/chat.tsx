import SideBarGroupChat from "./communityList";

const Chat = () => {
  return (
    <div className="min-h-screen flex text-center gap-5 pt-[115px]">
      <SideBarGroupChat />
      <div className="flex text-center text-2xl">choose your community</div>
    </div>
  );
};

export default Chat;
