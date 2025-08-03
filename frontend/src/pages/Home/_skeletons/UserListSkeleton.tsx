const UserListSkeleton = () => {
  return Array.from({ length: 7 }).map((_, index) => (
    <div
      key={index}
      className="flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg animate-pulse"
    >
      <div className="size-12 bg-zinc-800 rounded-full animate-pulse flex-shrink-0"></div>
      <div className="flex-1 space-y-1">
        <div className="h-4 bg-zinc-800 rounded-md animate-pulse w-3/4"></div>
        <div className="h-4 bg-zinc-800 rounded-md animate-pulse w-1/2"></div>
      </div>
    </div>
  ));
};

export default UserListSkeleton;
