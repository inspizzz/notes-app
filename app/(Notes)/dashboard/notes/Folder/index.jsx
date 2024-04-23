'use client'

import { useState } from "react"

import { FaFolderPlus } from "react-icons/fa6";
import { FaFolderMinus } from "react-icons/fa6";



export function Folder({ folder, setSelectedNote }) {
	const [ open, setOpen ] = useState(folder.open)

	return open ? (
		<div className="w-full bg-notes_background rounded-2xl p-1 flex flex-col shadow-md">
			<div className="flex gap-2 cursor-pointer w-full" onClick={() => setOpen(false)}>
				<FaFolderMinus className="self-center"/>
				<h1 className="text-xl self-center">{folder.folderName}</h1>
			</div>

			<div className="flex flex-col gap-1">
				{
					folder.notes.map((note, index) => {
						return (
							<div key={index} className="w-full bg-notes_background rounded-2xl p-1 shadow-md cursor-pointer hover:bg-gray-200" onClick={() => setSelectedNote(note)}>
								<h1 className="text-xl self-center">{note.title}</h1>
							</div>
						)
					})
				}
			</div>
		</div>
	) : (
		<div className="w-full bg-notes_background rounded-2xl p-1 flex shadow-md hover:bg-gray-200">
			<div className="flex gap-2 cursor-pointer w-full" onClick={() => setOpen(true)}>
				<FaFolderPlus className="self-center"/>
				<h1 className="text-xl self-center">{folder.folderName}</h1>
			</div>
		</div>
	)
}