import userModel from "@/models/user";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        { success: false, message: "Not Authenticated" },
        { status: 401 }
      );
    }

    const userId = (session.user as any)._id;

    const user = await userModel.findById(userId);

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: user.message || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in getting messages:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
