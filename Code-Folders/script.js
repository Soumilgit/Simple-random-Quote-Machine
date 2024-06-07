
const projectName = 'random-quote-machine';
let quotesData;

var colors = [
  '#8A2BE2',
  '#00FFFF',
  '#A52A2A',
  '#5F9EA0',
  '#7FFF00',
  '#FF7F50',
  '#6495ED',
  '#DC143C',
  '#00008B',
  
  '#B8860B',
  '#FF8C00',
  '8B008B',
  '#556B2F',    
     
  '#483D8B'
];

var currentQuote = '',
  currentAuthor = '';

function fetchRandomQuote() {
  $('#loading-spinner').show();
  fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
  .then(response => response.json())
  .then(data => {

      $('#loading-spinner').hide();
      const quote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
      currentQuote = quote.quote;
      currentAuthor = quote.author;
      updateUI(quote); 
    })
  .catch(error => {
      console.error('Error fetching quote:', error);
      $('#loading-spinner').show();
    });
}

function updateUI(quoteObj) {
  
  
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
  
  
   $('.quote-text').text(currentQuote);
  $('.quote-author').text('- ' + currentAuthor);
  $('.quote-text,.quote-author').fadeOut(function() {
    /* $(this).text(quoteObj.quote + ' - ' + quoteObj.author); */
    // Fade in the new quote
    $(this).fadeIn();
  });

  
  var color = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = color; 
  document.body.style.color = color; 
  $('.button').css('background-color', color); 
}
function changeTheme(color) {
  document.body.style.backgroundColor = color;
  document.body.style.color = color;
  $('.button').css('background-color', color);
}

document.getElementById("new-quote").addEventListener("click", fetchRandomQuote);


changeTheme('#8A2BE2'); 

  


document.getElementById("new-quote").addEventListener("click", fetchRandomQuote);


fetchRandomQuote();
