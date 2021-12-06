const puppeteer = require('puppeteer');

(async () => {
  let url = 'http://www.tjcchen.cn';

  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  let data = await page.evaluate(() => {
    let title = document.querySelector('div[class="flex__item"] > div').innerText;
    return {
      title
    };
  });

  console.log(data);
})();