//2016 NTU mike
//隱馬可夫數學模型
function HMM() {}
HMM.prototype.data = {
    //觀測符號物件
    //observations
    obs: [],
    //狀態物件
    //states
    states: [
        's1',
        's2',
        's3'
    ],
    //初始機率物件
    //init_state_prob
    init_prob: {
        's1': 0.34,
        's2': 0.33,
        's3': 0.33
    },

    // init_prob: {
    //     's1': 0.5,
    //     's2': 0.2,
    //     's3': 0.3
    // },
    //狀態轉移機率物件
    //transition_prob
    trans_prob: {
        's1': { 's1': 0.34, 's2': 0.33, 's3': 0.33 },
        's2': { 's1': 0.33, 's2': 0.34, 's3': 0.33 },
        's3': { 's1': 0.33, 's2': 0.33, 's3': 0.34 }
    },
    //觀測符號出現機率
    //observations_prob 
    obs_prob: {
        's1': { 'A': 0.34, 'B': 0.33, 'C': 0.33 },
        's2': { 'A': 0.33, 'B': 0.34, 'C': 0.33 },
        's3': { 'A': 0.33, 'B': 0.33, 'C': 0.34 }
    }
    // trans_prob: {
    //     's1': { 's1': 0.6, 's2': 0.2, 's3': 0.2 },
    //     's2': { 's1': 0.5, 's2': 0.3, 's3': 0.2 },
    //     's3': { 's1': 0.4, 's2': 0.1, 's3': 0.5 }
    // },
    // //觀測符號出現機率
    // //observations_prob 
    // obs_prob: {
    //     's1': { 'A': 0.7, 'B': 0.1, 'C': 0.2 },
    //     's2': { 'A': 0.1, 'B': 0.6, 'C': 0.3 },
    //     's3': { 'A': 0.3, 'B': 0.3, 'C': 0.4 }
    // }
}

HMM.prototype.tempdata = {
    //觀測符號物件
    //observations
    obs: [],
    //狀態物件
    //states
    states: [
        's1',
        's2',
        's3'
    ],
    //初始機率物件
    //init_state_prob
    init_prob: {
        's1': 0.34,
        's2': 0.33,
        's3': 0.33
    },

    // init_prob: {
    //     's1': 0.5,
    //     's2': 0.2,
    //     's3': 0.3
    // },
    //狀態轉移機率物件
    //transition_prob
    trans_prob: {
        's1': { 's1': 0.34, 's2': 0.33, 's3': 0.33 },
        's2': { 's1': 0.33, 's2': 0.34, 's3': 0.33 },
        's3': { 's1': 0.33, 's2': 0.33, 's3': 0.34 }
    },
    //觀測符號出現機率
    //observations_prob 
    obs_prob: {
        's1': { 'A': 0.34, 'B': 0.33, 'C': 0.33 },
        's2': { 'A': 0.33, 'B': 0.34, 'C': 0.33 },
        's3': { 'A': 0.33, 'B': 0.33, 'C': 0.34 }
    }
    // trans_prob: {
    //     's1': { 's1': 0.6, 's2': 0.2, 's3': 0.2 },
    //     's2': { 's1': 0.5, 's2': 0.3, 's3': 0.2 },
    //     's3': { 's1': 0.4, 's2': 0.1, 's3': 0.5 }
    // },
    // //觀測符號出現機率
    // //observations_prob 
    // obs_prob: {
    //     '1': { 'A': 0.7, 'B': 0.1, 'C': 0.2 },
    //     's2': { 'A': 0.1, 'B': 0.6, 'C': 0.3 },
    //     's3': { 'A': 0.3, 'B': 0.3, 'C': 0.4 }
    // }
}
HMM.prototype.setObservations = function(arr) {
    //以物件導向方式設定observations值
    this.data.obs = arr;
    this.tempdata.obs = arr;
}
HMM.prototype.printInit = function() {
    //將模型內數學機率印出
    console.log("\n Init_state prob: \n", this.data.init_prob);
    console.log("\n Transition prob: \n", this.data.trans_prob);
    console.log("\n Observations prob: \n", this.data.obs_prob);
}


HMM.prototype.question3 = function(prob1, prob2) {
        console.log("------");
        this.setObservations(prob1);
        console.log("Probility of " + prob1.join());
        console.log(ForwardQ1(this.data));
        this.setObservations(prob2);
        console.log("Probility of " + prob2.join());
        console.log(ForwardQ1(this.data));



    }
    //訓練
