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
import { IoIosRefresh } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";



import { useNotes } from "@/contexts/notesContext"
import { NotesHelper } from "@/utils/notesHelper"

import { pb } from "@/utils/pocketbase"
import { Folder } from "./Folder"

export default function NotesLayout({ children }) {

	const [ mounted, setMounted ] = useState(false)
	const [ folders, setFolders ] = useState([])
	

	const { user, logout } = useUser()
	const { loading, notes, selectedNote, setSelectedNote, fetchNotes } = useNotes()
	const notesHelper = new NotesHelper(setFolders)

	// for hovering over profile image
	const [ref, hovering] = useHover();

	useEffect(() => {
		setMounted(true)
		
	}, [])

	useEffect(() => {
		notesHelper.loadNotes(notes)
		console.log("notes helper notes")
		setFolders(notesHelper.getBlocks())
		console.log(notesHelper.getBlocks())
	}, [notes])

	const newNote = () => {
		console.log("new note")
		pb.collection("notes").create({
			title: "New Note",
			content: "This is a new note",
			owner: user.id
		})

		fetchNotes()
	}

	const newFolder = () => {
		console.log("new folder")
	}

	const removeNote = async () => {
		await pb.collection("notes").delete(selectedNote.id)
		await fetchNotes()
		setSelectedNote(false)
	}

	const saveNote = async () => {
		await pb.collection("notes").update(selectedNote.id, {
			content: selectedNote.content
		})
		await fetchNotes()
	}

	return (user && mounted) ? (
		<div className="bg-gray-200 p-4 h-full w-full flex flex-col justify-between gap-4">
			<div className="flex h-full gap-4">
				<div className="w-1/5 flex flex-col justify-between p-2 bg-notes_background rounded-2xl h-full min-w-64">
					<div className="self-center w-full">
						<h1 className="self-center font-extrabold text-2xl">Your Notes</h1>

						<div className="flex justify-end gap-1">
							<IoIosRefresh className="hover:bg-gray-300 hover:shadow-xl rounded-xl p-1 w-6 h-6" onClick={fetchNotes}/>
							<LuFolderPlus className="hover:bg-gray-300 hover:shadow-xl rounded-xl p-1 w-6 h-6" onClick={newFolder}/>
							<IoMdAddCircleOutline className="hover:bg-gray-300 hover:shadow-xl rounded-xl p-1 w-6 h-6" onClick={newNote}/>
						</div>

						<hr className="pb-2"/>

						{
							loading && (
								<p>Loading...</p>
							)
						}

						{
							notes && (
								<div className="flex flex-col gap-2">
									{
										folders.map((folder, index) => {
											return folder.notes.length > 1 ? (
												<Folder key={index} folder={folder} setSelectedNote={setSelectedNote}/>
											) : (
												<div key={index} className="w-full bg-notes_background rounded-2xl p-1 shadow-md cursor-pointer hover:bg-gray-200" onClick={() => setSelectedNote(folder.notes[0])}>
													<h1 className="text-xl self-center">{folder.notes[0].title}</h1>
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
						<div className="w-full h-16 bg-notes_background rounded-2xl p-2 flex justify-between">
							<div className="self-center">
								<h1 className="text-3xl self-center">{selectedNote ? selectedNote.title : "Select something to edit"}</h1>
							</div>
							
							{
								selectedNote && (
									<div className="flex gap-2">
										<div className="h-full aspect-square flex justify-center" onClick={() => saveNote()}>
											<FaRegSave className="p-1 self-center w-full h-full bg-green-100 rounded-2xl hover:bg-green-200" />
										</div>

										<div className="h-full aspect-square flex justify-center" onClick={() => removeNote()}>
											<MdDelete className=" p-1self-center w-full h-full bg-red-100 rounded-2xl hover:bg-red-200" />
										</div>
									</div>
								)
							}
							
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