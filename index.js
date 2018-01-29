$(".selection_bar").on("change", function(){
var currentArticle = $(this).val();
console.log(currentArticle);
var url = "https://api.nytimes.com/svc/topstories/v2/" + currentArticle + ".json";
url += '?' + $.param({
  'api-key': "2e2eb5ed7b264d32bfc53ebd0541dd9d"
});

$.ajax({
  url: url,
  method: "GET",
})

.done(function(data) {
  console.log(data.results);
  $(".gallery").empty();

$.each(data.results.filter(function(item){return item.multimedia.length !== 0}).splice(0, 12), function(index,value){
  console.log("data.results:", value)
  var multimediaIndex = (value.multimedia.length - 1);
  var title = value.abstract;
  var image = value.multimedia[multimediaIndex].url;
  var url = value.url;
  $(".gallery").append('<a href="' + url + '" style="background-image:url(' + url + ');">' + "<h1>" + title + "</h1>" + '</a>');
})})

.fail(function(err) {
  throw "Sorry!";
});
});


// Sean's Code

// $.each(data.results.filter(function(item) { return item.multimedia.length !== 0 }).splice(0, 12), function(index, value) {
//   console.log('data.results:', value)
//   let multimediaIndex = (value.multimedia.length - 1);
//   let title = value.abstract;
//   let image = value.multimedia[multimediaIndex].url;
//   let url = value.url
//  $('.gallery').append('<a href="' + url + '" style="background-image:url(' + image + ');">' + "<h1>" + title + "</h1>" + '</a>');
// });
// });
// });