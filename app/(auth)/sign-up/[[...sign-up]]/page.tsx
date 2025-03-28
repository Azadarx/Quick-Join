import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      {/* Branding with Logo + Text */}
      <div className="flex  mt-10 items-center gap-2 mb-6">
        <Image
          src="/icons/logo.svg"
          alt="QuickJoin Logo"
          width={40}
          height={40}
          className="mt-1"
        />
        <h1 className="text-white text-2xl font-bold">QuickJoin</h1>
      </div>

      <SignUp />
    </main>
  );
};

export default SignUpPage;
