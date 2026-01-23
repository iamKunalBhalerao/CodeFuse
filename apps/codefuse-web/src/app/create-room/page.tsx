import React from 'react'
import CreateRoomCard from '@/components/CreateRoomCard'

export default function page() {
  return (
    <>
    <div className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <CreateRoomCard />
    </div>
    </>
  )
}
