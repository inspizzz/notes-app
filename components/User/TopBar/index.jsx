'use client'

import { useUser } from "@/contexts/userContext"
import {useState, useEffect} from 'react'
import { MdLogout } from "react-icons/md";


export function TopBar() {

	const [ mounted, setMounted ] = useState(false)
	const { user, logout } = useUser()

	useEffect(() => {
		setMounted(true)
	}, [])

	return user && (

		<div className="w-full h-10 absolute top-0 left-0 right-0 flex justify-center">
			<div className="w-full flex justify-between items-center bg-black p-2">
				<div className="">

				</div>

				<div>
					
				</div>

				<div className="">
					<a className="text-white px-4 py-2 rounded" onClick={() => logout()}><MdLogout /></a>
				</div>
				
			</div>
		</div>
	) 
}