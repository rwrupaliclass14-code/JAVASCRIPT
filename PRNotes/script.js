// create a note making app, where user can create upto 150 characters note, user can also add more than one notes, and display all notes in grid view and boxes color should be different for each notes and text color should be light or dark as per box bg color and date and time of adding note.

const input_note = document.getElementById("input-note");
const input_btn = document.getElementById("input-btn");

const notes_box = document.getElementById("notes-box");

const handleCreateNote = () => {

    const value = input_note.value; // value = Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur

    // random color generation
    const color = "#" + Math.floor(Math.random() * 16581375).toString(16);

    //CREATE note box.
    const div = document.createElement("div");

    div.className = "px-3 py-3 rounded box"; // <div class="bg-warning px-3 py-3 rounded"></div>

    div.id = "note";

    div.style.backgroundColor = color;

    div.textContent = value; //<div class="bg-warning px-3 py-3 rounded"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur</div>

    notes_box.appendChild(div); // we are insert new div into notes box

    // Date and Time
    const date = new Date();

    const dateTime = document.createElement("div");
    dateTime.className = "date";

    dateTime.textContent = date.toLocaleString("en-IN");

    div.appendChild(dateTime);

    input_note.value = ""; // we are empty value of input box
};

input_btn.addEventListener("click", handleCreateNote);

