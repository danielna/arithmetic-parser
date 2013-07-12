
// Write a parser that, given a string representation of an arithmetic expression,
// interprets and evaluates the string.

// Use the Shunting-Yard algorithm: http://en.wikipedia.org/wiki/Shunting-yard_algorithm
// which creates a mathematical representation of the tokens in Reverse Polish Notation: http://en.wikipedia.org/wiki/Reverse_Polish_notation

(function(exports, document) {

    var Interpreter = function(str) {
        var self = this;
        this.str = str;
        this.tokens = [];
        this.stack = [];
        this.outputQueue = [];
        this.operators = {
            "^": {
                "precedence": 4,
                "direction": "right"
            },
            "*": {
                "precedence": 3,
                "direction": "left"
            },
            "/": {
                "precedence": 3,
                "direction": "left"
            },
            "+": {
                "precedence": 2,
                "direction": "left"
            },
            "-": {
                "precedence": 2,
                "direction": "left"
            }
        };
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
                return n1 - n2;
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
        return this.tokens;
    };

    Interpreter.prototype.interpret = function(tokens) {
        for (var i = 0; i < tokens.length; i++) {
            var t = tokens[i];
            if (typeof t === 'number') {
                this.outputQueue.push(t);
            } else if (t === "(") {
                this.stack.push(t);
            } else if (t === ")") {
                for(var k = this.stack.length-1; k >= 0; k--){
                    if (this.stack[k] === "(") {
                        this.stack.pop();
                        break;
                    } else {
                        this.outputQueue.push(this.stack.pop());
                    }
                }
            } else if (this.operators[t]) {
                var q = this.operators[this.stack[this.stack.length-1]];
                var tObj = this.operators[t];
                if (q && ((q.precedence > tObj.precedence) || ((q.precedence === tObj.precedence) && tObj.direction === "left"))) {
                    this.outputQueue.push(this.stack.pop());
                    this.stack.push(t);
                } else {
                    this.stack.push(t);
                }
            }
        }

        for (var j = 0; j <= this.stack.length; j++){
            this.outputQueue.push(this.stack.pop());
        }
        document.getElementById("RPN").innerHTML = this.outputQueue.join(" ").toString();
    };

    Interpreter.prototype.calculate = function() {
        var self = this;

        var parseRPN = function(arr) {
            var arrTemp = [];

            if (arr.length === 1) {
                return arr[0];
            }

            for (var i = 0; i < arr.length; i++) {
                var token = arr[i];
                if (typeof token !== "number") {

                    var n2 = arrTemp.pop(),
                        n1 = arrTemp.pop();

                    answer = self.functions[token](n1, n2);
                    arrTemp.push(answer);
                    arrTemp = arrTemp.concat(arr.slice(i+1));
                    break;

                } else {
                    arrTemp.push(token);
                }
            }
            return parseRPN(arrTemp);
        };

        return parseRPN(this.outputQueue);

    };

    Interpreter.prototype.go = function() {
        this.cleanString();
        this.interpret(this.tokens);
        return this.calculate();
    };

    exports.Interpreter = Interpreter;

})(this, document);

window.calculateFormula = function() {
    var pattern = document.getElementById("formula").value;
    document.getElementById("original").innerHTML = pattern;
    // var pattern = "(1+2)^3-6+2";
    var i = new Interpreter(pattern);
    var sum = i.go();
    // console.log("the answer to " + pattern + " is " + sum);
    document.getElementById("sum").innerHTML = sum;
};

