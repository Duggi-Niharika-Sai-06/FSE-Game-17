const fs = require('fs');

const emojis = [];

// Unicode ranges for common emoji blocks
const emojiRanges = [
    { start: 0x1F600, end: 0x1F64F }, // Emoticons
    // { start: 0x1F300, end: 0x1F5FF }, // Miscellaneous Symbols and Pictographs
    // { start: 0x1F680, end: 0x1F6FF }, // Transport and Map Symbols
    // { start: 0x1F700, end: 0x1F77F }, // Alchemical Symbols
    // Add more ranges as needed
];

emojiRanges.forEach((range) => {
    for (let i = range.start; i <= range.end; i++) {
        const emoji = String.fromCodePoint(i);
        // Check if the emoji should be excluded
        if (emoji !== "🏶") {
            emojis.push(emoji);
        }
    }
});

const emojisJSON = { emojis };

fs.writeFile('./common-emojis.json', JSON.stringify(emojisJSON, null, 2), (err) => {
    if (err) throw err;
    console.log('Filtered Emojis JSON file has been created.');
});
