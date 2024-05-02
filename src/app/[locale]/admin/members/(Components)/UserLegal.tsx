import { memberDeleteAPI, membersGetAPI } from "@/api/AdminRequest";
import Loading from "@/components/Core/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useLocale } from "next-intl";
import Link from "next/link";
import { toast } from "react-toastify";

const UserLegal = () => {
    const locale = useLocale();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["userLegal"],
        queryFn: async () => {
            return await membersGetAPI({ legal: true });
        }
    });
    const mutationDeleteNew = useMutation(
        {
            mutationFn: async (id: any) => {
                return memberDeleteAPI(id, true);
            },
            onSuccess: () => {
                queryClient.invalidateQueries(); // Ma'lumotlarni yangilash
                toast.error("Deleted Project!");
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
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization Address
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization Activity
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
                {data?.data.membersLegal.map((item: any, i: number) => (
                    <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.translations[`${locale}`].name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.translations[`${locale}`].address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.translations[`${locale}`].activity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {moment(item.createdAt).format("LLL")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                            <Link href={`/${locale}/admin/members/editlegal/${item._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                            <button className="ml-2 text-red-600 hover:text-red-900" onClick={() => handeDelete(item._id)} disabled={mutationDeleteNew.isPending}>Delete</button>
                        </td>
                    </tr>
                )).reverse()}
            </tbody>
        </table>
    )
}

export default UserLegal;