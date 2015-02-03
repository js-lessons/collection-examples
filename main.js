var movies = require('./imdb250');

var inc = function(a) { return ++a; }

console.log('movies number: ', movies.reduce(inc, 0));

console.log('movies number after 1998: ', movies.filter(function(m) {
  return Number(m.year) > 1998;
}).reduce(inc, 0));

function map(array, transform) {
  var mapped = [];
  for (var i = 0; i < array.length; i++)
    mapped.push(transform(array[i]));
  return mapped;
}

var recentMovies = movies.filter(function(m) {
  return Number(m.year) > 2010;
});

var year = function(m) { return Number(m.year); }
var title = function(m) { return m.title; }

console.log('number of recent movies: ', recentMovies.reduce(inc, 0));

console.log('recent movies: ', map(recentMovies, function(m) { return [year(m), title(m)]}));

var average = function(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var averageYear = average(movies.map(year));

console.log('best time: ', averageYear);

console.log('best time movies: ', movies.filter(function(m) {
  return (year(m) < averageYear + 5) && (year(m) > averageYear - 5)
}).map(title));

var groupByYear = function(acc, m) {
  acc[m.year] = acc[m.year] || [];
  acc[m.year].push(m.title);
  return acc;
}

var countByYear = function(acc, m) {
  acc[m.year] = acc[m.year] || 0;
  acc[m.year]++;
  return acc;
}

console.log('grouped by year: ', movies.reduce(groupByYear, {}));
console.log('best year movies: ', movies.reduce(countByYear, {}));

var countedByYear = movies.reduce(countByYear, {});

console.log('best year: ',
  Object.keys(countedByYear)
    .reduce(function(bestYear, y) {
      return countedByYear[y] > countedByYear[bestYear] ? y : bestYear
    }));


var favorites = ["The Matrix", "American History X", "Stardust"];

function isInSet(set, movie) {
  return set.indexOf(movie.title) > -1;
}

console.log("favorites in top 250: ", movies.filter(isInSet.bind(null, favorites)));
