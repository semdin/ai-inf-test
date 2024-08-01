"use server";
import { generateImage } from "@/lib/api";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function addImage(values: { hairColor: string }) {
  console.log("values", values);
  const base64 = await generateImage(values.hairColor)
  await prisma.image.create({
    data: {
      base64: base64,
    }
  })

/*const base64 = await generateImage(formData.get('hairColor') as string)
//console.log("base64", base64);
  await prisma.image.create({
    data: {
      base64: base64,
    }
  })*/
 
  redirect('/')
  
}