
'use client'

// hooks
import { useHover } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

import { Popup } from "@/components/Global/Popup";

// icons
import { IoCloudUploadOutline } from "react-icons/io5";
import { useUser } from "@/contexts/userContext";

import { useDropzone } from 'react-dropzone';

// pocketbase
import { pb } from "@/utils/pocketbase"


export default function SettingsPage() {

	// for hovering over profile image
	const [ref, hovering] = useHover();

	// for mounting the component
	const [mounted, setMounted] = useState(false)

	// for uploading images
	const [uploading, setUploading] = useState(false)
	const [uploadHovering, setUploadHovering] = useState(false)
	const [uploadedFiles, setUploadedFiles] = useState([]);

	// for changing username
	const [changingUsername, setChangingUsername] = useState(false)
	const [newUsername, setNewUsername] = useState("")

	// the user data
	const { user, logout, refreshSession, getImage, imageUrl } = useUser()

	// drop file data
	const { getRootProps, getInputProps } = useDropzone({
		onDragOver: () => {
			console.log("over")
			setUploadHovering(true)
		},
		onDragLeave: () => {
			setUploadHovering(false)
		},
		onDrop: (acceptedFiles) => {
			setUploadedFiles(acceptedFiles)
			setUploadHovering(false)
		},
	})

	useEffect(() => {
		setMounted(true)
	})

	useEffect(() => {
		console.log("image has changed")
		console.log(imageUrl)
	}, [imageUrl])

	const upload = async () => {
		console.log("uploading")
		if (uploadedFiles.length == 0) return;

		const formData = new FormData();
		formData.append('avatar', uploadedFiles[0]);

		await pb.collection("users").update(user.id, formData)

		setUploadedFiles([])
		setUploadHovering(false)
		setUploading(false)

		const sleep = ms => new Promise(r => setTimeout(r, ms));
		await sleep(5000);

		// update the user
		await refreshSession()
		getImage()
	}

	const updateUsername = (e) => {
		e.preventDefault()

		if (newUsername == "") return;

		// update the username
		pb.collection("users").update(user.id, {
			username: newUsername
		})

		// reset the state
		setChangingUsername(false)
		setNewUsername("")

		refreshSession()
	}

	const deleteProfile = async () => {
		await pb.collection("users").update(user.id, {
			avatar: null
		})

		await refreshSession()
		getImage()
	}

	return (user && mounted) && (
		<div className="bg-my_bg_image h-full w-full">
			{/* Image Upload */}
			<Popup trigger={uploading} setTrigger={setUploading}>
				<div className="bg-notes_background p-4 rounded-2xl flex flex-col gap-2">
					<h1 className="text-2xl font-extrabold">Select a profile image</h1>

					{
						uploadedFiles.length == 0 && (
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<p className={!uploadHovering ? "py-8 px-2 border border-black border-dashed rounded-2xl hover:bg-slate-200 flex justify-center" : "py-8 px-2 border border-black border-dashed rounded-2xl bg-slate-200 flex justify-center"}>Drag and drop files here or click to browse.</p>
							</div>
						)
					}
					
					{
						uploadedFiles.map((file) => (
							<div key={file.name}>
								<img src={URL.createObjectURL(file)} alt={file.name} />
								<p>{file.name}</p>
							</div>
						))
					}

					{
						uploadedFiles && (
							<div className="flex gap-2">
								<button className="bg-red-200 px-4 py-2 rounded-2xl hover:bg-red-300 hover:shadow-lg" onClick={() => {
									setUploadedFiles([])
									setUploadHovering(false)
								}}>Remove</button>
								<button className="bg-green-200 px-4 py-2 rounded-2xl hover:bg-green-300 hover:shadow-lg" onClick={upload}>Upload</button>
							</div>
						)
					}
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
				<div className="self-center bg-notes_background p-2 rounded-2xl w-1/3 min-w-96 flex flex-col gap-4">
					<p className="text-2xl text-center">Account Settings</p>


					{/* User Settings */}
					<div className="flex flex-col gap-2 shadow-lg rounded-2xl">

						<p className="text-xl text-center">User Settings</p>

						<div className="flex gap-2 p-2 justify-center">
							<div className="w-24 h-24 rounded-full bg-notes_background flex justify-center shadow aspect-square hover:bg-gray-200 hover:cursor-pointer" ref={ref} onClick={() => setUploading(true)}>
								{
									hovering ? (
										<IoCloudUploadOutline className="self-center" />
									) : (
										<img src={imageUrl} className="self-center rounded-full w-full h-full p-1" onerror='this.remove()'/>
									)
								}
							</div>

							<div className="p-2 flex flex-col gap-1">
								<p className="rounded-full w-full bg-slate-200 px-4 py-1 flex justify-center hover:bg-slate-300" onClick={() => setUploading(true)}>upload new photo</p>
								<p className="rounded-full w-full bg-slate-200 px-4 py-1 flex justify-center hover:bg-red-200" onClick={deleteProfile}>delete photo</p>
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
							<button className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full" onClick={() => setChangingUsername(true)}>Change Password</button>
						</div>
					</div>

					{/* User Settings */}
					<div className="flex flex-col gap-2 shadow-lg rounded-2xl">

						<p className="text-xl text-center">Other Settings</p>

						<p>display username publicly?</p>
						<p>display email publicly?</p>

						{/* delete account */}
						<div className="flex flex-col gap-2 p-2">
							<button className="p-2 bg-gray-300 hover:bg-gray-400 text-white rounded-full" onClick={logout}>Log out</button>
							<button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full">Delete Account</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}	