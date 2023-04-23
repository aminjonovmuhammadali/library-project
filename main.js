let LIBRARY = JSON.parse(localStorage.getItem("books")) || [];
if (LIBRARY.length > 0) displayLibrary();
// HTML elements
const addBookButton = document.querySelector(".add-btn");
const modalBox = document.querySelector(".modal");
const modalLayer = document.querySelector(".modal-layer");

// Form elements
const form = document.getElementById("addBookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const IsReadInput = document.getElementById("isRead");

addBookButton.addEventListener("click", openModal);
modalLayer.addEventListener("click", closeModal);

////////////////////////////////////////////////
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // get book info from input

  const book = {
    title: titleInput.value,
    author: authorInput.value,
    pages: pagesInput.value,
    isRead: IsReadInput.checked,
  };

  LIBRARY.push(book);
  setLibrary();
  // display book
  displayLibrary();

  closeModal();
  form.reset();
});

function openModal() {
  modalBox.classList.add("active");
  modalLayer.classList.add("active");
}

function closeModal() {
  modalBox.classList.remove("active");
  modalLayer.classList.remove("active");
}

function displayLibrary() {
  const bookCollection = document.querySelector(".book-collection");
  bookCollection.innerHTML = "";
  LIBRARY.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `
    <h2 class="book-title">"${book.title}"</h2>
    <h3 class="book-author">"${book.author}"</h3>
    <h3 class="book-pages">"${book.pages}"</h3>
    <div class="btn-group">
    <button
    onclick ="toggleRead(${index})"

    ${
      book.isRead
        ? 'class="btn btn-green">Completed'
        : 'class="btn btn-red">Not Completed'
    }</button>
      <button onclick = "deleteBook(${index})" class="btn btn-remove">Remove</button>
    </div>
    `;
    bookCollection.append(bookCard);
  });
}
function setLibrary() {
  localStorage.setItem("books", JSON.stringify(LIBRARY));
}

function toggleRead(id) {
  LIBRARY = LIBRARY.map((book, index) => {
    if (id == index) {
      return { ...book, isRead: !book.isRead };
    } else {
      return { ...book };
    }
  });

  setLibrary();
  displayLibrary();
}

function deleteBook(id) {
  LIBRARY = LIBRARY.filter((book, index) => {
    if (id !== index) {
      return true;
    } else {
      return false;
    }
  });
  setLibrary();
  displayLibrary();
}
