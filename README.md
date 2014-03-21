jsonHTML
========

Author: Jesse Parnell

Description:

This allows you to render html using jQuery dynamically. Was created for one of my own projects,
in which virtually none of my div objects, or much of any of the HTML could have been written
statically in HTML. It was not written for performance, therefore it may not be good for very
large projects, but it is good if you need to write code quickly in a more intuitive manner. 
Basically if you can do something in javaScript, you can now do it to your HTML!
    
EXAMPLE!!!!
    
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
        indx: 1,
    }, 'containerDivIDAsString');