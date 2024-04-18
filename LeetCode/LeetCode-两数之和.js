/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // 创建一个哈希表
    const hash = new Map();
    // 循环存入nums数组中的元素
    for(let i =0;i<nums.length;i++){
        // 边存入边在哈希表中寻找有无与当前项能匹配成功的值
        if(hash.has(target-nums[i]))
            return[i,hash.get(target-nums[i])]
        // 如果不能相加为target，存入hash
        hash.set[nums[i],i]
    }
};