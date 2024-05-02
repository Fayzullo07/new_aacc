import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";


const Modal = ({ children, button }: Readonly<{ children: React.ReactNode, button: React.ReactNode }>) => {

    return (
        <Dialog >
            <DialogTrigger asChild>
                {button}
            </DialogTrigger>
            <DialogContent className="min-w-[70vw] max-h-[80vh]" >
                <DialogHeader >
                    {/* <DialogTitle>Add User</DialogTitle> */}
                    <DialogDescription>
                        {children}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default Modal;