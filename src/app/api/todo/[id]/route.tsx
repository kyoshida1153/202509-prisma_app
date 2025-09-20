import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { connect } from "../route";

//インスタンスを作成
const prisma = new PrismaClient();

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const targetId: number = Number(params.id);

    await connect();
    const todos = await prisma.todo.delete({
      where: { id: targetId },
    });

    return NextResponse.json({ message: "削除成功", todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ messeage: "削除失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
