"use client"

import { Container } from "@/components/container"
import { Heading } from "@/components/heading"
import { ListingCard } from "@/components/listings/listing-card"
import { SafeListing, SafeUser } from "@/types"

interface FavoritesPageProps {
  favorites: SafeListing[]
  currentUser?: SafeUser | null
}

export const FavoritesPage = ({
  favorites,
  currentUser,
}: FavoritesPageProps) => {
  return (
    <>
      <Container>
        <Heading
          title="Favorites"
          subtitle="List of places you have favorited!"
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {favorites.map((favorite) => (
            <ListingCard
              key={favorite.id}
              data={favorite}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  )
}
