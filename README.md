jsonHTML
========

Author: Jesse Parnell

Requires: jQuery

Description:

jsonHTML allows you to render your HTML using jQuery dynamically. Was created for one of my own projects,
in which virtually none of my div objects, or much of any of the HTML could have been written
statically. jsonHTML was not written for performance, therefore it may not be best for very
large projects, but it is good if you need to write code quickly, and dynamically alter objects in a more intuitive manner. 
Basically if you can do something in javaScript, you can now do it to your HTML.

Example below is a template object in which you can create, and add the generated HTML to a div "container." It does require
that an existing div to append to exists. One confusion to watch out for, is to make sure every time you use a template to 
generate HTML, make sure the id's are never the same, or an append may append to all items of that same id, and cause a wormhole
and great confusion in your project...
    
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
                    id: 'thisIsDivStuffChild0',
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
                    id: 'thisIsDivStuffChild1',
                    text: 'Hello World From Child 1',
                    functions: [function () {
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