import UserArticleSection from "@/components/UserArticleSection";
import UserProfileBanner from "@/components/UserProfileBanner";

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="w-[80%] md:w-[70%] lg:w-[60rem] mx-auto md:px-8">
      <UserProfileBanner id={id} />
      <UserArticleSection id={id} />
    </div>
  );
};

export default ProfilePage;
