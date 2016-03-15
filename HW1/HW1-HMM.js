var HMM = {
    pi: [0.5, 0.2, 0.3],
    A: [
        [0.6, 0.2, 0.2],
        [0.5, 0.3, 0.2],
        [0.4, 0.1, 0.5]
    ],
    B1: [0.7, 0.1, 0.2],
    B2: [0.1, 0.6, 0.3],
    B3: [0.3, 0.3, 0.4],
    PrintInit: function() {
        console.log("\n Init state prob. \n", this.pi);
        console.log("\n A: \n", this.A);
        console.log("\n B1: \n", this.B1);
        console.log("\n B2: \n", this.B2);
        console.log("\n B3: \n", this.B3);
    },


    OperationProcess: function(squence) {
    	var procesS;
    	squence.forEach(function(p, i) {
            ans = accMul(ans, p);
        });
        console.log(a);
    },

    question1: function() {
        var q1 = "\nQuestion1:   P(up, up, unchanged, down, unchanged, down, up|λ)";
        var squence = [this.pi[0], this.A[0][0], this.A[0][2], this.A[2][1], this.A[1][2], this.A[2][1], this.A[1][0]];
		// this.OperationProcess(squence);
        console.log(q1);
        console.log("   =P(S1)P(S1|S1)P(S3|S1)P(S2|S3)P(S3|S2)P(S2|S3)P(S1|S2)");
        console.log("   =", this.pi[0], this.A[0][0], this.A[0][2], this.A[2][1], this.A[1][2], this.A[2][1], this.A[1][0]);
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
