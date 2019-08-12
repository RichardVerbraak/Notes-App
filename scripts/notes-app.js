"use strict"

let notes = getSavedNotes()

const filters = {
    searchText: "",
    sortBy: "byEdited"
}



// Renders all the notes before searching, this is because searchText is still empty so it displays all titles
renderNotes(notes, filters)

document.querySelector("#create-note").addEventListener("click", (e) => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    
    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes(notes)    
    location.assign(`/edit.html#${id}`)
})



// Everytime the input changes, it updates the filters searchtext to the user input and THEN calls the function
// The function gives back an array of notes.titles that include the user input
const userInput = document.querySelector("#search-text").addEventListener("input", (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector("#filter-by").addEventListener("change", (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)          // You could also get the saved notes again from localstorage since they get updated
        renderNotes(notes, filters)
    }
})



