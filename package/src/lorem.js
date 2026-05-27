/**
 * toolmetryai — Lorem Ipsum Generator
 * Generate placeholder text for design and development.
 */

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
  'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
  'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi', 'nesciunt',
];

/**
 * Generate lorem ipsum words.
 * @param {number} count - Number of words.
 * @returns {string} Generated text.
 */
function words(count = 30) {
  if (typeof count !== 'number' || count < 1) throw new TypeError('Count must be a positive number');
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(WORDS[i % WORDS.length]);
  }
  return result.join(' ');
}

/**
 * Generate lorem ipsum sentences.
 * @param {number} count - Number of sentences.
 * @returns {string} Generated text.
 */
function sentences(count = 5) {
  if (typeof count !== 'number' || count < 1) throw new TypeError('Count must be a positive number');
  const result = [];
  for (let i = 0; i < count; i++) {
    const len = 8 + Math.floor(Math.random() * 12);
    const sentenceWords = [];
    for (let j = 0; j < len; j++) {
      sentenceWords.push(WORDS[(i * 7 + j) % WORDS.length]);
    }
    sentenceWords[0] = sentenceWords[0].charAt(0).toUpperCase() + sentenceWords[0].slice(1);
    result.push(sentenceWords.join(' ') + '.');
  }
  return result.join(' ');
}

/**
 * Generate lorem ipsum paragraphs.
 * @param {number} count - Number of paragraphs.
 * @returns {string} Generated text (paragraphs separated by newlines).
 */
function paragraphs(count = 3) {
  if (typeof count !== 'number' || count < 1) throw new TypeError('Count must be a positive number');
  const result = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = 3 + Math.floor(Math.random() * 4);
    result.push(sentences(sentenceCount));
  }
  return result.join('\n\n');
}

module.exports = { words, sentences, paragraphs };
