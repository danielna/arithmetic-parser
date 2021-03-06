
// Write a parser that, given a string representation of an arithmetic expression,
// interprets and evaluates the string.

// Use the Shunting-Yard algorithm: http://en.wikipedia.org/wiki/Shunting-yard_algorithm
// which creates a mathematical representation of the tokens in Reverse Polish Notation: http://en.wikipedia.org/wiki/Reverse_Polish_notation

(function(exports, document) {

    var Interpreter = function() {
        this.operators = {
            "^": {
                "precedence": 4,
                "direction": "right",
                "fn": function(n1, n2) {
                    console.log("^:", n1 + "^" + n2);
                    return Math.pow(n1, n2);
                }
            },
            "*": {
                "precedence": 3,
                "direction": "left",
                "fn": function(n1, n2){
                    console.log("*:", n1 + "*" + n2);
                    return n1*n2;
                }
            },
            "/": {
                "precedence": 3,
                "direction": "left",
                "fn": function(n1, n2){
                    console.log("/:", n1 + "/" + n2);
                    return n1/n2;
                }
            },
            "+": {
                "precedence": 2,
                "direction": "left",
                "fn": function(n1, n2){
                    console.log("+:", n1 + "+" + n2);
                    return n1+n2;
                }
            },
            "-": {
                "precedence": 2,
                "direction": "left",
                "fn": function(n1, n2){
                    console.log("-:", n1 + "-" + n2);
                    return n1 - n2;
                }
            }
        };
    };

    // Remove spaces
    Interpreter.prototype.tokenize = function(str) {
        var tokens = str.split("").filter(function(x) {
            return x.trim();
        });

        // Collapse sequences of digits into one digit
        // i.e. 1,1,1 becomes 111
        for (var i = tokens.length-1; i >= 0; i--){
            if (i >= 1) {
                var t = parseInt(tokens[i], 10) ? parseInt(tokens[i], 10) : "",
                    t1 = parseInt(tokens[i-1], 10) ? parseInt(tokens[i-1], 10) : "";
                if (typeof t == "number" && typeof t1 == "number") {
                    tokens[i-1] =  t1.toString() + t.toString();
                    tokens.splice(i, 1);
                }
            }
        }

        return tokens.map(function(x){
            var c = parseInt(x, 10);
            return c ? c : x;
        });
    };

    Interpreter.prototype.toReversePolishNotation = function(tokens) {
        var outputQueue = [];
        var stack = [];
        for (var i = 0; i < tokens.length; i++) {
            var t = tokens[i];
            if (typeof t === 'number') {
                outputQueue.push(t);
            } else if (t === "(") {
                stack.push(t);
            } else if (t === ")") {
                for(var k = stack.length-1; k >= 0; k--){
                    if (stack[k] === "(") {
                        stack.pop();
                        break;
                    } else {
                        outputQueue.push(stack.pop());
                    }
                }
            } else if (this.operators[t]) {
                var q = this.operators[stack[stack.length-1]];
                var tObj = this.operators[t];
                if (q &&
                    ((q.precedence > tObj.precedence) ||
                     ((q.precedence === tObj.precedence) &&
                      tObj.direction === "left"))) {
                    outputQueue.push(stack.pop());
                    stack.push(t);
                } else {
                    stack.push(t);
                }
            }
        }

        for (var j = stack.length - 1; j >= 0; j--){
            outputQueue.push(stack.pop());
        }

        return outputQueue;
    };

    Interpreter.prototype.calculate = function(outputQueue) {
        var arrTemp = [];

        if (outputQueue.length === 1) {
            return outputQueue[0];
        }

        for (var i = 0; i < outputQueue.length; i++) {
            var token = outputQueue[i];
            if (typeof token !== "number") {

                var n2 = arrTemp.pop(),
                n1 = arrTemp.pop();

                answer = this.operators[token].fn(n1, n2);
                arrTemp.push(answer);
                arrTemp = arrTemp.concat(outputQueue.slice(i+1));
                break;

            } else {
                arrTemp.push(token);
            }
        }
        return this.calculate(arrTemp);
    };

    Interpreter.prototype.go = function(pattern) {
        var tokens = this.tokenize(pattern);
        var outputQueue = this.toReversePolishNotation(tokens);
        return this.calculate(outputQueue);
    };

    exports.Interpreter = Interpreter;

})(this);
