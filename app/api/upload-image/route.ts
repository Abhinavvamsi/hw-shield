import cloudinary from "@/lib/cloudinary"

import { NextResponse } from "next/server"

export async function POST(
  req: Request
) {

  try {

    const formData =
      await req.formData()

    const file =
      formData.get("file") as File

    if (!file) {

      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      )

    }

    const bytes =
      await file.arrayBuffer()

    const buffer =
      Buffer.from(bytes)

    const base64 =
      `data:${file.type};base64,${buffer.toString("base64")}`

    const uploadedImage =
      await cloudinary.uploader.upload(
        base64,
        {
          folder: "hw-shield",
        }
      )

    return NextResponse.json({
      imageUrl:
        uploadedImage.secure_url,
    })

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Image upload failed",
      },
      {
        status: 500,
      }
    )

  }

}