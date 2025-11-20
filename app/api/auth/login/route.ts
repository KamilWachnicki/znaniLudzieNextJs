import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { name, password } = await req.json();

    if (!name || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Your admin user
    const adminUser = {
      name: "admin",
      // your provided hash
      passwordHash: "$2a$12$17oAQmCN2DECWAPKaUatve1K2RpyfxK1BMaimxq0CqyD9qtqITdYm",
    };

    // Username check
    if (name !== adminUser.name) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Password check
    const isPasswordValid = await bcrypt.compare(password, adminUser.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create token
    const token = jwt.sign({ name: adminUser.name }, "TEST_SECRET", {
      expiresIn: "1h",
    });

    // Set cookie
    const res = NextResponse.json({ message: "Logged in" });
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
