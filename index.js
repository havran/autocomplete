const csv = require('csv-parser')
const fs = require('fs')
const results = [];

var domainCount = 0;
var s = fs.createReadStream('data/domains.txt')
  .pipe(csv({
    skipComments: '--',
    separator: ';'
  }))
  .on('data', (data) => {
      results.push(data);

      // Set top level domain.
      tld = '.sk'
      // Get 'domena' from data object, remove '.sk' from end.
      sub = data['domena'].replace(/\.sk$/, '');

      for (l = 1; l <= sub.length; l++) {
          chunk = sub.substring(0, l)
          // console.log(chunk);
      }
      chunkEnd = `${chunk}$`;

      domainCount++;
      // console.log(`${chunk}$`);

      // Only 10 first domain
      // if (domainCount === 10) {
      //     s.destroy();
      // }
  })
  .on('end', () => {
      console.log(`>>> All ${domainCount} domains processed...`);
  })
  .on('close', () => {
      console.log(`>>> ${domainCount} domains processed, stream destroyed...`);
  });
