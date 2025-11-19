import NavButton from "./NavButton";

export default function LogoutButton() {
    return (
        <NavButton text={"Logout"} href={"/logout"} icon={"/logout.svg"}/>
    )
}