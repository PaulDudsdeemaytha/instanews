(function ($) {
  'use strict';

  //IIFE function
  $(function(){

    $('.selection_bar').change(function () {
      $('.newsgrid').empty();

      $('header').addClass('header-after');
      $('.logo').addClass('logo-after').removeClass('logo');


      $('.newsgrid').append('<div class="loading"><img src="./images/ajax-loader.gif"></div>');
      var currentArticle = $(this).val();

      var url = "https://api.nytimes.com/svc/topstories/v2/" + currentArticle + ".json";
          url += '?' + $.param({
              'api-key': "2e2eb5ed7b264d32bfc53ebd0541dd9d"
              });

        $.ajax({
          url: url,
          method: 'GET'
        })

        .done(function (result) {
          result = result.results;
          console.log(result);
  
          result.filter(function(result){
            if (result.multimedia.length !== 0){
              return result;
            }
          }).slice(0,12).forEach(function(result){
            $('.newsgrid').append('<div class="story-items"><a href="' + result.url + '" target="_blank"><img src="' + result.multimedia[result.multimedia.length-1].url + '"><p>' + result.abstract + '</p></a></div>');
          });
        })
        .fail(function (err) {
          $('.newsgrid').append('<p class="error-message">Sorry! Please come back later.</p>');
          throw err;
        })
        
        .always(function () {
          $('.loading').remove();
        }); //ajax close
    
    }); // close section_bar
  });// IIFE function
} (jQuery)); // document ready