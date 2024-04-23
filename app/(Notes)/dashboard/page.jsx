'use client'

import { BackgroundSnow } from "@/components/Themes/Snow";

export default function NotesDashboard() {
	return (
		<div className="w-full h-full flex flex-col gap-4 justify-center">
			<BackgroundSnow />
			<div className="w-full h-full bg-notes_background rounded-2xl flex self-center justify-center">
				<p className="self-center">Wiktors Notes</p>
			</div>
		</div>
	)
}