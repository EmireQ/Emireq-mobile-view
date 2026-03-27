import StartupSignupFlow from "@/components/startups/signup/StartupSignupFlow";

export default function StartupSignupPage() {
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex justify-center items-start">
      <div className="w-full max-w-[430px] min-h-screen sm:shadow-2xl sm:shadow-gray-400/30 relative overflow-hidden">
        <StartupSignupFlow />
      </div>
    </div>
  );
}
