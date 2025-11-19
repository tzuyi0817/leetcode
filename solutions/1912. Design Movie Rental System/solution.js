/**
 * @param {number} n
 * @param {number[][]} entries
 */
const MovieRentingSystem = function (n, entries) {
  this.maxNumSearchResults = 5;

  const sorted = entries.toSorted(([shop1, _1, price1], [shop2, _2, price2]) => {
    const priceDiff = price1 - price2;

    return priceDiff || shop1 - shop2;
  });

  this.movies = sorted.reduce((movies, [shop, movie]) => {
    let shops = movies[movie];

    if (shops === undefined) shops = movies[movie] = [];

    shops.push(shop);

    return movies;
  }, {});

  this.shops = sorted.reduce((shops, [shop, movie, price]) => {
    let data = shops[shop];

    if (data === undefined) data = shops[shop] = {};

    data[movie] = { price };

    return shops;
  }, {});

  this.rented = [];
};

/**
 * @param {number} movie
 * @return {number[]}
 */
MovieRentingSystem.prototype.search = function (movie) {
  const results = [];
  const shops = this.movies[movie];

  if (!shops) return [];

  for (let i = 0, l = shops.length; results.length < this.maxNumSearchResults && i < l; i++) {
    const shop = shops[i];

    if (!this.shops[shop][movie].rented) results.push(shop);
  }

  return results;
};

/**
 * @param {number} shop
 * @param {number} movie
 * @return {void}
 */
MovieRentingSystem.prototype.rent = function (shop, movie) {
  if (this.shops[shop][movie].rented === undefined) {
    const rentData = [shop, movie];

    this.shops[shop][movie].rented = rentData;
    this.rented.push(rentData);
  }
};

/**
 * @param {number} shop
 * @param {number} movie
 * @return {void}
 */
MovieRentingSystem.prototype.drop = function (shop, movie) {
  const movieData = this.shops[shop]?.[movie].rented;

  if (movieData) {
    this.rented.splice(this.rented.indexOf(movieData), 1);
    delete this.shops[shop][movie].rented;
  }
};

/**
 * @return {number[][]}
 */
MovieRentingSystem.prototype.report = function () {
  return this.rented
    .toSorted(([shop1, movie1], [shop2, movie2]) => {
      const priceDiff = this.shops[shop1][movie1].price - this.shops[shop2][movie2].price;

      if (!priceDiff) return shop1 === shop2 ? movie1 - movie2 : shop1 - shop2;

      return priceDiff;
    })
    .slice(0, this.maxNumSearchResults);
};

/**
 * Your MovieRentingSystem object will be instantiated and called as such:
 * var obj = new MovieRentingSystem(n, entries)
 * var param_1 = obj.search(movie)
 * obj.rent(shop,movie)
 * obj.drop(shop,movie)
 * var param_4 = obj.report()
 */
