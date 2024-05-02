"use client"
import { signOut, useSession } from "next-auth/react";
import SessionData from "./SessionData";

const AdminPage = () => {

  const { data: session, status } = useSession()

  return (

    <div className="h-screen flex items-center justify-center">
      <div>

        {status === "loading" ? (
          <div>Loading...</div>
        ) : (
          <SessionData session={session} />
        )}
      </div>
    </div>
  )
}

export default AdminPage;