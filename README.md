jsonHTML
========

Author: Jesse Parnell

Requires: jQuery

Description:

Documentation / Code examples Relevant for v0.6+

-------------------------------------------------------------------------------------------------------------------------

There have been recent changes to jsonHTML, v0.6 is slightly incompatible, incompatibilites are noted in the Incompatibility Notice at the bottom of this document. Feel free to view the latest methods by taking a look at the new code example: syntacticSugarExample.html

#####The example code in this documentation is currently being bug tested.

-------------------------------------------------------------------------------------------------------------------------

Overview
--------

jsonHTML allows you to grant the powers of javaScript to your dreaded static HTML.
If you find writing HTML to be boring, or just need more flexibility and power to dynamically alter, manipulate,
or duplicate HTML objects as if it were javaScript objects, this is for you. jsonHTML was created in a rush for one of my
own projects, in which virtually none of my div objects, or much of any HTML could have been written
traditionally, thus, I will release new versions, and improve functionality as my projects require more. jsonHTML was not written for performance, therefore it may not be best for very
large projects, but it is good if you need to write code quickly, and dynamically alter objects in a more intuitive manner. 
Basically the goal of the jsonHTML project is if you can do something in javaScript, you will be able to reflect it in HTML.

Before this, to achieve the flexibility required for my projects, I had to write out the HTML as a string, and use jQuery to
add them or manipulate them by parsing that string. This was tedious, especially compared to manipulating JSON objects as an
abstraction layer. Basically put, by creating a JSON object to reflect what you want, jsonHTML takes your object and creates
the string to pass to jQuery, then jQuery handles the rest. Think of jsonHTML as a compiler, or a jQuery shell, it takes javaScript (JSON) objects and compiles them down to HTML, where it is passed to jQuery, implemented into the DOM and the browser deals with them traditionally.

The easiest way to use jsonHTML.
---------------------------------

First of all, you will still need to write a little bit of HTML to get started, you can utilize an existing web project, but for
simplicity it's best to practice on a clean slate.
```HTML
<html>
    <head>
        <title>jsonHTML EXAMPLE!</title>
        <script type='text/javascript' src='http://code.jquery.com/jquery-1.10.2.min.js'></script> <!--MAKE SURE TO INCLUDE JQUERY-->
        <script type='text/javascript' src='jsonHTML.js'></script> <!-- MAKE SURE TO INCLUDE jsonHTML -->
    </head>
        <body></body>
</html>
```
As of v0.6 and newer, you can now append directly to the body, this is one of two incompatibilities between v0.5 and v0.6. This "root" div can be any current div in the DOM, you may have to experiment to see
exactly how your DOM will render, and make changes to css styling, luckily you can do that on the fly as will be covered later.

Now, within the head tags, or within an external linked script, you can begin using jsonHTML, for this example, for simplicity, 
were going to place the code within the html in the head between script tags.

For the sake of simplicity, there is a jsonHTML constructor that you can call to quickly begin coding, it's called $jConstruct.
This sets up an object that you can manipulate and have renderd to the DOM. If you dont like syntactic sugar, check out the 
documentation for v0.2 near the bottom of this documentation, v0.5 is backwards compatible.

```HTML
<script>
    //lets make a div that says hello world!
    var helloDiv = $jConstruct('div');
    helloDiv.text = 'Hello World';
</script>
```
Appending to DOM
----------------

Cool! You made a div that will say Hello World, but if you run this right now, you wont see anything, because the html output has
not been appended to any container, so we need to write code to do that.
```JavaScript
    //first we want to wait until the DOM is finished rendering, we can use jQuery to do this.
    $(document).ready(function() {
        //now lets append helloDiv to the root div.
        helloDiv.appendTo('body');
    });
```
Now, It should be rendered on the DOM, and you can even hit "inspect element" in your browser, and you can view the HTML which
was appended to the specified HTML container.

Now that you made your first helloWorld page with jsonHTML, we can begin with doing some tad bit more crazy, and mind bending
stuff, But first, lets cover the basic HTML styling which is typically done naturally.

Basic HTML/CSS styling
----------------------

Would if, I wanted "Hello World" to be a heading, and bold? jsonHTML has the ability to do this very simply with function chaining. Lets
rewrite helloDiv so it's a bit more simple and looks more awesome.

```JavaScript
    var helloDiv = $jConstruct('div', {
        text: 'Hello World',
    }).textProperties('heading', '2').textProperties('bold');
```
Notice how in order to make the heading size change, I manually input the number, so it will output 'h2' tags around the text.
What's nice is if, I want the text to be a different color, I can simply set styling to the object using function chaining.

Here's the same object, and setting css (styling) to it:
```JavaScript
    var helloDiv = $jConstruct('div', {
        text: 'Hello World',
    }).textProperties('heading', '2').textProperties('bold').css({
        'color': 'purple',
    });
```
Neat right? As you can see, any styling you can set using jQuery, you can utilize here, basically '.css()' is just a shortcut
to jQuery, it plugs it right in.

