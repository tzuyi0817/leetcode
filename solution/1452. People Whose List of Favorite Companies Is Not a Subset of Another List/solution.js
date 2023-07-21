/**
 * @param {string[][]} favoriteCompanies
 * @return {number[]}
 */
var peopleIndexes = function(favoriteCompanies) {
    const companiesSet = [];
    const sortFavorites = favoriteCompanies
        .map((favorites, index) => ({ favorites, index }))
        .sort((a, b) => b.favorites.length - a.favorites.length);

    return sortFavorites.reduce((result, { favorites, index }) => {
        const isSubset = companiesSet.some(companies => {
            return favorites.every(favorite => companies.has(favorite));
        });
        
        if (!isSubset) {
            companiesSet.push(new Set(favorites));
            result.push(index);
        }
        return result;
    }, []).sort((a, b) => a - b);
};
