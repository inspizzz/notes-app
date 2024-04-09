'use client'

import { createContext, useContext, useCallback, useState, useEffect, useMemo } from "react"
import { useInterval } from "usehooks-ts"
import {jwtDecode} from "jwt-decode"
import { useRouter } from "next/navigation"

import PocketBase from "pocketbase"
import ms from "ms"
import { Router } from "react-router-dom"

const BASE_URL = "https://wiktor.uk:3000"

const fiveMinutesInMs = ms("5 minutes")
const twoMinutesInMs = ms("2 minutes")

const UserContext = createContext({})


export const UserProvider = ({ children }) => {

    const pb = useMemo(() => new PocketBase(BASE_URL), [])
    
    const [token, setToken] = useState(pb.authStore.token)
    const [user, setUser] = useState(pb.authStore.model)

    const router = useRouter()

	// update the token when it changes
    useEffect(() => {
        return pb.authStore.onChange((token, model) => {
          console.log({token,model})
          setToken(token)
          setUser(model)
        })
      }, [])

	/**
	 * Register a new user
	 */
    const register = useCallback(async (email, password, university="", course="") => {
        const result =  await pb.collection("users").create({ email, password, passwordConfirm: password, university, course }).then(() => {
			return true
		}).catch((err) => {
			console.log("registering errored")
			console.log(err)
			return false
		})

		return result
    }, [])

	/**
	 * Login a user
	 * 
	 * @param {string} email the email provided
	 * @param {string} password the password provided
	 * 
	 * @returns {Promise} the promise that resolves with the user model
	*/
    const login = useCallback(async (email, password) => {
        const result = await pb.collection("users").authWithPassword(email, password).then(() => {
            return true
        }).catch((err) => {
			console.log("errored")
            console.log(err)
            return false
        })

		return result
    }, [])

	/**
	 * Logout the user
	*/
    const logout = useCallback(() => {
        pb.authStore.clear()
        router.push("/")
    }, [])

	const addMailingList = useCallback(async (email) => {
		const result = await pb.collection("mailing_list").create({ email }).then(() => {
			return true
		}).catch((err) => {
			console.log("mailing list errored")
			console.log(err)
			return false
		})

		return result
	}, [])


	/**
	 * Refresh the session if the token is about to expire
	*/
    const refreshSession = useCallback(async () => {
        if (!pb.authStore.isValid) return

        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000
        if (tokenExpiration < expirationWithBuffer) {
            await pb.collection("users").authRefresh()
        }
    }, [token])

    pb.autoCancellation(false)
    
    // useInterval(refreshSession, token ? twoMinutesInMs : null)

	useEffect(() => {
		refreshSession()
	}, [])

    return (
        <UserContext.Provider
          value={{ register, login, logout, addMailingList, user, token, pb }}
        >
          {children}
        </UserContext.Provider>
      )
}


export const useUser = () => useContext(UserContext)


