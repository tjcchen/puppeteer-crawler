const puppeteer = require('puppeteer');
const {log}     = require('console');
const URL = 'http://www.tjcchen.cn';

// IIFE
(async () => {
    let browser = await puppeteer.launch({headless: true});
    let page    = await browser.newPage();

    await page.goto(URL, {waitUntil: 'networkidle2'});
    let data = await page.evaluate(() => {
        const buildVTree = node => {
            let id = node.id || undefined;
            let tagName = node.tagName || undefined;
            let classes = node.classList ? Array.from(node.classList) : undefined;
            let children = node.children || [];
            let scannedChildren = [];
            for (let i = 0, len = children.length; i < len; i++) {
                // DFS
                let tree = buildVTree(children[i]);
                scannedChildren.push(tree);
            }
            return {
                tag: tagName,
                id: id,
                classes: (classes && classes.length) ? classes : undefined,
                children: (scannedChildren && scannedChildren.length) ? scannedChildren : undefined,
            };
        };

        const retrieveMaxDomDepth = (root = document) => {
            let depth = 1;
            let sel   = '* > *';
            while (root.querySelector(sel)) {
                sel += ' > *';
                depth++;
            }
            return depth;
        };

        return {
            tree: JSON.stringify(
                buildVTree(document.documentElement),
                null,
                4
            ),
            depth: retrieveMaxDomDepth(),
        };
    });

    log('==============================================');
    log(`PAGE URL IS: ${URL}`);
    log(`MAX DOM DEPTH IS: ${data.depth}`);
    log('DOM TREE: ', data.tree);
    log('===============================================');

    await browser.close();
})();
