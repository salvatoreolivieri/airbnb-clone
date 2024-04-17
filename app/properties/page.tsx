import { EmptyState } from "@/components/empty-state"
import { getCurrentUser, getListings } from "@/lib/utils"
import { PropertiesPage } from "./properties-page"

export default async function PropertiessPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const listings = await getListings({
    userId: currentUser.id,
  })

  if (!listings.length) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Look like you have no properties"
      />
    )
  }

  return (
    <>
      <PropertiesPage listings={listings} currentUser={currentUser} />
    </>
  )
}
