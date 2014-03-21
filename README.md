jsonHTML
========

Author: Jesse Parnell

Requires: jQuery

Description:

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
                        $('#thisIsDivStuffChild0').css({
                            'width': '50%',
                            'border': '1px solid black',
                            'text-align': 'center',
                        });
                    }]
                },
            ]
        }
    };
    appendHTML({ //now just append it to any div!
        indx: 1, //these are properties that you can set to your template object.
    }, 'containerDivIDAsString');
    
You can also Execute the code in the 'example.html' This is a fully operational example of what jsonHTML can do, though,
it's a quite basic example, and you can do much... MUCH more with jsonHTML.
    
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