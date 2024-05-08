"use client";
import Container from '@/components/Core/Container';
import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
    return (
        <div className="text-gray-800 flex flex-col justify-center p-4 sm:py-12">
            <Container>
                <SignIn signUpUrl='/' afterSignInUrl='/uz/admin' />
            </Container>
        </div>
    )
};

export default SignInPage;