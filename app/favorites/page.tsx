import { FavoritesPage } from "./favorites-page"

import { EmptyState } from "@/components/empty-state"
import { getCurrentUser, getFavoritesListing } from "@/lib/utils"

export default async function Favorites() {
  const currentUser = await getCurrentUser()
  const favoritesItems = await getFavoritesListing()

  if (!favoritesItems.length) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite properties"
      />
    )
  }

  return (
    <>
      <FavoritesPage favorites={favoritesItems} currentUser={currentUser} />
    </>
  )
}
