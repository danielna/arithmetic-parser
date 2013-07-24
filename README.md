Arithmetic Parser
================

Parse an arithmetic string, respecting order of operations.

Please Excuse My Dear Aunt Sally.  Fourth grade FTW

arithmetic.js is using the [shunting-yard algorithm](http://en.wikipedia.org/wiki/Shunting-yard_algorithm), which is used to convert an arithmetic expression into [reverse polish notation](http://en.wikipedia.org/wiki/Reverse_Polish_notation).  Reverse polish notation is great for this use case because it semantically expresses the order of operations of a mathematic formula.

Check it out with a mediocore UI: [http://danielna.github.io/arithmetic-parser](http://danielna.github.io/arithmetic-parser)