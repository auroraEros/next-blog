"use client";
import CreatePost from "@/app/_components/CreatePost";
import { useUser } from "@clerk/nextjs";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

function Page() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  if (!isLoaded) return null;

  if (isSignedIn && user.publicMetadata.isAdmin) {
   return <CreatePost />;
  } else
    return (
      <div className="py-24 w-full flex flex-col gap-y-8 justify-center items-center">
        <h1 className="md:text-3xl text-xl font-semibold">
          You are not athorized to view this page!!!
        </h1>
        <Button
          gradientDuoTone="purpleToBlue"
          outline
          onClick={() => router("/")}
        >
          Back
        </Button>
      </div>
    );
}

export default Page;
