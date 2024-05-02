"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
    Bold,
    Strikethrough,
    Italic,
    Heading2,
    Underline,
    Undo,
    Redo,
    ImageIcon,
    Heading1,
    Heading3,
} from "lucide-react";
import ModalUploadImage from "@/utils/ModalUploadImage";
import Modal from "./Modal";

type Props = {
    editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {

    if (!editor) {
        return null;
    }

    const setImage = (url: any) => {
        editor.chain().focus().setImage({ src: url }).run()
    }
    return (
        <div
            className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700"
        >
            <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
                <Modal button={
                    <button className="text-sky-400">
                        <ImageIcon className="h-5 w-5" />
                    </button>
                }>
                    <ModalUploadImage
                        setURL={setImage}
                    />
                </Modal>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBold().run();
                    }}
                    className={
                        editor.isActive("bold")
                            ? "bg-sky-700 text-white p-2 rounded-lg"
                            : "text-sky-400"
                    }
                >
                    <Bold className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    }}
                    className={
                        editor.isActive("italic")
                            ? "bg-sky-700 text-white p-2 rounded-lg"
                            : "text-sky-400"
                    }
                >
                    <Italic className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleUnderline().run();
                    }}
                    className={
                        editor.isActive("underline")
                            ? "bg-sky-700 text-white p-2 rounded-lg"
                            : "text-sky-400"
                    }
                >
                    <Underline className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                    }}
                    className={
                        editor.isActive("strike")
                            ? "bg-sky-700 text-white p-2 rounded-lg"
                            : "text-sky-400"
                    }
                >
                    <Strikethrough className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({ level: 1 }).run();
                    }}
                    className={
                        editor.isActive("heading", { level: 1 })
                            ? "bg-sky-700 text-white p-2 rounded-lg"
                            : "text-sky-400"
                    }
                >
                    <Heading1 className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                    className={
                        editor.isActive("heading", { level: 2 })
                            ? "bg-sky-700 text-white p-2 rounded-lg"
                            : "text-sky-400"
                    }
                >
                    <Heading2 className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? "bg-sky-700 text-white p-2 rounded-lg"
                            : "text-sky-400"
                    }
                >
                    <Heading3 className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().undo().run();
                    }}
                    className={
                        editor.isActive("undo")
                            ? "bg-sky-700 text-white p-2 rounded-lg"
                            : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
                    }
                >
                    <Undo className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().redo().run();
                    }}
                    className={
                        editor.isActive("redo")
                            ? "bg-sky-700 text-white p-2 rounded-lg"
                            : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
                    }
                >
                    <Redo className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Toolbar;