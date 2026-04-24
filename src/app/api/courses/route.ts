import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function POST(req: Request) {
  const body = await req.json();

  const course = await prisma.course.create({
    data: {
      title: body.title,
      slug: slugify(body.title, { lower: true }),
    },
  });

  return Response.json(course);
}