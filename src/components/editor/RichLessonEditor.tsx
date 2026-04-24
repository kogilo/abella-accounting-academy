"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { useState } from "react";

type RichLessonEditorProps = {
  defaultContent?: string;
  inputName?: string;
};

export default function RichLessonEditor({
  defaultContent = "",
  inputName = "contentHtml",
}: RichLessonEditorProps) {
  const [html, setHtml] = useState(defaultContent);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: defaultContent,
    immediatelyRender: false,
    onUpdate({ editor }) {
      setHtml(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border bg-white">
      <div className="flex flex-wrap gap-2 border-b p-3">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="rounded border px-3 py-1"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="rounded border px-3 py-1"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="rounded border px-3 py-1"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className="rounded border px-3 py-1"
        >
          Insert Table
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="rounded border px-3 py-1"
        >
          Add Column
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="rounded border px-3 py-1"
        >
          Add Row
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().deleteTable().run()}
          className="rounded border px-3 py-1 text-red-600"
        >
          Delete Table
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="prose max-w-none p-5 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:bg-slate-100 [&_th]:p-2"
      />

      <input type="hidden" name={inputName} value={html} />
    </div>
  );
}