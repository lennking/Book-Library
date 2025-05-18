const myLibrary=[];
//const libraryContent = document.getElementById('library-content');
class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
    toggleRead() {
        this.read = !this.read;
    }
}
    
//book you've had
let book1 = new Book("The Hobbit", "JRR Tolkien", 320, false);
addBookToLibrary(book1);

//add book to virtual shelf
const shelf = document.getElementById("shelf");
function appendBookToShelf(book) {
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `
        <button type='button' class='remove-btn'>x</button>
        <strong>${book.title}</strong><br>
        Author: ${book.author}<br>
        Pages: ${book.pages}<br>
        <label for='toggle'>Read:</label>
        <input type='checkbox' name='toggle' class='toggle' ${book.read ? "checked" : ""}> 
        ${book.read}
    `;
    shelf.appendChild(bookDiv);
    //x to remove book
    const removeBtn = bookDiv.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () =>{
        bookDiv.remove();
        //remove from library by id
        const index = myLibrary.findIndex(b => b.id===book.id);
        myLibrary.splice(index, 1);
        renderLibrary();
    });
    bookDiv.querySelector('.toggle').addEventListener('change', ()=>  {
        book.toggleRead();
        renderLibrary();
    });
}

//store the book and its data
function addBookToLibrary(thisBook) {
    myLibrary.push(thisBook);
}

//add user's book input to library
const form = document.getElementById('book-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    //get book details
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="read"]:checked')?.value;
    //create new book
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    renderLibrary();
});

//pull books from library and display on shelf
function renderLibrary() {
    shelf.innerHTML = '';
    myLibrary.forEach(book => appendBookToShelf(book));
    //libraryContent.textContent = JSON.stringify(myLibrary, null, 2);
}

renderLibrary();
