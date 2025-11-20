import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { name, password } = await req.json();

    if (!name || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Hardcoded test user (password hash of "test123")
    const testUser = {
      name: "admin",
      passwordHash: "$2a$12$17oAQmCN2DECWAPKaUatve1K2RpyfxK1BMaimxq0CqyD9qtqITdYm",
    };

    if (name !== testUser.name) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, testUser.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ name: testUser.name }, "TEST_SECRET", { expiresIn: "1h" });

    const res = NextResponse.json({ message: "Logged in (test)" });
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: false, 
      secure: false,  
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
