'use strict';

(function ($) {
  'use strict';

  //IIFE function

  $(function () {

    $('.selection_bar').change(function () {
      $('.newsgrid').empty();
      // Adding classes to adjust header when selecting an article section from form
      $('header').addClass('header-after');
      $('.logocontainer div').addClass('logoafter');
      // Creates the loading wheel
      $('.newsgrid').append('<div class="loading"><img src="./images/ajax-loader.gif"></div>');
      var currentArticle = $(this).val();
      // creating a variable to link to api
      var url = "https://api.nytimes.com/svc/topstories/v2/" + currentArticle + ".json";
      url += '?' + $.param({
        'api-key': "GAGjUZzA4sBuKEBwhdIDPpjpcuDc2LCR"
      });

      $.ajax({
        url: url,
        method: 'GET'
      })
      // what we run to actually grab the articles
      .done(function (result) {
        result = result.results;
        console.log(result);

        result.filter(function (result) {
          if (result.multimedia.length !== 0) {
            return result;
          }
        }).slice(0, 12).forEach(function (result) {
          $('.newsgrid').append('<div class="story-items"><a href="' + result.url + '" target="_blank"><img src="' + result.multimedia[result.multimedia.length - 1].url + '"><p>' + result.abstract + '</p></a></div>');
        });
      })
      // in case of an error
      .fail(function (err) {
        $('.newsgrid').append('<p class="error-message">Sorry! Please try again another time.</p>');
        throw err;
      })
      // when the function is complete, we remove the loading wheel
      .always(function () {
        $('.loading').remove();
      }); //ajax close
    }); // close section_bar
  }); // IIFE function
})(jQuery); // document ready