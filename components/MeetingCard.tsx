"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Toaster, toast } from "sonner"; // Import toast and Toaster
import { useState } from "react";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not supported");
      return;
    }
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("✅ Link Copied!", {
        style: {
          background: "#1c1f2e", // Dark theme
          color: "#fff",
          padding: "16px",
          fontSize: "16px",
          border: "none",
          boxShadow: "0px 0px 10px 0px gray",
          width: "300px", // Increased width
          height: "60px", // Increased height
        },
        duration: 3000, // 3 seconds
        position: "top-center",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("❌ Failed to copy link", {
        style: {
          background: "#1c1f2e",
          color: "#fff",
          border: "none",
          padding: "16px",
          fontSize: "16px",
          width: "300px",
          height: "60px",
          boxShadow: "0px 0px 10px 0px gray",
        },
        position: "top-center",
      });
      console.error("Clipboard copy failed:", error);
    }
  };

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-[#1c1f2e] px-5 py-8 xl:max-w-[568px]">
      {/* Toaster with Slide-in Animation */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1c1f2e",
            color: "#fff",
            padding: "16px",
            fontSize: "16px",
            borderRadius: "10px",
            width: "300px",
            height: "60px",
            animation: "slide-in 0.4s ease-out forwards",
          },
        }}
      />

      <article className="flex flex-col gap-5">
        <Image src={icon} alt="meeting-icon" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>

      <article className="flex justify-center relative">
        <div className="relative flex w-full max-sm:hidden items-center gap-2">
          <Image
            src="/images/avatar-1.jpeg"
            alt="avatar-1"
            width={40}
            height={40}
            className="rounded-full border-2 border-dark-3"
          />
          <Image
            src="/images/avatar-2.jpeg"
            alt="avatar-2"
            width={40}
            height={40}
            className="rounded-full border-2 border-dark-3"
          />
          <Image
            src="/images/avatar-3.png"
            alt="avatar-3"
            width={40}
            height={40}
            className="rounded-full border-2 border-dark-3"
          />
          <Image
            src="/images/avatar-4.png"
            alt="avatar-4"
            width={40}
            height={40}
            className="rounded-full border-2 border-dark-3"
          />
          <Image
            src="/images/avatar-5.png"
            alt="avatar-5"
            width={40}
            height={40}
            className="rounded-full border-2 border-dark-3"
          />
        </div>

        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              className="rounded bg-blue-500 cursor-pointer px-6"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={handleCopyLink}
              className={`px-6 w-[150px] transition ${
                copied ? "bg-green-500" : "bg-blue-950"
              }`}
            >
              <Image src="/icons/copy.svg" alt="copy" width={20} height={20} />
              &nbsp; {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        )}
      </article>

      {/* Global Animation for Toast */}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default MeetingCard;
