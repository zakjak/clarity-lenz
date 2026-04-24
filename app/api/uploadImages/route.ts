import { NextResponse } from "next/server";
import { uploadToCloudflare } from "../utils/helpers";

export async function POST(req: Request) {
  const formData = await req.formData();

  try {
    const image = formData.get("image");
    const images = formData.getAll("images");

    const uploadPromises = [];
    if (image && image instanceof File) {
      uploadPromises.push(uploadToCloudflare(image));
    }

    if (images) {
      for (const imageFile of images) {
        if (imageFile instanceof File) {
          uploadPromises.push(uploadToCloudflare(imageFile));
        }
      }
    }

    const results = await Promise.all(uploadPromises);

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}
