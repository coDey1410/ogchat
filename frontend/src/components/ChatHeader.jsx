import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { axiosInstance } from "../lib/axios";
import { useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [isBlocked, setIsBlocked] = useState(
    authUser.blockedUsers?.includes(selectedUser?._id)
  );

  const handleBlocking = async () => {
    if (isBlocked)
      await axiosInstance.post("user/unblock", {
        unblockUserId: selectedUser?._id,
      });
    else
      await axiosInstance.post("user/block", {
        blockUserId: selectedUser?._id,
      });
    setIsBlocked(!isBlocked);
  };

  return (
    <div
      className="p-2.5 border-b border-base-300"
      style={{
        backgroundImage: "url('/header-bg.jpg')", // Change this to your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser?.profilePic || "/avatar.png"}
                alt={selectedUser?.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleBlocking}>
            {isBlocked ? "Unblock" : "Block"}
          </button>
          {/* Close button */}
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
