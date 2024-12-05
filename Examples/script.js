$(document).ready(function () {
  var sparqlQuery = `
PREFIX dbo: <http://dbpedia.org/ontology/> 
PREFIX dbr: <http://dbpedia.org/resource/> 
PREFIX dbp: <http://dbpedia.org/property/> 
SELECT ?album (MIN(?albumName) AS ?albumName) (MIN(?releaseYear) AS ?releaseYear) (MIN(?abstract) AS ?abstract) WHERE 
{ 
 ?album a dbo:Album . 
 ?album dbp:artist dbr:Depeche_Mode . 
 ?album dbp:date ?releaseDate . 
 ?album dbp:name ?albumName . 
 ?album dbo:abstract ?abstract . 
 FILTER (lang(?albumName) = "en" and lang(?abstract) = "en") . 
 BIND (year(?releaseDate) AS ?releaseYear) 
} 
 GROUP BY ?album 
 ORDER BY ?releaseYear
    `;

  var queryUrl =
    "http://dbpedia.org/sparql?query=" +
    encodeURIComponent(sparqlQuery) +
    "&format=json";

  $.ajax({
    url: queryUrl,
    dataType: "json",
    success: function (data) {
      var results = data.results.bindings;
      var html =
        "<table border='1'><tr id=\"first\"><th>Album Name</th><th>Release Year</th><th>About albums</th></tr>";
      for (var i in results) {
        var album = results[i];
        html +=
          '<tr id="content"><td>' +
          album.albumName.value +
          "</td><td>" +
          album.releaseYear.value +
          "</td><td>" +
          album.abstract.value +
          "</td></tr>";
      }
      html += "</table>";
      $("#albums").html(html);
    },
  });
});
