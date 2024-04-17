import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/lib/utils"

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: {
      reservationId?: string
    }
  }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return new NextResponse("Unauthorized", { status: 401 })

  const { reservationId } = params

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID")
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        {
          userId: currentUser.id,
        },
        {
          listing: {
            userId: currentUser.id,
          },
        },
      ],
    },
  })

  return NextResponse.json(reservation)
}
