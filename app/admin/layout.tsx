import {
  auth,
  currentUser,
} from "@clerk/nextjs/server"

import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { userId } = await auth()

  if (!userId) {

    redirect("/sign-in")

  }

  const user = await currentUser()

  const adminEmail =
    "abhinavvamsi2004@gmail.com"

  if (
    user?.emailAddresses[0]
      ?.emailAddress !== adminEmail
  ) {

    redirect("/")

  }

  return <>{children}</>
}