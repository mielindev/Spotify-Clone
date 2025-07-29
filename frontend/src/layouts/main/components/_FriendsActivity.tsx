import useChatStore from "@/store/useChatStore";
import { useEffect } from "react";
import LoginPrompt from "./_LoginPrompt";
import { useUser } from "@clerk/clerk-react";
import { Music, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FriendsActivity = () => {
  const { getAllUsers, users } = useChatStore();
  const { user: loggedInUser } = useUser();
  useEffect(() => {
    if (loggedInUser) getAllUsers();
  }, [getAllUsers, loggedInUser]);

  const isPlaying = true;

  return (
    <div className="bg-zinc-900/75 rounded-lg min-h-screen flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="size-5 flex-shrink-0" />
          <h2 className="font-semibold">What they're listening to</h2>
        </div>
      </div>

      {!loggedInUser && <LoginPrompt />}

      <ScrollArea className="flex-1 ">
        <div className="p-4 space-y-4">
          {users.map((user: User) => (
            <div
              key={user._id}
              className="cursor-pointer hover:bg-zinc-800/50 rounded-md transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="size-10 border border-zinc-800">
                    <AvatarImage src={user.imageUrl} alt={user.fullName} />
                    <AvatarFallback className="text-zinc-400">
                      {user.fullName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-zinc-900 bg-emerald-500`}
                    aria-hidden="true"
                  />
                </div>
                <div className=" flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-medium text-white">
                      {user.fullName}
                    </h2>
                    {isPlaying && (
                      <Music className="size-3.5 text-emerald-500 shrink-0" />
                    )}
                  </div>

                  {isPlaying ? (
                    <div className="mt-1">
                      <div className="mt-1 text-sm text-white font-medium truncate">
                        Cardigan
                      </div>
                      <div className="text-xs text-zinc-400 truncate">
                        Taylor Swift
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 text-xs text-zinc-400">Idle</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;
