import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from "./prismadb"

const getSession = async () => await getServerSession(authOptions)

export const getCurrentUser = async () => {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) return null

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    }
  } catch (error) {
    return null
  }
}

export const getListings = async () => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getListingById = async (params: { id?: string }) => {
  try {
    const { id } = params

    if (!id) {
      throw new Error("ID is required to fetch a listing.")
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })

    if (!listing) return null

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
