jsonHTML
========

Author: Jesse Parnell

Requires: jQuery

Description:

Documentation / Code examples Relevant for v0.7+

-------------------------------------------------------------------------------------------------------------------------

An entire fully dedicated guide is in the works and nearly complete. There is a new experimental version of jsonHTML, which integrates the micronDB project with jsonHTML. Make sure to download the latest release if you want something stable, as the current working branch contains the experimental micronDB+toadFish+jsonHTML project code. Forgive me as I develop jsonHTML, documentation is taking the backburner for now. I will attempt to leave documentation within the code for those who are determined to understand the experimental code.

I will be releasing yet another project soon called project toadFish. You will also see this project implemented into jsonHTML, but don't worry, I am attempting to keep all this minimal, staying true to the 'keep it black' philosophy. micronDB and toadFish code will be inserted as compressed javaScript. The non-compressed code will be included in the download package, so it can be viewed in a more human-legible form.

micronDB: Client side volatile database. Basically, a volatile data storage system, where data can be inserted, and queried for later.

toadFish: Generates grid structures for producing complex GUI boxes and structures.

Visit the online guide [here.](https://trillobite.github.io)

#####The example code in this documentation is not always up to date with the latest best methods, they may change in the near future. 

-------------------------------------------------------------------------------------------------------------------------

Overview
--------

jsonHTML allows you to grant the powers of javaScript to your dreaded static HTML.
If you find writing HTML to be boring, or just need more flexibility and power to dynamically alter, manipulate,
or duplicate HTML objects as if it were javaScript objects, this is for you. jsonHTML was created in a rush for one of my
own projects, in which virtually none of my div objects, or much of any HTML could have been written
traditionally, thus, I will release new versions, and improve functionality as my projects require more. jsonHTML was not written for performance, therefore it may not be best for very large projects, but it is good if you need to write code quickly, and dynamically alter objects in a more intuitive manner. Basically, the goal of the jsonHTML project is if you want to do something in javaScript, you will be able to reflect it in HTML.

Before this, to achieve the flexibility required for my projects, I had to write out the HTML as a string, and use jQuery to
add them or manipulate them by parsing that string. This was tedious, especially compared to manipulating JSON objects as an
abstraction layer. Basically put, by creating a JSON object to reflect what you want, jsonHTML takes your object and creates
the string to pass to jQuery, then jQuery handles the rest. Think of jsonHTML as a compiler, or a jQuery shell, it takes javaScript (JSON) objects and compiles them down to HTML, where it is passed to jQuery, implemented into the DOM and the browser deals with them traditionally. It is also good to note, that if you are coming from a ".Net" environment to the Free Software society of the web, it may be easier to transition to the structured design of jsonHTML, rather than the fragmented world of developing for the web. jsonHTML definately helps to unify the common concepts of developing on the web, in an easy to use syntax.

If you are a more experienced programmer, you may notice that most of the example code below does not look like pure JSON, and in truth, you are correct! So why is this project called "jsonHTML?" Basically, what you see below is due to the functionality that the $jConstruct contstructor gives you, without this you will have to write code in pure JSON. You can [view](https://github.com/trillobite/jsonHTML#writing-in-a-different-style) the heart and soul of jsonHTML with the code examples near the bottom of this documentation.

So, if you would like to follow along, make sure to download [the latest release,](https://github.com/trillobite/jsonHTML/archive/v0.9-beta.zip) unpack, and give jsonHTML a try! It is assumed that you know the concepts of HTML, and javaScript. Having an understanding of jQuery is helpful, as jsonHTML largely depends on this library, but this understanding not mandatory. The documentation is still pretty basic as jsonHTML was not originally created to be released to the public, but as I moved the project to github, it became exposed to the public, and I have decided that it would be helpful to the free software coding community if my code was documented.

Note: v0.9.5 will be relased shortly, I am simply updating the documentation, and double checking for bugs. The current version of this documentation is still relevant, the newer version of jsonHTML will simply have more advanced functionality.

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
As of v0.6 and newer, you can now append directly to the body, this is one of two [incompatibilities](https://github.com/trillobite/jsonHTML#incompatibility-notice) between v0.5 and v0.6. This "root" div can be any current div in the DOM, you may have to experiment to see exactly how your DOM will render, and make changes to [css styling](https://github.com/trillobite/jsonHTML#basic-htmlcss-styling), luckily you can do that on the fly which will be covered later.

Now, within the head tags, or within an external linked script, you can begin using jsonHTML, for this example, for simplicity, 
were going to place the code within the html in the head between script tags.

For the sake of simplicity, there is a jsonHTML constructor that you can call to quickly begin coding, it's called $jConstruct.
This sets up an object that you can manipulate and have renderd to the DOM. If you dont like syntactic sugar, check out the 
[documentation for v0.2](https://github.com/trillobite/jsonHTML#writing-in-a-different-style) near the bottom of this documentation, [v0.5.x](https://github.com/trillobite/jsonHTML/releases/tag/v0.5) is currently backwards compatible in that code style. Similar documentation is coming for v0.6+.

```HTML
<script>
    //lets make a div that says hello world!
    var helloDiv = $jConstruct('div');
    helloDiv.text = 'Hello World';
</script>
```
Appending To The DOM
--------------------

Cool! You made a div that will say Hello World, but if you run this right now, you wont see anything, because the html output has
not been appended to any container, so we need to write code to do that.
```JavaScript
    //first we want to wait until the DOM is finished rendering, we can use jQuery to do this.
    $(document).ready(function() {
        //now lets append helloDiv to the root div.
        helloDiv.appendTo('body');
    });
```
The code so far between the script tags should look like this:
```JavaScript
    //lets make a div that says hello world!
    var helloDiv = $jConstruct('div');
    helloDiv.text = 'Hello World';

    //first we want to wait until the DOM is finished rendering, we can use jQuery to do this.
    $(document).ready(function() {
        //now lets append helloDiv to the root div.
        helloDiv.appendTo('body');
    });

```
Now, When you reload the page, it should be rendered on the DOM, and you can even hit "inspect element" in your browser, and you can view the HTML which was appended to the specified HTML container, in this case the "body" of the DOM. Notice how, every object you create with jsonHTML has a random character string as an ID. This random ID is created if you don't specify one yourself, in order for jsonHTML to manage appends in it's internal workings, add flexibility, and decrease code complexity so others can view and understand your code better. It is not known if having lots of ID's decreases performance in page rendering, but so far, even big web applications don't appear to mind.

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
Your Completed code should now look like this:
```JavaScript
    //lets make a div that says hello world!
    var helloDiv = $jConstruct('div', {
        text: 'Hello World',
    }).textProperties('heading', '2').textProperties('bold').css({
        'color': 'purple', //changes color of text, all the same stuff as real CSS.
    });         
            
    //We want to wait until the DOM is finished rendering, we can use jQuery to do this.
    $(document).ready(function() {
        //now lets append helloDiv to the root div.
        helloDiv.appendTo('body');
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
Here is the completed code to your first hello world code example!
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
            
    //first we want to wait until the DOM is finished rendering, we can use jQuery to do this.
    $(document).ready(function() {
        //now lets append helloDiv to the root div.
        helloDiv.appendTo('body');
    });

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
For each row that was in the database (or object if using [mongoDB](http://www.mongodb.com/)), you need a div element to allow your users to view that data. In order to display this data, traditionally we would have to write out each div statically, but since we do not know how much data is going to come to us, one would write templates, as strings... by hand... yes... tedious. This is the reason jsonHTML was created, we could simply use its tools to produce for us a bunch of div objects, and append that object to the DOM on
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
$.each(dbData, function(indx, data) {
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
    }).css({
        'text-align': 'center',
        'border': '1px solid black',
        'border-radius': '15px', //I want the border to look pretty!
    }).addChild(childDescript).appendTo('body'); //add the child object and append it to the root div of the DOM.
});

```
Here is what the code should look like between your script tags:
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

//you have to wrap it in a .ready in order for the browser to know when to begin executing.
$(document).ready(function() {
    //I need to loop through the returned data from the database:
    $.each(dbData, function(indx, data) {
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
        }).css({
            'color': 'purple', //purple is such a nice color... don't you agree?
            'text-align': 'center',
            'border': '1px solid black',
            'border-radius': '15px', //I want the border to look pretty!
        }).addChild(childDescript).appendTo('body'); //add the child object and append it to the root div of the DOM.
    });
});     

```
Now it may be possible to make strings that reflect HTML, and append on the strings, depending on the data coming in, but as you can see, if your entire web application is database driven, it would take an eternity to produce a good quality flexible user environment.

One thing to remember here, is that setting the css manually for each div, is optional, you can define a class name for your
jsonHTML object, or an ID, and implement styling in an external style sheet, just like you would if you were writing native html. In the
above example, even though it currently does nothing, I set the parentNameObj class to "defaultClass," a css style can be added
and when this object is rendered on the DOM, the browser will automatically implement the styling. It is also good to remember that jsonHTML does technically require that each object have an id, if you do not define an id, jsonHTML will come up with a random set of characters and make a generic ID for you, but if you ever want to call on this object again with jQuery, your going to have to come up
with a unique ID. It is recommended in very large projects to define a unique id to each object, but jsonHTML will do the best it
can to provide the most unique ID possible.

The Eventful Stuff
------------------

There are two basic ways of implementing events in jsonHTML, one way, is to get the id and do your standard jQuery "$('#'+obj.id).click(function());" or you can implement the built in functionality which is typically easier to remember, and is more legible when code gets large and complex "myDivObj.event('click', function(){});" Either way works, it really depends on user preference.

Example using the more standard jQuery method:
```JavaScript
var helloDiv = $jConstruct('div', {
    text: 'Hello World',
}).addFunction(function() { //notice you have to add the jQuery event on click as a function, to be used after the object is appeneded, and rendered.
    $('#'+helloDiv.id).click(function() {
        console.log('i has click!');
    });
});

```

Example of the newer jsonHTML event implementation:
```JavaScript
var helloDiv = $jConstruct('div', {
    text: 'Hello World',
}).event('click', function() { //notice how the type of event is in quotes.
    console.log('i has click!');
});
```

As you can tell, there is not too much of a difference between the two, this is why native event support in jsonHTML's custom syntax was implemented only recently; it was not very important. Basically the short-hand for implementing events, actually does the exact same thing as what is done at the top. In the background, the jQuery event is added as a function and later implemented after the object is appended. Any event that you can do in jQuery, you can do here, you simply name the event you need to use within the quotes which is [supported by jQuery,](https://api.jquery.com/category/events/) and it will be used.

As an example, I have written a small, but more advanced code example with added functionality:
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
    'width': '200px',
    'color': 'purple',
    'margin': '0 auto',
    'text-align': 'center',
    'border': '1px solid black',
    'border-radius': '15px', //I want the border to look pretty!
}).event('click', function () { //when div is clicked...
    if(helloDiv.css().color == 'purple') { //if the current color is purple, change it to blue.
        helloDiv.css({
            'color': 'blue',
        });
    } else {
        helloDiv.css({ //if it's not, change it back to purple.
            'color': 'purple',
        });
    }
}).addChild(childTextBox);   


//first we want to wait until the DOM is finished rendering, we can use jQuery to do this.
$(document).ready(function() {
    //now lets append helloDiv to the root div.
    helloDiv.appendTo('body');
});
```

Basically this example code changes the color of the text contained in the div, on click like a switch, on and off. You can see how using simple javaScript/jQuery tricks, you can access what the current color of the text in the div is, and change it according to your specifications on click.

Simplify It With Refresh In v0.9+
---------------------------------

One thing that you may have noticed already with the above code example, is that it is not entirely legible. It occured to me one evening: Would if I could change the property of the object and make it take the changes immediately. Despite this not being currently possible with my current knowledge, I found out I could do something similar, and the refresh function was born! Basically, when you refresh a jsonHTML object, it renders that object again to make sure it has the latest properties, by physically removing the object and adding it again, new.

```JavaScript
var child1 = $jConstruct('div', {
    text: 'Click Me!'
}).css(centerBorderHalf).event('click', function() { //on click event.
    if(child1.type == 'div') {
        child1.type = 'textbox';
    }
    child1.refresh(); //wow, very much yes simple!
    $('#'+child1.id).focus();
}).event('blur', function() { //on blur event.
    if(child1.type == 'textbox') {
        child1.type = 'div';
        child1.text = $('#'+child1.id)[0].value; //get the data that changed.
    }
    child1.refresh(); //Refreshes the object on the DOM containing the current changes.
});

```
As you can see, this object is very condensed and compact, yet highly functional. First jConstruct was used to create a div with the text saying Click Me! Then, css was added from another object containing the definitions somewhere in the project. Then, a click event handler was added, which changes the property type in the child1 object to now define it as a text box, and refresh is used to make those changes display in the browser to the user. Other than the blur handler which translates it back into a div, that's the basics of it, and you can see this object in action in syntacticSugarExample.html, as it was just updated with this latest feature.

Experimental micronDB support
-----------------------------

Here is a very quick and interesting trick if you download jsonHTML directly off the repository. The raw build within the repository contains micronDB. Before micronDB, jsonHTML stored all of it's objects within a hash table to allow for refreshing objects. Today, jsonHTML uses a more advanced storage system called micronDB which stores its data within a hash table. The idea behind micronDB is that it is incredibly fast, and allows for making queries. jsonHTML stores it's data within micronDB by the variable name arrdb. As you may notice, the old hash table variable name was arrdb, and this was done on purpose in order to avoid any upgrade incompatibilities in the future. So here is a very basic instruction on how to use this new feature:

```JavaScript
$jConstruct('div', {
    text: 'wah hallo',
    id: 'helloWorldID',
}).css({
    'color': 'green',
}).appendTo('body');

$jConstruct('div', {
    text: 'hello world',
}).css({
    'color': 'green',
}).appendTo('body');

//oh no! You forgot to assign a variable name! that's okay!
var yay = arrdb.query({
    where: {
        text: 'hello world',
    },
});

yay[0].text = 'hi again!';
yay[0].refresh();


//Don't worry, this time you at least assigned an ID.
var yayz = arrdb.get('helloWorldID');

yayz.text = 'What is that!',
yayz.refresh();
```

Getting Down To The Grounds
---------------------------

Any experienced programmer will know that jsonHTML in it's current state cannot do everything. Luckily for you, the "Keep it black" philosophy kept me from adding too many abstraction layers, and you can still get down and dirty within jsonHTML. If you use jsonHTML all on its own, you can get pretty far, but there needs to be a way for you to get down deep into your objects and manipulate them. The easiest way to do this, is by adding functions that will be executed after your object is rendered on the DOM. You can add these functions with "helloDiv.addFunction(function() { myFunctionToExecute(); });" You may have noticed, that this property was utilized in the [earlier code example](https://github.com/trillobite/jsonHTML#the-eventful-stuff) under event handling! The bonus with this, is that you are currently still within your jsonHTML object, and can grab its properties directly, before the V8 engine garbege collects it.

I will leave it up to you to figure out what you want to do with this functionality, but here is a basic example to quench your curiosity:

```JavaScript
var helloDiv = $jConstruct('div', {
    text: 'Hello World',
}).addFunction(function() {
    console.log('this was executed after helloDiv was rendered, cool right?!');
});

```

Another limitation with jsonHTML is the fact that the appendHTML function deep inside does not recognize more than the few very basic HTML objects. One solution that I have implemented, which is experimental, but I left just in case I required extended functionality, is the "html" object. You can pass in directly, raw html written by hand as strings, to create HTML objects in which you can manipulate while still within the syntax of jsonHTML.

An untested experimental example of this functionality:
```JavaScript
var helloDiv = $jConstruct('html', {
    data: '<textarea id="helloWorldStuff">Hello World</textarea>', //custom html that will be appeneded to the DOM.
}).addFunction(function() {
    console.log('this is experimental, you should see "Hello World" on the screen though');
});

helloDiv.appendTo('body');
```

If you really want to dig deep into jsonHTML, and mess with it's inner workings, check out the [jsonHTML v0.2 style,](https://github.com/trillobite/jsonHTML#writing-in-a-different-style) you can still write in this style with v0.7+. Basically, your using jsonHTML without touching the $jConstructor, giving you lower level access to everything whenever required.

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
    }, '#containerDivIDAsString');
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
                        appendHTML(jsonHTMLObj(data).children[1], '#thisIsDivStuff'+data.indx); // I can just grab the original object, like recursion!
                    });
                    $('#thisIsDivStuffChild1').focus(); //focus will now be in the text box.
                },
            }), '#thisIsDivStuff'+data.indx);
        });
    },
}),
```
 
Make sure to check out the second HTML example "syntacticSugarExample.html," jsonHTML has been updated and can be written in a more 
functional programming style, but it's still got a long way to go before it's easy to use, but for now, again this is
what we got, if someone would like to fork and add some "Sugar", that would be great, but for now jsonHTML is black as can be!

You can execute the completed code in the 'example.html' or 'syntacticSugarExample.html' This is a fully operational example 
of what jsonHTML can do, though, it's only a basic example, and you can do much... MUCH more with jsonHTML.
    
Incompatibility Notice:
--------

-------------------------------------------------------------
jsonHTML still does not have an official release, as the API is still under construction. In order to least affect anyone using this code library during the developmental phase, I still maintain the ideal that any changes to the API should be minor, and not drastic. If you have used v0.5.X-X, and want to begin using v0.6+ be sure to read the Incompatibility Notice, If you would rather still use v0.5 to v0.6, I left the [old documentation,](https://github.com/trillobite/jsonHTML/blob/master/READMEv0.5.md) and you should still be able to download the latest [v0.6.X-X pre-release.](https://github.com/trillobite/jsonHTML/releases/tag/v0.6-beta.1)


#####Incompatibilities between v0.5 - v0.6 and v0.7+:

For the sake of simplicity, and increasing the flexibility of jsonHTML it was determined that it is important to allow the user to append to any portion of the DOM. The user is now able to append to the body of the HTML directly by simply specifying 'body.' In order to do this properly, if you are to append to any div in the DOM, you have to specify it with the hash symbol '#.' Before you were able to simply type .appendTo('divID'), but now it is required to type .appendTo('#divID'), jQuery users should already be familiar with this, as it is a necessary method in order to use jQuery properly.

#####Incompatibilities between v0.7.x and v0.8.x+

In order to allow the user to gain lower access to the native jQuery functionality, I have decided to allow the .appendTo function to return a jQuery.Deferred() object. It should not affect any code already written in v0.7.x as nobody should have attempted to chain another function behind appendTo(), as anything chained behind .appendTo() would have done nothing on the DOM anyways. The v8 engine will now throw an error in the javaScript Console if the user has incorrectly done chaining in the previously explained way. The positive aspect to this, is that chaining is actually more useful, you can detect when the object is done being appended to the DOM by simply adding .done(). In this way you can add a function which you want to execute after the object has been appended to the DOM: "$jConstruct('div').appendTo('body').done(function() { console.log('now added to the DOM')});" Before this functionality was added, one would have to use the .addFunction() method in order to execute a function after the object has been rendered to the DOM, this functionality is basically useless, and quite possibly may become depricated.

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

-Possibly remove some syntactic sugar from v0.5, make it more low level, thus more functional, and more future proof.

~Implement more HTML objects.

*Added support for images! Cant believe I forgot this very important functionality to jsonHTML, you must know that this is a very alpha release, not tested, just implemented on the whim, you can only get it by doing a git clone of the repository, there is currently no release with this functionality. You define the source of the image with "src" and you define the text for the image as "text," just like you normally insert text for a div object.

*Make the ".appendTo" function utilize jQuery Deferreds, so the user can simply type ".appendTo('body').state.done(function() { console.log('done appending to the DOM')});" which brings the user down a tad lower level by not having to utilize ".addFunction," and allows for some asynchronious programming techniques to take place. [View v0.8.x+](https://github.com/trillobite/jsonHTML#incompatibility-notice)

*Object DOM removal memory leak fix.

*micronDB is now implemented within jsonHTML. (Not included in the latest release yet, a new release will be made shortly.) This is revolutionary, and will require quite a lot of documentation... maybe a youTube tutorial. Hint: Mutate objects to any other type, and back. Objects that you add with jsonHTML can be found utilizing query commands: 
```
arrdb.query({ //gets all jsonHTML objects of the type div.
    where: {
        type: 'div', //can define a property to search for.
    },
}); //returns an array.
```

+Implement an easy way to handle events: on click, blur... etc...

+Can append a jsonHTML object to a parent jsonHTML object, by passing the object directly, or by passing the parent objects ID.

Disclaimer / License: 
---------------------

---------------------------------------------------------------------------------------------------------------------------------
#####jsonHTML Copyright License v1.3 2015 Jesse Parnell


#####Summary:
The reason why I wrote this license, is so that anyone using my code can understand what they are making an agreement to, and what their rights are without having to go to a lawyer. All I ask is for you to utilize your brain, read this license as it is in context of the entire document, and do not try to stretch it's boundaries, as doing so may cause this license to be destroyed, and a newer one implemented with non-free restrictions... which would be sad, and terrible to the whole programming community. You must understand that my hand is forced into implementing any sort of license, people never want to be held accountable for their actions, politicians and governments have their agendas. People enjoy stealing your rights, this is an attempt to protect those rights. This license attempts to protect you and I, and anyone who helped to develop it. I would rather just throw my code out onto the web and let everyone do as they please with it, but that's not practical in the world that we live in today.

#####Copyright License:
Copyright (C) 2016 Jesse Parnell
    
v1.3

This software / code is provided to you similarly as Free Software, (refer to: https://gnu.org/philosophy/free-sw.html ), by using or obtaining this code, you have the Free Software basic rights that do not contradict this license, if any, and you defined as a user or consumer agree:

To hold the authors of this code as not responsible for any damages, or consequences of your malicious or "friendly" use of this code, or action taken by any interpretation of the documentation supplied. It is up to the consumer to ensure the integrity and effects of this code before it is run, copied, deleted, modified, or utilized in any way. This code is provided with no warranties, or guarantees. I ask from you to retain credit back to me if you use my code or any portion of it, [Easiest way to maintain credit is to simply add my trilobite mug signature, or a simple link to my github within your code] and leave this stated license intact and not modified. This code / software is regarded as an inanimate object, a tool, operating on natural laws, influenced by the current user and it's environment, any damage caused, by it's use or misuse even if resulting in any type of damage, you agree to hold the authors, contributors, and copyright holders of this entire project not repsonisble. The current user of the copy of this tool must be held responsible for the way they use it, and not hold reponsible the creators, distributors, or copiers of that tool. You may not redact, or modify this license within this repository / project / code / software, and leave the license fully, unmodified, as is, unless given written or verbal permission from the Copyright holder of this code / software. This license is not intended to cause a Closed-Source project to become Free Software, only the code and any portion of it from this project, under this license, has to remain Free, and it's source publicly availible, unless permission granted from the Copyright holder. This license is also not intended to be utilized as legal advice, the user/consumer must check with their local laws to make sure that an agreement with this license, and use of the works protected by this license, will not cause them to conflict with their local laws

Main Idea: You agree by downloading this work to hold me not responsible for whatever happens. You may view this code, and learn from it, and produce something similar, just if you make something and copy some of my code, you need to document it. I am allowing you to use my work free of charge, even if you are a corporation. All I am asking is that you pay for it by giving me credit, so if someone else likes my code, they can see who actually wrote it.

Without manipulation of this license, you may copy this license, and use it in your own code / software / projects / works, but, similarly, as stated above, you are responsible for the way you use the tools I created, including this license.

Feel free to fork, and ask to become a contributor, you have that right, if you have an improvement you implemented in your fork, that you believe is totally amazing, and should be included in the main project, I will review it, and possibly implement it, and give you credit as one of the authors or contributors. Remember, this license is also intended to protect you as an author or contributor.


#####Philosophy:
The "Keep it black" philosophy was arisen from the rebirth of the coffee shop culture, when one would ask if you wanted any sweeteners in your coffee, the correct response under this philosophy is, "No, keep it black." One who believes in this philosophy, finds that keeping the coffee black is the best way to experience the flavor in it's truest form, unspoiled by pesky sweeteners masking it's true nature. This same philosophy is now implemented into the code that I write, I try to keep it black, I only add fluff to the code where it's necessary, but other than that, any library I write under this philosophy is written to be as low level as possible and least intrusive to any programmer coming to try out the code I made. If you understand javaScript, there should be as small of a learning curve as possible to use my code, keeping it as true to it's roots as possible. 


#####Donate!
I have a Dogecoin wallet, you can get one and some doge for free from doge faucets, if you think this project is cool, and you want to see me continue with this project send me some DOGE!

Wallet: DGpXaej8VBMwuQB925fzwBo1N97ABZMNkT

---------------------------------------------------------------------------------------------------------------------------------

```
            )
            
            (
        )   )
        (
    .---------------------.
    |        _____        |___      
    |     .'`_,-._`'.      __ \
    |    /  ( [ ] )  \    |  ||
    |   /.-""`( )`""-.\   |  ||
    |  ' <'```(.)```'> '  | _||
    |    <'```(.)```'>    |/ _/
    |     <'``(.)``'>      ./
    |      <``\_/``>      |
    |       `'---'`       |
    \github.com/trillobite/              Keep it black.
      \_________________/  

```
