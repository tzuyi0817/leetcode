/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function(num) {
    const carryThousand = ['Thousand', 'Million', 'Billion'];
    const carryTen = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const convertMap = {
        0: '',
        1: 'One',
        2: 'Two',
        3: 'Three',
        4: 'Four',
        5: 'Five',
        6: 'Six',
        7: 'Seven',
        8: 'Eight',
        9: 'Nine',
        10: 'Ten',
        11: 'Eleven',
        12: 'Twelve',
        13: 'Thirteen',
        14: 'Fourteen',
        15: 'Fifteen',
        16: 'Sixteen',
        17: 'Seventeen',
        18: 'Eighteen',
        19: 'Nineteen',
    };
    const convertHundred = (num) => {
        const hundreds = Math.floor(num / 100);
        const tens = num % 100;
        const digits = num % 10;
        const enHundreds = hundreds ? `${convertMap[hundreds]} Hundred` : '';
        const enTens = tens < 20 ? convertMap[tens] : carryTen[Math.floor(tens / 10)];
        const enDigits = tens > 20 ? convertMap[digits] : '';

        return `${enHundreds} ${enTens} ${enDigits}`.trim();
    };
    let result = convertHundred(num % 1000);

    for (const carry of carryThousand) {
        num = Math.floor(num / 1000);
        if (!num) return result || 'Zero';
        const remainder = num % 1000;

        if (!remainder) continue;
        result = `${convertHundred(remainder)} ${carry} ${result}`.trim();
    }
    return result;
};