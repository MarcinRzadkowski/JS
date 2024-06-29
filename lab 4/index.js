const notesContainer = document.getElementById('notesContainer');

document.addEventListener('DOMContentLoaded', displayNotes);

function getNotes() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const color = document.getElementById('noteColor').value;
    const pin = document.getElementById('notePin').checked;
    const date = new Date().toISOString();

    const note = { title, content, color, pin, date };
    const notes = getNotes();
    notes.push(note);
    saveNotes(notes);
    displayNotes();
    clearForm();
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    displayNotes();
}

function clearForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteColor').value = '#ffffff';
    document.getElementById('notePin').checked = false;
}

function displayNotes() {
    const notes = getNotes();
    notesContainer.innerHTML = '';

    notes.sort((a, b) => b.pin - a.pin); 

    notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.style.backgroundColor = note.color;

    const noteTitle = document.createElement('h3');
    noteTitle.textContent = note.title;

    const noteContent = document.createElement('p');
    noteContent.textContent = note.content;

    const noteDate = document.createElement('small');
    noteDate.textContent = new Date(note.date).toLocaleString();

    const noteActions = document.createElement('div');
    noteActions.classList.add('note-actions');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteNote(index);

    noteActions.appendChild(deleteButton);
    noteElement.appendChild(noteTitle);
    noteElement.appendChild(noteContent);
    noteElement.appendChild(noteDate);
    noteElement.appendChild(noteActions);

    notesContainer.appendChild(noteElement);
    });
}