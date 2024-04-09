import { PiSpinnerLight } from "react-icons/pi";

export function Spinner({size="32"}) {
	return (
		<div role="status">
			<PiSpinnerLight size={size} className="animate-spin"/>
		</div>
	)
}