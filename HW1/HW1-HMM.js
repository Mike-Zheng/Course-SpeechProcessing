//2016 NTU mike
//隱馬可夫數學模型
var HMM = {
    data: {
        obs: [], //observations
        states: [
            's1',
            's2',
            's3'
        ],
        init_prob: { //init_state_prob
            's1': 0.5,
            's2': 0.2,
            's3': 0.3
        },
        trans_prob: { //transition_prob
            's1': { 's1': 0.6, 's2': 0.2, 's3': 0.2 },
            's2': { 's1': 0.5, 's2': 0.3, 's3': 0.2 },
            's3': { 's1': 0.4, 's2': 0.1, 's3': 0.5 }
        },
        obs_prob: { //observations_prob 
            's1': { 'up': 0.7, 'down': 0.1, 'unchanged': 0.2 },
            's2': { 'up': 0.1, 'down': 0.6, 'unchanged': 0.3 },
            's3': { 'up': 0.3, 'down': 0.3, 'unchanged': 0.4 }
        }
    },
    setObservations: function(arr) {
        //以物件導向方式設定observations值
        this.data.obs = arr;
    },
    printInit: function() {
        //將模型內數學機率印出
        console.log("\n Init_state prob: \n", this.data.init_prob);
        console.log("\n Transition prob: \n", this.data.trans_prob);
        console.log("\n Observations prob: \n", this.data.obs_prob);
    },
    //第一題
    question1: function() {
        var initP = this.data.init_prob;
        var tranP = this.data.trans_prob;
        //乘法佇列
        var squence = [initP['s1'], tranP['s1']['s1'], tranP['s1']['s3'], tranP['s3']['s2'], tranP['s2']['s3'], tranP['s3']['s2'], tranP['s2']['s1']];
        console.log("\nQuestion1:   P(up, up, unchanged, down, unchanged, down, up|λ)");
        console.log("   =P(S1)P(S1|S1)P(S3|S1)P(S2|S3)P(S3|S2)P(S2|S3)P(S1|S2)");
        console.log("   =", squence.join(" "));
        var ans = 1.0;
        //浮點數相乘
        squence.forEach(function(p, i) {
            ans = accMul(ans, p);
        });
        console.log("   =", ans);

    },
    //第二題
    question2: function(prob) {
        this.setObservations(prob);
        var q2 = "\nQuestion2:   Find the optimal state sequence of the model which generates the observation sequence: (up, up, unchanged, down, unchanged, down, up)";
        console.log(q2);
        Viterbi(this.data);
        BruteForce(this.data);
        greedy(this.data);
    }
}


function BruteForce(data) {


    //排列組合用的維度 BEGIN
    //參考http://blog.darkthread.net/post-2012-03-17-recursion-game.aspx
    var dimensions = [];
    for (var i = 0; i < 7; i++) {
        dimensions.push(["s1", "s2", "s3"]);
    }
    //用以存放結果的陣列
    var results = [];
    //使用遞迴方式排列出所有組合
    //共有兩個傳入參數，目前處理的維度、排列組合時已累積的字首
    function explore(curDim, prefix) {
        //取出下一層維度
        var nextDim = dimensions.shift();
        for (var i = 0; i < curDim.length; i++) {
            if (nextDim)
            //若仍有下一層維度，繼續展開
            //並將傳入字首加上目前維度選項成為下一層的字首
                explore(nextDim, prefix + curDim[i] + ",");
            else
            //若已無下一層，則傳入字首加上目前維度選項成為結果
                results.push(prefix + curDim[i]);
        }
        //將下層維度存回，供上層維度其他選項使用
        if (nextDim) dimensions.push(nextDim);
    }
    //傳入第一層維度開始演算
    explore(dimensions.shift(), "");
    //排列組合用的維度 END

    //初始化最大值暫存變數
    var MAX = 0;
    //初始化佇列
    var sq;
    var nowAns = 1;

    //從1~3^7將所有路徑納入考慮
    for (var i = 0; i < 2187; i++) {
        var dig = results[i].split(',')
        nowAns = 1;
        for (var j = 0; j < 7; j++) {
            //將路徑上機率相乘
            nowAns = accMul(data.obs_prob[dig[j]][data.obs[j]], nowAns);
            if (j == 0) nowAns = accMul(data.init_prob[dig[j]], nowAns);
            if (j < 6) nowAns = accMul(data.trans_prob[dig[j]][dig[j + 1]], nowAns);
        }
        if (MAX < nowAns) {
            //找出可能機率放入暫存變數
            MAX = nowAns;
            sq = results[i];
        }

    }
    console.log("\nBruteForce: ");
    console.log("   =", MAX);
    console.log("    ", sq.split(',').join().split(','));

    //檢查答案局部乘法用
    // console.log('Check: ');
    // var qdi = sq.split(',')
    // // console.log(data.obs_prob[qdi[0]]);
    // nowAns = 1;
    // for (var j = 0; j < 7; j++) {
    //     console.log(data.obs_prob[qdi[j]][data.obs[j]]);
    //     if (j == 0) console.log(data.init_prob[qdi[j]]);
    //     if (j < 6) console.log(data.trans_prob[qdi[j]][qdi[j + 1]]);
    // }

}

