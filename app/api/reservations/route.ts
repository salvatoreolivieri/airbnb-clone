import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/lib/utils"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return new NextResponse("Unauthorized", { status: 401 })

  const body = await request.json()
  const { listingId, startDate, endDate, totalPrice } = body

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return new NextResponse("Missing parameters", { status: 400 })
  }

  try {
    const listingAndReservation = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    })

    return new NextResponse(JSON.stringify(listingAndReservation))
  } catch (error) {
    console.error("Error creating reservation:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
