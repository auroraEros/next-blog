import { SignIn } from "@clerk/nextjs";
import AdminCredentials from "@/app/_components/AdminCredentials "

export default function SignInPage() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left side - Admin credentials */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">Demo Admin Access</h1>
          <p className="text-sm mb-6">
            This is a demo project. You can sign in as an Admin with these credentials
            or sign up as a regular user.
          </p>
          
          {/* Client Component for credentials */}
          <AdminCredentials />
        </div>

        {/* Right side - Clerk SignIn */}
        <div className="flex-1">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full max-w-md",
                card: "shadow-none bg-transparent",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}