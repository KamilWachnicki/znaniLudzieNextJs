import NavButton from "./NavButton";

export default function QrCodeButton() {
    return (
        <NavButton text={"Qr Generator"} href={"/qrcode"} icon={"/qrCode.svg"}/>
    )
}