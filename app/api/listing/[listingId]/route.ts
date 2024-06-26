import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/lib/utils"

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: {
      listingId?: string
    }
  }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return new NextResponse("Unauthorized", { status: 401 })

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID")
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}
