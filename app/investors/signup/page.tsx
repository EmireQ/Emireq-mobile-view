import InvestorSignupFlow from "@/components/investor/signup/InvestorSignupFlow";

export default function InvestorSignupPage() {
  return (
    <div className="min-h-screen bg-white flex justify-center items-start">
      <div className="w-full max-w-[430px] bg-white min-h-screen sm:shadow-2xl sm:shadow-gray-400/30 relative">
        <InvestorSignupFlow />
      </div>
    </div>
  );
}
