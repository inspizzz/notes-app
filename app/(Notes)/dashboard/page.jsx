'use client'

import { BackgroundSnow } from "@/components/Themes/Snow";
import { BackgroundRain } from "@/components/Themes/Rain";
import { DashboardBar } from "@/components/Global/DashboardBar";

export default function NotesDashboard() {
	return (
		<div className="w-full h-full flex flex-col gap-4 justify-center">
			<DashboardBar />
			<BackgroundRain />
			<div className="w-full h-full bg-notes_background rounded-2xl flex self-center justify-center">
				<p className="self-center">Wiktors Notes</p>
			</div>
		</div>
	)
}