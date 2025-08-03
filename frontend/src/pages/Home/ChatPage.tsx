import useChatStore from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UserList from "./_components/UserList";
import ChatContainer from "./_components/ChatContainer";

const ChatPage = () => {
  const { selectedUser, getAllUsers, getMessages } = useChatStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getAllUsers();
    }
  }, [getAllUsers, user]);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser.clerkId);
    }
  }, [getMessages, selectedUser]);
  return (
    <main className="min-h-screen rounded-lg bg-gradient-to-b from-zinc-900 via-zinc-900/50 to-zinc-900/50 overflow-hidden">
      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UserList />
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <img
                src="/spotify_logo.png"
                alt="Spotify Logo"
                className="size-16 animate-bounce"
              />
              <div className="text-center">
                <h3 className="text-zinc-300 text-lg font-medium mb-1">
                  No conversation selected
                </h3>
                <p className="text-zinc-400 text-sm">
                  Select a friend to start a conversation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