HMM.prototype.trainning = function(prob) {
    this.setObservations(prob);
    console.log("\n" + prob.join());
    // console.log(this.data.obs);
    //Forward
    // Alpha(this.data, 2, 's1');
    // console.log("  - ");
    // Beta(this.data, 2, 's1');

    // console.log("  - ");
    // console.log("\nForwardQ1: ");
    // console.log(ForwardQ1(this.data));
    // console.log(Alpha(this.data, 2, 's1') * Beta(this.data, 2, 's1') + Alpha(this.data, 2, 's2') * Beta(this.data, 2, 's2') + Alpha(this.data, 2, 's3') * Beta(this.data, 2, 's3'));
    // console.log(ksin(this.data, 2, 's1', 's1')+ksin(this.data, 2, 's1', 's2')+ksin(this.data, 2, 's1', 's3'));
    // console.log(gama(this.data, 2, 's1') );
    var ipatten, jpatten, obpatten;
    for (var i = 0; i < this.data.states.length; i++) {
        ipatten = this.data.states[i];
        for (var j = 0; j < this.data.states.length; j++) {
            jpatten = this.data.states[j];
            this.tempdata.trans_prob[ipatten][jpatten] = trainningA(this.data, ipatten, jpatten);
            console.log("After trainning a[" + ipatten + "][" + jpatten + "]=" + trainningA(this.data, ipatten, jpatten));
        }
    }

    console.log("\n");

    for (var j = 0; j < this.data.states.length; j++) {
        jpatten = this.data.states[j];
        for (var ob = 0; ob < this.data.states.length; ob++) {
            if (ob == 0) obpatten = 'A';
            else if (ob == 1) obpatten = 'B';
            else if (ob == 2) obpatten = 'C';
            this.tempdata.obs_prob[jpatten][obpatten] = trainningB(this.data, jpatten, obpatten);
            console.log("After trainning b[" + ipatten + "][" + obpatten + "]=" + trainningB(this.data, jpatten, obpatten));
        }
    }

    console.log("\n");

    for (var i = 0; i < this.data.states.length; i++) {
        ipatten = this.data.states[i];
        this.tempdata.init_prob[ipatten] = trainningPi(this.data, ipatten);
        console.log("After trainning Pi[" + ipatten + "]=" + trainningPi(this.data, ipatten));

    }

    console.log("\n");
    console.log("P(O|~λ) " + ForwardQ1(this.tempdata));
    console.log("P(O|λ)  " + ForwardQ1(this.data));

    if (ForwardQ1(this.tempdata) > ForwardQ1(this.data))
        this.data = this.tempdata;

    console.log("- section-");
}




function trainningA(data, i, j) {
    var ans = 0;
    var base = 0;
    // ksin(this.data, 2, 's1', 's2')
    // ksin(this.data, t, i, j)
    for (var x = 1; x < data.obs.length - 1; x++)
        ans = ans + ksin(data, x, i, j);

    for (var x = 1; x < data.obs.length - 1; x++)
        base = base + gama(data, x, i);

    ans = accDiv(ans, base);

    return ans;
}


function trainningB(data, j, o) {
    var ans = 0;
    var boo;
    var base = 0;
    // // ksin(this.data, 2, 's1', 's2')
    // // ksin(this.data, t, i, j)
    for (var x = 1; x < data.obs.length; x++) {
        if (data.obs[x] == o) boo = 1;
        else boo = 0;
        ans = ans + boo * gama(data, x, j);
    }

    for (var x = 1; x < data.obs.length; x++)
        base = base + gama(data, x, j);

    ans = accDiv(ans, base);

    return ans;
}


function trainningPi(data, i) {
    var ans = 0;
    ans = gama(data, 1, i);

    return ans;
}


function ForwardQ1(data) {
    var path = [];
    var step = data.obs;

    //初始化路徑
    path[0] = {
        's1': accMul(data.obs_prob['s1'][step[0]], data.init_prob['s1']),
        's2': accMul(data.obs_prob['s2'][step[0]], data.init_prob['s2']),
        's3': accMul(data.obs_prob['s3'][step[0]], data.init_prob['s3'])
    };
    for (var i = 1; i < step.length; i++) {
        //addAll(i,'s1')
        //找出最大的路徑權重
        path[i] = {
            's1': accMul(data.obs_prob['s1'][step[i]], addAll(i, 's1')),
            's2': accMul(data.obs_prob['s2'][step[i]], addAll(i, 's2')),
            's3': accMul(data.obs_prob['s3'][step[i]], addAll(i, 's3'))
        };
    }

    // console.log(path);
    var ans = path[step.length - 1]['s1'] + path[step.length - 1]['s2'] + path[step.length - 1]['s3'];

    // console.log("\nForwardQ1: ");
    // console.log("   =", ans);

    //symbol 轉 state
    function syToSt(inp) {
        var state;
        if (inp == 'A' || inp == 0) state = 's1';
        else if (inp == 'B' || inp == 1) state = 's2';
        else if (inp == 'C' || inp == 2) state = 's3';
        return state;
    }

    function addAll(i, nowSt) {
        //用forward法 加入
        // var stateTemp;
        var sum = 0;

        for (var j = 0; j < 3; j++) {

            sum += accMul(path[i - 1][syToSt(j)], data.trans_prob[syToSt(j)][nowSt]);
            // sum += Math.exp( accLogAdd(Math.log(path[i - 1][syToSt(j)]), Math.log(data.trans_prob[syToSt(j)][nowSt])));
        }
        return sum;
    }
    return ans;

}




