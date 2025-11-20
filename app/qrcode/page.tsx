import PageLayout from "@/components/PageLayout";
import QrCodeGenerator from "@/components/QrCodeGenerator";

export default function Home() {
    return (
        <PageLayout>
            <QrCodeGenerator />
        </PageLayout>
    );
}