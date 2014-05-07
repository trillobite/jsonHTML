jsonHTML
========

Author: Jesse Parnell

Requires: jQuery

Description:

*There have been recent changes to jsonHTML, code examples below still work, but there are newer more intuitive approaches
 to using jsonHTML, feel free to view the latest methods by taking a look at the new code: syntacticSugarExample.html *

jsonHTML allows you to grant the powers of javaScript to your dreaded static HTML. 
If you find writing HTML to be boring, or just need more flexibility and power to dynamically alter, manipulate,
or duplicate HTML objects as if it were javaScript objects, this is for you. This was created for one of my own projects,
in which virtually none of my div objects, or much of any HTML could have been written
traditionally. jsonHTML was not written for performance, therefore it may not be best for very
large projects, but it is good if you need to write code quickly, and dynamically alter objects in a more intuitive manner. 
Basically if you can do something in javaScript, you can now do it to your HTML.

Before this, to achieve the flexibility required for my projects, I had to write out the HTML as a string, and use jQuery to
add them or manipulate them by parsing that string. This was tedious, especially compared to manipulating JSON objects as an
abstraction layer. Basically put, by creating a JSON object to reflect what you want, jsonHTML takes your object and creates
the string to pass to jQuery, then jQuery handles the rest.

Example below is a template object in which you can create, and add the generated HTML to a div "container." It does require
that there is an existing div to append to. One potential confusion to watch out for, is every time you use a template to 
generate HTML, make sure the id's are never the same, or an append may append to all items of that same id; Good practice will prevent a wormhole
from opening up in your mind, consuming all logic and understanding.
    
EXAMPLE:
    
    //this is the template object, the function will return a custom JSON object using the object you pass to it, which can then be used by
    //appendHTML to generate and append the HTML from your JSON object.
    var jsonHTMLObj = function (data) {
        return {
            type: 'div',
            id: 'thisIsDivStuff'+data.indx, //there must always be an id so that my code knows where to make appends.
            class: 'divStuff',
            text: '<h2>'+HELLO WORLD!+'</h2>', //you can still have some html, it just throws it all in as a string.
            functions: [function () {
                $('#thisIsDivStuff'+data.indx).css({ //set the css styling using jQuery! Or any other functions you would like!
                    'width': '50%',
                    'border': '1px solid black',
                    'text-align': 'center',
                });
            }],
            children: [ //an array of child objects, these can be anything, even text boxes.
                {
                    type: 'div',
                    id: 'thisIsDivStuffChild0', //notice this id is static and could cause some bugs, +data.indx would make it dynamic.
                    text: 'Hello World From Child 0',
                    functions: [function () {
                        $('#thisIsDivStuffChild0').css({
                            'width': '50%',
                            'border': '1px solid black',
                            'text-align': 'center',
                        });
                    }]
                },
                
                {
                    type: 'div',
                    id: 'thisIsDivStuffChild1', //notice this id is static and could cause some bugs, +data.indx would make it dynamic.
                    text: 'Hello World From Child 1',
                    functions: [function () { //This is an array of functions, notice how it only has one function in it currently.
                        $('#thisIsDivStuffChild1').css({
                            'width': '50%',
                            'border': '1px solid black',
                            'text-align': 'center',
                        });
                    }]
                },
            ]
        }
    };
    appendHTML(jsonHTMLObj{ //now just append it to any div!
        indx: 1, //these are properties that you can set to your template object.
    }, 'containerDivIDAsString');
    
Now, lets say I want 'thisIsDivStuffChild1' to mutate into a textbox!

First, we would want to setup a mutable Div and a mutable textbox structure to make things a tad bit easier to conceptualize.
If you have taken C++ in the past, these would be similar to Structs:
```
function mDiv(element) { //a generic mutable JSON Div.
    return {
        type: 'div',
        id: element.id,
        text: element.text,
        functions: [element.css, element.event],
        children: undefined !== element.children ? element.children : undefined, //meh, it could have a child object...
    }  
};

function mTxt(element) { //a generic mutable JSON text object.
    return {
        type: 'textbox',
        id: element.id,
        text: element.text,
        functions: [element.css, element.event],
        children: undefined !== element.children ? element.children : undefined, //meh, it could have a child object...
    }  
};

```
Then, I pass to my "Structs" an object full of properties explaining what I want them to do, I can do this now by completely replacing
my orignal json div element above: 
```
mDiv({
    id: 'thisIsDivStuffChild1',
    text: 'Hello World From Child 1',
    css: function() {
        $('#thisIsDivStuffChild1').css({
            'width': '50%',
            'border': '1px solid black',
            'text-align': 'center',
        });
    },
    event: function () {
        $('#thisIsDivStuffChild1').click(function() { //mutate on the click!
            $('#thisIsDivStuffChild1').remove(); //remove the old
            appendHTML(mTxt({ //in with the new!
                id: 'thisIsDivStuffChild1', //same as the previous id, were replacing the old with the new!
                text: 'Hello World From Child 1', //the text I want in my text box.
                css: function() {
                    $('#thisIsDivStuffChild1').css({
                        'color': 'purple', //i want my textbox font to be purple :)
                    });
                },
                event: function () { //now in reverse!
                    $('#thisIsDivStuffChild1').blur(function() { //when you click away from the textbox, it goes back to original!
                        $('#thisIsDivStuffChild1').remove();
                        appendHTML(jsonHTMLObj(data).children[1], 'thisIsDivStuff'+data.indx); // I can just grab the original object, like recursion!
                    });
                    $('#thisIsDivStuffChild1').focus(); //focus will now be in the text box.
                },
            }), 'thisIsDivStuff'+data.indx);
        });
    },
}),
```
 
~~I have not had the courage yet to add some "Syntactic Sugar" to make object mutation easier to conceptualize,~~ Make sure 
to check out the second HTML example "syntacticSugarExample.html," jsonHTML has been updated and can be written in a more 
functional programming style, but it's still got a long way to go before it's easy to use, but for now, again this is
what we got, if someone would like to fork and add some "Sugar", that would be great, but for now jsonHTML is black as 
a tasty java can be! (Means it has no sugar, does not have to do with race...)

You can execute the completed code in the 'example.html' or 'syntacticSugarExample.html' This is a fully operational example 
of what jsonHTML can do, though, it's only a basic example, and you can do much... MUCH more with jsonHTML.
    
Disclaimer: jsonHTML is provided to you as Free Software (refer to: https://gnu.org/philosophy/free-sw.html ), by using this code
you agree not to hold me responsible for any damages, or consequences of your malicious or "friendly" use of this code.
This code is provided with no warranties, or guarantees, all I ask is you retain credit back to me if you use my code.

```
    (
   ) ) )
  ..........
  |   js   | ]
  \        /
   `------'  Keep it black.
```

Feel free to fork, and ask to become a contributor, if you have an improvement you have implemented in your fork, that 
you believe is totally amazing, and should be included in the main project, ill review it, and possibly implement it, and
give you credit as one of the authors or contributors.