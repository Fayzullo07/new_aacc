"use client"
import { messageDeleteAPI, messagesGetAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import Modal from "@/components/Core/Modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

import { toast } from "react-toastify";

const IlmiyEtika = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["center_mind_messages"],
        queryFn: async () => {
            return await messagesGetAPI({ role: "ilmiy_etika" });
        }
    });

    const mutationDeleteNew = useMutation(
        {
            mutationFn: async (id: any) => {
                return messageDeleteAPI({ id });
            },
            onSuccess: () => {
                queryClient.invalidateQueries(); // Ma'lumotlarni yangilash
                toast.error("Deleted message!");
            },
            onError: () => {
                toast.error("Something error!");
            },
        }
    );
    const handeDelete = (id: any) => {
        const isDelete = confirm("O'chirmoqchimisiz?")
        if (isDelete) {
            mutationDeleteNew.mutate(id)
        }
    }


    if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <div>

            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Desc
                        </th>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.data.messages.map((item: any, i: number) => (
                        <tr key={i}>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.name}</div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.desc.substring(0, 20)}...</div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {moment(item.createdAt).format("LLL")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <Modal button={<button className="ml-2 text-maincolor" >View</button>}>
                                    <div className="">
                                        <ScrollArea className="h-[70vh] py-4">
                                            <div className="text-start py-4 sm:text-xl text-base">
                                                {item.desc}
                                            </div>

                                        </ScrollArea>
                                    </div>
                                </Modal>
                                <button className="ml-2 text-red-600 hover:text-red-900" onClick={() => handeDelete(item._id)} disabled={mutationDeleteNew.isPending}>Delete</button>
                            </td>

                        </tr>
                    )).reverse()}
                </tbody>
            </table>
        </div>
    )
}

export default IlmiyEtika;