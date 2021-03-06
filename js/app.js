//error message and spinne display none
document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
const searchBook = () => {
    document.getElementById('error-message').style.display = 'none';
    document.getElementById("search-result").textContent = '';
    document.getElementById("books-numbers").textContent = '';

    //search then make input field blank
    const searchID = document.getElementById("search-field");
    const searchText = searchID.value;
    searchID.value = '';

        //if no results found
    if (searchText === '') {
        displayError();

    } else {
        //display spinner
        document.getElementById('spinner').style.display = 'block';

        //fetch data using url
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => displaySearchResult(data));
}
};


//error message shown in this function
const displayError = () => {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
    document.getElementById("search-result").textContent = '' ;
    document.getElementById( "books-numbers").textContent = '' ;
};

//this is for displayin all data
const displaySearchResult = (data) => {
    const searchResult = document.getElementById("search-result");
    if ((data.numFound) === 0) {
        //no results found
        displayError();
    } else {
        //total length and spinner none
        document.getElementById("books-numbers").innerText = `Total Books Found: ${data.numFound}`;
        document.getElementById('spinner').style.display = 'none';

        //loop for getting all data from database using arrow function and forEach loop
        const books = data.docs;
        books.slice(0,39).forEach((book) => {
            const div = document.createElement("div");
            div.classList.add("col");


            //ternary operator for image changing
            const imageUrl = book?.cover_i ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`
                : "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg" ;

            //displayin all data using template string
            div.innerHTML = `
        <div class="card ">
            <img src = ${imageUrl} class="img-fluid" alt="image not found" style="height: 380px;">
            <div class="card-body">
                <h5 class="card-title mb-3">Book Title: ${book.title ? book.title : " title Not Found"
                }</h5>
                 <p class="card-text">Author Name: ${book.author_name ? book.author_name : "author_name not Found"
                }</p>
                 <p class="card-text">First Publish Year: ${book.first_publish_year
                    ? book.first_publish_year
                    : "first_publish_year not found"
                }</p>
                <p class="card-text">Book publisher: ${book.publisher ? book.publisher : "publisher name not Found"
                }</p>
                <p class="card-text">Language : ${book.language ? book.language : "Language not Found"
                }</p>
            
            </div>
        </div>
        `;
            searchResult.appendChild(div);
        });
   }
};
