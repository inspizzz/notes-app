import Image from 'next/image';

export function Cloud() {
	return (
		<div className="h-fit w-fit z-50">
			<Image 
				src="/images/cloud.png" 
				alt="notes" 
				width={500}
				height={500}
				priority
			/>

		</div>
	)
}