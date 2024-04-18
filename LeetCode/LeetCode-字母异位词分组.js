/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    // Ҳ���ù�ϣ���
    const hash =new Map();
    // �洢������������
    const answer = [];

    for(let i =0;i<strs.length;i++){
        // �Ƚ���ǰ��ĸ����������һ������ʴ浽sort��Ǵ�����
        let sortStr=strs[i].split('').sort().join('');
        //��hash�����е�ǰ��sortStrΪ��������Ļ� �����ں������뵱ǰstrs[i]
        if(hash.has(sortStr)){
            hash.get(sortStr).push(strs[i]);
        }
        //��û�� ��Ҫ����һ���µ����飨�ǵüӡ�������hash����
        else{
            //�Ҽ�Ϊsort ֵΪstrs[i]
            hash.set(sortStr,[strs[i]]);
            //���answer����ҲҪ���ϵ�ǰ������µ�����
            answer.push(hash.get(sortStr))
            // �����濴�ƺ���ֻ�����ҵ��������sort��ǴʲŻ��answer����
            // ����ʵ����answer�Ƕ�hash�����������ֻ��hash�������������鱾�� ���ֻ��Ҫ�����е�hash��������ͺ���
        }
    }

    return answer;
};

