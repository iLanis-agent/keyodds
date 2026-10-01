(function (root) {
  'use strict';
  var POOLS = { lower: 26, upper: 26, digits: 10, symbols: 32 }; // 94 printable ASCII without space
  var DICE_WORDS = 7776; // 6^5, EFF large wordlist
  // Illustrative guess rates (guesses per second): assumptions, not measurements
  var RATES = { online: { name: 'Online, rate limited (100 per hour)', gps: 100 / 3600 }, slow: { name: 'Offline, slow hash (10 thousand per second)', gps: 1e4 }, fast: { name: 'Offline, fast hash on a GPU rig (100 billion per second)', gps: 1e11 } };
  function pool(sel) { var n = 0; for (var k in POOLS) if (sel[k]) n += POOLS[k]; return n; }
  function bitsChars(len, poolSize) { return poolSize > 1 && len > 0 ? len * Math.log2(poolSize) : 0; }
  function bitsWords(words, listSize) { return words > 0 ? words * Math.log2(listSize || DICE_WORDS) : 0; }
  function combos(len, poolSize) { return BigInt(poolSize) ** BigInt(len); }
  // Average time to find it: half the keyspace at a given guess rate (seconds)
  function avgSeconds(bits, gps) { return Math.pow(2, bits - 1) / gps; }
  var UNITS = [['years', 31557600], ['days', 86400], ['hours', 3600], ['minutes', 60], ['seconds', 1]];
  function human(sec) {
    if (sec < 1) return 'under a second';
    var y = sec / 31557600;
    if (y >= 1e9) return 'billions of years or more';
    if (y >= 1e6) return Math.round(y / 1e6) + ' million years';
    if (y >= 1000) return Math.round(y).toLocaleString('en-US') + ' years';
    for (var i = 0; i < UNITS.length; i++) if (sec >= UNITS[i][1]) { var v = sec / UNITS[i][1]; return (v >= 10 ? Math.round(v) : Math.round(v * 10) / 10) + ' ' + UNITS[i][0]; }
  }
  function verdict(bits) { return bits < 40 ? 'weak' : bits < 60 ? 'fair' : bits < 80 ? 'good' : 'strong'; }
  var api = { POOLS: POOLS, DICE_WORDS: DICE_WORDS, RATES: RATES, pool: pool, bitsChars: bitsChars, bitsWords: bitsWords, combos: combos, avgSeconds: avgSeconds, human: human, verdict: verdict };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Odds = api;
})(typeof window !== 'undefined' ? window : this);
