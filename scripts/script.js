// First task
function concatenateString(text, maxLength) {
    if (text.length <= maxLength) 
    {
        return text.toUpperCase();
    } 
    else 
    {
        const upperText = text.substring(0, maxLength) + '…';
        return upperText.toUpperCase();
    }
}

function checkConcatenation() {
    const text = document.getElementById('text').value;
    const maxLength = parseInt(document.getElementById('maxLength').value);
    const concatenated = concatenateString(text, maxLength);
    const result = document.getElementById('result');

    result.innerHTML = '';
    
    result.append(concatenated);
    event.preventDefault();
}  

// Second task
function createTableCells(rowCount, colCount) {
    const table = document.createElement('table');
    table.innerHTML = '';
    table.id = 'newTable';

    for (let i = 0; i < rowCount; i++) {
        const row = table.insertRow();
        for (let j = 0; j < colCount; j++) {
            const cell = row.insertCell();
            cell.innerText = `row ${i + 1}, cell ${j + 1}`;
        }
    }

    const container = document.getElementById('createTableCells');
    container.append(table);
}

function createNewTable(){
    const rows = parseInt(document.getElementById('rows').value);
    const columns = parseInt(document.getElementById('columns').value);
    const previousTable = document.getElementById('newTable');
    if (previousTable) {
        previousTable.remove();
    }
    createTableCells(rows, columns);

    const thirdTask = document.getElementById('addBooks');
    if (thirdTask) {
        thirdTask.style.marginTop = 850 + (rows * 35) + 'px';
    }
}

// Third and Fourth tasks
class Book {
    constructor(title, authors, numberOfPages, isRead, isFavorite) {
        this.title = title;
        this.authors = authors;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
    }

    markAsRead() {
        this.isRead = true;
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }
}

let bookInstance = new Book('LalaLend', 'Brown, Tim del Ray', 200, false, false);

class Bookshelf {
    constructor(books) {
        this.books = books;
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index >= 0) {
            this.books.splice(index, 1);
        } else {
            console.error('Book not found in the shelf.');
        }
    }

    getUnreadBooks() {
        return this.books.filter((book) => !book.isRead);
    }

    getFavBooks() {
        return this.books.filter((book) => book.isFavorite);
    }
}

let shelf = new Bookshelf([]);

function numberTotalBooks() {
    const amountOfB = document.getElementById('amountOfB');
    amountOfB.textContent = shelf.books.length;
}

function getUnreadBooks(){
    const unreadButton = shelf.getUnreadBooks();
    alert(`Number of unread books: ${unreadButton.length}`);
}

function getFavBooks(){
    const favBooks = shelf.getFavBooks();
    alert(`Number of favorite books: ${favBooks.length}`);
}

function addNewBook() {
    const titleInput = document.getElementById('titleB');
    const authorInput = document.getElementById('authorB');
    const pagesInput = document.getElementById('pagesB');

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = parseInt(pagesInput.value);

    const newBook = new Book(title, author, pages, false, false);
    shelf.addBook(newBook);
    numberTotalBooks();

    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
}

function showBookshelf() {
    const bookshelfBlock = document.getElementById('bookshelf');
    bookshelfBlock.innerHTML = '';

    for (let i = 0; i < shelf.books.length; i++) {
        const book = shelf.books[i];

        const bookDiv = document.createElement('div');
        bookDiv.classList.add('bookDiv');

        const titleP = document.createElement('p');
        titleP.textContent = `Title: ${book.title}`;
        bookDiv.append(titleP);

        const authorsP = document.createElement('p');
        authorsP.textContent = `Authors: ${book.authors}`;
        bookDiv.append(authorsP);

        const pagesP = document.createElement('p');
        pagesP.textContent = `Pages: ${book.numberOfPages}`;
        bookDiv.append(pagesP);

        const favoriteP = document.createElement('p');
        favoriteP.textContent = `Favorite: ${book.isFavorite ? 'true' : 'false'}`;
        bookDiv.append(favoriteP);

        const isReadP = document.createElement('p');
        isReadP.textContent = `Is Read: ${book.isRead ? 'true' : 'false'}`;
        bookDiv.append(isReadP);

        const divButtons = document.createElement('div');
        divButtons.id = 'divB';

        const toggleFavB = document.createElement('button');
        toggleFavB.textContent = 'Toggle Favorite';
        toggleFavB.className = 'buttons2';
        toggleFavB.addEventListener('click', () => {
            book.toggleFavorite();
            showBookshelf();
        });
        divButtons.append(toggleFavB);

        const toggleIsRead = document.createElement('button');
        toggleIsRead.textContent = 'Toggle isRead';
        toggleIsRead.className = 'buttons2';
        toggleIsRead.addEventListener('click', () => {
            book.markAsRead();
            showBookshelf();
        });
        divButtons.append(toggleIsRead);

        const removeBookB = document.createElement('button');
        removeBookB.textContent = 'Remove Book from Shelf';
        removeBookB.className = 'buttons';
        removeBookB.addEventListener('click', () => {
            shelf.removeBook(book);
            showBookshelf();
            numberTotalBooks();
        });
        divButtons.append(removeBookB);

        bookDiv.append(divButtons);
        bookshelfBlock.append(bookDiv);
    }
}