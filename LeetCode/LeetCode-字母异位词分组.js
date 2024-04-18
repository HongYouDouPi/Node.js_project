/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    // 也是用哈希表叭
    const hash =new Map();
    // 存储最后输出的数组
    const answer = [];

    for(let i =0;i<strs.length;i++){
        // 先将当前字母重新排序变成一个有序词存到sort标记词里面
        let sortStr=strs[i].split('').sort().join('');
        //若hash表中有当前以sortStr为键的数组的话 接着在后面推入当前strs[i]
        if(hash.has(sortStr)){
            hash.get(sortStr).push(strs[i]);
        }
        //若没有 则要创建一个新的数组（记得加【】）到hash表中
        else{
            //且键为sort 值为strs[i]
            hash.set(sortStr,[strs[i]]);
            //最后answer数组也要接上当前插入的新的数组
            answer.push(hash.get(sortStr))
            // 这里面看似好像只有在找到新排序的sort标记词才会对answer操作
            // 但是实际上answer是对hash数组的索引而只有hash才有真正的数组本体 最后只需要把所有的hash数组输出就好了
        }
    }

    return answer;
};

