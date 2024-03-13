const showPopup = document.querySelector('.show-popup');
const popupContainer = document.querySelector('.popup-container')
const closeBtn = document.querySelector('.close-btn')

showPopup.onclick = () => {
  popupContainer.classList.add('active')
}

closeBtn.onclick = (event) => {
  event.preventDefault()
  popupContainer.classList.remove('active')
}

const handleSubmit = (event) => {
  event.preventDefault()

  const data = new FormData(event.target)
  const formData = Object.fromEntries(data.entries())
  const jsonData = JSON.stringify(formData)
  const bookData = JSON.parse(jsonData);

  popupContainer.classList.remove('active')

  const booksKey = 'books'
  let books = JSON.parse(localStorage.getItem(booksKey)) || []
  books.push(bookData)
  localStorage.setItem(booksKey, JSON.stringify(books))

  event.target.reset()
}

const form = document.querySelector('form')
form.addEventListener('submit', handleSubmit)

const loadBooksFromLocalStorage = () => {
  const booksKey = 'books'
  const books = JSON.parse(localStorage.getItem(booksKey)) || []
  const booksContainer = document.querySelector('.container > .books')

  books.forEach(book => {
    const bookInfoDiv = document.createElement('div');
    bookInfoDiv.className = 'bookinfo';

    const bookTitle = document.createElement('h2');
    bookTitle.className = 'book__title';
    bookTitle.textContent = `${book.name}, by ${book.author}`;
    bookInfoDiv.appendChild(bookTitle);

    const pagesParagraph = document.createElement('p');
    pagesParagraph.textContent = `Number of pages: ${book.pages}`;
    bookInfoDiv.appendChild(pagesParagraph);

    const readStatusParagraph = document.createElement('p');
    readStatusParagraph.textContent = `Did you read it?: ${book.isread ? 'Yes' : 'No'}`;
    bookInfoDiv.appendChild(readStatusParagraph);

    booksContainer.appendChild(bookInfoDiv);
  })
}

document.addEventListener('DOMContentLoaded', loadBooksFromLocalStorage())
