import NavButton from "./navButton";

export default function Logout() {
    return (
        <NavButton text={"Logout"} href={"/logout"} icon={"/logout.svg"}/>
    )
}