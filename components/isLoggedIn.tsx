import Login from "@/components/login";
import Logout from "@/components/logout";
import {cookies} from "next/headers";


export default async function isLoggedIn() {
    const cookieStore = await cookies();
    const token = cookieStore.get("isLoggedIn")

    const isLoggedIn = !!token;
    return isLoggedIn ? <Logout /> : <Login />;
}