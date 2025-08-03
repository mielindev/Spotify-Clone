import useChatStore from "@/store/useChatStore";
import ChatHeader from "./ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useUser } from "@clerk/clerk-react";
import ChatInput from "./ChatInput";
import { formatDateMessage } from "@/utils";

const ChatContainer = () => {
  const { messages, selectedUser } = useChatStore();
  console.log("👉 ~ ChatContainer ~ messages:", messages);
  const { user } = useUser();
  if (!selectedUser) return null;

  return (
    <div>
      <ChatHeader />
      <ScrollArea className="h-[calc(100vh-340px)]">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex items-start gap-3 ${
                message.senderId === selectedUser?.clerkId
                  ? "flex-row"
                  : "flex-row-reverse"
              }`}
            >
              <Avatar className="size-8">
                <AvatarImage
                  src={
                    message.senderId === selectedUser?.clerkId
                      ? selectedUser.imageUrl
                      : user?.imageUrl
                  }
                  className="rounded-full"
                />
              </Avatar>

              <div
                className={`rounded-lg p-3 max-w-[75%] ${
                  message.senderId === selectedUser.clerkId
                    ? "bg-zinc-800"
                    : "bg-green-800"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs text-zinc-400">
                  {formatDateMessage(message.createdAt.toString())}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
