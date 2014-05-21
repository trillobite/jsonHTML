/*
                                         jsonHTML
                                   Author: Jesse Parnell
                                        Description
    This allows you to render html using jQuery dynamically. Was created for one of my own projects,
    in which virtually none of my div objects, or much of any of the HTML could have been written
    statically in HTML. It was not written for performance, therefore it may not be good for very
    large projects, but it is good if you need to write code quickly in a more intuitive manner. 
    Basically, if you can do something in javaScript, you can now do it to your HTML.
*/

/*
    This is a hashing function. It works similar to an in memory database for this project.
    It can store any string you want, to see if that object already exists. It's a really powerful tool actually.
*/
var arrdb = {
    db: [],
    calcIndex: function(data) {
        var total = 0;
        for(var i = 0; i < data.length; ++i) {
            total += data.charCodeAt(i);
        }
        return total % 50;
    },
    exists: function(data) {
        var indx = this.calcIndex(data);
        if(this.db[indx]) {
            console.log(this);
            for(var i = 0; i < this.db[indx].length; ++i) {
                if(this.db[indx][i] == data) {
                    return true; //success
                }
            }
            return false; //none matched
        } else {
            return false; //contains nothing.
        }
    },
    hash: function(data) {
        if(!(this.exists(data))) {
            var indx = this.calcIndex(data);
            if(this.db[indx]) {
                this.db[indx][this.db[indx].length] = data;
                return true; //success
            } else {
                this.db[indx] = [];
                this.db[indx][this.db[indx].length] = data;
                return true; //success
            }
        } else {
            return false; //already exists
        }
    }

}

/*
    If the user does not provide a div id for their object, this will make a 
    random one.
*/
var makeID = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 12; i++ ) //144 possible random div id's
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    if(!(arrdb.hash(text))) {
        text + Math.floor(Math.random() * 24);
        console.log('warning: Last div id was the same, are you making too many objects without div id\'s? ', text);
    }
    return text;
};

//Returns a small chunk of HTML as a string back to the parent function.
//Can produce HTML for a button, text box, or a div element.
var parsetype = function (type) {
    function ico(element) {
        var html = {
            id: undefined !== element.id ? ' id="'+element.id+'"' : '',
            class: undefined !== element.class ? ' class="'+element.class+'"' : '',
            onclick: undefined !== element.onclick ? ' onclick="'+element.onclick+'"' : '', 
            onblur: undefined !== element.onblur ? ' onblur="' + element.onblur + '"' : '',
            onfocus: undefined !== element.onfocus ? ' onfocus="' + element.onfocus + '"' : '',
            max: undefined !== element.max ? ' max="' + element.max + '"' : '',
            min: undefined !== element.min ? ' min="' + element.min + '"' : '',
            name: undefined !== element.name ? ' name="' + element.name + '"' : '',
            readonly: undefined !== element.readonly ? ' readonly="' + element.readonly + '"' : '',
            rows: undefined !== element.rows ? ' rows="' + element.rows + '"' : '',
            cols: undefined !== element.cols ? ' cols="' + element.cols + '"' : '',
        }; 
        var retVal = "";
        $.each(html, function () { //for each property.
            retVal += this;
        });
        return retVal;
    }
    var options = {
        button: function (element) {
            var html = {
                start: '<button type="button"',
                end: undefined !== element.text ? '>' + element.text + '</button>' : '></button>',
            };
            return html.start + ico(element) + html.end;
        },
        checkbox: function (element) {
            var html = {
                start: '<input type="checkbox"',
                end: '>' + (undefined !== element.text ? element.text : '') + '<br>',
            };
            return html.start + ico(element) + html.end;
        },
        div: function (element) {
            var html = {
                start: '<div',
                end: undefined !== element.text ? '>' + element.text + '</div>' : '></div>',
            };
            return html.start + ico(element) + html.end;
        },
        html: function (element) {
            return element.data;
        },
        spinner: function (element) {
            var html = {
                start: undefined !== element.text ? element.text+'<input type="number"' : '<input type="number"',
                end: '/>',
            };
            return html.start + ico(element) + html.end;
        },
        textarea: function (element) {
            var html = { 
                start: '<textarea ',
                end: undefined !== element.text ? '>' + element.text + '</textarea>' : '></textarea>',
            };
            return html.start + ico(element) + html.end;
        },
        textbox: function (element) {
            var html = {
                start: '<input type="text"',
                end: undefined !== element.text ? ' value="' + element.text + '">' : '>',
            };
            return html.start + ico(element) + html.end;
        },

    };
    return undefined !== options[type] ? options[type] : undefined;
};

