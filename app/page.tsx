import BannerMainPage from "@/components/BannerMainPage";
import LatestArticlesComponent from "@/components/LatestArticlesComponent";
import UpcomingEventsComponent from "@/components/UpcomingEventsComponent";
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main>
      {/* Home Banner */}
      <BannerMainPage />

      <div className="my-6 w-[90%] lg:w-5xl mx-auto grid grid-cols-2 gap-6">
        {/* Latest Articles */}
        <LatestArticlesComponent />

        {/* Upcoming Events */}
        <UpcomingEventsComponent />
      </div>
    </main>
  );
}
