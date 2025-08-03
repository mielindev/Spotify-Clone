import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./_components/LeftSideBar";
import FriendsActivity from "./_components/FriendsActivity";
import AudioPlayer from "./_components/AudioPlayer";
import PlaybackControls from "./_components/PlaybackControls";
import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <TopBar />

      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        <AudioPlayer />
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 15}
          maxSize={20}
        >
          <LeftSideBar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
            <ResizablePanel
              defaultSize={20}
              minSize={0}
              maxSize={20}
              collapsedSize={0}
            >
              <FriendsActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <PlaybackControls />
    </div>
  );
};

export default MainLayout;
