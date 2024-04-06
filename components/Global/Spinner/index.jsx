import { PiSpinnerLight } from "react-icons/pi";

export function Spinner() {
	return (
		<div role="status">
			<PiSpinnerLight className="animate-spin"/>
		</div>
	)
}