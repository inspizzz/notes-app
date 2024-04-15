import { Tai_Heritage_Pro } from "next/font/google"

class Note {
	constructor(note) {
		this.id = note.id
		this.title = note.title
		this.content = note.content
		this.owner = note.owner
		this.folder = note.folder
		this.created = note.created
		this.updated = note.updated
	}
}

/**
 * a class for handling folders, when the super class decides to add a folder, it will add a new NoteBlock
 */
class NoteBlock {
	constructor(note) {
		this.notes = [note]
		this.folderName = note.folder
		this.open = false
	}

	/**
	 * A function for adding a note to a note block ( folder )
	 * 
	 * @param {*} note the note to be added to this block
	 */
	addNote(note) {
		this.notes.push(note)
	}

	setOpen() {
		console.log("setting open")
		this.open = true
	}

	setClosed() {
		console.log("setting closed")
		this.open = false
	}
}


export class NotesHelper {
	constructor(setFolders) {
		this.noteBlocks = []
		this.setFolders = setFolders
	}

	/**
	 * add a note to an existing note block array
	 * @param {*} note 
	 */
	addNote(note) {
		let added = false;

		// check for existing note blocks
		this.noteBlocks.forEach((block, index) => {
			if (block.folderName === note.folder && block.folderName !== "") {
				block.addNote(note)
				added = true;
				return
			}
		})

		// add a new note block if the folder does not exist
		if (!added) this.noteBlocks.push(new NoteBlock(note))
	}

	/**
	 * a function for loading in a list of notes into note blocks
	 * @param {*} notes 
	 */
	loadNotes(notes) {

		// for each note add it to the list of noteBlocks
		notes.forEach((note, index) => {
			this.addNote(new Note(note))
		})
	}

	getBlocks() {
		return this.noteBlocks
	}
}