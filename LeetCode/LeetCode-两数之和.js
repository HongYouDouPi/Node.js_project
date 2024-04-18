/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // ����һ����ϣ��
    const hash = new Map();
    // ѭ������nums�����е�Ԫ��
    for(let i =0;i<nums.length;i++){
        // �ߴ�����ڹ�ϣ����Ѱ�������뵱ǰ����ƥ��ɹ���ֵ
        if(hash.has(target-nums[i]))
            return[i,hash.get(target-nums[i])]
        // ����������Ϊtarget������hash
        hash.set[nums[i],i]
    }
};