//recursive function, simply loops until there are no more children objects,
//uses jQuery to append to the parent object (usually a div element).
function appendHTML(jsonObj, container) {
    var dfd = new $.Deferred();
    var exec = function () {
        if(typeof jsonObj == 'function'){
            jsonObj = jsonObj();
        }
        if(undefined === jsonObj.id) {
            jsonObj.id = makeID();
        }
        $(container).append(parsetype(jsonObj.type)(jsonObj));
        if(undefined !== jsonObj.children) {
            $.each(jsonObj.children, function () {
                appendHTML(this, '#'+jsonObj.id);
            });
        }
        if(undefined !== jsonObj.functions) {
            $.each(jsonObj.functions, function () {
                this();
            });
        }
        dfd.resolve();
    };
    exec();
    return dfd.promise();
}

var jConstructObjectManipulations = { //text object manipulations.
    textStyling: function(tmp) {
        return {
            hyperlink: function(linkTo) {
                tmp.text = '<a href='+linkTo+'>'+tmp.text+'</a>';
                return this;
            },
            bold: function() {
                tmp.text = '<b>'+tmp.text+'</b>';
                return this;
            },
            italicize: function() {
                tmp.text = '<i>'+tmp.text+'</i>';
                return this;
            },
            strong: function () {
                tmp.text = '<strong>'+tmp.text+'</strong>';
                return this;
            },
            heading: function(num) {
                tmp.text = '<h'+num+'>'+tmp.text+'</h'+num+'>';
                return tmp;
            },
            paragraph: function() {
                tmp.text = '<p>'+tmp.text+'</p>';
                return tmp;
            }
        }
    },
    //what you can immediately call on any object created by $jConstruct.
    basicPropertiesInsert: function(tmp, directInsert) {
        tmp.addChild = function (childObj) { //add a child JSON object on the fly.
            this.children[this.children.length] = childObj; 
            return this; 
        }; 
        tmp.addFunction = function (addFunc) { //add a function on the fly.
            this.functions[this.functions.length] = addFunc; 
            return this; 
        }; 
        tmp.appendTo = function(parent) { //append the JSON to a container div.
            var dfd = new $.Deferred();
            var id;
            if(typeof parent == "object") { //if a jsonHTML object is inserted intended as the object to append to, grab the id of it.
                id = '#' + parent.id;
            } else {
                id = parent;
            }
            appendHTML(this, id).done(function () {
                dfd.resolve();
            }); 
            return dfd.promise(); 
        };
        tmp.event = function(type, func) {
            var divId = '#'+this.id;
            if($(divId)[0]) { //if the object is on the DOM.
                if(func) {
                    $(divId)[type](func);
                } else {
                    $(divId)[type]();
                }
            } else {
                if(func) {
                    tmp.addFunction(function () { $(divId)[type](func) });
                } else {
                    tmp.addFunction(function () { $(divId)[type]() });
                }
            }
            return this;
        };
        tmp.css = function(input) { //sets CSS to the current element.
            //console.log(this);
            var divId = '#'+this.id;
            if($(divId)[0]) { //if the object is rendered on the DOM.
                if(input) {
                    $(divId).css(input); //set the css
                } else { //if there was no input
                    return $(divId)[0].style; //return the object styles.
                }
            } else { //if not rendered on the DOM
                if(input) { //if css was input
                    this.addFunction(function() { //set CSS after it is rendered on the DOM.
                        $(divId).css(input);
                    });
                } else { //if there was no input
                    return $(divId)[0].style; //return the object styles.
                }
            }
            return this; //everything worked as expected.
        };
        tmp.editProperty = function(properties) { //dynamically add new properties to the JSON HTML object on the fly.
            jConstructObjectManipulations.dynamicPropertiesAdd(tmp, properties);
            return this;
        };
        tmp.remove = function() { //removes the object from the DOM
            var divId = this.id;
            var myNode = document.getElementById(divId);
            while(myNode.firstChild) { //Experimental DOM object removal, jQuery "remove" leaves a temporary memory leak, this is intended to fix that issue.
                myNode.removeChild(myNode.firstChild);
            }
            $('#'+divId).remove();
            return this;
        };
        tmp.textProperties = function(type, option) { //so the simple text manipulations can easily be done.
            var options = jConstructObjectManipulations.textStyling(tmp);
            if(option) {
                options[type](option);
            } else {
                options[type]();
            }
            return this;
        };
    },
    dynamicPropertiesAdd: function(tmp, directInsert) {
        for(var propertyName in directInsert) {
            tmp[propertyName] = directInsert[propertyName];
        }
        return this;
    }
};


