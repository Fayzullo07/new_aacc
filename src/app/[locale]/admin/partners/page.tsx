"use client"
import { partnerDeleteAPI, partnersGetAPI, serviceDeleteAPI, servicesGetAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import moment from "moment";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Partners = () => {
    const locale = useLocale();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["partners", search],
        queryFn: async () => {
            return await partnersGetAPI({ search });
        }
    });
    const mutationDeleteNew = useMutation(
        {
            mutationFn: async (id: any) => {
                return partnerDeleteAPI({ id });
            },
            onSuccess: () => {
                queryClient.invalidateQueries(); // Ma'lumotlarni yangilash
                toast.error("Deleted Partner!");
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

                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="search" placeholder="Search . . ." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div>

                    <Link href={`/${locale}/admin/partners/add`} >
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
                            Title
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
                    {data?.data.partners.map((item: any, i: number) => (
                        <tr key={i}>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.translations[`${locale}`].title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div
                                    className=" whitespace-pre-line"
                                    style={{ whiteSpace: "pre-line" }}
                                    dangerouslySetInnerHTML={{ __html: `${item.translations[`${locale}`].desc.substring(0, 120)} ...` }}
                                />
                            </td>


                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {moment(item.createdAt).format("LLL")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <Link href={`/${locale}/admin/partners/edit/${item._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                <button className="ml-2 text-red-600 hover:text-red-900" onClick={() => handeDelete(item._id)} disabled={mutationDeleteNew.isPending}>Delete</button>
                            </td>
                        </tr>
                    )).reverse()}
                </tbody>
            </table>

        </div>
    )
}

export default Partners;