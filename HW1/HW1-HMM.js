//2016 NTU mike
var HMM = {
    data: {
        states: [
            's1',
            's2',
            's3'
        ],
        //observations
        obs: [
            'up',
            'up',
            'unchanged',
            'down',
            'unchanged',
            'down',
            'up'

        ],
        //init_state_prob
        init_prob: {
            's1': 0.5,
            's2': 0.2,
            's3': 0.3
        },
        //transition_prob
        trans_prob: {
            's1': { 's1': 0.6, 's2': 0.2, 's3': 0.2 },
            's2': { 's1': 0.5, 's2': 0.3, 's3': 0.2 },
            's3': { 's1': 0.4, 's2': 0.1, 's3': 0.5 }
        },
        //observations_prob
        obs_prob: {
            's1': { 'up': 0.7, 'down': 0.1, 'unchanged': 0.2 },
            's2': { 'up': 0.1, 'down': 0.6, 'unchanged': 0.3 },
            's3': { 'up': 0.3, 'down': 0.3, 'unchanged': 0.4 }
        }
    },
    PrintInit: function() {
        console.log("\n init_state_prob: \n", this.data.init_prob);
        console.log("\n transition_prob: \n", this.data.trans_prob);
        console.log("\n observations_prob: \n", this.data.obs_prob);
    },

    question1: function() {
        var initP = this.data.init_prob;
        var tranP = this.data.trans_prob;
        var q1 = "\nQuestion1:   P(up, up, unchanged, down, unchanged, down, up|λ)";
        var squence = [initP['s1'], tranP['s1']['s1'], tranP['s1']['s3'], tranP['s3']['s2'], tranP['s2']['s3'], tranP['s3']['s2'], tranP['s2']['s1']];
        console.log(q1);
        console.log("   =P(S1)P(S1|S1)P(S3|S1)P(S2|S3)P(S3|S2)P(S2|S3)P(S1|S2)");
        console.log("   =", initP['s1'], tranP['s1']['s1'], tranP['s1']['s3'], tranP['s3']['s2'], tranP['s2']['s3'], tranP['s3']['s2'], tranP['s2']['s1']);
        var ans = 1.0;
        squence.forEach(function(p, i) {
            ans = accMul(ans, p);
        });
        console.log("   =", ans);

    },

    question2: function() {
        var q2 = "\nQuestion2:   Find the optimal state sequence of the model which generates the observation sequence: (up, up, unchanged, down, unchanged, down, up)";
        console.log(q2);

    }
}

function Viterbi(data) {
  
}

function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) {}
    try { m += s2.split(".")[1].length } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}


HMM.PrintInit();
HMM.question1();
HMM.question2();
