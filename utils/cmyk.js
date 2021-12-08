
var rgb2cmyk = function (r, g, b) {
    let percentageR = r / 255.0 * 100;
    let percentageG = g / 255.0 * 100;
    let percentageB = b / 255.0 * 100;

    let k = 100 - Math.max(Math.max(percentageR, percentageG), percentageB);

    if (k == 100) {
        return { c: 0, m: 0, y: 0, k: 0 };
    }

    let c = Math.round((100 - percentageR - k) / (100 - k) * 100);
    let m = Math.round((100 - percentageG - k) / (100 - k) * 100);
    let y = Math.round((100 - percentageB - k) / (100 - k) * 100);

    return { c: c, m: m, y: y, k: k };
}

export {rgb2cmyk}

var cmyk2rgb = function (c, m, y, k) {
    let r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
    let g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
    let b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
    return { r: r, g: g, b: b }
}

export {cmyk2rgb}