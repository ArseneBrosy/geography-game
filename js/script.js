console.log("a");

const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

fetch("./data/countries.json").then((response) => response.json()).then(json => {
    const countries = Object.values(json.groups)[0].paths;
    countries.sort();

    let newjson = `{countries:[`;
    for (let country of countries) {
        const group = `{"name":"${country}"},`;
        newjson += group;
    }
    newjson += `]}`;
    console.log(newjson);
});