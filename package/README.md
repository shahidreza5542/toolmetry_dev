# toolmetry

A comprehensive developer tools library for Node.js and browsers. Zero dependencies, full TypeScript support, dual ESM/CJS module system.

```bash
npm i toolmetry
```

## Quick Start

```javascript
// CommonJS
const toolmetry = require('toolmetry');

// ES Modules
import toolmetry from 'toolmetry';
// or named imports
import { base64Encode, uuidV4, hashGenerate, aesEncrypt } from 'toolmetry';
```

## Modules (18 total)

| Module | Functions | Example |
|--------|-----------|---------|
| **base64** | encode, decode, encodeURL, decodeURL, isValid, encodeBuffer, decodeToBuffer | `toolmetry.base64Encode('hello')` |
| **url** | encode, decode, encodeAll, buildQuery, parseQuery | `toolmetry.urlEncode('hello world')` |
| **hash** | hash, hashAsync, hmac, hashAll, ALGORITHMS | `toolmetry.hashGenerate('data', 'sha256')` |
| **jwt** | decode, decodeHeader, decodePayload, isExpired, isValidFormat, getAlgorithm, timeUntilExpiry | `toolmetry.jwtDecode(token)` |
| **uuid** | v4, v4Short, v4Batch, isValid, getVersion, nil, isNil | `toolmetry.uuidV4()` |
| **encrypt** | encrypt, decrypt, encryptAsync, decryptAsync | `toolmetry.aesEncrypt('secret', 'key')` |
| **random** | string, int, hex, alphanumeric, pick, shuffle, boolean, float | `toolmetry.randomString(16)` |
| **color** | hexToRgb, rgbToHex, rgbToHsl, hslToRgb, hexToHsl, hslToHex, convert, isValidHex, lighten, darken | `toolmetry.hexToRgb('#ff0000')` |
| **htmlEntity** | encode, decode, encodeAll, encodeChars | `toolmetry.htmlEntityEncode('<div>')` |
| **numberBase** | convert, toBinary, toOctal, toHex, fromBinary, fromHex, convertAll | `toolmetry.toBinary(255)` |
| **text** | toCamelCase, toPascalCase, toSnakeCase, toKebabCase, toConstantCase, slugify, wordCount, charCount, reverse, truncate, removeExtraWhitespace, removeLineBreaks, escapeRegex | `toolmetry.toCamelCase('hello world')` |
| **json** | format, minify, validate, getType, stats, flatten | `toolmetry.jsonFormat('{"a":1}')` |
| **password** | generate, passphrase, strength, generateBatch | `toolmetry.passwordGenerate({length: 20})` |
| **morse** | encode, decode, isValid, MORSE_MAP | `toolmetry.morseEncode('SOS')` |
| **roman** | toRoman, fromRoman, isValidRoman | `toolmetry.romanToRoman(42)` |
| **cron** | validate, describe, ALIASES | `toolmetry.cronValidate('0 0 * * *')` |
| **diff** | diff, unifiedDiff, isSame | `toolmetry.diffCheck('a', 'b')` |
| **lorem** | words, sentences, paragraphs | `toolmetry.loremParagraphs(3)` |

## Usage Examples

### Base64

```javascript
const { base64Encode, base64Decode, base64EncodeURL } = require('toolmetry');

base64Encode('hello world');     // 'aGVsbG8gd29ybGQ='
base64Decode('aGVsbG8gd29ybGQ='); // 'hello world'
base64EncodeURL('hello world');  // 'aGVsbG8gd29ybGQ' (no padding, URL-safe)
```

### Hash Generator

```javascript
const { hashGenerate, hashAll, hmacGenerate } = require('toolmetry');

hashGenerate('hello', 'sha256');     // SHA-256 hash
hashGenerate('hello', 'md5');        // MD5 hash
hashAll('hello');                     // { md5: '...', sha1: '...', sha256: '...', sha384: '...', sha512: '...' }
hmacGenerate('data', 'secret', 'sha256'); // HMAC-SHA256
```

