import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign in",
};

function Page() {
  return (
    <div className="flex justify-center items-center p-4">
      <SignIn />
    </div>
  );
}

export default Page;
