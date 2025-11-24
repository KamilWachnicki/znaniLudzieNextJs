import QrCodeButton from "@/components/QrCodeButton";
import {cookies} from "next/headers";


export default async function AuthQrCodeButton() {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")

    const isLoggedIn = !!token;
    return isLoggedIn ? <QrCodeButton /> : <div></div>;
}