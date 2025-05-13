import { SignIn } from "@clerk/nextjs";
function Page() {
  return (
    <div className="flex justify-center items-center p-4">
      <SignIn />
    </div>
  );
}

export default Page;
