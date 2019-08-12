"use strict"

// Save notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes))
}

// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem("notes")

    // Is there anything stored under notes ? Parse it, else return empty array    
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    }
    // If localstorage is messed with for instance it misses a ] then we return back an empty array with catch
    catch (e) {
        return []
    }

}

// Remove note
const removeNote = (id) => {
    // Looks through all the notes one by one and stops when it finds the note we pass in (the one that you click X on) then removes it
    const noteIndex = notes.findIndex((note) => note.id === id)    

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate DOM structure for a note: <div> <button> <span>
const generateNoteDOM = (note) => {
    const newDiv = document.createElement("a")
    const textEl = document.createElement("p")
    const status = document.createElement("p")
           
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = "Unnamed note"
    }

    textEl.classList.add("list-item__title")
    newDiv.appendChild(textEl)

    // Setup the link
    newDiv.setAttribute("href", `/edit.html#${note.id}`)
    newDiv.classList.add("list-item")

    // Setup the status message
    status.textContent = updateTime(note.updatedAt)
    status.classList.add("list-item__subtitle")
    newDiv.appendChild(status)

    return newDiv
}

// Sort notes by a new filter
const sortNotes = (notes, sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
               return 0
            }
        })
    } else if (sortBy === "alphabetical") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// Makes a new filtered array, clears <div> element, adds new <p> based on the filtered arrays.title
const renderNotes = (notes, filters) => {
    // Clears everything in the div
    const notesEl = document.querySelector("#notes")

    notes = sortNotes(notes, filters.sortBy)
    // Returns filtered notes when the filter(arg) matches the searchText input
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ""

    // Makes a new <p> inside <div> with the new filtered array and sets the text to the note's title
    if (filteredNotes.length > 0) {        
        filteredNotes.forEach((note) => {
            const newParagraph = generateNoteDOM(note)                
            notesEl.appendChild(newParagraph)
        })
    } else {
        const emptyMessage = document.createElement("p")
        emptyMessage.textContent = "No notes to show"
        emptyMessage.classList.add("empty-message")
        notesEl.appendChild(emptyMessage)
    }
    
    
    
}

const updateTime = (timeUpdate) => {
    return `Last updated ${moment(timeUpdate).fromNow()}`
}

