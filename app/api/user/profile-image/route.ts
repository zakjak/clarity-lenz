import { NextResponse } from "next/server";
import { uploadToCloudflare } from "../../utils/helpers";

export async function POST(req: Request) {
  const formData = await req.formData();

  try {
    const image = formData.get("profilePicture");

    if (image && image instanceof File) {
      const profileImage = await uploadToCloudflare(image);

      return NextResponse.json(profileImage);
    } else {
      return NextResponse.json("This is not a file");
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
