import { Container } from "@/components/container"
import { EmptyState } from "@/components/empty-state"
import { ListingCard } from "@/components/listings/listing-card"
import { getListings, getCurrentUser, type IParams } from "@/lib/utils"

interface HomeProps {
  searchParams: IParams
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (!listings.length) {
    return <EmptyState showReset />
  }
  return (
    <>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </>
  )
}
