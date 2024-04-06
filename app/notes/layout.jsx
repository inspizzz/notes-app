'use client'

import { useUser } from "@/contexts/userContext"
import { NotLoggedIn } from "@/components/User/NotLoggedIn"

export default function NotesLayout({ children }) {

	const { user } = useUser()

	return user ? (
		<>
			{children}
		</>
	) : (
		<NotLoggedIn />
	)
}