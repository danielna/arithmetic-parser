
// Write a parser that, given a string representation of an arithmetic expression,
// interprets and evaluates the string.

// Use the Shunting-Yard algorithm: http://en.wikipedia.org/wiki/Shunting-yard_algorithm
// which creates a mathematical representation of the tokens in Reverse Polish Notation: http://en.wikipedia.org/wiki/Reverse_Polish_notation

(function(exports) {

    var Interpreter = function(str) {
        var self = this;
        this.str = str;
        this.tokens = [];
        this.stack = [];
        this.outputQueue = [];
        // this.operators = ["^", "*", "/", "+", "-"]; // ordered by preference
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
        // console.log(this.tokens);
        return this.tokens;
    };

    Interpreter.prototype.interpret = function(tokens) {
        for (var i = 0; i < tokens.length; i++) {
            var t = tokens[i];
            // console.log("this token:", t);
            if (typeof t === 'number') {
                this.outputQueue.push(t);
            } else if (t === "(") {
                this.stack.push(t);
            } else if (t === ")") {
                for(var k = this.stack.length-1; k >= 0; k--){
                    // console.log("this.stack:", this.stack);
                    // console.log("stack[k]:", this.stack);
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
                // console.log("q:", q);
                // console.log("tObj:", tObj);
                if (q && ((q.precedence > tObj.precedence) || ((q.precedence === tObj.precedence) && tObj.direction === "left"))) {
                    this.outputQueue.push(this.stack.pop());
                    this.stack.push(t);
                } else {
                    this.stack.push(t);
                }
            }
            // console.log("outputQueue:", this.outputQueue);
            // console.log("stack:", this.stack);
        }

        for (var j = 0; j <= this.stack.length; j++){
            this.outputQueue.push(this.stack.pop());
        }

        console.log("outputQueue:", this.outputQueue);
        console.log("stack:", this.stack);
    };

    Interpreter.prototype.go = function() {
        this.cleanString();
        this.interpret(this.tokens);
    };

    exports.Interpreter = Interpreter;
})(this);

var pattern;
pattern = "(6+2)^3-6+2"; // should be 52
var i = new Interpreter(pattern);
i.go();
