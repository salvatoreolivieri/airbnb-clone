"use client"

import { categories } from "@/data/categories"
import { Container } from "../container"
import { CategoryBox } from "../category-box"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense } from "react"

export const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()
  const isMainPage = pathname === "/"

  if (!isMainPage) return null

  return (
    <>
      <Container>
        <div
          className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))}
        </div>
      </Container>
    </>
  )
}
