export default function NotePage() {
	return (
		<div className="w-full h-full flex flex-col gap-4 justify-between">
			<div className="w-full h-16 bg-notes_background rounded-2xl p-2">

			</div>

			<div className="w-full h-full bg-notes_background rounded-2xl flex">
				
				{/* the numbers */}
				<div className="w-8 h-full bg-gray-300 rounded-s-2xl flex flex-col p-1">
					<p className="self-center">1</p>
					<p className="self-center">2</p>
					<p className="self-center">3</p>
					<p className="self-center">.</p>
					<p className="self-center">.</p>
					<p className="self-center">.</p>
				</div>

				<div className="w-full h-full p-2 flex flex-col">
					
				</div>
			</div>
		</div>
	)
}