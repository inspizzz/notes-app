'use client'

import { useNotes } from "@/contexts/notesContext"
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react';

export default function NotePage() {

	const { loading, notes, selectedNote, setSelectedNote } = useNotes()

	const [ content, setContent ] = useState()

	useEffect(() => {
		if (selectedNote) {
			setContent(selectedNote.content)
		}
	}, [selectedNote])


	return selectedNote ? (
		<div className="w-full h-full flex flex-col gap-4 justify-between">
			<div className="w-full h-full bg-notes_background rounded-2xl flex">

				{/* the numbers */}
				<div className="w-8	 h-full bg-gray-300 rounded-s-2xl flex flex-col p-1">
					<p className="self-center">1</p>
					<p className="self-center">2</p>
					<p className="self-center">3</p>
					<p className="self-center">.</p>
					<p className="self-center">.</p>
					<p className="self-center">.</p>
				</div>

				<div className="w-full h-full p-2 flex flex-col">
					{
						selectedNote && (
							<textarea className="w-full h-full bg-white rounded-2xl p-2" value={content} onChange={(e) => {
								setContent(e.target.value)
								setSelectedNote({
									...selectedNote,
									content: e.target.value
								})
							}}
							/>
						)
					}
				</div>
			</div>
		</div>
	) : (
		<div className="w-full h-full flex flex-col gap-4 justify-between">
			<div className="w-full h-full bg-notes_background rounded-2xl flex">
			</div>
		</div>
	)
}