### JWT Decoder

```javascript
const { jwtDecode, jwtIsExpired } = require('toolmetry');

const decoded = jwtDecode('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.abc123');
console.log(decoded.header);   // { alg: 'HS256' }
console.log(decoded.payload);  // { sub: '1234567890' }
jwtIsExpired(token);           // true or false
```

### UUID Generator

```javascript
const { uuidV4, uuidV4Short, uuidV4Batch } = require('toolmetry');

uuidV4();        // '550e8400-e29b-41d4-a716-446655440000'
uuidV4Short();   // '550e8400e29b41d4a716446655440000'
uuidV4Batch(5);  // ['uuid1', 'uuid2', 'uuid3', 'uuid4', 'uuid5']
```

### AES-256 Encrypt/Decrypt

```javascript
const { aesEncrypt, aesDecrypt } = require('toolmetry');

const encrypted = aesEncrypt('my secret text', 'my-password');
const decrypted = aesDecrypt(encrypted, 'my-password');
console.log(decrypted); // 'my secret text'

// Browser (async)
const encrypted = await aesEncryptAsync('my secret text', 'my-password');
const decrypted = await aesDecryptAsync(encrypted, 'my-password');
```

### Random Generator

```javascript
const { randomString, randomInt, randomHex, randomBoolean } = require('toolmetry');

randomString(16);                           // 'aB3dEfGhIjKlMnOp'
randomString(16, { symbols: true });        // 'aB3!dE@fG#hI$jK%'
randomInt(1, 100);                          // 42
randomHex(32);                              // 'a1b2c3d4...'
randomBoolean();                            // true or false
```

### Color Converter

```javascript
const { hexToRgb, rgbToHex, colorConvert, colorLighten } = require('toolmetry');

hexToRgb('#ff0000');          // { r: 255, g: 0, b: 0 }
rgbToHex(255, 0, 0);         // '#ff0000'
colorConvert('#ff0000');      // { hex, rgb, hsl, cssRgb, cssHsl }
colorLighten('#333333', 20);  // '#5c5c5c'
```

### Password Generator

```javascript
const { passwordGenerate, passwordPassphrase, passwordStrength } = require('toolmetry');

passwordGenerate({ length: 20, symbols: true });
passwordPassphrase({ words: 4, separator: '-', capitalize: true });
passwordStrength('MyP@ss123');  // { score: 5, label: 'Strong', suggestions: [] }
```

## Import Styles

### CommonJS

```javascript
const toolmetry = require('toolmetry');

// Namespace access
toolmetry.base64.encode('hello');
toolmetry.uuid.v4();

// Flat function access
toolmetry.base64Encode('hello');
toolmetry.uuidV4();
```

### ES Modules

```javascript
import toolmetry from 'toolmetry';

// Namespace access
toolmetry.base64.encode('hello');
toolmetry.uuid.v4();

// Named imports
import { base64Encode, uuidV4, hashGenerate } from 'toolmetry';
base64Encode('hello');
uuidV4();
```

## Features

- **Zero dependencies** — Pure JavaScript, no external packages
- **Dual CJS/ESM** — Works with both `require()` and `import`
- **TypeScript support** — Full type declarations included
- **Browser compatible** — SubtleCrypto fallback for hash, encrypt, uuid, random
- **Cryptographically secure** — Uses `crypto.randomInt` / `crypto.getRandomValues` for randomness
- **Tree-shakeable** — `sideEffects: false` for optimal bundling
- **Well-tested** — Comprehensive error handling and input validation

## Requirements

- Node.js >= 16.0.0 (for CJS sync crypto operations)
- Modern browser (for async SubtleCrypto operations)

## License

MIT © ToolmetryAI

## Links

- [npm](https://www.npmjs.com/package/toolmetry)
- [GitHub](https://github.com/toolmetryai/toolmetry-npm)
- [Homepage](https://toolmetryai.com)