Adding Child Objects
--------------------

Now that we have covered the very basic div object manipulations, typically HTML includes child objects, and jsonHTML does not 
only work with div's but also the basic html objects: textboxes, checkboxes, buttons, etc... (full list coming soon). To add a
child object, you can either create a new variable holding the child object to add later, or you can directly create the new
child object using $jConstructor directly in the parent object:
```JavaScript
    //Creating child object as a seperate var, may be more intuitive:
    var childTextBox = $jConstruct('textbox', {
        text: 'it is amazing!',
    }).css({
        'color': 'purple',
    });

    //Then add the child to the parent object.
    helloDiv.addChild(childTextBox);
```
You can even add the child object upon creation of the parent object, making more compact simple code:
```JavaScript
    //Creating child object as a seperate var, may be more intuitive:
    var childTextBox = $jConstruct('textbox', {
        text: 'it is amazing!',
    }).css({
        'color': 'purple',
    });

    //Creating the parent object.
    var helloDiv = $jConstruct('div', {
        text: 'Hello World',
    }).textProperties('heading', '2').textProperties('bold').css({
        'color': 'purple',
    }).addChild(childTextBox);

```

Just remember, that despite the fact that jsonHTML will allow you to add a child object to any object, typically in HTML, a 
textbox or a button do not have child objects. So if you try to add a child object to a traditional HTML object, there may be
some very interesting bugs produced when you render it. For example, you can have a Div inside a Div, but you cannot have a Div
inside a button, depending on the browser, it may render that code error in strange unexpected ways, so keep that in mind.


Utilizing Data, The Bigger Picture
----------------------------------

So, you may still be sitting here and wondering what the practical use of jsonHTML really is, why compile down to HTML, when you
can just write it by hand? You must remember, javaScript has some powerful tools, that are contained in every programming language
and one of the most powerful are loops. What??? Your wondering why loops are so awesome??? If you must ask, I will explain!

First of all, lets say you have a database full of data. When you pulled data from it, you got an array of objects with properties.
For each row that was in the database (or object if using mongoDB), you need a div element to allow your users to view that data.
In order to display this data, traditionally we would have to write out each div statically, but since we do not know how much data is going to come to us, one would write templates, as strings... by hand... yes... tedious. This is the reason jsonHTML was created, we could simply use its tools to produce for us a bunch of div objects, and append that object to the DOM on
every loop.

For the sake of simplicity of this example, lets say the data which came back from your database is already in JSON format:
```JavaScript
//the data which came back from the database.
var dbData = [ 
    {
        Name: 'jaunty',
        Description: 'jaunty loves apples!',
    }, 
    {
        Name: 'bob',
        Description: 'Likes to skateboard',
    },
    {
        Name: 'joseph',
        Description: 'Likes to watch movies',
    }
];
```
Now, lets say we want to reflect that data, each object as an individual div on the DOM:
```JavaScript
//I need to loop through the returned data from the database:
$.each(dbData, function(data, indx) {
    //I believe I want the description to be in it's own div in an html paragraph, this will be a child object.
    var childDescript = $jConstruct('div', {
        text: data.Description,
    }).textProperties('paragraph').css({
        'margin': '0 auto', //I want it to be centered in the parent div.
    });

    //now I need to create the parent Div that will hold the 'Name.'
    $jConstruct('div', {
        class: 'defaultClass',
        text: data.Name,
    }.css({
        'text-align': 'center',
        'border': '1px solid black',
        'border-radius': '15px', //I want the border to look pretty!
    })).addChild(childDescript).appendTo('body'); //add the child object and append it to the root div of the DOM.
});

```
Now it may be possible to make strings that reflect HTML, and append on the strings, depending on the data coming in, but as you can see, if your entire web application is database driven, it would take an eternity to produce a good quality flexible user environment.

One thing to remember here, is that setting the css manually for each div, is optional, you can define a class name for your
jsonHTML object, or an ID, and implement styling in an external style sheet, just like you would if you were writing native html. In the
above example, even though it currently does nothing, I set the parentNameObj class to "defaultClass," a css style can be added
and when this object is rendered on the DOM, it will automatically set the styling. It is also good to remember that jsonHTML
does technically require that each object has an id, if you do not define an id, jsonHTML will come up with random characters and
make a random generic one for you, but if you ever want to call on this object again with jQuery, your going to have to come up
with a unique ID. It is recommended in very large projects to define a unique id to each object, but jsonHTML will do the best it
can to provide the most unique ID possible.

Writing in a different Style
----------------------------

