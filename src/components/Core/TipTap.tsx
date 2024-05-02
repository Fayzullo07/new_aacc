"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'

const TipTap = ({ onChange, content = '<p></p>'}: any) => {
    const handleChange = (newContent: string) => {
        onChange(newContent);
    };
    const editor = useEditor({
        extensions: [StarterKit, Underline, Image, Link.configure({
            openOnClick: false,
            autolink: true,
        }),],
        editorProps: {
            attributes: {
                class:
                    "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            handleChange(editor.getHTML());
          },
        content: `${content}`

    });

    return (
        <div className="w-full">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default TipTap;