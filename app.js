var foods = ['grilled cheese', 'spaghetti', 'cheeseburger', 'chicken sandwich', 'burrito', 'taco', 'ramen', 'pork'];
var thisFood = $(this).data('name');
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisFood + "&limit=10&api_key=OnZa76OpD68ZcG12DDYV8tmyJqBg6lST";
var currentGif; var pausedGif; var animatedGif; var stillGif;


function createButtons(){
	$("#FoodButtons").empty();
	for(var i = 0; i < foods.length; i++){
		var foodBtn = $('<button>').text(foods[i]).addClass('buttons').attr({'data-name': foods[i]});
		$("#FoodButtons").append(foodBtn);
	}

$("#FoodButtons").on('click', function(){
		$('.display').empty();
    var thisFood = $(this).data('name');
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(queryURL, response) {
      console.log(queryURL);
    });

    currentGif = queryURL.data;
      $.each(currentGif, function(index,value){
        animatedGif= value.images.original.url;
        pausedGif = value.images.original_still.url;
        var thisRating = value.rating;
        //gives blank ratings 'unrated' text
        if(thisRating == ''){
          thisRating = 'unrated';
        }
        var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
        stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
        var fullGifDisplay = $('<button>').append(rating, stillGif);
        $('.display').append(fullGifDisplay);
      });
    });
  };

var thisFood = $(this).data('name');
$(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");}
});

$("#addFood").on('click', function(){
	var newFood = $('#newFoodInput').val().trim();
	foods.push(newFood);
	createButtons();
	return false;
});
