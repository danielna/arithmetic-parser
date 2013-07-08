
// Write a parser that, given a string representation of an arithmetic expression,
// interprets and evaluates the string.

(function(exports) {

    var Interpreter = function(str) {
        this.str = str;
        this.tokens = [];
        this.operators = ["^", "*", "/", "+", "-"]; // ordered by preference
    };

    // Remove spaces
    Interpreter.prototype.cleanString = function() {
        this.tokens = this.str.split("").filter(function(x) {
            return x.trim();
        });
        return this.tokens;
    };

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
        return this.calculate();
    };

    exports.Interpreter = Interpreter;
})(this);

var pattern;
pattern = "6/2+3^3*4/2+7-2*6"; // should be 52
var i = new Interpreter(pattern);
i.go();
