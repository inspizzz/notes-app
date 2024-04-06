'use client'

import { useUser } from "@/contexts/userContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/Global/Spinner"
import { AlreadyLoggedIn } from "@/components/User/AlreadyLoggedIn"

export default function Register() {

	const [ error, setError ] = useState([])
	const [ email, setEmail ]	 = useState("")
	const [ password, setPassword ] = useState("")
	const [ loading, setLoading ] = useState(false)

	const [ mounted, setMounted ] = useState(false)

	const { register, user } = useUser()
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
		const result = await register(email, password)

		if (result) {

			// set loading to false
			setLoading(false)
			
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
		<div className="h-full w-full">
			{
				!user ? (
					<div className="flex flex-col justify-center w-full h-full">
						<form className="self-center flex flex-col gap-3" onSubmit={submit}>

							<h1 className="self-center font-extrabold text-2xl">Register</h1>

							{
								error.length > 0 && (
									<div className="bg-red-500 text-white rounded-2xl p-2 flex flex-col">
										{error.map((e, i) => <p key={i}>{e}</p>)}
									</div>
								)
							}

							<div>
								<p>your email</p>
								<input className="rounded-2xl p-2 bg-white" type="email" placeholder="admin@admin.com" value={email} onChange={(e) => {check(e.target.value, password); setEmail(e.target.value)}} />
							</div>
							
							<div>
								<p>your password</p>
								<input className="rounded-2xl p-2 bg-white" type="password" placeholder="12345678" value={password} onChange={(e) => {check(email, e.target.value); setPassword(e.target.value)}} />
							</div>

							<button type="submit" className="rounded-2xl p-2 bg-blue-500 text-white hover:bg-blue-600 flex justify-center">{loading ? <Spinner /> : "Register"}</button>

						</form>
					</div>
				) : (
					<AlreadyLoggedIn />
				)
			}
		</div>
	) : (
		<div className="flex flex-col justify-center w-full h-full">
			<form className="self-center flex flex-col gap-3" onSubmit={submit}>

				<h1 className="self-center font-extrabold text-2xl flex justify-center gap-2">Loading <Spinner className="self-center"/></h1>

				<div>
					<p>your email</p>
					<input className="rounded-2xl p-2 bg-white" type="email" disabled />
				</div>
				
				<div>
					<p>your password</p>
					<input className="rounded-2xl p-2 bg-white" type="password" disabled />
				</div>

				<button type="submit" className="rounded-2xl p-2 bg-gray-500 text-white hover:bg-gray-600 flex justify-center" disabled>{loading ? <Spinner /> : "Login"}</button>

			</form>
		</div>
	)
}