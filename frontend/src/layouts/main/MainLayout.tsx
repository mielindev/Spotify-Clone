import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./_components/LeftSideBar";
import FriendsActivity from "./_components/FriendsActivity";
import AudioPlayer from "./_components/AudioPlayer";

const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        <AudioPlayer />
        <ResizablePanel
          defaultSize={isMobile ? 10 : 20}
          minSize={isMobile ? 0 : 10}
          maxSize={20}
        >
          <LeftSideBar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
        <ResizablePanel
          defaultSize={isMobile ? 10 : 20}
          minSize={0}
          maxSize={20}
          collapsedSize={0}
        >
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
