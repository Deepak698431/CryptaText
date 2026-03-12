import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import userModel from "@/models/user";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { content } = await req.json();

  const user = await userModel.findById(session.user._id);

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  user.message.push({
  content: content as string,
  createdAt: new Date(),
} as any);


  await user.save();

  return Response.json({ message: "Message saved successfully" });
}
