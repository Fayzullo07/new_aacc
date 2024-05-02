import AdminPage from "@/components/AdminPage";
import AuthProvider from "@/components/Core/AuthProvider";
import { auth } from "@/configs/auth";


const Admin = async () => {

    const session = await auth()
    if (session?.user) {
        session.user = {
            name: "admo",
            id: session.user.id,
        }
    }
    return (
        <AuthProvider session={session}>
            <AdminPage />
        </AuthProvider>
    )
}

export default Admin;