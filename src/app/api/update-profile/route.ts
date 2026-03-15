import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    // Get logged in user session
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { username,  password } = body;

    // Check if at least one field is provided
    if (!username  && !password) {
      return NextResponse.json(
        { message: "No fields provided for update" },
        { status: 400 }
      );
    }
    let hashedPassword
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }
    
    console.log("Session Username:", session.user.username);
    // Update user
    const updatedUser = await userModel.findOneAndUpdate(
      // here in database left email will check which email field in database match with session.user.email 
      { email: session.user.email },
      {
        $set: {
            username : username,
            ...(hashedPassword && { password: hashedPassword }),
        }   
    },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}