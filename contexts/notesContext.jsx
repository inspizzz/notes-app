'use client'

import { createContext, useContext, useCallback, useState, useEffect, useMemo } from "react"
import PocketBase from "pocketbase"
import { useUser } from "./userContext"

const BASE_URL = "https://wiktor.uk:3000"


const NotesContext = createContext({})

export const NotesProvider = ({ children }) => {

    const pb = useMemo(() => new PocketBase(BASE_URL), [])
    
    const [ notes, setNotes ] = useState([])
	const [ selectedNote, setSelectedNote ] = useState(null)
	const [ loading, setLoading ] = useState(true)

	const { user } = useUser()

	useEffect(() => {
		fetchNotes()
	}, [])

	const fetchNotes = async () => {
	
		const notes = await pb.collection("notes").getFullList({
			filter: `owner="${user.id}"`
		})
		console.log("notes context getting all notes")
		console.log(notes)
		setNotes(notes)
		setLoading(false)
	}

	pb.autoCancellation(false)


    return (
		<NotesContext.Provider value={{ loading, notes, selectedNote, setSelectedNote, fetchNotes }}>
			{children}
        </NotesContext.Provider>
    )
}


export const useNotes = () => useContext(NotesContext)


