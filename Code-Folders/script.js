const projectName = 'random-quote-machine';
let quotesData;

// Define an array of colors
const colors = ['#FF5733', '#DAF7A6', '#581845', '#C70039', '#900C3F', '#581845', '#FF5733', '#DAF7A6', '#C70039', '#900C3F'];

var currentQuote = '',
  currentAuthor = '';

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  // Update the tweet and Tumblr share URLs with the new quote and author
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  $('#tumblr-quote').attr(
    'href',
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
      encodeURIComponent(currentAuthor) +
      '&content=' +
      encodeURIComponent(currentQuote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  );

  // Animate the quote text and author change
  $('.quote-text').animate({ opacity: 0 }, 600, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 600, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

  // Select a random color from the colors array
  var color = colors[Math.floor(Math.random() * colors.length)];

  // Apply the selected color to the background of the entire page
  $('html, body').animate(
    {
      backgroundColor: color,
      color: color
    },
    1000
  );

  // Optionally, animate the button color change
  $('.button').animate(
    {
      backgroundColor: color
    },
    1000
  );
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});
