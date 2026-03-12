import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import userModel from "@/models/user";
import dbConnect from "@/lib/dbConnect";

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { messageId, content , createdAt } = body;

    
    if (!messageId || !content?.trim()) {
      return NextResponse.json({ error: "Message ID and content are required" }, { status: 400 });
    }

    const result = await userModel.findOneAndUpdate(
    {  "message._id": new ObjectId(messageId), "email": session.user.email },
    {
    $set: {
      "message.$.content": content,
      "message.$.updatedAt": new Date(createdAt),
    },
    },
    { new: true } // return the updated document
    );
    if (!result) {
    return NextResponse.json(
        { error: "Message not found or not yours" },
        { status: 404 }
    );
    }

    return NextResponse.json({ message: "Message updated successfully" });
  } catch (error: any) {
    console.error("Update Message Error:", error);
    return NextResponse.json({ error: error?.message || "Something went wrong" }, { status: 500 });
  }
}