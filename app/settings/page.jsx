
'use client'

// hooks
import { useHover } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

import { Popup } from "@/components/Global/Popup";

// icons
import { IoCloudUploadOutline } from "react-icons/io5";
import { useUser } from "@/contexts/userContext";


export default function SettingsPage() {

	// for hovering over profile image
	const [ref, hovering] = useHover();

	// for mounting the component
	const [ mounted, setMounted ] = useState(false)

	// for uploading images
	const [ uploading, setUploading ] = useState(false)
	const [ selectedImage, setSelectedImage ] = useState(null);

	// for changing username
	const [ changingUsername, setChangingUsername ] = useState(false)
	const [ newUsername, setNewUsername ] = useState("")

	// the user data
	const { user, logout } = useUser()

	useEffect(() => {
		setMounted(true)
	})

	const updateUsername = (e) => {
		e.preventDefault()
		

		// update the username


		// reset the state
		setChangingUsername(false)
		setNewUsername("")
	}

	return (user && mounted) && (
		<div className="bg-my_bg_image h-full w-full">
			{/* Image Upload */}
			<Popup trigger={uploading} setTrigger={setUploading}>
				<div className="bg-notes_background p-4 rounded-2xl">
					<h1>Select a new profile image</h1>

					{
						selectedImage && (
							<div>
								<img alt="not found" src={URL.createObjectURL(selectedImage)} />
								<button onClick={() => setSelectedImage(null)}>Remove</button>
							</div>
						)
					}

					<input
						type="file"
						name="myImage"
						onChange={(event) => {
							console.log(event.target.files[0]);
							setSelectedImage(event.target.files[0]);
						}}
					/>
				</div>
			</Popup>

			{/* Username Change */}
			<Popup trigger={changingUsername} setTrigger={setChangingUsername}>
				<form className="bg-notes_background p-4 rounded-2xl flex flex-col gap-2" onSubmit={updateUsername}>
					<h1>Change username</h1>
					
					<br />

					<div className="flex flex-col gap-1">
						<p>New Username</p>
						<input type="text" className="p-2 rounded-full" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
						<button className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full">Change</button>
					</div>
				</form>
			</Popup>

			<div className="h-full w-full flex justify-center">
				<div className="self-center bg-notes_background p-2 rounded-2xl w-1/3 min-w-96">
					<p className="text-2xl text-center">Account Settings</p>


					{/* User Settings */}
					<div className="flex flex-col gap-2 shadow-lg">

						<p className="text-xl text-center">User Settings</p>

						<div className="flex gap-2 p-2">
							<div className="w-24 h-24 rounded-full bg-notes_background flex justify-center shadow aspect-square hover:bg-gray-200 hover:cursor-pointer" ref={ref} onClick={() => setUploading(true)}>
								{
									hovering ? (
										<IoCloudUploadOutline className="self-center" />
									) : (
										<p className="self-center">WW</p>
									)
								}
							</div>

							<div className="p-2 flex flex-col gap-1">
								<p className="rounded-full w-full bg-slate-200 px-4 py-1 flex justify-center hover:bg-slate-300" onClick={() => setUploading(true)}>upload new photo</p>
								<p className="rounded-full w-full bg-slate-200 px-4 py-1 flex justify-center hover:bg-red-200">delete photo</p>
							</div>
						</div>

						{/* general information */}
						<div className="flex flex-col gap-2 p-2">
							<div className="flex gap-2">
								<div className="w-1/2">
									<p>email</p>
									<p className="px-4 py-2 bg-slate-300 rounded-full overflow-x-scroll scrollbar-none text-gray-500">{user.email}</p>
								</div>

								<div className="w-1/2">
									<p>username</p>
									<p className="px-4 py-2 bg-slate-300 rounded-full overflow-scroll scrollbar-none text-gray-500">{user.username}</p>
								</div>
							</div>

							<button className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full" onClick={() => setChangingUsername(true)}>Change Username</button>
						</div>


						{/* delete account */}
						<div className="flex flex-col gap-2 p-2">
							<button className="p-2 bg-gray-300 hover:bg-gray-400 text-white rounded-full" onClick={logout}>Log out</button>
							<button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full">Delete Account</button>
						</div>

					</div>

					{/* User Settings */}
					<div className="flex flex-col gap-2 shadow-lg">

						<p className="text-xl text-center">Other Settings</p>

						<p>display username publicly?</p>
						<p>display email publicly?</p>
					</div>

				</div>
			</div>
		</div>
	)
}	