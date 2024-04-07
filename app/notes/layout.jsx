'use client'

import { useUser } from "@/contexts/userContext"
import { NotLoggedIn } from "@/components/User/NotLoggedIn"

export default function NotesLayout({ children }) {

	const { user } = useUser()

	return user ? (
		<div className="bg-notes_accent p-4 h-full w-full flex flex-col justify-between gap-4">
			<div className="flex h-full gap-4">
				<div className="w-1/5 flex flex-col justify-between p-2 bg-notes_background rounded-2xl h-full min-w-64">
					<div className="self-center">
						<h1 className="self-center font-extrabold text-2xl">Your Notes</h1>
						<p>load in the notes here as clickables ...</p>
					</div>

					<div className="flex flex-col">
						<div className="w-16 h-16 aspect-square rounded-full bg-black flex justify-center self-center">
							<p className="self-center text-white">WW</p>
						</div>

						<p className="self-center">Your Group Here</p>
						<small className="self-center">email.email@email.com</small>
					</div>
					

				</div>

				<div className="w-full h-full">
					{children}
				</div>

			</div>

			{/* footer */}
			<div className="rounded-full w-full bg-notes_background p-2 flex justify-center">
				<p>Legal | Contact | Something</p>
			</div>
		</div>
	) : (
		<NotLoggedIn />
	)
}