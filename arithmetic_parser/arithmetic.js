
// Write a parser that, given a string representation of an arithmetic expression,
// interprets and evaluates the string.

(function(exports) {

    var Interpreter = function(str) {
        this.str = str;
        this.tokens = [];
        this.operators = ["^", "*", "/", "+", "-"]; // ordered by preference
        this.functions = {
            '^': function(n1, n2) {
                console.log("^:", n1 + "^" + n2);
                return Math.pow(n1, n2);
            },
            '*': function(n1, n2){
                console.log("*:", n1 + "*" + n2);
                return n1*n2;
            },
            '/': function(n1, n2){
                console.log("/:", n1 + "/" + n2);
                return n1/n2;
            },
            '+': function(n1, n2){
                console.log("+:", n1 + "+" + n2);
                return n1+n2;
            },
            '-': function(n1, n2){
                console.log("-:", n1 + "-" + n2);
                return n1-n2;
            }
        };
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
            sum;

        console.log("arr:", arr);
        console.log("c1:",c1);
        console.log("c2:",c2);
        console.log("c3:",c3);
        if (typeof c1 === 'number'){
            sum = this.functions[c2](c1, this.interpret(arr.slice(1, arr.length)));
        } else {
            if (this.operators.indexOf(c1) < this.operators.indexOf(c3)) {
                return c2;
            } else {
                return this.functions[c3](c2, this.interpret(arr.slice(2, arr.length)));
            }
        }
        console.log("arr:", arr);
        console.log("sum:", sum);
    };

    // Recursive function that calculates replacement tokens starting from left
    Interpreter.prototype.calculate = function() {
        if (this.tokens.length > 3){
            var subset = this.tokens.slice(0, 5),
                temp = this.combine(subset.slice(0,3), subset.slice(2, 5));

            this.tokens.splice(0, 5);
            this.tokens = temp.concat(this.tokens);
            this.calculate();
        } else {
            var sum = eval(this.tokens[0] + this.tokens[1] + this.tokens[2]);
            return console.log("sum:", sum);
        }
    };

    // Determine logic of if the right or left-side of the equation should be calculated
    Interpreter.prototype.combine = function(arr1, arr2){
        // console.log("arr1:", arr1);
        // console.log("arr2:", arr2);
        var returnArray = [];
        if (this.operators.indexOf(arr1[1]) <= this.operators.indexOf(arr2[1])) {
            returnArray = this.getCalculatedValue(arr1, arr2, true);
        } else {
            returnArray = this.getCalculatedValue(arr2, arr1);
        }
        // console.log("returnArray:", returnArray);
        return returnArray;
    };

    // Performs calculation of three tokens
    Interpreter.prototype.getCalculatedValue = function(arr1, arr2, leftToRight){
        var calculatedValue = eval(arr1[0] + arr1[1] + arr1[2]);
        if (arr1[1] === "^") {
            calculatedValue = Math.pow(arr1[0], arr1[2]);
        }
        if (leftToRight) {
            return [calculatedValue + "", arr2[1], arr2[2]];
        }
        return [arr2[0], arr2[1], calculatedValue + ""];
    };

    Interpreter.prototype.go = function() {
        this.cleanString();
        this.interpret(this.tokens);
        // return this.calculate();
    };

    exports.Interpreter = Interpreter;
})(this);

var pattern;
pattern = "6+5*3^3-6"; // should be 52
var i = new Interpreter(pattern);
i.go();
