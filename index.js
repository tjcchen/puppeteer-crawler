const puppeteer = require('puppeteer');

(async () => {
  let url = 'http://www.tjcchen.cn';

  let browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  let data = await page.evaluate(() => {
    let title = document.querySelector('div[class="flex__item"] > div').innerText;
    return {
      title
    };
  });

  let html = await page.$eval('html', el => el.outerHTML);

  console.log(data);

  await browser.close();
})();