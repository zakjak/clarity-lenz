import UserArticleSection from "@/components/UserArticleSection";
import UserProfileBanner from "@/components/UserProfileBanner";

export const dynamic = "force-dynamic";

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return (
    <div className="w-[80%] md:w-[70%] lg:w-240 mx-auto md:px-8">
      <UserProfileBanner id={id} />
      <UserArticleSection id={id} />
    </div>
  );
};

export default ProfilePage;
