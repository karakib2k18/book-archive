            //ternary operator
            book?.cover_i ? (imgUrl = `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`) : (imgUrl = "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg");
            
            //displayin all data using template string  and ternary operator
        div.innerHTML = `
        <div class="card h-100">
            <img src = "${book?.cover_i}" class="img-fluid" alt="image not found">
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