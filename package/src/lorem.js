/**
 * toolmetry — Lorem Ipsum Generator
 * Generate placeholder text for design and development.
 * @module lorem
 */

'use strict';

var WORDS = [
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
  'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi',
];

function words(count) {
  var n = count || 10;
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push(WORDS[i % WORDS.length]);
  }
  return result.join(' ');
}

function sentences(count) {
  var n = count || 3;
  var result = [];
  for (var i = 0; i < n; i++) {
    var sentenceWords = [];
    var wordCount = 5 + (i * 3) % 15;
    for (var j = 0; j < wordCount; j++) {
      sentenceWords.push(WORDS[(i * 7 + j) % WORDS.length]);
    }
    sentenceWords[0] = sentenceWords[0].charAt(0).toUpperCase() + sentenceWords[0].slice(1);
    result.push(sentenceWords.join(' ') + '.');
  }
  return result.join(' ');
}

function paragraphs(count) {
  var n = count || 2;
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push(sentences(4 + i % 3));
  }
  return result.join('\n\n');
}

module.exports = { words: words, sentences: sentences, paragraphs: paragraphs };
