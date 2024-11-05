import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const books = await prisma.book.findMany();
    console.log(books); 
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching books" });
  }
}
