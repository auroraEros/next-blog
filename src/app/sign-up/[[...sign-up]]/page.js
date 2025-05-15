import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign up",
};
export default function Page() {
  return (
    <div className="flex items-center justify-center p-3">
      <SignUp />
    </div>
  );
}
