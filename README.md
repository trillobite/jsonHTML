jsonHTML
========

Thank you for visiting the jsonHTML project! Make sure to view the new [jsonHTML Guide here.](https://trillobite.github.io) The second best documentation is under the github wiki, you will see the link to it near the top of this page. 

Make sure to download a 'Release,' as it is my known-stable code. The code within the repository may contain experimental code, which could break your webpage. Also, jsonHTML is going to get a makeover! Over the course of the past few years, a lot of features have been added, and in order to completely intigrate all of the new features, some of the code needs to be re-written. This will introduce a few fundamental changes in the syntax of jsonHTML. I hate to change the syntax, but constantly writing out "$jConstruct" becomes annoying, even with auto-fill. There are also re-writes that will compact the code even farther, and produce even greater flexibility overall. Backwards compatibility will be considered, and the $jConstruct command may be preserved for backwards-compatibility. Finally, even after I release v1.0, I will preserve most of the beta releases. If you enjoy the current version which you are using, feel free to continue using it, there is no reason to upgrade as jsonHTML is nearly complete. 

micronDB: Client side volatile database. Basically, a volatile data storage system, where data can be inserted, and queried for later.

toadFish: Generates grid structures for producing complex GUI boxes and structures.

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

Now, within the head tags, or within an external linked script, you can begin using jsonHTML, for this example, for simplicity, 
were going to place the code within the html in the head between script tags.

For the sake of simplicity, there is a jsonHTML constructor that you can call to quickly begin coding, it's called $jConstruct.
This sets up an object that you can manipulate and have renderd to the DOM. 

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
Now, When you reload the page, it should be rendered on the DOM, and you can even hit "inspect element" in your browser, and you can view the HTML which was appended to the specified HTML container, in this case the "body" of the DOM. Notice how, every object you create with jsonHTML has a random character string as an ID. This random ID is created if you don't specify one yourself, in order for jsonHTML to manage appends in it's internal workings, add flexibility, and decrease code complexity so others can view and understand your code better. It is not known if having lots of ID's decreases performance in page rendering, but so far, even big web applications don't appear to mind. Although, performance really depends on the users processing power. So far, jsonHTML has been stress tested against an old 3.4GHz Celeron D (Single Core) computer, and even with large complex webpages, it ran reasonably well.

Soon to be in the next release, the append function now supports jQuery deferreds, you can gain this experimental functionality by simply downloading the code repository directly. Example:

```JavaScript
    
    helloDiv.appendTo('body').state.done(function() {
        console.log('Everything is now rendered, have fun!');
    });
``` 

Now that you made your first helloWorld page with jsonHTML, we can begin with doing some tad bit more crazy, and mind bending
stuff, but first, lets cover the basic HTML styling which is typically done naturally.

If this looks interesting to you, please continue reading [here.](https://trillobite.github.io) or visit the wiki near the top of this page.

```
    View full license in LICENSE.md
             )
c            (
o        )   )
p        (           v1.3.1
y    .---------------------.
r    |        _____        |___      
i    |     .'`_,-._`'.      __ \
g    |    /  ( [ ] )  \    |  ||
h    |   /.-""`( )`""-.\   |  ||
t    |  ' <'```(.)```'> '  | _||
     |    <'```(.)```'>    |/ _/
2    |     <'``(.)``'>      ./
0    |      <``\_/``>      |
1    |       `'---'`       |
6    \github.com/trillobite/              
       \_________________/      Keep it black, keep it free.
```
