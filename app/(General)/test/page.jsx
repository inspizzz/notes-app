export default function Test() {
	return (
		<div className="w-full h-screen flex flex-col gap-4 p-2">
			<div className="w-full h-full flex gap-4">
				<div className="w-40 max-h-[90vh] h-full bg-blue-400 p-2 overflow-y-scroll">
					{
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item, index) => (
							<div key={index} className="w-full h-16 bg-blue-400">
								<p>Test</p>
							</div>
						))
					}
				</div>

				<div className="w-full bg-blue-400">

				</div>

			</div>

			<div className="min-h-16 bg-blue-400">

			</div>
		</div>
	)
}