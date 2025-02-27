let countries = [];
let selectedCountry = null;

fetch("./data/countries.json").then((response) => response.json()).then(json => {
    countries = json.countries;
    console.log(countries);
});

function getCountry(i) {
    if (i >= countries.length) {
        return null;
    }
    return countries[i];
}