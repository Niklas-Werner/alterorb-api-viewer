export function formatLargeInteger(num: number) {
    const str = num.toFixed();
    let result = [];
    for (let i = str.length; i >= 0; i -= 3)
        result.unshift(str.substring(Math.max(0, i - 3), i));
    return result.join('\u202f');
}

export function compareStrings(a: string, b: string) {
    return a > b ? 1 : b > a ? -1 : 0;
}

export function formatFractionAsPercentage(n: number, d: number) {
    if (d === 0)
        return '';
    return (n / d * 100).toFixed() + '%';
}
