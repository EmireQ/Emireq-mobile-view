import StartupWelcome from "@/components/startups/welcome/StartupWelcome";

export default function StartupWelcomePage() {
  return (
    <div className="min-h-screen bg-white flex justify-center items-start">
      <div className="w-full max-w-[430px] min-h-screen sm:shadow-2xl sm:shadow-gray-400/30 relative overflow-hidden">
        <StartupWelcome />
      </div>
    </div>
  );
}
