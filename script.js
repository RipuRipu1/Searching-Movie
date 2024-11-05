function searchMovie(){
    $('#movie-list').html('');
    $.ajax({
        url: 'https://www.omdbapi.com/',
        type: 'GET',
        datatype: 'json',
        data: {
            'apikey' : '87590e38',
            's' : $('#search-input').val()
        },
        success: function (result) {
            if(result.Response == "True"){
                let movies = result.Search;
                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                        <div class="col-md-4">
                        <div class="card">
                        <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">`+ data.Title +`</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">`+ data.Year +`</h6>
                        <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=`+data.imdbID+`>See Detail</a>
                        </div>
                        </div>
                        </div>
                    `);
                });
            } else {
                $('#movie-list').html(`
                    <div class="col">
                    <h1 class="text-center">` + result.Error + `</h1>
                    </div>
                `)
            }
        }
    });
}

$('#search-button').on('click', function () {
   searchMovie();
});

$('#search-input').on('keyup', function (e) {
    if(e.keyCode === 13) { // setiap tombol di keyboard punya kode
        searchMovie(); // 13 merupakan kode dari tombol enter
    }
})

$('movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'https://www.omdbapi.com/',
        type: 'GET',
        datatype: 'json',
        data: {
            'apikey' : '87590e38',
            'i' : $(this).data('id')
        },
        success: function(movie){
            if(movie.Response === "True"){
                $('#modal-body').html(`
                    <div class="container-fluid">
                      <div class="col-md-4">
                       <img src="`+ movie.Poster +`" class="img-fluid">
                      </div>
                      <div class="col-md-8>
                       <ul class="list-group">
                       <li class="list-group-item"><h4>`+ movie.Title +`</h4></li>
                       <li class="list-group-item">Released: `+ movie.Released +`</li>
                       <li class="list-group-item">Genre: `+ movie.Genre +`</li>
                       <li class="list-group-item">Genre: `+ movie.Director +`</li>
                       <li class="list-group-item">Genre: `+ movie.Actors +`</li>
                       </ul>
                      </div>
                `);
            }
        }
    })
})