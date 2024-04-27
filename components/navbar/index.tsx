"use client"

import { SafeUser } from "@/types"

import { Container } from "../container"
import { Logo } from "./logo"
import { Categories } from "./categories"
import { Search } from "./search"
import { UserMenu } from "./user-menu"
import { Suspense } from "react"

interface NavbarProps {
  currentUser?: SafeUser | null
}

export const Navbar = ({ currentUser }: NavbarProps) => {
  // Add some functions here...

  return (
    <>
      <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className=" py-4 border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />

              <Suspense>
                <Search />
              </Suspense>

              <UserMenu currentUser={currentUser} />
            </div>
          </Container>
        </div>

        <Suspense>
          <Categories />
        </Suspense>
      </div>
    </>
  )
}
