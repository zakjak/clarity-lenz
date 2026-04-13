import BannerMainPage from "@/components/BannerMainPage";
import LatestArticlesComponent from "@/components/LatestArticlesComponent";
import UpcomingEventsComponent from "@/components/UpcomingEventsComponent";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      {/* Home Banner */}
      <BannerMainPage />

      <div className="my-6 w-[90%] lg:w-[50%] mx-auto ">
        {/* Latest Articles */}
        <LatestArticlesComponent />

        {/* Upcoming Events */}
        <UpcomingEventsComponent />
      </div>
    </main>
  );
}
