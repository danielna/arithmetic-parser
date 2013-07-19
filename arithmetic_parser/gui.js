;(function(exports) {
    var getPattern = function() {
        return document.getElementById("formula").value;
    };

    var setOriginalPattern = function(pattern) {
        document.getElementById("original").innerHTML = pattern
    };

    var setRpn = function(rpn) {
        document.getElementById("RPN").innerHTML = rpn;
    };

    var setSum = function(sum) {
        document.getElementById("sum").innerHTML = sum;
    };

    var calculateFormula = function() {
        var pattern = getPattern();
        setOriginalPattern(pattern);
        var i = new Interpreter(pattern);
        setRpn(i.toReversePolishNotation(i.tokenize(pattern)));
        setSum(i.go(pattern));
    };

    exports.gui = {};
    exports.gui.calculateFormula = calculateFormula;
}(this));
