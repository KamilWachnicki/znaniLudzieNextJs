import AddpplButton from "@/components/AddpplButton";
import {cookies} from "next/headers";


export default async function AuthQrCodeButton() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    const isLoggedIn = !!token;
    return isLoggedIn ? <AddpplButton /> : <div></div>;
}