function Alpha(data, end, state) {
    var path = [];
    var step = data.obs;

    //初始化路徑
    path[0] = {
        's1': accMul(data.obs_prob['s1'][step[0]], data.init_prob['s1']),
        's2': accMul(data.obs_prob['s2'][step[0]], data.init_prob['s2']),
        's3': accMul(data.obs_prob['s3'][step[0]], data.init_prob['s3'])
    };
    for (var i = 1; i < end; i++) {
        //addAll(i,'s1')
        //找出最大的路徑權重
        path[i] = {
            's1': accMul(data.obs_prob['s1'][step[i]], addAll(i, 's1')),
            's2': accMul(data.obs_prob['s2'][step[i]], addAll(i, 's2')),
            's3': accMul(data.obs_prob['s3'][step[i]], addAll(i, 's3'))
        };
    }
    // console.log(step[end - 1]);
    // console.log(path);
    // var ans = path[end-1]['s1'] + path[end-1]['s2'] + path[end-1]['s3'];

    var ans = path[end - 1][state];

    // console.log("\nalpha: ");
    // console.log("   =", ans);

    //symbol 轉 state
    function syToSt(inp) {
        var state;
        if (inp == 'A' || inp == 0) state = 's1';
        else if (inp == 'B' || inp == 1) state = 's2';
        else if (inp == 'C' || inp == 2) state = 's3';
        return state;
    }

    function addAll(i, nowSt) {
        //用forward法 加入
        // var stateTemp;
        var sum = 0;

        for (var j = 0; j < 3; j++) {

            sum += accMul(path[i - 1][syToSt(j)], data.trans_prob[syToSt(j)][nowSt]);
            // sum += Math.exp( accLogAdd(Math.log(path[i - 1][syToSt(j)]), Math.log(data.trans_prob[syToSt(j)][nowSt])));
        }
        return sum;
    }
    return ans;

}




function Beta(data, start, state) {
    var path = [];
    var step = data.obs;

    //初始化路徑
    // path[start-1] = {
    //     's1': accMul(data.obs_prob['s1'][step[start]], data.init_prob['s1']),
    //     's2': accMul(data.obs_prob['s2'][step[0]], data.init_prob['s2']),
    //     's3': accMul(data.obs_prob['s3'][step[0]], data.init_prob['s3'])
    // };
    if (state == "s1") path[start - 1] = { 's1': 1, 's2': 0, 's3': 0 };
    else if (state == "s2") path[start - 1] = { 's1': 0, 's2': 1, 's3': 0 };
    else if (state == "s3") path[start - 1] = { 's1': 0, 's2': 0, 's3': 1 };

    for (var i = start; i < step.length; i++) {
        //addAll(i,'s1')
        //找出最大的路徑權重
        path[i] = {
            's1': accMul(data.obs_prob['s1'][step[i]], addAll(i, 's1')),
            's2': accMul(data.obs_prob['s2'][step[i]], addAll(i, 's2')),
            's3': accMul(data.obs_prob['s3'][step[i]], addAll(i, 's3'))
        };
    }
    // console.log(" --  ");
    //      console.log(path);
    //      console.log(" --  ");
    var ans;
    //  if(start==step.length){
    //     if (state == "s1") ans=accMul(data.obs_prob['s1'][step[i]], addAll(i, 's1'))
    // else if (state == "s2") 
    // else if (state == "s3") 
    //  }

    // else 
    ans = path[step.length - 1]['s1'] + path[step.length - 1]['s2'] + path[step.length - 1]['s3'];

    // var ans = path[end-1][state] ;

    // console.log("\nBeta: ");
    // console.log("   =", ans);

    //symbol 轉 state
    function syToSt(inp) {
        var state;
        if (inp == 'A' || inp == 0) state = 's1';
        else if (inp == 'B' || inp == 1) state = 's2';
        else if (inp == 'C' || inp == 2) state = 's3';
        return state;
    }

    function addAll(i, nowSt) {
        //用forward法 加入
        // var stateTemp;
        var sum = 0;

        for (var j = 0; j < 3; j++) {

            sum += accMul(path[i - 1][syToSt(j)], data.trans_prob[syToSt(j)][nowSt]);
            // sum += Math.exp( accLogAdd(Math.log(path[i - 1][syToSt(j)]), Math.log(data.trans_prob[syToSt(j)][nowSt])));
        }
        return sum;
    }
    return ans;

}




