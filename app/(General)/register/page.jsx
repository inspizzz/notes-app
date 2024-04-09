'use client'

import { useUser } from "@/contexts/userContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/Global/Spinner"
import { AlreadyLoggedIn } from "@/components/User/AlreadyLoggedIn"

/**
 * Register page
 * 
 * Student / Other
 *  - if student provide university information
 *  - if other provide job information
 * 
 * 
 */
export default function Register() {

	const [ error, setError ] = useState([])
	const [ selectType, setSelectType ] = useState("student")

	const [ university, setUniversity ] = useState("")
	const [ course, setCourse ] = useState("")
	const [ email, setEmail ] = useState("")
	const [ password, setPassword ] = useState("")
	const [ mailingList, setMailingList ] = useState(false)

	const [ loading, setLoading ] = useState(false)
	const [ mounted, setMounted ] = useState(false)

	const { register, user, addMailingList } = useUser()
	const router = useRouter()

	const check = (email, password) => {

		// reset the errors
		setError([])

		// check there is a password
		if (!password) {
			setError((err) => [...err, "Please enter an password"])
		}

		// check there is an email
		if (!email) {
			setError((err) => [...err, "Please enter an email"])
		}

		if (!email || !password) return false

		return true
	}
		
	const submit = async (e) => {
		setLoading(true)
		e.preventDefault()

		// check the fields
		if (!check(email, password)) return

		// login the user
		const result = await register(email, password, university, course)

		if (result) {

			// set loading to false
			setLoading(false)
			
			// check if the user wants to be added to the mailing list
			if (mailingList) {
				await addMailingList(email)
			}

			// redirect to home page
			router.push("/")
		} else {

			// set loading to false
			setLoading(false)
			// set the error
			setError(["Invalid, Email already in use"])
		}
	}

	useEffect(() => {
		setMounted(true)
	})

	return mounted ? (
		<div className="bg-my_bg_image w-full h-full ">
			{
				!user ? (
					<div className="flex flex-col justify-center w-full h-full">
						{
							selectType == "student" ? (
								<div className="self-center flex bg-white rounded-xl opacity-95 p-1 justify-between w-1/3 h-1/2">
									<div className="h-full w-1/4 hover:bg-notes_secondary rounded-l-2xl" onClick={() => setSelectType("business")}>
									</div>

									<form className="bg-gray-200 w-3/4 h-full p-2 rounded-e-2xl flex flex-col justify-between" onSubmit={submit}>
										<div>
											<h1 className="text-2xl font-extrabold">Student Registration</h1>

											<p>Your University?</p>
											<input type="text" className="p-2 rounded-2xl w-full" onChange={(e) => setUniversity(e.target.value)} />

											<p>Your Course</p>
											<input type="text" className="p-2 rounded-2xl w-full" onChange={(e) => setCourse(e.target.value)} />

											<div className="flex gap-2 w-full">
												<div className="w-1/2">
													<p>Your uni email?</p>
													<input type="email" className="p-2 rounded-2xl w-full" />
												</div>

												<div className="w-1/2">
													<p>And Again?</p>
													<input type="email" className="p-2 rounded-2xl w-full" onPaste={(e) => e.preventDefault()} 
													onChange={(e) => setEmail(e.target.value)}/>
												</div>
											</div>


											<div className="flex gap-2 w-full">
												<div className="w-1/2">
													<p>Your Password?</p>
													<input type="password" className="p-2 rounded-2xl w-full" />
												</div>

												<div className="w-1/2">
													<p>And Again?</p>
													<input type="password" className="p-2 rounded-2xl w-full" onPaste={(e) => e.preventDefault()} 
													onChange={(e) => setPassword(e.target.value)}/>
												</div>
											</div>
										</div>
										
										<div>
											<div className="flex gap-2">
												<input type="checkbox" onChange={(e) => setMailingList(e.target.checked)}/>
												<p>Register to newsletter</p>
											</div>
											
											<button type="submit" className="w-full rounded-2xl bg-white hover:bg-notes_secondary py-4">Submit</button>
										</div>
										
									</form>
							
								</div>
							) : (
								<div className="self-center flex bg-white rounded-xl opacity-95 p-1 justify-between w-1/3 h-1/2">
									<form className="bg-gray-200 w-3/4 h-full p-2 rounded-l-2xl flex flex-col justify-between" onSubmit={submit}>
										<div>
											<h1 className="text-2xl font-extrabold">Regular Registration</h1>

											<div className="flex gap-2 w-full">
												<div className="w-1/2">
													<p>Your Email?</p>
													<input type="email" className="p-2 rounded-2xl w-full" />
												</div>

												<div className="w-1/2">
													<p>And Again?</p>
													<input type="email" className="p-2 rounded-2xl w-full" onPaste={(e) => e.preventDefault()} />
												</div>
											</div>


											<div className="flex gap-2 w-full">
												<div className="w-1/2">
													<p>Your Password?</p>
													<input type="password" className="p-2 rounded-2xl w-full" />
												</div>

												<div className="w-1/2">
													<p>And Again?</p>
													<input type="password" className="p-2 rounded-2xl w-full" onPaste={(e) => e.preventDefault()} />
												</div>
											</div>
										</div>
										
										<div>
											<div className="flex gap-2">
												<input type="checkbox" />
												<p>Register to newsletter</p>
											</div>
											
											<button type="submit" className="w-full rounded-2xl bg-white hover:bg-notes_secondary py-4">Submit</button>
										</div>
									</form>

									<div className="h-full w-1/4 hover:bg-notes_secondary rounded-e-2xl" onClick={() => setSelectType("student")}>
									</div>
							
								</div>
							)
						}
						
					</div>
				) : (
					<AlreadyLoggedIn />
				)
			}
		</div>
	) : (
		<div className="bg-my_bg_image flex flex-col justify-center w-full h-full">
			<div className="flex flex-col justify-center self-center bg-white rounded-2xl p-4">
				<h1 className="self-center font-extrabold text-2xl">Loading ...</h1>
				<div className="self-center">
					<Spinner />
				</div>
				
			</div>
			
		</div>
	)
}