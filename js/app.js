App = Ember.Application.create();

var questions = [
    {
        id: '1',
        title: 'Warmup 1',
        question: '<p class="lead">What is x?</p><pre class="question">function funky(o) {\n    o = null;\n}\nvar x = [];\nfunky(x);\nlog(x);</pre><br>A. null<br>B. []<br>C. undefined<br>D. throw',
        answer: '<pre class="answer">B. []\n\nWhy?\n"o" is never returned after being set to null.</pre>'
    },
    {
        id: '2',
        title: 'Warmup 2',
        question: '<p class="lead">What is x?</p><pre class="question">function swap(a, b) {\n    var temp = a;\n    a = b;\n    b = temp\n}\nvar x = 1, y = 2;\nswap(x, y);\nlog(x);</pre><br>A. 1<br>B. 2<br>C. undefined<br>D. throw',
        answer: '<pre class="answer">A. 1\n\nWhy?\nNothing is returned.  "x" never changes</pre>'
    },
    {
        id: '3',
        title: 'Add / Multiply',
        question: '<p class="lead">Write two binary functions, `add` and `mul`, that take two numbers and return their sum and product.</p><pre class="question">add(3, 4)     // 7\nmul(3, 4)     //12</pre>',
        answer: '<pre class="answer">function add(x, y) { \n    return x + y; \n}\n\nfunction mul(x, y) { \n    return x * y; \n}</pre>'
    },
    {
        id: '4',
        title: 'Function that returns that argument',
        question: '<p class="lead">Write a function `identityf` that takes an argument and returns a function that returns that argument.</p><pre class="question">var idf3 = identityf(3);\nidf3()    // 3</pre>',
        answer: '<pre class="answer">function identityf(x){\n    return function (){\n        return x;\n    }\n}</pre>' 
    },
    {
        id: '5',
        title: 'Add from two invocations',
        question: '<p class="lead">Write a function that adds from two Invocations.</p><pre class="question">addf(3)(4)    // 7</pre>',
        answer: '<pre class="answer">function addf(first){\n    return function (second){ \n        return first + second;\n    };\n}</pre>' 
    },
    {
        id: '6',
        title: 'Callable Binary with two invocations.',
        question: '<p class="lead">Write a function that takes a binary function, and makes it callable with two invocations.</p><pre class="question">var addf = applyf(add);\naddf(3)(4)           // 7\napplyf(mul)(5)(6)    // 30</pre>',
        answer: '<pre class="answer">function applyf(binary) {\n    return function (first) {\n        return function (second) {\n            return binary(first, second);\n        };\n    };\n}</pre>' 
    },
    {
        id: '7',
        title: 'Call two binary functions',
        question: '<p class="lead">Write a function `composeb` that takes two binary functions and returns a function that calls them both.</p><pre class="question">composeb(add, mul)(2, 3, 5)    // 25</pre>',
        answer: '<pre class="answer">function composeb(f, g) {\n    return function (a, b, c) {\n        return g(f(a, b), c);\n    };\n}</pre>'
    },
    {
        id: '8',
        title: 'Call binary only once',
        question: '<p class="lead">Write a function that allows a binary function to be called only once.</p><pre class="question">addOnce = once(add);\naddOnce(3, 4)     // 7\naddOnce(3, 5)    // "error"</pre>',
        answer: '<pre class="answer">function once(func) {\n    return function (a, b) {\n        var temp;\n        if (func) {\n            temp = func;\n            func = false;\n            return temp(a, b);\n        }\n        return "error";\n    };\n}</pre>'
    },
    {
        id: '9',
        title: 'Factory function',
        question: '<p class="lead">Write a factory function that returns two functions that implement an up/down counter, hiding the counter.</p><pre class="question">counter = counterf(10);\nvar inc = counter.inc,\n    dec = counter.dec;\ninc()   // 11\ndec()   // 10</pre>',
        answer: '<pre class="answer">function counterf(value) {\n    return {\n        inc: function () {\n            value += 1;\n            return value;\n        },\n        dec: function () {\n            value -= 1;\n            return value;\n        }\n    };\n}</pre>'
    },
    {
        id: '10',
        title: 'Generate unique symbols',
        question: '<p class="lead">Make a function `gensymf` that makes a function that generates  unique symbols.</p><pre class="question">var gensym = gensymf("G");\ngensym()      // "G1"\ngensym()      // "G2"\ngensym()      // "G3"\ngensym()      // "G4"</pre>',
        answer: '<pre class="answer">function gensymf(prefix) {\n    var number = 0;\n    return function () {\n        number += 1;\n        return prefix + number;\n    };\n}</pre>'
    },
    {
        id: '11',
        title: 'Fibonacci numbers',
        question: '<p class="lead">Make a function `fibonaccif` that returns a function that will return the next fibonacci number.</p><pre class="question">var fib = fibonaccif(0, 1);\nfib()    // 0\nfib()    // 1\nfib()    // 1\nfib()    // 2\nfib()    // 3\nfib()    // 5</pre>',
        answer: '<pre class="answer">function fibonaccif (a, b){\n    return function(){\n        var next = a;\n        a = b;\n        b += next;\n        return next;\n    };\n}</pre>'
}];


App.Router.map(function() {
        this.resource('about');
    this.resource('questions', function(){
        this.resource('question', { path: ':question_id' });
    });
});


App.QuestionsRoute = Ember.Route.extend({
    model: function(){
        return questions;
    }
});

App.QuestionRoute = Ember.Route.extend({
    model: function(params){
        return questions.findBy('id', params.question_id);
    }
});

App.IndexRoute = Ember.Route.extend({
        setupController: function(controller){
        controller.set('content', ['hello']);
    }
});


var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

// jQuery Custom
(function ($) {
    $(function () {

        // Bootstrap Tabs
        $('#functions a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        })

        // If other questions are clicked, set 'Question' tab to active
        $('.bs-sidenav').click(function(){
            $('#functions li:first > a').click();
        });
    });
})(jQuery);