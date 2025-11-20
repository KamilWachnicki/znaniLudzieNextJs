import TextField from "./TextField";
import Button from "./Button";

export default function Register() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">

                <h1 className="text-3xl font-semibold text-center mb-8 text-black">
                    Rejestracja
                </h1>

                <form className="flex flex-col gap-5 w-full">
                    <TextField id="name" label="Nazwa" type="text" placeholder="username" />
                    <TextField id="password" label="Hasło" type="password" placeholder="••••••••" />
                    <TextField id="confirm" label="Powtórz hasło" type="password" placeholder="••••••••" />

                    <Button type="submit">Utwórz konto</Button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Masz już konto?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Zaloguj się
                    </a>
                </p>
            </div>
        </div>
    );
}
