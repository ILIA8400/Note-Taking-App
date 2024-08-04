const $ = document;


// بخش رنگی کردن یادداشت ها

function addBoxClickListeners() {
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener("click", function() {
            let color = this.style.backgroundColor;
            if (color === "rgb(255, 229, 137)") {
                this.style.backgroundColor = "white";
            } else {
                this.style.backgroundColor = "rgb(255, 229, 137)";
            }
        });
    });
}

addBoxClickListeners();


// بخش انجام عملیات ذخیره یادداشت ها

$.querySelector("#mark").addEventListener("click", () => {
    let title = $.querySelector(".title input").value;
    const text = $.querySelector(".text textarea").value;

    const date = new Date();

    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);

    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

    if (title === "") title = "No Title";

    document.querySelector(".note-box").innerHTML += `
        <div class="col-12">
            <div class="box">
                <h5>${title}</h5>
                <h6>${formattedDate} ${formattedTime}</h6>
            </div>
        </div>`;

    $.querySelector(".title input").value = "";
    $.querySelector(".text textarea").value = "";

    addBoxClickListeners();
    sortNotesByDate();
});


// متد دسته بندی کردن بر اساس تاریخ

function sortNotesByDate() {
    let notes = Array.from(document.querySelectorAll('.note-box .box'));
    notes.sort((a, b) => {
        let dateA = parseDate(a.querySelector('h6').textContent);
        let dateB = parseDate(b.querySelector('h6').textContent);
        return dateA - dateB;
    });

    let noteBox = document.querySelector('.note-box');
    noteBox.innerHTML = "";
    notes.forEach(note => noteBox.appendChild(note));
}


// تبدیل فرمت رشته به ابجکت تاریخ

function parseDate(dateString) {
    let [datePart, timePart] = dateString.split(' ');
    let [month, day, year] = datePart.split('/');
    let [hours, minutes] = timePart.split(':');
    let ampm = timePart.split(' ')[1];

    if (ampm === 'PM' && hours !== '12') hours = parseInt(hours) + 12;
    if (ampm === 'AM' && hours === '12') hours = '00';

    return new Date(year, month - 1, day, hours, minutes);
}


// بخش پاک کردن

document.querySelector("#trash").addEventListener("click", () => {
    let notes = Array.from(document.querySelectorAll('.box'));
    notes.filter(note => {
        return note.style.backgroundColor == "rgb(255, 229, 137)";
    }).forEach(note => {
        note.style.display = "none";
    });
});


// بخش ویرایش کردن

document.querySelector("#edit").addEventListener("click", () => {
    let note = Array.from(document.querySelectorAll('.box')).find(note => note.style.backgroundColor === "rgb(255, 229, 137)");

    if (note) {
        note.style.display = 'none';

        let title = note.getElementsByTagName('h5')[0].textContent;

        document.querySelector(".title input").value = title;
    } else {
        alert('No note selected for editing.');
    }
});


// متد بخش سرچ کردن

document.querySelector('.search input').addEventListener('input', function() {
    let searchTerm = this.value.toLowerCase().trim();
    let notes = document.querySelectorAll('.box');

    notes.forEach(note => {
        let title = note.getElementsByTagName('h5')[0].textContent.toLowerCase();
        if (searchTerm !== "" && title.includes(searchTerm)) {
            note.style.backgroundColor = "rgb(255, 229, 137)";
        } else {
            note.style.backgroundColor = "white";
        }
    });
});