function greedy(data) {
    var sq = [];
    var nowAns = 1;
    var step = data.obs;

    //加入路徑
    sq.push(syToSt(step[0]));
    // 初始狀態出現機率
    nowAns = accMul(data.obs_prob[syToSt(step[0])][step[0]], data.init_prob[syToSt(step[0])]);

    for (var i = 1; i < step.length; i++) {
        //將7個節點抓該點最大的相乘
        nowAns = accMul(findMAX(data.trans_prob, sq[sq.length - 1], step[i]), nowAns);
    }

    //symbol 轉 state
    function syToSt(inp) {
        var state;
        if (inp == 'up' || inp == 0) state = 's1';
        else if (inp == 'down' || inp == 1) state = 's2';
        else if (inp == 'unchanged' || inp == 2) state = 's3';
        return state;
    }

    //找這個節點最大的
    function findMAX(arr, now, nxtObs) {
        var stateTemp;
        var max = 0;
        var fd;

        for (var i = 0; i < data.states.length; i++) { //state 有3種
            //考慮結點挑最大的
            fd = syToSt(i);
            if (accMul(data.trans_prob[now][fd], data.obs_prob[fd][nxtObs]) > max) {
                max = accMul(data.trans_prob[now][fd], data.obs_prob[fd][nxtObs]);
                stateTemp = fd;
            }

        }
        //若為最大加入路徑
        sq.push(stateTemp);
        return max;
    }

    console.log("\nGreedy: ");
    console.log("   =", nowAns);
    console.log("    ", sq);


}




function Viterbi_A(data) {
    var sq = [];
    var nowAns = 1;
    var step = data.obs;
    //初始狀態
    // var temps;
    // if (step[0] == 'up') temps = 's1';
    // else if (step[0] == 'down') temps = 's2';
    // else if (step[0] == 'unchanged') temps = 's2';
    console.log('\n \n');
    sq.push(syToSt(step[0]));
    nowAns = accMul(data.obs_prob[syToSt(step[0])][step[0]], data.init_prob[syToSt(step[0])]);
    console.log(nowAns);

    for (var i = 1; i < 7; i++) {
        console.log(sq[sq.length - 1]);
        nowAns = accMul(findMAX(data.trans_prob, sq[sq.length - 1], step[i]), nowAns);

    }

    function syToSt(inp) {
        var state;
        if (inp == 'up') state = 's1';
        else if (inp == 'down') state = 's2';
        else if (inp == 'unchanged') state = 's3';
        return state;
    }

    function findMAX(arr, now, nxtObs) {
        var stateTemp;
        var max = 0;
        var fd;


        for (var i = 0; i < 3; i++) {
            if (i == 0) fd = 's1';
            else if (i == 1) fd = 's2';
            else if (i == 2) fd = 's3';
            console.log(fd + '  :');
            console.log(accMul(data.trans_prob[now][fd], data.obs_prob[fd][nxtObs]));
            if (accMul(data.trans_prob[now][fd], data.obs_prob[fd][nxtObs]) > max) {
                max = accMul(data.trans_prob[now][fd], data.obs_prob[fd][nxtObs]);
                stateTemp = fd;
            }

        }

        // arr[syToSt(preObs,)][syToSt(nxtObs)]
        // console.log(nxtObs);
        // console.log(arr);
        // console.log('\n');


        sq.push(stateTemp);
        return max;
    }

    console.log(sq);
    console.log(nowAns);

}

function Viterbi(data) {
    var V = [{}];
    var path = {};

    // Initialize base cases (t == 0)
    for (var i = 0; i < data.states.length; i++) {
        var state = data.states[i];
        V[0][state] = data.init_prob[state] * data.obs_prob[state][data.obs[0]];
        path[state] = [state];
    }

    // Run Viterbi for t > 0
    for (var t = 1; t < data.obs.length; t++) {
        V.push({});
        var newpath = {};

        for (var i = 0; i < data.states.length; i++) {
            var state = data.states[i];
            var max = [0, null];
            for (var j = 0; j < data.states.length; j++) {
                var state0 = data.states[j];
                // Calculate the probablity
                var calc = V[t - 1][state0] * data.trans_prob[state0][state] * data.obs_prob[state][data.obs[t]];
                if (calc > max[0]) max = [calc, state0];
            }
            V[t][state] = max[0];
            newpath[state] = path[max[1]].concat(state);
        }
        path = newpath;
    }

    var max = [0, null];
    for (var i = 0; i < data.states.length; i++) {
        var state = data.states[i];
        var calc = V[data.obs.length - 1][state];
        if (calc > max[0]) max = [calc, state];
    }
    console.log("\nViterbi: ");
    console.log("   =", max[0]);
    console.log("    ", path[max[1]]);
    // return [max[0], path[max[1]]];
}

function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) {}
    try { m += s2.split(".")[1].length } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}



HMM.printInit();
HMM.question1();
HMM.question2(['up', 'up', 'unchanged', 'down', 'unchanged', 'down', 'up']);
