'use client'

import { useUser } from "@/contexts/userContext"
import { NotLoggedIn } from "@/components/User/NotLoggedIn"
import { useEffect, useState } from "react"
import { useHover } from "@uidotdev/usehooks"
import Link from "next/link";

import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdHome } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuFolderPlus } from "react-icons/lu";

import { useNotes } from "@/contexts/notesContext"

export default function NotesLayout({ children }) {

	const [ mounted, setMounted ] = useState(false)
	

	const { user, logout } = useUser()
	const { loading, notes, setSelectedNote } = useNotes()

	// for hovering over profile image
	const [ref, hovering] = useHover();

	useEffect(() => {
		setMounted(true)
		
	}, [])

	useEffect(() => {
		console.log("notes")
		console.log(notes)
	}, [notes])

	useEffect(() => {
		console.log("loading")
		console.log(loading)
	}, [loading])

	

	const newNote = () => {
		console.log("new note")
	}

	const newFolder = () => {
		console.log("new folder")
	}

	return (user && mounted) ? (
		<div className="bg-gray-200 p-4 h-full w-full flex flex-col justify-between gap-4">
			<div className="flex h-full gap-4">
				<div className="w-1/5 flex flex-col justify-between p-2 bg-notes_background rounded-2xl h-full min-w-64">
					<div className="self-center w-full">
						<h1 className="self-center font-extrabold text-2xl">Your Notes</h1>

						<div className="flex justify-end gap-1">
							<LuFolderPlus className="hover:bg-gray-300 hover:shadow-xl rounded-xl p-1 w-6 h-6" onClick={newFolder}/>
							<IoMdAddCircleOutline className="hover:bg-gray-300 hover:shadow-xl rounded-xl p-1 w-6 h-6" onClick={newNote}/>
						</div>

						{
							loading && (
								<p>Loading...</p>
							)
						}

						{
							notes && (
								<div className="flex flex-col gap-2">
									{
										notes.map((note, index) => {
											console.log(note)
											return (
												<div key={index} className="w-full bg-gray-200 rounded-2xl p-2 flex" onClick={() => setSelectedNote(note)}>
													<h1 className="text-xl self-center">{note.title}</h1>
												</div>
											)
										})
									}
								</div>
							)
						}
					</div>

					<div className="flex flex-col">
						<Link href={"/settings"} className="w-16 h-16 aspect-square rounded-full bg-black flex justify-center self-center cursor-pointer hover:shadow-2xl">
							<p className="self-center text-white">WW</p>
						</Link>

						<p className="self-center">{user.university}</p>
						<small className="self-center">{user.email}</small>
					</div>
				</div>

				<div className="w-full h-full flex flex-col gap-4">
					<div className="w-full flex gap-4 justify-between">
						<div className="w-full h-16 bg-notes_background rounded-2xl p-2 flex">
							<h1 className="text-3xl self-center">Notes Name</h1>
						</div>

						
						<div className="flex bg-notes_background rounded-2xl" ref={ref}>

							{
								hovering && (
									<div className="w-fit h-16 bg-notes_background rounded-2xl p-1 flex gap-4 transition-width transition-slowest ease">
										<Link href={"/"} className="aspect-square rounded-2xl bg-orange-100 hover:bg-orange-300 flex justify-center"><MdHome className="self-center text-black" /></Link>
										<Link href={"/profile"} className="aspect-square rounded-2xl bg-orange-100 hover:bg-orange-300 flex justify-center"><CgProfile className="self-center text-black" /></Link>
										<Link href={"/notes"} className="aspect-square rounded-2xl bg-orange-100 hover:bg-orange-300 flex justify-center"><CgNotes className="self-center text-black"/></Link>
										<Link href={"/settings"} className="aspect-square rounded-2xl bg-orange-100 hover:bg-orange-300 flex justify-center"><IoSettingsOutline className="self-center text-black" /></Link>
										<button className="aspect-square rounded-2xl bg-orange-100 hover:bg-orange-300 flex justify-center" onClick={logout}><MdLogout className="self-center text-black" /></button>
									</div>
								)
							}

							<div className="w-16 h-16 aspect-square flex justify-center self-center">
								<p className="self-center text-black">WW</p>
							</div>
						</div>
					</div>
					
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