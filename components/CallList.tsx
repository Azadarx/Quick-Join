// @ts-nocheck
"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./loader";
import { toast } from "react-hot-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const {
    endedCalls,
    upcomingCalls,
    callRecordings = [],
    isLoading,
  } = useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!Array.isArray(callRecordings)) {
        console.error("callRecordings is undefined or not an array");
        setRecordings([]); // ✅ Prevents crash
        return;
      }

      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting?.queryRecordings?.() || [])
        );

        const recordings = callData
          .filter((call) => call?.recordings?.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        console.error("Error fetching recordings:", error);
        toast.error("Failed to fetch recordings");
        setRecordings([]);
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [callRecordings, type]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />; // ✅ Shows a loader when data is loading

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, index) => (
          <MeetingCard
            key={
              (meeting as Call)?.id ||
              (meeting as CallRecording)?.filename ||
              index
            } // ✅ Ensures a unique key
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call)?.state?.custom?.description?.substring(0, 26) ||
              (meeting as CallRecording)?.filename?.substring(0, 20) ||
              "Personal Meeting"
            }
            date={
              meeting?.state?.startsAt
                ? new Date(meeting.state.startsAt).toLocaleString()
                : meeting?.start_time
                ? new Date(meeting.start_time).toLocaleString()
                : "No Date Available"
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={() =>
              type === "recordings"
                ? router.push(meeting.url)
                : router.push(`/meeting/${meeting.id}`)
            }
            link={
              type === "recordings"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meetings/${meeting.id}`
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
