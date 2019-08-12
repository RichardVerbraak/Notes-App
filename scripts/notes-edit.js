"use strict"

// 1. Add a DOM element between the title and body inputs (empty span)
// 2. Set text value: Last edited 4 hours ago
// 3. Update value on title/body/storage change
const lastEdited = document.querySelector("#last-edited")
const editTitle = document.querySelector("#note-title")
const editBody = document.querySelector("#note-body")
const removeButton = document.querySelector("#remove-note")
const hash = location.hash.substring(1)
let notes = getSavedNotes()



// Returns a note from notes array when the ID equals the hash (always unless you mess with localstorage/url)
let note = notes.find((note) => note.id === hash)
// This was note === undefined but this has the same meaning (truthy falsy)
if (!note) {
    location.assign("/index.html")
}

// Sets the initial text in the input to notes title & body
editTitle.value = note.title
editBody.value = note.body

lastEdited.textContent = `Last updated ${moment(note.updatedAt).fromNow()}`

// *** Event Listeners *** 

editTitle.addEventListener("input", (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    lastEdited.textContent = `Last updated ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)   
})

editBody.addEventListener("input", (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    lastEdited.textContent = `Last updated ${moment(note.updatedAt).fromNow()}`   
    saveNotes(notes)    
})

removeButton.addEventListener("click", (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign("/index.html")
})

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)      // When localstorage gets changed, we parse (make object) the newvalue and store it in notes
        let note = notes.find((note) => note.id === hash)
        
        if (!note) {
            location.assign("/index.html")
        }
        
        editTitle.value = note.title
        editBody.value = note.body

        
        lastEdited.textContent = `Last updated ${moment(note.updatedAt).fromNow()}`
    }
})