function ksin(data, t, i, j) {
    var ans = 1;

    ans = accMul(ans, Alpha(data, t, i));
    ans = accMul(ans, data.trans_prob[i][j]);
    ans = accMul(ans, data.obs_prob[j][data.obs[t]]);
    ans = accMul(ans, Beta(data, t + 1, j));
    // console.log(" - ");
    // console.log(Alpha(data, t, i));
    // console.log(data.trans_prob[i][j]);
    // console.log(data.obs_prob[j][data.obs[t]]);
    // console.log(Beta(data, t + 1, j));
    var base = 0;
    for (var o = 0; o < data.states.length; o++) {
        j = data.states[o];
        base += Alpha(data, data.obs.length, j);
    }

    // console.log(base);
    // ans = accDiv(ans, ForwardQ1(data));
    ans = accDiv(ans, base);

    return ans;
}

function gama(data, t, i) {
    var ans = 0;
    var j;
    for (var o = 0; o < data.states.length; o++) {
        j = data.states[o];
        ans = ans + ksin(data, t, i, j)
    }



    return ans;
}




function Viterbi(data) {
    var path = [];
    var step = data.obs;
    var sq = []; //答案路徑
    var Ans; //最佳答案
    //[{s1:w,s2:w,s3:w},{}]
    //初始化路徑
    path[0] = {
        's1': accMul(data.obs_prob['s1'][step[0]], 0.34),
        's2': accMul(data.obs_prob['s2'][step[0]], 0.33),
        's3': accMul(data.obs_prob['s3'][step[0]], 0.33)
    };
    for (var i = 1; i < step.length; i++) {
        //findMAX(i,'s1')
        //找出最大的路徑權重
        path[i] = {
            's1': accMul(data.obs_prob['s1'][step[i]], findMAX(i, 's1')),
            's2': accMul(data.obs_prob['s2'][step[i]], findMAX(i, 's2')),
            's3': accMul(data.obs_prob['s3'][step[i]], findMAX(i, 's3'))
        };
    }

    //權重步驟
    // console.log(path);

    //最後算出來最大的權重就是答案
    Ans = max(path[step.length - 1]['s1'], path[step.length - 1]['s2'], path[step.length - 1]['s3'])[0];
    //向前找路徑
    //初始化最後路徑
    var tempAns = Ans;
    var tempSt = max(path[step.length - 1]['s1'], path[step.length - 1]['s2'], path[step.length - 1]['s3'])[1];
    sq.unshift(max(path[step.length - 1]['s1'], path[step.length - 1]['s2'], path[step.length - 1]['s3'])[1]);

    //往回找路
    for (var i = 5; i >= 0; i--) {
        // accMul(path[i ]['s1'], data.trans_prob['s1'][nowSt])
        for (var k = 0; k < 3; k++) {
            // console.log(accMul(path[i][syToSt(k)], data.trans_prob[syToSt(k)][tempSt]));
            if (accMul(data.obs_prob[tempSt][step[i + 1]], accMul(path[i][syToSt(k)], data.trans_prob[syToSt(k)][tempSt])) == tempAns) {
                tempAns = path[i][syToSt(k)];
                tempSt = syToSt(k);
                sq.unshift(syToSt(k));
            }
        }


    }

    console.log("\nViterbi: ");
    console.log("   =", Ans);
    console.log("    ", sq);




    function max(a, b, c) {
        var M = Math.max(a, b, c);
        if (M == a) return [M, 's1'];
        else if (M == b) return [M, 's2'];
        else if (M == c) return [M, 's3'];
    }

    //symbol 轉 state
    function syToSt(inp) {
        var state;
        if (inp == 'A' || inp == 0) state = 's1';
        else if (inp == 'B' || inp == 1) state = 's2';
        else if (inp == 'C' || inp == 2) state = 's3';
        return state;
    }

    //找這個節點最大的
    function findMAX(i, nowSt) {
        // var stateTemp;
        var max = 0;
        // 找出(前一節點)X(轉移機率)權重最大的
        for (var j = 0; j < 3; j++) {
            if (accMul(path[i - 1][syToSt(j)], data.trans_prob[syToSt(j)][nowSt]) > max)
                max = accMul(path[i - 1][syToSt(j)], data.trans_prob[syToSt(j)][nowSt]);
        }
        return max;
    }

}


