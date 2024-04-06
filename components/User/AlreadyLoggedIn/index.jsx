'use client'

import { useUser } from "@/contexts/userContext"

export function AlreadyLoggedIn() {
	const { logout } = useUser()

	return (
		<div className="flex flex-col justify-center h-full">
			<div className="self-center flex flex-col text-center">
				<p className="text-2xl">You are already logged in</p>
				<p className="text-lg ">You can logout by clicking the <a className="text-red-600 cursor-pointer" onClick={logout}>Logout</a> button below</p>
			</div>
		</div>
	)
}