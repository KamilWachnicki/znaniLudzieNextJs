import PageLayout from "@/components/PageLayout";
import QrCodeGenerator from "@/components/QrCodeGenerator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
        const cookieStore = await cookies();
        const token = cookieStore.get("adminToken")
        const isLoggedIn = !!token;
        if(!isLoggedIn){
            redirect("http://localhost:3000/")
        }
    return (
        <PageLayout>
            <QrCodeGenerator />
        </PageLayout>
    );
}