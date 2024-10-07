import { v2 as cloudinary } from "cloudinary";
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { publicId } = body;
    const result = await cloudinary.uploader.destroy(publicId)
    console.log(result)
    return Response.json({ message: 'deleted successfully' })
  } catch (error) {
    return Response.json({ error: (error as Error).message})
  }
  
}