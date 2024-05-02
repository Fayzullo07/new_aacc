import LoginForm from '@/components/LoginForm';
import { auth } from '@/configs/auth';
import { redirect } from 'next/navigation';


const Login = async () => {
    const session = await auth();
    if (session) redirect("/uz/admin");

    return <LoginForm />
};

export default Login;
