"use client"
import { initiatorDeleteAPI, initiatorsGetAPI, questionDeleteAPI, questiosGetAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import moment from "moment";
import { useLocale } from "next-intl";
import Link from "next/link";
import { toast } from "react-toastify";

const Initiators = () => {
    const locale = useLocale();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["initiators"],
        queryFn: async () => {
            return await initiatorsGetAPI({ search: "" });
        }
    });
    const mutationDeleteNew = useMutation(
        {
            mutationFn: async (id: any) => {
                return initiatorDeleteAPI({ id });
            },
            onSuccess: () => {
                queryClient.invalidateQueries(); // Ma'lumotlarni yangilash
                toast.error("Deleted Initiators!");
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
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">

                <div>
                </div>
                <div>
                    <Link href={`/${locale}/admin/initiators/add`} >
                        <Button size={"icon"}>
                            <PlusIcon />
                        </Button>
                    </Link>
                </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ism Familiya
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {"Tug'ilgan joyi"}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {"Yashash joyi"}
                        </th>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {"Ish joyi"}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {"Tug'ilgan sana"}
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
                    {data?.data.initiators.map((item: any, i: number) => (
                        <tr key={i}>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.firstname}{" "}{item.lastname}</div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.birthplace}</div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.addressResidential}</div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.workplace}</div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.birthday}</div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {moment(item.createdAt).format("ll")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <Link href={`/${locale}/admin/initiators/edit/${item._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                <button className="ml-2 text-red-600 hover:text-red-900" onClick={() => handeDelete(item._id)} disabled={mutationDeleteNew.isPending}>Delete</button>
                            </td>
                        </tr>
                    )).reverse()}
                </tbody>
            </table>

        </div>
    )
}

export default Initiators;