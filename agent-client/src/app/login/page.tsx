import { SignInForm } from "@/components/feature/sign-in"
import { Metadata } from "next"


export const metadata:Metadata = {
    title:"登录 AgentX",
    description:"AgentX"
}

const Login = () => {
    return <div className="flex justify-center items-center h-full relative z-50">
        <div className="min-w-96">
            <SignInForm />
        </div>
    </div>
}
export default Login