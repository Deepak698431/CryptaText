import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import userModel from "@/models/user";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { messageId } = body;

    if (!messageId) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    // Delete only the message from the user's messages array
    const result = await userModel.findOneAndUpdate(
      { email: session.user.email, "message._id": new ObjectId(messageId) },
      { $pull: { message: { _id: new ObjectId(messageId) } } },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Message not found or not yours" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error: any) {
    console.error("Delete Message Error:", error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}