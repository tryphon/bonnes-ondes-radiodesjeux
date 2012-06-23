function twitter_bar() {
    return $$('#sidebar div.twitter').first();
}

Event.observe(window, "load", function() {
  if (twitter_bar()) {
    var twitter_search_script = document.createElement('script');
	  twitter_search_script.setAttribute("type","text/javascript");

	  twitter_search_script.setAttribute("src", "http://twitter.com/statuses/user_timeline/improbablepodca.json?callback=display_tweets&count=7");

	  $$("body").first().insert({ "after": twitter_search_script });
  }
});

function display_tweets(tweets) {
  var tweets_in_html = "<ul>" +
    $(tweets).collect(function(element) {
      return "<li>" + format(element.text) + "</li>";
    }).join('') + "</ul>";
  twitter_bar().insert(tweets_in_html);
}

function format(str) {
	str=' '+str;
	str = str.replace(/((ftp|https?):\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?)/gm,'<a href="$1" target="_blank">$1</a>');
	str = str.replace(/([^\w])\@([\w\-]+)/gm,'$1@<a href="http://twitter.com/$2" target="_blank">$2</a>');
	str = str.replace(/([^\w])\#([\w\-]+)/gm,'$1<a href="http://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
	return str;
}

