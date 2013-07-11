
// Write a parser that, given a string representation of an arithmetic expression,
// interprets and evaluates the string.

(function(exports) {

    var Interpreter = function(str) {
        var self = this;
        this.str = str;
        this.tokens = [];
        this.operators = ["^", "*", "/", "+", "-"]; // ordered by preference
        this.functions = {
            '^': function(n1, n2) {
                console.log('exponent');
                n1 = self.testParam(n1);
                n2 = self.testParam(n2);
                console.log("^:", n1 + "^" + n2);
                return Math.pow(n1, n2);
            },
            '*': function(n1, n2){
                n1 = self.testParam(n1);
                n2 = self.testParam(n2);
                console.log("*:", n1 + "*" + n2);
                return n1*n2;
            },
            '/': function(n1, n2){
                n1 = self.testParam(n1);
                n2 = self.testParam(n2);
                console.log("/:", n1 + "/" + n2);
                return n1/n2;
            },
            '+': function(n1, n2){
                n1 = self.testParam(n1);
                n2 = self.testParam(n2);
                console.log("+:", n1 + "+" + n2);
                return n1+n2;
            },
            '-': function(n1, n2){
                n1 = self.testParam(n1);
                n2 = self.testParam(n2);
                console.log("-:", n1 + "-" + n2);
                return n1 - n2;
            }
        };
    };

    Interpreter.prototype.testParam = function(n){
        if (typeof n === "number") {
            return n;
        } else if (typeof n === "object") {
            var sum = this.interpret(n.arr.slice(2));
            console.log("sum up:", sum);
            return n.val;
            
            // return sum;
        }
    };

    // Remove spaces
    Interpreter.prototype.cleanString = function() {
        this.tokens = this.str.split("").filter(function(x) {
            return x.trim();
        }).map(function(x){
            var c = parseInt(x, 10);
            return c ? c : x;
        });
        // console.log(this.tokens);
        return this.tokens;
    };

    Interpreter.prototype.interpret = function(arr) {
        var c1 = arr[0],
            c2 = arr[1],
            c3 = arr[2],
            sum,
            returnObj;

        console.log("arr_interpret:", arr);
        console.log("c1:",c1);
        console.log("c2:",c2);
        console.log("c3:",c3);
        if (!c3) {
            return c2;
        }
        if (typeof c1 === 'number'){
            // sum = this.functions[c2](c1, this.interpret(arr.slice(1, arr.length)));
            returnObj = { 'val': c1, arr: arr.slice(1, arr.length)};
            sum = this.callFunc(c2, null, returnObj);
        } else {
            if (this.operators.indexOf(c1) < this.operators.indexOf(c3)) {
                // console.log('slice:', arr.slice(2, arr.length));
                // return this.functions[c3](this.interpret(arr.slice(2, arr.length)), c2);
                console.log("less than");
                return { 'val': c2, 'arr': arr};
            } else {
                // console.log("func right:", c3);
                returnObj = { 'val': c2, arr: arr.slice(2, arr.length)};
                // return this.functions[c3](c2, this.interpret(arr.slice(2, arr.length)));
                return this.callFunc(c3, "right", returnObj);
            }
        }
        // console.log("arr:", arr);
        console.log("end sum:", sum);
    };

    Interpreter.prototype.callFunc = function(operator, direction, returnObj) {
        var val = returnObj.val,
            arr = returnObj.arr;

        console.log('returnObj:', returnObj);
        console.log('val:', val);
        console.log('arr:', arr);
        if (!direction) {
            return this.functions[operator](val, this.interpret(arr));
        }
        if (direction === "right") {
            console.log("right");
            console.log("1st val:", val);
            return this.functions[operator](val, this.interpret(arr));
        }
        // if (direction === "left") {
        //     console.log("left");
        //     console.log("2nd val:", val);
        //     return this.functions[operator](this.interpret(arr), val);
        // }
    };

    // // Recursive function that calculates replacement tokens starting from left
    // Interpreter.prototype.calculate = function() {
    //     if (this.tokens.length > 3){
    //         var subset = this.tokens.slice(0, 5),
    //             temp = this.combine(subset.slice(0,3), subset.slice(2, 5));

    //         this.tokens.splice(0, 5);
    //         this.tokens = temp.concat(this.tokens);
    //         this.calculate();
    //     } else {
    //         var sum = eval(this.tokens[0] + this.tokens[1] + this.tokens[2]);
    //         return console.log("sum:", sum);
    //     }
    // };

    // // Determine logic of if the right or left-side of the equation should be calculated
    // Interpreter.prototype.combine = function(arr1, arr2){
    //     // console.log("arr1:", arr1);
    //     // console.log("arr2:", arr2);
    //     var returnArray = [];
    //     if (this.operators.indexOf(arr1[1]) <= this.operators.indexOf(arr2[1])) {
    //         returnArray = this.getCalculatedValue(arr1, arr2, true);
    //     } else {
    //         returnArray = this.getCalculatedValue(arr2, arr1);
    //     }
    //     // console.log("returnArray:", returnArray);
    //     return returnArray;
    // };

    // // Performs calculation of three tokens
    // Interpreter.prototype.getCalculatedValue = function(arr1, arr2, leftToRight){
    //     var calculatedValue = eval(arr1[0] + arr1[1] + arr1[2]);
    //     if (arr1[1] === "^") {
    //         calculatedValue = Math.pow(arr1[0], arr1[2]);
    //     }
    //     if (leftToRight) {
    //         return [calculatedValue + "", arr2[1], arr2[2]];
    //     }
    //     return [arr2[0], arr2[1], calculatedValue + ""];
    // };

    Interpreter.prototype.go = function() {
        this.cleanString();
        this.interpret(this.tokens);
        // return this.calculate();
    };

    exports.Interpreter = Interpreter;
})(this);

var pattern;
pattern = "6+2^3-6+2"; // should be 52
var i = new Interpreter(pattern);
i.go();
