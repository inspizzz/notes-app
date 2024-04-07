'use client'

import { useUser } from "@/contexts/userContext"
import {useState, useEffect} from 'react'

import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdHome } from "react-icons/md";
import { CgNotes } from "react-icons/cg";


import Link from "next/link";




export function TopBar() {

	const [ mounted, setMounted ] = useState(false)
	const [ selected, setSelected ] = useState(false)

	const { user, logout } = useUser()

	useEffect(() => {
		setMounted(true)
	}, [])

	return (mounted && user) && (
		
		<div className="absolute top-0 right-0 flex flex-col gap-2 justify-end p-2">
			<div className="w-full flex justify-end">
				<div className="w-12 h-12 rounded-full flex justify-center bg-notes_background hover:shadow cursor-pointer" onClick={() => {
					setSelected(!selected)
				}}>
					{
						!selected ? (
							<p className="self-center">WW</p>
						) : (
							<MdLogout className="self-center text-black" />
						)
					}
					
				</div>
			</div>
			
			{
				selected && (
					<div className="bg-notes_background w-full rounded-2xl flex flex-col gap-1 p-1">
						<Link href={"/"} className="aspect-square rounded-2xl bg-orange-100 hover:bg-orange-300 flex justify-center"><MdHome className="self-center text-black" /></Link>
						<Link href={"/profile"} className="aspect-square rounded-2xl bg-orange-100 hover:bg-orange-300 flex justify-center"><CgProfile className="self-center text-black" /></Link>
						<Link href={"/notes"} className="aspect-square rounded-2xl bg-orange-100 hover:bg-orange-300 flex justify-center"><CgNotes className="self-center text-black"/></Link>
						<Link href={"/settings"} className="aspect-square rounded-2xl bg-orange-100 hover:bg-orange-300 flex justify-center"><IoSettingsOutline className="self-center text-black" /></Link>
						<button className="aspect-square rounded-2xl bg-orange-100 hover:bg-orange-300 flex justify-center" onClick={logout}><MdLogout className="self-center text-black" /></button>
					</div>
				)
			}
			
		</div>
	) 
}