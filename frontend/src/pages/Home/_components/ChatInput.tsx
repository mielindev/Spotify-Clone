import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useChatStore from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { selectedUser, sendMessage } = useChatStore();
  const { user } = useUser();

  const handleSubmit = () => {
    if (!selectedUser || !user || content.trim() === "") return;

    setIsLoading(true);
    try {
      sendMessage(user!.id, selectedUser!.clerkId, content);
    } catch (error: any) {
      toast.error("Something went wrong, please try again later.");
      console.log("Error in handleSubmit", error);
    } finally {
      setIsLoading(false);
      setContent("");
    }
  };
  return (
    <div className="p-4 mt-auto border-t border-zinc-800 gap-1">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Type a message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-zinc-800 border-none"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button
          size={"icon"}
          variant="default"
          onClick={handleSubmit}
          disabled={isLoading || !content.trim()}
        >
          <Send className="size-4 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
