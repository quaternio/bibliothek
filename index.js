const myLibrary = [];
const body = document.querySelector("#body");
const addButton = document.querySelector(".add-book"); 
const dialog = document.querySelector("dialog");
const submitBook = document.getElementById("submit-book");
const bookForm = document.getElementById("book-form");
const cancelButton = document.getElementById("cancel-button");

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

let lastAdded = null;
function addBookToLibrary(title, author, pages, haveRead) {
  myLibrary.push(new Book(title, author, pages, haveRead)); 

  let bookTile = document.createElement("div");
  bookTile.classList.add("tile");
  
  // Remove the margin under last added
  if (lastAdded)
    lastAdded.style.marginBottom = "0px";

  // Style the newest addition
  bookTile.style.border = "1px solid black";
  bookTile.style.marginBottom = "15px";

  let text = document.createElement("p");
  text.innerText = title;
  bookTile.appendChild(text);
  body.appendChild(bookTile); 

  lastAdded = bookTile;
}

function displayLibrary() {
  //myLibrary.forEach((book) => {
  //  const bookTile = document.createElement("div");
  //  bookTile.style.border = "1px solid black";
  //  bookTile.innerText = "Cool book"
  //  body.appendChild(bookTile); 
  //});
  console.log("Displaying library");
}

addButton.addEventListener("click", () => {
  dialog.showModal(); 
});

submitBook.addEventListener("click", (e) => {
  e.preventDefault();
  bookForm.reset();
  dialog.close();
});

cancelButton.addEventListener("click", () => {
  bookForm.reset();
  dialog.close();
});

for (let i = 0; i < 10; i++) {
  addBookToLibrary(`Book ${i}`, 'the guy', 1000000, true);
}

displayLibrary();
