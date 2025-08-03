import useChatStore from "@/store/useChatStore";
import UserListSkeleton from "../_skeletons/UserListSkeleton";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserList = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } =
    useChatStore();

  if (isLoading) {
    return (
      <div>
        <UserListSkeleton />
      </div>
    );
  }
  return (
    <div className="border-r border-zinc-800">
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-2 py-4">
          {users.map((user) => (
            <div
              key={user.clerkId}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selectedUser?.clerkId === user.clerkId
                  ? "bg-zinc-800/50"
                  : "hover:bg-zinc-800/50"
              }`}
            >
              <div className="relative">
                <Avatar className="size-8 md:size-12">
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                </Avatar>

                <div
                  className={`absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-zinc-900 ${
                    onlineUsers.has(user.clerkId)
                      ? "bg-green-500"
                      : "bg-zinc-500"
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0 hidden lg:block">
                <p className="font-bold truncate">{user.fullName}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserList;