//so that you can construct an object that will work just like any other javaScript object.
function $jConstruct(htmlType, directInsert) {
    var tmp = {
        type: undefined !== htmlType ? htmlType : 'div', //defaults to a div
        children: [],
        functions: [],
    };
    if(directInsert) { //dynamically add all properties to the object from directInsert that the user inputs.
        jConstructObjectManipulations.dynamicPropertiesAdd(tmp, directInsert);
    }
    if(undefined === tmp.id) {
        tmp.id = makeID();
    }
    jConstructObjectManipulations.basicPropertiesInsert(tmp, directInsert);
    
    return tmp;
}

/*
    Copyright (C) 2014 Jesse Parnell
    
    v1.0
    This software / code is provided to you similarly as Free Software, (refer to: https://gnu.org/philosophy/free-sw.html ),
    by using or obtaining this code, you have the Free Software basic rights that do not contradict this license, if any, 
    and you agree, with common sense:

    To hold me __not__ responsible for any damages, or consequences of your malicious or "friendly" use of this code, it is up
    to the user to ensure the integrity and effects of this code before it is run, copied, deleted, modified, or utilized in any way. 
    This code is provided with no warranties, or guarantees. I ask from you to __retain__ credit back to me if you use my code 
    or any portion of it, and leave this stated license intact and not modified. This code / software is regarded as an inanimate 
    object, a tool, operating on natural laws, influenced by the current user and it's environment. The current user of the copy of 
    this tool must be held responsible for the way they use it, and not hold reponsible the creators, distributors, or copiers of that 
    tool. You may not redact, or modify this license within this repository / project / code / software, and leave the license fully, 
    unmodified, as is, unless given written or verbal permission from the Copyright holder of this code / software. This license is 
    not intended to cause a Closed-Source project to become Free Software, only the code and any portion of it from this project, 
    under this license, has to remain Free, and it's source publicly availible, unless permission granted from the Copyright holder. 

    Without manipulation to the license currently being utilized here, you may copy this license, and use it in __your__ own 
    code / software / projects / works, but, similarly, as stated above, you are responsible for the way you use the tools I created, 
    including this license.

    Feel free to fork, and ask to become a contributor, you have that right, if you have an improvement you have implemented in your 
    fork, that you believe is totally amazing, and should be included in the main project, ill review it, and possibly implement it, 
    and give you credit as one of the authors or contributors, and remember, your also protected under the license above.


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
*/