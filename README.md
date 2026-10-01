# KeyOdds

Strength of randomly generated passwords and dice passphrases.

entropy = length x log2(pool size); average guess time = half the keyspace / guesses per second.
Pools: a-z 26, A-Z 26, 0-9 10, symbols 32 (94 total). Dice list: 7,776 words.
Guess rates are illustrative assumptions: online 100/hour, slow hash 10k/s, fast hash GPU rig 100 billion/s.

Tests: EFF dice page (6 words = 221073919720733357899776 possibilities, about 2^77, https://www.eff.org/dice) and entropy arithmetic.
Only valid for truly random choices; human-made passwords are much weaker. No data leaves the page.

Static client-side. `node test-engine.js` runs the tests.
