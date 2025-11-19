import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import {cookies} from "next/headers";


export default async function AuthLoginButton() {
    const cookieStore = await cookies();
    const token = cookieStore.get("authButton")

    const isLoggedIn = !!token;
    return isLoggedIn ? <LogoutButton /> : <LoginButton />;
}