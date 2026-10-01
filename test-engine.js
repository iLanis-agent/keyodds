var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (String(a) !== String(b)) { bad++; console.log('FAIL', m, a, b); } }
// EFF dice page: six words from the 7776-word list = 221073919720733357899776 alternatives, about 2^77
is(E.combos(6, E.DICE_WORDS), '221073919720733357899776', 'EFF exact'); eq(E.bitsWords(6), 77.5489, 'about 2^77', 1e-3); eq(E.bitsWords(1), 12.9248, 'per word', 1e-3);
is(E.DICE_WORDS, 6 ** 5, 'five dice');
// pools: 26+26+10+32 = 94 printable ASCII symbols
is(E.pool({ lower: 1, upper: 1, digits: 1, symbols: 1 }), 94, 'pool 94'); is(E.pool({ lower: 1 }), 26, 'lower'); is(E.pool({ lower: 1, digits: 1 }), 36, 'lower+digits'); is(E.pool({}), 0, 'empty');
// H = L log2 N: 8 chars from 94 = 52.44 bits; 13 chars from 94 = 85.2; lowercase 8 = 37.6
eq(E.bitsChars(8, 94), 52.4367, '8x94', 1e-3); eq(E.bitsChars(13, 94), 85.2097, '13x94', 1e-3); eq(E.bitsChars(8, 26), 37.6035, '8x26', 1e-3); eq(E.bitsChars(0, 94), 0, 'zero');
// each extra bit doubles the work
eq(E.avgSeconds(41, 1) / E.avgSeconds(40, 1), 2, 'double'); eq(E.avgSeconds(1, 1), 1, 'one bit = 1 guess avg');
eq(E.avgSeconds(52.4397, 1e11) > 1 ? 1 : 0, 1, '8 chars fast hash > 1s');
// verdict bands
is(E.verdict(37.6), 'weak', 'v1'); is(E.verdict(52.4), 'fair', 'v2'); is(E.verdict(77.5), 'good', 'v3'); is(E.verdict(85.2), 'strong', 'v4');
// human readable
is(E.human(0.2), 'under a second', 'h0'); is(E.human(90), '1.5 minutes', 'h1'); is(E.human(7200), '2 hours', 'h2'); is(E.human(86400 * 3), '3 days', 'h3'); is(E.human(31557600 * 2e6), '2 million years', 'h4'); is(E.human(31557600 * 5e9), 'billions of years or more', 'h5');
console.log(n + ' assertions, ' + bad + ' failed'); process.exit(bad ? 1 : 0);
