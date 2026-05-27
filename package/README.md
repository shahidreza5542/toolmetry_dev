# toolmetry

> A comprehensive developer tools library for JavaScript/TypeScript — Base64, URL encoding, hashing, JWT, UUID, AES-256 encryption, random generation, color conversion, and more.

[![npm version](https://img.shields.io/npm/v/toolmetry.svg)](https://www.npmjs.com/package/toolmetry)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm i toolmetry
```

## Quick Start

```javascript
const toolmetry = require('toolmetry');

// Or destructure only what you need
const { base64Encode, uuidV4, hashGenerate, aesEncrypt, randomString } = require('toolmetry');
```

## Modules

### Base64 Encode/Decode

```javascript
const { base64Encode, base64Decode } = require('toolmetry');

const encoded = base64Encode('Hello, Toolmetry!');
// "SGVsbG8sIFRvb2xtZXRyeSE="

const decoded = base64Decode(encoded);
// "Hello, Toolmetry!"

// URL-safe variants
const urlSafe = toolmetry.base64EncodeURL('hello+world/test=data');
const original = toolmetry.base64DecodeURL(urlSafe);

// Validate
toolmetry.base64IsValid('SGVsbG8='); // true
```

### URL Encoder/Decoder

```javascript
const { urlEncode, urlDecode, urlBuildQuery, urlParseQuery } = require('toolmetry');

urlEncode('hello world'); // "hello%20world"
urlDecode('hello%20world'); // "hello world"

const qs = urlBuildQuery({ name: 'Toolmetry', v: 2 }); // "?name=Toolmetry&v=2"
const params = urlParseQuery(qs); // { name: "Toolmetry", v: "2" }
```

### Hash Generator

```javascript
const { hashGenerate, hashAll, hmacGenerate } = require('toolmetry');

hashGenerate('hello world'); // SHA-256 hash (default)
hashGenerate('hello', 'md5'); // MD5 hash
hashGenerate('hello', 'sha512', 'base64'); // SHA-512 in base64

const allHashes = hashAll('hello');
// { md5: '...', sha1: '...', sha256: '...', sha384: '...', sha512: '...' }

hmacGenerate('data', 'secret', 'sha256'); // HMAC-SHA256
```

### JWT Decoder

```javascript
const { jwtDecode, jwtIsExpired, jwtGetAlgorithm } = require('toolmetry');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';

const decoded = jwtDecode(token);
// { header: { alg: "HS256", typ: "JWT" }, payload: { sub: "1234567890" }, signature: "..." }

jwtIsExpired(token); // true or false
jwtGetAlgorithm(token); // "HS256"
```

### UUID Generator

```javascript
const { uuidV4, uuidV4Batch, uuidIsValid } = require('toolmetry');

const id = uuidV4(); // "550e8400-e29b-41d4-a716-446655440000"
const short = toolmetry.uuidV4Short(); // "550e8400e29b41d4a716446655440000"
const batch = uuidV4Batch(5); // Array of 5 UUIDs
uuidIsValid(id); // true
```

### AES-256 Encrypt/Decrypt

```javascript
const { aesEncrypt, aesDecrypt } = require('toolmetry');

const encrypted = aesEncrypt('Secret message', 'my-password');
// "iv:authTag:ciphertext" (Base64 encoded)

const decrypted = aesDecrypt(encrypted, 'my-password');
// "Secret message"

// Async variants for browser (SubtleCrypto)
const enc = await toolmetry.aesEncryptAsync('Hello', 'key');
const dec = await toolmetry.aesDecryptAsync(enc, 'key');
```

### Random Generator

```javascript
const { randomString, randomInt, randomHex, randomAlphanumeric } = require('toolmetry');

randomString(16); // "aB3dE7fG9hJ2kL5m"
randomString(20, { symbols: true }); // "aB3!dE7@fG9#hJ2$kL5m"
randomInt(1, 100); // 42
randomHex(32); // "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"
randomAlphanumeric(12); // "aB3dE7fG9hJ2"

toolmetry.randomPick(['a', 'b', 'c']); // Random element
toolmetry.randomShuffle([1, 2, 3, 4, 5]); // Shuffled array
toolmetry.randomBoolean(); // true or false
toolmetry.randomFloat(0, 1, 4); // 0.5234
```

### Color Converter

```javascript
const { hexToRgb, rgbToHex, colorLighten, colorDarken } = require('toolmetry');

hexToRgb('#00236F'); // { r: 0, g: 35, b: 111 }
rgbToHex(0, 35, 111); // "#00236f"
colorLighten('#00236F', 20); // Lighter shade
colorDarken('#00236F', 20); // Darker shade
toolmetry.colorConvert('#ff0000'); // All formats
```

### HTML Entity Encoder/Decoder

```javascript
const { htmlEntityEncode, htmlEntityDecode } = require('toolmetry');

htmlEntityEncode('<script>alert("xss")</script>');
// "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"

htmlEntityDecode('&lt;hello&gt;'); // "<hello>"
```

### Number Base Converter

```javascript
const { toBinary, toHex, convertAllBases } = require('toolmetry');

toBinary(255); // "11111111"
toHex(255); // "FF"
convertAllBases(255); // { decimal: "255", binary: "11111111", octal: "377", hex: "FF" }
```

### Text Utilities

```javascript
const { toCamelCase, toSnakeCase, slugify, wordCount } = require('toolmetry');

toCamelCase('hello world'); // "helloWorld"
toSnakeCase('helloWorld'); // "hello_world"
toKebabCase('hello world'); // "hello-world"
slugify('Hello World! 123'); // "hello-world-123"
wordCount('hello world foo'); // 3
toolmetry.truncate('Long text here', 10); // "Long te..."
```

### JSON Tools

```javascript
const { jsonFormat, jsonValidate, jsonMinify } = require('toolmetry');

jsonFormat('{"name":"Toolmetry","v":3}', 2);
// Prettified JSON with 2-space indent

jsonValidate('{invalid}'); // { valid: false, error: "...", position: { line: 1, column: 2 } }
jsonMinify('{ "a" : 1 }'); // '{"a":1}'
```

### Password Generator

```javascript
const { passwordGenerate, passwordStrength } = require('toolmetry');

passwordGenerate({ length: 20, symbols: true }); // "x8#Km2@pL9!nQ4&wR7"
passwordStrength('mypassword123'); // { score: 3, label: "Fair", suggestions: [...] }
toolmetry.passwordPassphrase({ words: 4, capitalize: true }); // "Brave-Cloud-Eagle-Flame"
```

### Morse Code

```javascript
const { morseEncode, morseDecode } = require('toolmetry');

morseEncode('HELLO WORLD'); // ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
morseDecode('.... . .-.. .-.. ---'); // "HELLO"
```

### Roman Numerals

```javascript
const { romanToRoman, romanFromRoman } = require('toolmetry');

romanToRoman(2024); // "MMXXIV"
romanFromRoman('XIV'); // 14
```

### Cron Validator

```javascript
const { cronValidate, cronDescribe } = require('toolmetry');

cronValidate('0 6 * * *'); // { valid: true, error: null, fields: {...} }
cronDescribe('@daily'); // "Runs once a day (at midnight)"
```

### Diff Checker

```javascript
const { diffCheck, diffUnified } = require('toolmetry');

const result = diffCheck('hello world', 'hello earth');
// { lines: [...], stats: { added: 1, removed: 1, unchanged: 1 } }

diffUnified('old text', 'new text'); // Unified diff string
```

### Lorem Ipsum

```javascript
const { loremWords, loremParagraphs } = require('toolmetry');

loremWords(10); // 10 words of lorem ipsum
loremParagraphs(3); // 3 paragraphs
```

## Full API Reference

| Module | Functions |
|--------|-----------|
| **Base64** | `base64Encode`, `base64Decode`, `base64EncodeURL`, `base64DecodeURL`, `base64IsValid`, `base64EncodeBuffer`, `base64DecodeToBuffer` |
| **URL** | `urlEncode`, `urlDecode`, `urlBuildQuery`, `urlParseQuery` |
| **Hash** | `hashGenerate`, `hashAsync`, `hmacGenerate`, `hashAll` |
| **JWT** | `jwtDecode`, `jwtDecodeHeader`, `jwtDecodePayload`, `jwtIsExpired`, `jwtIsValidFormat`, `jwtGetAlgorithm`, `jwtTimeUntilExpiry` |
| **UUID** | `uuidV4`, `uuidV4Short`, `uuidV4Batch`, `uuidIsValid`, `uuidGetVersion`, `uuidNil`, `uuidIsNil` |
| **AES-256** | `aesEncrypt`, `aesDecrypt`, `aesEncryptAsync`, `aesDecryptAsync` |
| **Random** | `randomString`, `randomInt`, `randomHex`, `randomAlphanumeric`, `randomPick`, `randomShuffle`, `randomBoolean`, `randomFloat` |
| **Color** | `hexToRgb`, `rgbToHex`, `rgbToHsl`, `hslToRgb`, `hexToHsl`, `hslToHex`, `colorConvert`, `colorIsValidHex`, `colorLighten`, `colorDarken` |
| **HTML Entity** | `htmlEntityEncode`, `htmlEntityDecode`, `htmlEntityEncodeAll`, `htmlEntityEncodeChars` |
| **Number Base** | `baseConvert`, `toBinary`, `toOctal`, `toHex`, `fromBinary`, `fromHex`, `convertAllBases` |
| **Text** | `toCamelCase`, `toPascalCase`, `toSnakeCase`, `toKebabCase`, `toConstantCase`, `slugify`, `wordCount`, `charCount`, `reverse`, `truncate`, `removeExtraWhitespace`, `removeLineBreaks`, `escapeRegex` |
| **JSON** | `jsonFormat`, `jsonMinify`, `jsonValidate`, `jsonGetType`, `jsonStats`, `jsonFlatten` |
| **Password** | `passwordGenerate`, `passwordPassphrase`, `passwordStrength`, `passwordGenerateBatch` |
| **Morse** | `morseEncode`, `morseDecode`, `morseIsValid` |
| **Roman** | `romanToRoman`, `romanFromRoman`, `romanIsValid` |
| **Cron** | `cronValidate`, `cronDescribe` |
| **Diff** | `diffCheck`, `diffUnified`, `diffIsSame` |
| **Lorem** | `loremWords`, `loremSentences`, `loremParagraphs` |

## License

MIT © ToolmetryAI
