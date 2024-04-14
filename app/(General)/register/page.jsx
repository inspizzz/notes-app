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

	const [ firstName, setFirstName ] = useState("")
	const [ lastName, setLastName ] = useState("")
	const [ university, setUniversity ] = useState("")
	const [ course, setCourse ] = useState("")
	const [ email, setEmail ] = useState("")
	const [ emailConfirm, setEmailConfirm ] = useState("")
	const [ password, setPassword ] = useState("")
	const [ passwordConfirm, setPasswordConfirm ] = useState("")
	const [ mailingList, setMailingList ] = useState(false)

	const [ loading, setLoading ] = useState(false)
	const [ mounted, setMounted ] = useState(false)

	const { register, user, addMailingList } = useUser()
	const router = useRouter()

	const check = (email, emailConfirm, password, passwordConfirm, firstName, lastName) => {

		// reset the errors
		setError([])
		
		let firstNameExists = true
		let lastNameExists = true
		let emailExists = true
		let emailConfirmExists = true
		let passwordExists = true
		let passwordConfirmExists = true
		let emailsMatch = true
		let passwordsMatch = true

		// check there is a name
		if (!firstName) {
			firstNameExists = false
			setError((err) => [...err, "Please enter an name"])
		}

		// check there is a surname
		if (!lastName) {
			lastNameExists = false
			setError((err) => [...err, "Please enter an surname"])
		}

		// check there is an email
		if (!email) {
			emailExists = false
			setError((err) => [...err, "Please enter an email"])
		}

		// check there is a password
		if (!password) {
			passwordExists = false
			setError((err) => [...err, "Please enter an password"])
		}

		if (!firstNameExists || !lastNameExists || !emailExists || !passwordExists) return false

		// check the email confirm exists
		if (!emailConfirm) {
			emailConfirmExists = false
			setError((err) => [...err, "Please confirm your email"])
		}

		// check the password confirm exists
		if (!passwordConfirm) {
			passwordConfirmExists = false
			setError((err) => [...err, "Please confirm your password"])
		}

		if (!emailConfirmExists || !passwordConfirmExists) return false

		// check the emails match
		if (email !== emailConfirm) {
			emailsMatch = false
			setError((err) => [...err, "Emails do not match"])
		}

		// check the passwords match
		if (password !== passwordConfirm) {
			passwordsMatch = false
			setError((err) => [...err, "Passwords do not match"])
		}

		if (!emailsMatch || !passwordsMatch) return false

		return true
	}
		
	const submit = async (e) => {
		console.log("submitting")

		setLoading(true)
		e.preventDefault()

		// check the fields
		if (!check(email, emailConfirm, password, passwordConfirm, firstName, lastName)) return

		console.log("submitting")

		// login the user
		const result = await register(email, password, university, course, firstName, lastName)

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
								<div className="self-center flex bg-white rounded-xl opacity-95 p-1 justify-between w-1/3 h-fit">
									<div className="h-full w-1/4 hover:bg-notes_secondary rounded-l-2xl" onClick={() => setSelectType("business")}>
									</div>

									<form className="bg-gray-200 w-3/4 h-full p-2 rounded-e-2xl flex flex-col justify-between gap-16" onSubmit={submit}>
										<div>
											<h1 className="text-2xl font-extrabold">Student Registration</h1>

											<div className="flex gap-2 w-full">
												<div className="w-1/2">
													<p>Your Name?</p>
													<input type="text" className="p-2 rounded-2xl w-full" onChange={(e) => setFirstName(e.target.value)} />
												</div>

												<div className="w-1/2">
													<p>Your Surname?</p>
													<input type="text" className="p-2 rounded-2xl w-full" onChange={(e) => setLastName(e.target.value)} />
												</div>
											</div>

											<p>Your University?</p>
											<input type="text" className="p-2 rounded-2xl w-full" onChange={(e) => setUniversity(e.target.value)} />

											<p>Your Course</p>
											<input type="text" className="p-2 rounded-2xl w-full" onChange={(e) => setCourse(e.target.value)} />

											<div className="flex gap-2 w-full">
												<div className="w-1/2">
													<p>Your uni email?</p>
													<input type="email" className="p-2 rounded-2xl w-full" 
													onChange={(e) => setEmail(e.target.value)}/>
												</div>

												<div className="w-1/2">
													<p>And Again?</p>
													<input type="email" className="p-2 rounded-2xl w-full" onPaste={(e) => e.preventDefault()} 
													onChange={(e) => setEmailConfirm(e.target.value)}/>
												</div>
											</div>


											<div className="flex gap-2 w-full">
												<div className="w-1/2">
													<p>Your Password?</p>
													<input type="password" className="p-2 rounded-2xl w-full" 
													onChange={(e) => setPassword(e.target.value)}/>
												</div>

												<div className="w-1/2">
													<p>And Again?</p>
													<input type="password" className="p-2 rounded-2xl w-full" onPaste={(e) => e.preventDefault()} 
													onChange={(e) => setPasswordConfirm(e.target.value)}/>
												</div>
											</div>
										</div>
										
										<div>
											<div>
												{
													error.length > 0 && (
														<div className="flex flex-col">
															{
																error.map((err) => (
																	<p className="text-red-600 h-4">{err}</p>
																))
															}
														</div>
													)
												}
											</div>

											<div className="flex gap-2">
												<input type="checkbox" onChange={(e) => setMailingList(e.target.checked)}/>
												<p>Register to newsletter</p>
											</div>
											
											<button type="submit" className="w-full rounded-2xl bg-white hover:bg-notes_secondary py-4">Submit</button>
										</div>
										
									</form>
							
								</div>
							) : (
								<div className="self-center flex bg-white rounded-xl opacity-95 p-1 justify-between w-1/3 h-fit">
									<form className="bg-gray-200 w-3/4 h-full p-2 rounded-l-2xl flex flex-col justify-between gap-32" onSubmit={submit}>
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