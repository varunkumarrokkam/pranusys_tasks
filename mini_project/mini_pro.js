const  addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button"),
statusTag = popupBox.querySelector("select");



const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;



function newtask(){
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
}


closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note, id) => {
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div>
                            <option>${note.status}</option>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}', '${note.status}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}


const del = document.getElementById("delete");
const confirmBtn = document.getElementById("confirmDelete");
const cancelBtn = document.getElementById("cancelDelete");

function openDelete(message, confirmCallback) {
    document.getElementById("deleteMessage").textContent = message;
    del.style.display = "block";

    confirmBtn.addEventListener("click", confirmCallback);
    document.getElementsByClassName("close")[0].addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeDelete);

    window.addEventListener("click", function (event) {
        if (event.target == del) {
            closeDelete();
        }
    });
}

function closeDelete() {
    del.style.display = "none";
    confirmBtn.removeEventListener("click", confirmCallback);
    cancelBtn.removeEventListener("click", closeDelete);
}

function deleteNote(noteId) {
    openDelete(
        "Are you sure you want to delete this note?",
        function () {
            notes.splice(noteId, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            showNotes();
            closeDelete();
        }
    );
}


function updateNote(noteId, title, filterDesc, status) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    isUpdate = true;
    updateId = noteId;
    
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    status.value = status;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
    popupBox.classList.add("show");
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    description = descTag.value.trim(),
    status = statusTag.value.trim();

    if(title || description || status) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();


        let noteInfo = {title, description, status, date: `${month} ${day}, ${year} `}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
    popupBox();
});


let search =document.getElementById('search')
search.addEventListener('input', ()=>{
    let inputValue = search.value.toLowerCase()
    let allNotes = document.getElementsByClassName('note');

    Array.from(allNotes).forEach((ele)=>{
        let noteText = ele.getElementsByTagName('p')[0].innerText

        if(noteText.toLowerCase().includes(inputValue)){
            ele.style.display = 'block';
        }
        else {
            ele.style.display = 'none';
        }
    })
});




let status_search =document.getElementById('status_search')
status_search.addEventListener('input', ()=>{
    let inputValue = status_search.value.toLowerCase()
    let allNotes = document.getElementsByClassName('note');

    Array.from(allNotes).forEach((ele)=>{
        let noteText = ele.getElementsByTagName('option')[0].innerText

        if(noteText.toLowerCase().includes(inputValue)){
            ele.style.display = 'block';
        }
        else {
            ele.style.display = 'none';
        }
    })
});