//浮點數乘法相乘運算
function accMul(x, y) {
    var m = 0,
        s1 = x.toString(),
        s2 = y.toString();
    try { m += s1.split(".")[1].length } catch (e) {}
    try { m += s2.split(".")[1].length } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

function accMul0(x, y) {
    var c = Math.log(x) + Math.log(y);
    return Math.exp(c);
}

function accDiv(x, y) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try { t1 = x.toString().split(".")[1].length } catch (e) {}
    try { t2 = y.toString().split(".")[1].length } catch (e) {}
    with(Math) {
        r1 = Number(x.toString().replace(".", ""))
        r2 = Number(y.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}


// var LZERO = -1.0E10; // ~log(0)
// var LSMALL = -0.5E10; // log values < LSMALL are set to LZERO
// var minLogExp = -Math.log(-LZERO); // ~=-23
// console.log(LZERO);
// console.log(LSMALL);
// console.log(minLogExp);


// function accLogAdd(x, y) {
//     var temp, diff, z;
//     if (x < y) {
//         temp = x;
//         x = y;
//         y = temp;
//     }
//     diff = y - x; //notice that diff <= 0
//     if (diff < minLogExp) // if y’ is far smaller than x’
//         return (x < LSMALL) ? LZERO : x;
//     else {
//         z = Math.exp(diff);
//         return x + Math.log(1.0 + z);
//     }
// }



// TrainSet 1:
// 1. ABBCABCAABC
// 2. ABCABC
// 3. ABCAABC
// 4. BBABCAB

// 5. BCAABCCAB
// 6. CACCABCA
// 7. CABCABCA
// 8. CABCA
// 9. CABCA


hmmModel1 = new HMM();
hmmModel1.printInit();

hmmModel1.trainning(['A', 'B', 'B', 'C', 'A', 'B', 'C', 'A', 'A', 'B', 'C']);
hmmModel1.trainning(['A', 'B', 'C', 'A', 'B', 'C']);
hmmModel1.trainning(['A', 'B', 'C', 'A', 'A', 'B', 'C']);
hmmModel1.trainning(['B', 'B', 'A', 'B', 'C', 'A', 'B']);
hmmModel1.trainning(['B', 'C', 'A', 'A', 'B', 'C', 'C', 'A', 'B']);
hmmModel1.trainning(['C', 'A', 'C', 'C', 'A', 'B', 'C', 'A']);
hmmModel1.trainning(['C', 'A', 'B', 'C', 'A', 'B', 'C', 'A']);
hmmModel1.trainning(['C', 'A', 'B', 'C', 'A']);
hmmModel1.trainning(['C', 'A', 'B', 'C', 'A']);
hmmModel1.question3(['A', 'B', 'C', 'A', 'B', 'C', 'C', 'A', 'B'], ['A', 'A', 'B', 'A', 'B', 'C', 'C', 'C', 'C', 'B', 'B', 'B']);



// hmmModel2 = new HMM();
// hmmModel2.printInit();

// hmmModel2.trainning(['B', 'B', 'B', 'C', 'C', 'B', 'C']);
// hmmModel2.trainning(['C', 'C', 'B', 'A', 'B', 'B']);
// hmmModel2.trainning(['A', 'A', 'C', 'C', 'B', 'B', 'B']);
// hmmModel2.trainning(['B', 'B', 'A', 'B', 'B', 'A', 'C']);
// hmmModel2.trainning(['C', 'C', 'A', 'A', 'B', 'B', 'A', 'B']);
// hmmModel2.trainning(['B', 'B', 'B', 'C', 'C', 'B', 'A', 'A']);
// hmmModel2.trainning(['A', 'B', 'B', 'B', 'B', 'A', 'B', 'A']);
// hmmModel2.trainning(['C', 'C', 'C', 'C', 'C']);
// hmmModel2.trainning(['B', 'B', 'A', 'A', 'A']);
// hmmModel2.question3(['A', 'B', 'C', 'A', 'B', 'C', 'C', 'A', 'B'], ['A', 'A', 'B', 'A', 'B', 'C', 'C', 'C', 'C', 'B', 'B', 'B']);
