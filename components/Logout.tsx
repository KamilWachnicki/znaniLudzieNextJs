import Button from "./Button";

export default function Logout() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">

                <h1 className="text-3xl font-semibold text-center mb-6 text-black">
                    Wyloguj się
                </h1>

                <p className="text-center text-gray-700 mb-6">
                    Czy na pewno chcesz się wylogować?
                </p>

                <Button type="button">
                    Wyloguj
                </Button>
            </div>
        </div>
    );
}
