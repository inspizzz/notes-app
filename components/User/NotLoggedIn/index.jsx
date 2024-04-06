'use client'

import { useUser } from "@/contexts/userContext"
import Link from "next/link"

export function NotLoggedIn() {
	

	return (
		<div className="flex flex-col justify-center h-full">
			<div className="self-center flex flex-col text-center">
				<p className="text-2xl">You are not logged in</p>
				<p className="text-lg ">You can login by clicking the <Link href={"/login"} className="text-red-600 cursor-pointer">Login</Link> button below</p>
			</div>
		</div>
	)
}