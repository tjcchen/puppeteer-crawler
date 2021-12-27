const puppeteer = require('puppeteer');
const {log}     = require('console');

const converter = (el = document) => {
  const node = el.querySelector('html');
  return {
    type: node.tagName,
    props: node.outerHTML
  }
};

(async () => {
  let url = 'http://www.tjcchen.cn';

  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  let data = await page.evaluate(converter);

  log(data);

  await browser.close();
})();