import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser, isBroadcastSelected, selectedGroup } = useChatStore();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-400">
      <div className="flex items-center justify-center pt-20 px-4  text-gray-900">
        <div className="bg-indigo-200 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="hidden md:flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser && !isBroadcastSelected && !selectedGroup ? (
              <NoChatSelected />
            ) : (
              <ChatContainer />
            )}
          </div>
          {/* ChatContainer or Sidebar for medium or smaller screens */}
          <div className="flex h-full rounded-lg overflow-hidden md:hidden border-20 border-blue-500 shadow-2xl ring-4 ring-blue-400 ring-opacity-75">
            {!selectedUser && !isBroadcastSelected && !selectedGroup ? (
              <>
                {" "}
                <Sidebar /> <NoChatSelected />{" "}
              </>
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
