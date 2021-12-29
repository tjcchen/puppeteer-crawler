const puppeteer = require('puppeteer');
const {log}     = require('console');

// IIFE
(async () => {
  let url     = 'http://www.tjcchen.cn';
  let browser = await puppeteer.launch({headless: true});
  let page    = await browser.newPage();

  await page.goto(url, {waitUntil: 'networkidle2'});
  let data = await page.evaluate(() => {
      let tree = null;
      let result = [];
      let count = 0;

      const buildVTree = (node) => {
          if (!node) {
              node = document.querySelector('html');
              tree = {
                  type: node.tagName,
                  children: []
              };
          }
          const childNodes = Array.from(node.childNodes);

          childNodes.forEach(childNode => {
              if (childNode.nodeType === 1) { // element node
                  let subTree = {
                      type: childNode.tagName
                  };
                  // todo 构建subTree children
                  if (typeof tree.children === 'object') {
                      tree.children.push(subTree);
                  } else {
                      tree.children.children = [];
                  }
                  result.push(subTree);
              }
              if (childNode.childNodes && childNode.childNodes.length > 0) {
                  buildVTree(childNode);
              }
          });

          return {
              tree, result, count
          };
      };

      return buildVTree();
  });

  log(data);

  // log(chalk.yellow(`The max DOM depth of page "${FETCH_URL}" is ${data.depth}.`));
  await browser.close();
})();