--------------------------------------------------------------------------------------------------------------------------------
Example below is for jsonHTML v0.2 (never released), as of v0.5 everything here is still backwards compatible, if you prefer writing in the method below, feel free, the methods here should never become depricated even in the later versions. v0.5 can be thought of as a shell over v0.2, below is jsonHTML in it's most true, lowest level, and flexible form. Updates to this part of the documentation is coming soon. Due to the "Keep it black" philosophy, v0.2 will be forked and later released as "jsonHTML Black v1.0."

--------------------------------------------------------------------------------------------------------------------------------
Example below is a template object in which you can create, and add the generated HTML to a div "container." It does require
that there is an existing div to append to. One potential confusion to watch out for, is every time you use a template to 
generate HTML, make sure the id's are never the same, or an append may append to all items of that same id; Good practice will prevent a wormhole
from opening up in your mind, consuming all logic and understanding.
    
#####EXAMPLE:
```JavaScript
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
```
Now, lets say I want 'thisIsDivStuffChild1' to mutate into a textbox!

First, we would want to setup a mutable Div and a mutable textbox structure to make things a tad bit easier to conceptualize.
If you have taken C++ in the past, these would be similar to Structs:
```JavaScript
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
```JavaScript
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
what we got, if someone would like to fork and add some "Sugar", that would be great, but for now jsonHTML is black as can be!

You can execute the completed code in the 'example.html' or 'syntacticSugarExample.html' This is a fully operational example 
of what jsonHTML can do, though, it's only a basic example, and you can do much... MUCH more with jsonHTML.
    
Incompatibility Notice:
--------

-------------------------------------------------------------
jsonHTML still does not have an official release, as the API is still under construction. In order to least affect anyone using this code library during the developmental phase, I still maintain the ideal that any changes to the API should be minor, and not drastic. If you have used v0.5.X-X, and want to begin using v0.6+ be sure to read the Incompatibility Notice, If you would rather still use v0.5, I left the old documentation renamed as, "READMEv0.5.md," and you should still be able to download the latest v0.5.X-X pre-release.


#####Incompatibilities between v0.5 and v0.6:

For the sake of simplicity, and increasing the flexibility of jsonHTML it was determined that it is important to allow the user to append to any portion of the DOM. The user is now able to append to the body of the HTML directly by simply specifying 'body.' In order to do this properly, if you are to append to any div in the DOM, you have to specify it with the hash symbol '#.' Before you were able to simply type .appendTo('divID'), but now it is required to type .appendTo('#divID'), jQuery users should already be familiar with this, as it is a necessary method in order to use jQuery properly.

-------------------------------------------------------------

To do:
--------

--------

#####key: 

'*' = Implemented, but no Documentation yet. 

'-' = Needs to be done. 

'~' = currently being worked on, limited support.

'+' = Done, and documented.

--------

*Implement an easy way to handle events: on click, blur... etc...

*Can append a jsonHTML object to a parent jsonHTML object, by passing the object directly, or by passing the parent objects ID.

*Object DOM removal memory leak fix.

~Implement more HTML objects.

-Possibly remove some syntactic sugar from v0.5, make it more low level, thus more functional, and more future proof.



Disclaimer / License: 
---------------------

---------------------------------------------------------------------------------------------------------------------------------
jsonHTML is provided to you as Free Software (refer to: https://gnu.org/philosophy/free-sw.html ), by using this code
you agree to hold me __not__ responsible for any damages, or consequences of your malicious or "friendly" use of this code.
This code is provided with no warranties, or guarantees, all I ask is you __retain__ credit back to me if you use my code. 

The "Keep it black" philosophy was arisen from the rebirth of the coffee shop culture, when one would ask if you wanted any sweeteners in your coffee, the correct response under this philosophy is, "No, keep it black." One who believes in this philosophy, finds that keeping the coffee black is the best way to experience the flavor in it's truest form, unspoiled by pesky sweeteners masking it's true nature. This same philosophy is now implemented into the code that I write, I try to keep it black, I only add fluff to the code where it's necessary, but other than that any library I write under this philosophy is written to be as low level as possible and least intrusive to any programmer coming to try out the code I made. If you understand javaScript, there should be as small of a learning curve as possible to use my code, keeping it as true to it's roots as possible. 

Feel free to fork, and ask to become a contributor, if you have an improvement you have implemented in your fork, that 
you believe is totally amazing, and should be included in the main project, ill review it, and possibly implement it, and
give you credit as one of the authors or contributors.

---------------------------------------------------------------------------------------------------------------------------------

```
            )
            
            (
        )   )
        (
    .---------------------.
    |       _____         |___
    |     .'`_,-._`'.      __ \
    |    /  ( [ ] )  \    |  ||
    |   /.-""`( )`""-.\   |  ||
    |  ' <'```(.)```'> '  | _||
    |    <'```(.)```'>    |/ _/
    |     <'``(.)``'>      ./
    |      <``\_/``>      |
    |       `'---'`       |
    \github.com/trillobite/
      \_________________/  Keep it black.

```
