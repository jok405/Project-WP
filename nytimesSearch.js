// SETUP VARIABLES
// ==========================================================

// API variable required for New York Times search: authentication key

var authKey = "65df1a1606f54eeabcf795508ffb7e16";

// Declared variables holding results from the user's input via HTML
var searchTerm = "";
var tenResults = 0;
var startYear = 0;
var endYear = 0;

// queryURLBase is the beginning of the API endpoint. The searchTerm will be appended to this when
// the user hits the search button
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=";

// Counter to keep track of article numbers as they come in
var articleCounter = 0;

// FUNCTIONS
// ==========================================================

// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
function runQuery(numArticles, queryURL) {

    // The AJAX function uses the queryURL and GETS the JSON data associated with it.
    // The data then gets stored in the variable called: "searchResults"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (searchResults) {

        // Logging the URL so we have access for troubleshooting protocol
        console.log("------------------------------------");
        console.log("URL: " + queryURL);
        console.log("------------------------------------");

        // Log the searchResults to console, displayed as an object
        console.log(searchResults);
        console.log("------------------------------------");

        // Loop through and provide the correct number of articles
        for (var i = 0; i < numArticles; i++) {

            // Add to the Article Counter (to show corresponding number)
            articleCounter++;

            // Create the HTML result (section) and add the article content for each
            var searchedResults = $("<div>");
            searchedResults.addClass("result");
            searchedResults.attr("id", "article-result-" + articleCounter);
            $("#result-section").append(searchedResults);

            // Confirm that the specific JSON for the article isn't missing any details
            // If the article has a headline include the headline in the HTML
            if (searchResults.response.docs[i].headline !== "null") {
                $("#article-result-" + articleCounter)
                    .append(
                        "<h3 class='articleHeadline'><span class='label label-primary'>" +
                        articleCounter + "</span><strong> " +
                        searchResults.response.docs[i].headline.main + "</strong></h3>"
                    );

                // Log the first article's headline to console
                console.log(searchResults.response.docs[i].headline.main);
            }


            if (searchResults.response.docs[i].web_url && searchResults.response.docs[i].web_url) {
                $("#article-result-" + articleCounter)
                    .append('<a href="' + searchResults.response.docs[i].web_url + '">' + searchResults.response.docs[i].web_url + '</a>');



                // Log the first article's Author to console.
                console.log(searchResults.response.docs[i].web_url);
            }


                // If the article has an abstract include the headline in the HTML
            if (searchResults.response.docs[i].abstract && searchResults.response.docs[i].abstract) {
                $("#article-result-" + articleCounter)
                    .append("<h5>" + searchResults.response.docs[i].abstract + "</h5>");

                // Log abstract to console.
                console.log(searchResults.response.docs[i].abstract);
            }



            if (searchResults.response.docs[i].pub_date && searchResults.response.docs[i].pub_date) {
                $("#article-result-" + articleCounter)

                    .append("<h5>" + searchResults.response.docs[i].pub_date + "</h5>");

                    //console.log(obj.pub_date)
                


                //    var dateString = new Date(timestamp).format("dd-MM-yyyy hh:mm");

                    /* obj = JSON.parse(searchResults.response.docs[i].pub_date)
                    var dateString = new Date(timestamp).format("dd-MM-yyyy hh:mm") */






                // Log the first article's Author to console.
                console.log(searchResults.response.docs[i].pub_date);
            }







            // If the article has a byline include the headline in the HTML
            if (searchResults.response.docs[i].byline && searchResults.response.docs[i].byline.original) {
                $("#article-result-" + articleCounter)
                    .append("<h5>" + searchResults.response.docs[i].byline.original + "</h5>");

                // Log the first article's Author to console.
                console.log(searchResults.response.docs[i].byline.original);
            }

            // Log the remaining fields to console as result
            console.log(searchResults.response.docs[i].pub_date);
            console.log(searchResults.response.docs[i].section_name);
            console.log(searchResults.response.docs[i].web_url);
            console.log(searchResults.response.docs[i].abstract);
        }
    });

}

// METHODS
// ==========================================================

// on.("click") the Search Button function
$("#run-search").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter/click on the keyboard and it registers the search
 
    event.preventDefault();

    // Initially sets the articleCounter to 0
    articleCounter = 0;

    // Clears the existing articles search results
    $("#result-section").empty();

    // Grabbing text the user typed into the search input
    searchTerm = $("#search-term").val().trim();
    var searchURL = queryURLBase + searchTerm;

    // Number of results the user would like displayed
    tenResults = $("#num-records-select").val();

    // Start Year
    startYear = $("#start-year").val().trim();

    // End Year
    endYear = $("#end-year").val().trim();

    // If the user provides a startYear -- the startYear will be included in the queryURL
    if (parseInt(startYear)) {
        searchURL = searchURL + "&begin_date=" + startYear + "0101";
    }

    // If the user provides a startYear -- the endYear will be included in the queryURL
    if (parseInt(endYear)) {
        searchURL = searchURL + "&end_date=" + endYear + "0101";
    }

    // Then we will pass the final searchURL and the number of results to
    // include to the runQuery function
    runQuery(tenResults, searchURL);
});

// This button clears the top articles section
$("#clear-all").on("click", function () {
    articleCounter = 0;
    $("#result-section").empty();
});
