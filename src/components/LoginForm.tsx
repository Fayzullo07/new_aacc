"use client"
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Container from "./Core/Container";
import { useLocale } from "next-intl";

const LoginForm = () => {
    const router = useRouter();
    const locale = useLocale();
    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (!formData.login || !formData.password) {
            setError("All fields are necessary!");
            setLoading(false);
            return
        }
        try {
            const res = await signIn("credentials", {
                name: formData.login,
                password: formData.password,
                redirect: false
            });


            if (res?.error) {
                setError("Invalid Credentials");
                setLoading(false);
                return;
            }
            setLoading(false);
            router.push(`/${locale}/admin`);
        } catch (error) {
            setError("500");
            setLoading(false);
            console.log(error);

        }
    };
    return (
        <div className="text-gray-800 flex flex-col justify-center p-4 sm:py-12">
            <Container>
                <div className="relative  sm:max-w-xl mx-auto text-center">
                    <span className="text-2xl font-medium">Login Admin</span>
                    <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                        <div className="h-2 bg-maincolor rounded-t-md"></div>
                        <div className="py-6 px-8">
                            <label className="block font-semibold">Username</label>
                            <input
                                name="login"
                                type="text"
                                value={formData.login}
                                onChange={handleInputChange}
                                placeholder="Username"
                                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-green-600 rounded-md"
                            />
                            <label className="block mt-3 font-semibold">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-green-600 rounded-md"
                            />
                            <div className="flex justify-between items-baseline">
                                <button onClick={handleSubmit} disabled={loading} className={`mt-4 ${loading ? "bg-green-400 cursor-wait" : " bg-maincolor hover:px-6"} text-white py-1 px-4 duration-300 rounded-lg `}>{loading ? "Loading" : "Kirish"}</button>
                            </div>
                            {error && (

                                <div className="p-1 px-4 inline-block text-white text-base tracking-wider bg-red-500 rounded-full">{error}</div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default LoginForm;