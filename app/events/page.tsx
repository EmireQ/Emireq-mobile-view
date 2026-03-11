import Navbar from "@/components/Navbar";
import EventsContent from "@/components/Eventscontent";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white flex justify-center items-start">
      <div className="w-full max-w-[430px] bg-white min-h-screen sm:shadow-2xl sm:shadow-gray-400/30 relative">
        <Navbar />
        <EventsContent />
        <div className="h-8" />
      </div>
    </div>
  );
}
