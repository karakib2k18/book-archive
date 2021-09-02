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
    if (searchText == '') {
        
    //if no results found
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
    if ((data.numFound) == 0) {
        //no results found
        displayError();
    } else {
        //total length and spinner none
        document.getElementById("books-numbers").innerText = `Total Books Found ${data.numFound}`;
        document.getElementById('spinner').style.display = 'none';

        //loop for getting all data from database using arrow function and forEach loop
        const books = data.docs;
        books.forEach((book) => {
            const div = document.createElement("div");
            div.classList.add("col");

            //displayin all data using template string
            div.innerHTML = `
        <div onclick="loadMealDetail(${book.cover_i})" class="card h-100">
            <img src = " https://covers.openlibrary.org/b/id/${book?.cover_i
                }-S.jpg " class="img-fluid img-thumbnail " alt="...">
            <div class="card-body">
                <h5 class="card-title mb-3">Book Title: ${book.title ? book.title : " title Not Found"
                }</h5>
                 <p class="card-text"> Book Author: ${book.author_name ? book.author_name : "author_name not Found"
                }</p>
                 <p class="card-text"> Book First Publish Year: ${book.first_publish_year
                    ? book.first_publish_year
                    : "first_publish_year not found"
                }</p>
                <p class="card-text"> Book publisher: ${book.publisher ? book.publisher : "publisher name not Found"
                }</p>
                <p class="card-text"> Language : ${book.language ? book.language : "Language not Found"
                }</p>
            
            </div>
        </div>
        `;
            searchResult.appendChild(div);
        });
   }
};
