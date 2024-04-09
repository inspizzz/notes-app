'use client'

import { useUser } from "@/contexts/userContext"
import Link from "next/link"
import { useEffect, useState } from "react"



export default function Home() {

	const [ mounted, setMounted ] = useState(false)

	const { user } = useUser()

	useEffect(() => {
		setMounted(true)
	})

	return mounted ? (
		<div className="bg-my_bg_image h-full w-full flex justify-center">
			{
				!user ? (
					<div className="self-center flex flex-col gap-4 justify-center pb-40">
						<p className="font-extrabold text-3xl self-center">Wiktors Notes App</p>
						
						<div className="w-full flex gap-4 self-center justify-center">
							<Link href={"/login"} className="w-1/2 self-center bg-notes_primary py-4 rounded-xl flex justify-center" ><p className="self-center">Login</p></Link>
							<Link href={"/register"} className="w-1/2 self-center bg-notes_secondary py-4 rounded-xl flex justify-center"><p className="self-center">Register</p></Link>
						</div>
					</div>
				) : (
					<div className="self-center flex flex-col gap-4 justify-center pb-40">
						<p className="font-extrabold text-3xl self-center">Wiktors Notes</p>
						
						<div className="flex gap-4 self-center">
							<Link href={"/notes"} className="w-1/2 bg-notes_primary py-4 rounded-xl" >Notes</Link>
							<Link href={"/notes/create"} className="w-1/2 bg-notes_secondary py-4 rounded-xl">Create Not</Link>
						</div>
					</div>
				)
			}
			
		</div>
	) : (
		<>
			loading ...
		</>
	)
}
