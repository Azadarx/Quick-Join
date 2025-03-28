import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [showParticipants, setShowParticipants] = useState(false);
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");

  const router = useRouter();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const callLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          {callLayout()}
        </div>

        {/* ✅ Improved Show Participants Visibility & Responsiveness */}
        <div
          className={cn(
            "h-[calc(100vh-86px)] ml-2 transition-all duration-300",
            showParticipants ? "flex w-64" : "hidden"
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        {/* ✅ Fixed Incorrect Router Push Syntax */}
        <CallControls onLeave={() => router.push("/")} />

        {/* Layout Selection Dropdown */}
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-[#1c1f2e] p-5 bg-[#1c1f2e] text-white">
            {["grid", "speaker-left", "speaker-right"].map((item, index, arr) => (
              <div key={index}>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:bg-[#4c535b]",
                    layout === item && "bg-[#4c535b]"
                  )}
                  onClick={() => setLayout(item as CallLayoutType)}
                >
                  {item}
                </DropdownMenuItem>
                {index < arr.length - 1 && <DropdownMenuSeparator className="border-black" />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        {/* Toggle Participants List */}
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <User size={20} className="text-white" />
          </div>
        </button>

        {/* Hide End Call Button for Personal Room */}
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
