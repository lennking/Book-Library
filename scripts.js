class Library {
    #myLibrary=[];
    //store the book and its data
    add(book) {
        if (!(book instanceof Book)) {
            throw new TypeError("Library.add expects a Book");
        }
        this.#myLibrary.push(book);
    }
    //remove from library by id
    remove(id) {    
        const index = this.#myLibrary.findIndex(b => b.id===id);
        this.#myLibrary.splice(index, 1);
    }
    get books() {
        return [...this.#myLibrary];
    }
    #find(id) {
        return this.#myLibrary.find(b => b.id === id);
    }
    toggleRead(id) {
        this.#find(id)?.toggleRead();
    }
}

//const libraryContent = document.getElementById('library-content');
class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
    //change book read state
    toggleRead() {
        this.read = !this.read;
    }
}
    
//book you've had
const library = new Library();
let book1 = new Book("The Hobbit", "JRR Tolkien", 320, false);
library.add(book1);

const shelf = document.getElementById("shelf");
const form  = document.getElementById("book-form");

//add book to virtual shelf
function render() {
    shelf.innerHTML = '';
    library.books.forEach(book => {
        const card = document.createElement('div');
        card.innerHTML = `
            <button type='button' class='remove-btn'>x</button>
            <strong>${book.title}</strong><br>
            Author: ${book.author}<br>
            Pages: ${book.pages}<br>
            <label for='toggle'>Read:</label>
            <input type='checkbox' name='toggle' class='toggle' ${book.read ? "checked" : ""}>
            ${book.read ? "yes" : "no"} 
        `;
        //click x to remove book
        card.querySelector('.remove-btn')
            .addEventListener('click', () =>{
            library.remove(book.id);
            render();
        });
        card.querySelector('.toggle')
            .addEventListener('change', ()=>  {
            library.toggleRead(book.id);
            render();
        });
    shelf.appendChild(card);
    })
}

//add user's book input to library
form.addEventListener('submit', function(event) {
    event.preventDefault();
    //get book details
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="read"]:checked')?.value;
    //create new book
    const newBook = new Book(title, author, pages, read);
    library.add(newBook);
    render();
});

render();