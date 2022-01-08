/**
 * Calculate max number of an array list
 * 
 * @param {*} nums 
 */
function find_max(nums) {
  let max_num = Number.NEGATIVE_INFINITY; // smaller than all other numbers
  for (let num of nums) {
    if (num > max_num) {
      // (Fill in the missing line here)
      max_num = num;
    }
  }
  return max_num;
}

console.log(find_max([3, 9, 7, 8, 1]));

//=========================================
const domTree = {
  "tag": "HTML",
  "children": [
      {
          "tag": "HEAD",
          "children": [
              {
                  "tag": "META"
              },
              {
                  "tag": "META"
              },
              {
                  "tag": "LINK"
              },
              {
                  "tag": "TITLE"
              },
              {
                  "tag": "STYLE"
              }
          ]
      },
      {
          "tag": "BODY",
          "children": [
              {
                  "tag": "DIV",
                  "classes": [
                      "flex__container"
                  ],
                  "children": [
                      {
                          "tag": "DIV",
                          "classes": [
                              "flex__item"
                          ],
                          "children": [
                              {
                                  "tag": "DIV"
                              }
                          ]
                      }
                  ]
              },
              {
                  "tag": "DIV",
                  "classes": [
                      "footer"
                  ],
                  "children": [
                      {
                          "tag": "A"
                      }
                  ]
              }
          ]
      }
  ]
};

/**
 * Calculate the depth of a dom tree
 * 
 * @param {*} tree dom tree object
 */
const getDomTreeDepth = tree => {
    let depth = 0;
    if (tree.children) {
        tree.children.forEach(d => {
            let tmp = getDomTreeDepth(d);
            if (tmp > depth) {
                depth = tmp;
            }
        });
    }
    return depth + 1;
};

console.log('dom tree depth: ', getDomTreeDepth(domTree));
