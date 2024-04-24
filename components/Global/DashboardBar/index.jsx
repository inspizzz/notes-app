import Image from "next/image";

export function DashboardBar() {
	return (
		<div className="absolute bottom-5 w-full h-full flex flex-col justify-end self-center">

			<div className="w-2/12 h-16 self-center flex justify-between pt-24">
				<div className="h-16 w-16 aspect-square z-50 rounded-full border border-red-400 hover:shadow-xl">

				</div>

				<div className="h-16 w-16 aspect-square z-50 rounded-full border border-red-400 hover:shadow-xl">

				</div>
			</div>

			<div className="w-4/12 h-16 self-center flex justify-between pt-6">
				<div className="h-16 w-16 aspect-square z-50 rounded-full border border-red-400 hover:shadow-xl">

				</div>

				<div className="h-16 w-16 aspect-square z-50 rounded-full border border-red-400 hover:shadow-xl">
					
				</div>
			</div>

			<div className="w-5/12 h-16 self-center flex justify-between">
				<div className="h-16 w-16 aspect-square z-50 rounded-full border border-red-400 hover:shadow-xl">

				</div>

				<div className="h-16 w-16 aspect-square z-50 rounded-full border border-red-400 hover:shadow-xl">
					
				</div>
			</div>

		</div>
	)
}