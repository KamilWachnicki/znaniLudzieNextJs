import NavButton from "./NavButton";

export default function LogoutButton() {
    return (
        <NavButton text={"LogoutButton"} href={"/logout"} icon={"/logout.svg"}/>
    )
}