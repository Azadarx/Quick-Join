import MeetingTypeList from "@/components/meetingTypeList";
import React from "react";

const Home = () => {
  const now = new Date();

  // Format Current Time
  const time = now.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  // Format Date
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);

  // Calculate Next Meeting Time (Nearest Half-Hour)
  const nextMeeting = new Date(now);
  nextMeeting.setMinutes(now.getMinutes() < 30 ? 30 : 0);
  nextMeeting.setHours(now.getMinutes() < 30 ? now.getHours() : now.getHours() + 1);
  nextMeeting.setSeconds(0);
  
  const nextMeetingTime = nextMeeting.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] hero-bg">
        <div className="flex h-full flex-col justify-between max-md:px-5 py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: {nextMeetingTime}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-[#c9ddff] lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
