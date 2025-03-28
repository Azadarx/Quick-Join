"use client";
import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className="text-base font-medium text-sky-100 lg:text-xl xl:min-w-32">
      {title}
    </h1>
    <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
      {description}
    </h1>
  </div>
);

const PersonalRoom = () => {
  const { user } = useUser();
  const [copied, setCopied] = useState(false); // Track if copied
  const meetingID = user?.id;
  const meetingLink = meetingID
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal=true`
    : "";
  const client = useStreamVideoClient();
  const router = useRouter();
  const copyToClipboard = async () => {
    if (!meetingLink) return;

    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);

      // Reset button text after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Clipboard copy failed", error);
    }
  };
  const { call } = useGetCallById(meetingID!);
  const startMeeting = async () => {
    if (!client || !user) return;
    if (!call) {
      const newCall = client.call("default", meetingID!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingID}?personal=true`);
  };

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table
          title="Topic"
          description={`${user?.firstName || "Guest"}'s meeting room`}
        />
        <Table title="Meeting ID" description={meetingID || "N/A"} />
        <Table title="Invite Link" description={meetingLink || "N/A"} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-600" onClick={startMeeting}>
          Start Meeting
        </Button>
        <Button className="bg-blue-950" onClick={copyToClipboard}>
          {copied ? "✅ Copied!" : "Copy Invitation"}
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
