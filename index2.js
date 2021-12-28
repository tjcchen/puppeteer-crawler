const puppeteer = require('puppeteer');
const {log}     = require('console');

const buildVTree = (root, tree = {}) => {
  let node;
  if (!root) {
      root = document;
      node = root.querySelector('html');
  }
  const childNodes = Array.from(node.childNodes);

  childNodes.forEach(childNode => {
      if (childNode.nodeType === 1) { // element node
          tree = {
              tag: node.tagName,
              children: {
                  tag: childNode.tagName
              }
          };
      }
      if (childNode.childNodes && childNode.childNodes.length > 0) {
          buildVTree(childNode, tree);
      }
  });

  return tree;
};

(async () => {
  let url = 'http://www.tjcchen.cn';

  let browser = await puppeteer.launch({ headless: true });
  let page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  let data = await page.evaluate(buildVTree);

  log(data);

  await browser.close();
})();