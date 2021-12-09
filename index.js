const puppeteer = require('puppeteer');

(async () => {
  let url = 'http://www.tjcchen.cn';

  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const retrieveMaxDomDepth = (root = document) => {
    let depth = 1, sel = '* > *';
    while(root.querySelector(sel)) {
      sel += ' > *';
      depth++;
    }
    return `The max dom depth is ${depth}.`;
  };

  // let data = await page.evaluate(() => {
  //   let title = document.querySelector('div[class="flex__item"] > div').innerText;
  //   return {
  //     title
  //   };
  // });
  // let html = await page.$eval('html', el => el.outerHTML);

  let data = await page.evaluate(retrieveMaxDomDepth);

  console.log(data);

  await browser.close();
})();