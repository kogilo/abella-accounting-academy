"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

export async function createCourse(formData: FormData) {
  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const published = formData.get("published") === "on";

  await prisma.course.create({
    data: {
      title,
      slug: slugify(title, { lower: true, strict: true }),
      description,
      published,
    },
  });

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function updateCourse(courseId: string, formData: FormData) {
  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const published = formData.get("published") === "on";

  await prisma.course.update({
    where: { id: courseId },
    data: {
      title,
      slug: slugify(title, { lower: true, strict: true }),
      description,
      published,
    },
  });

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function deleteCourse(courseId: string) {
  await prisma.course.delete({
    where: { id: courseId },
  });

  revalidatePath("/admin/courses");
}