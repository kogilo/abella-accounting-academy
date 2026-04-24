"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

export async function createLesson(courseId: string, formData: FormData) {
  const title = String(formData.get("title") || "");
  const contentHtml = String(formData.get("contentHtml") || "");

  let module = await prisma.module.findFirst({
    where: { courseId },
    orderBy: { order: "asc" },
  });

  if (!module) {
    module = await prisma.module.create({
      data: {
        title: "Main Module",
        order: 1,
        courseId,
      },
    });
  }

  const lessonCount = await prisma.lesson.count({
    where: { moduleId: module.id },
  });

  await prisma.lesson.create({
    data: {
      title,
      slug: slugify(title, { lower: true, strict: true }),
      contentHtml,
      order: lessonCount + 1,
      moduleId: module.id,
      published: true,
    },
  });

  revalidatePath(`/admin/courses/${courseId}/lessons`);
  redirect(`/admin/courses/${courseId}/lessons`);
}

export async function updateLesson(
  courseId: string,
  lessonId: string,
  formData: FormData
) {
  const title = String(formData.get("title") || "");
  const contentHtml = String(formData.get("contentHtml") || "");

  await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      title,
      slug: slugify(title, { lower: true, strict: true }),
      contentHtml,
    },
  });

  revalidatePath(`/admin/courses/${courseId}/lessons`);
  redirect(`/admin/courses/${courseId}/lessons`);
}

export async function deleteLesson(courseId: string, lessonId: string) {
  await prisma.lesson.delete({
    where: { id: lessonId },
  });

  revalidatePath(`/admin/courses/${courseId}/lessons`);
}