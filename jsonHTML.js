/*
                                         jsonHTML
                                   Author: Jesse Parnell
                                        Description
    This allows you to render html using jQuery dynamically. Was created for one of my own projects,
    in which virtually none of my div objects, or much of any of the HTML could have been written
    statically in HTML. It was not written for performance, therefore it may not be good for very
    large projects, but it is good if you need to write code quickly in a more intuitive manner. 
    Basically, if you can do something in javaScript, you can now do it to your HTML.

                /\\\\
               /  \\\\
              /    \\\\
             /      \\\\
            /=======|\\\\
           / \\       \\\\
          /   \\       \\\\
         /    //        \\\\
        /    //          \\\\.
       /     =======|     \\\\=
      /....................\\\\==
     github.com/trillobite/jsonHTML

*/

//view un-minified micronDB code under the micronDB project repository.
var micronDB=function(){return{db:[],hashTraverse:function(r,t){if(this.db[r]){for(var n=0;n<this.db[r].length;++n){var e=t(this.db[r][n]);if(e)return e}return!1}return!1},calcIndex:function(r){for(var t=0,n=0;n<r.length;++n)t+=r.charCodeAt(n);return t%50},exists:function(r){var t=this.calcIndex(r);return this.hashTraverse(t,function(t){return t.id==r?!0:void 0})},hash:function(r){if(this.exists(r))return!1;var t=this.calcIndex(r.id);return this.db[t]?(this.db[t][this.db[t].length]=r,!0):(this.db[t]=[],this.db[t][this.db[t].length]=r,!0)},get:function(r){var t=this.calcIndex(r);return this.hashTraverse(t,function(t){return t.id==r?t:void 0})},remove:function(r){var t=this.calcIndex(r);if(this.db[t])for(var n=0;n<this.db[t].length;++n)if(this.db[t][n])return delete this.db[t][n]},match:{where:function(r,t){for(var n in t)if("undefined"!=typeof r[n])if("function"==typeof r[n]){if(r[n](t[n])===!0)return t}else if(t[n]==r[n])return t;return!1}},traverse:function(r,t,n){var e=function(r,n){for(var i=[],h=0;h<n.length;++h)if(Array.isArray(n[h])){var f=e(r,n[h]);f.length>0&&(Array.isArray(f)&&f.length<2?i[i.length]=f[0]:i[i.length]=f)}else t(r,n[h])&&(i[i.length]=t(r,n[h]));return i},i=[],h=0,f=function(r,t,n,f){"undefined"!=typeof n[f]&&"number"!=typeof f&&(h?i.length>0&&(i=e(r,i)):i=e(r,t)),++h},a=function(r,t,n,h){if("undefined"!=typeof n[h]&&"number"!=typeof h){var f=e(r,t);if(i.length>0)for(var a=function(r,t){for(var n=0;n<t.length;++n)if(t[n]==r)return!0;return!1},s=0;s<f.length;++s)a(f[s],i)||(i[i.length]=f[s]);else i=e(r,t)}};for(var s in r){"$and"==s&&(h=0);var u={};if(u[s]=r[s],"$or"==s||"$and"==s)for(var o in u[s]){var d={};d[o]=u[s][o],"$or"==s?a(d,n,u[s],o):f(d,n,u[s],o)}else f(u,n,r,s)}return i},insert:function(r){this.hash(r)},query:function(r){var t;for(var n in r)"undefined"!=typeof this.match[n]&&(t=void 0===t?this.traverse(r[n],this.match[n],this.db):this.traverse(r[n],this.match[n],t));return t}}};

var arrdb = new micronDB();

/*
    If the user does not provide a div id for their object, this will make a 
    random one.
*/
var makeID = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 12; i++ ) //rough estimate: 44,652 possible unique random ids.
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    /*if(!(arrdb.hash({id: text, append: undefined, }))) {
        text + Math.floor(Math.random() * 24);
        console.log('warning: Last div id was the same, are you making too many objects without div id\'s? ', text);
    }*/
    return text;
};

//Returns a small chunk of HTML as a string back to the parent function.
//Can produce HTML for a button, text box, or a div element.
var parsetype = function (type) {
    function ico(element) {
        var ico = "";
        for(var k in element) {
            var obj = k.toString();
            if(typeof element[k] == 'string') { //makes sure that the object is a property, and not an array, or function, or object, or whatever.
                if(k != 'text' && k != 'type') { //these are properties that are already handled and reserved for jsonHTML.
                    ico += ' ' + obj + '="' + element[k] + '"';
                }
            }
        }
        return ico;
    }
    var options = {
        generic: function(element) { //this can be used to generate div's
            var html = {
                start: '<' + element.type,
                end: undefined !== element.text ? '>' + element.text + '</' + element.type + '>' : '></' + element.type + '>',
            };
            return html.start + ico(element) + html.end;
        },
        html: function (element) {
            return element.data;
        },
    };
    return undefined !== options[type] ? options[type] : options['generic']; //if jsonHTML does not have that type, it will try a generic method to create it.
};

//recursive function, simply loops until there are no more children objects,
//uses jQuery to append to the parent object (usually a div element).
function appendHTML(jsonObj, container, type) {
    var dfd = new $.Deferred();
    var exec = function () {
        if(typeof jsonObj == 'function'){
            jsonObj = jsonObj();
        }
        if(undefined === jsonObj.id) {
            jsonObj.id = makeID();
        }
        if(arrdb.exists(jsonObj.id)) {
            arrdb.get(jsonObj.id).append = type;
        } else {
            arrdb.hash(jsonObj);
        }
        jsonObj.parent = container;
        if(type) {
            $(container)[type](parsetype(jsonObj.type)(jsonObj));
        } else {
            $(container).append(parsetype(jsonObj.type)(jsonObj));
        }
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

var jConstructObjectManipulations = {
    //what you can immediately call on any object created by $jConstruct.
    basicPropertiesInsert: function(tmp, directInsert) {
        tmp.addChild = function(childObj) { //add a child JSON object on the fly.
            this.children[this.children.length] = childObj; 
            return this; 
        }; 
        tmp.addFunction = function(addFunc) { //add a function on the fly.
            this.functions[this.functions.length] = addFunc; 
            return this; 
        }; 
        tmp.appendTo = function(parent, type) { //append the JSON to a container div.
            var dfd = new $.Deferred();
            var id;
            if(typeof parent == "object") { //if a jsonHTML object is inserted intended as the object to append to, grab the id of it.
                id = '#' + parent.id;
            } else {
                id = parent;
            }
            appendHTML(this, id, type).done(function () {
                dfd.resolve();
            }); 
            this.state = dfd;
            return this;
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
        //remove the object from the DOM.
        tmp.remove = function() {
            var divId = this.id;
            var myNode = document.getElementById(divId);
            if(myNode) {
                while(myNode.firstChild) { //Experimental DOM object removal, jQuery "remove" leaves a temporary memory leak, this is intended to fix that issue.
                    myNode.removeChild(myNode.firstChild);
                }
                $('#'+divId).remove();                
            } else {
                console.log(divId, 'object does not exist, or has already been removed');
            }
            return this;
        };
        //Allows the user to render the object on the DOM again.
        tmp.refresh = function(appendType) {
            var dfd = new $.Deferred();
            if(tmp.parent.length > 0) {
                tmp.remove();
                var appending = appendType ? appendType : arrdb.get(tmp.id).append;
                tmp.appendTo(tmp.parent, appendType).state.done(function() {
                    dfd.resolve();
                }); //make sure to get from the hash table how the object was originally appended.

            } else {
                dfd.reject('Error: Parent of the object not defined. Was it rendered to the DOM yet?');
            }
            this.state = dfd;
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

var make = function(tmp, prop) {
    if(tmp) {
        return $jConstruct(tmp, prop);
    }
    return {
        input: function(tmp, prop) {
            prop ? prop.type = tmp : prop = {type: tmp};
            return $jConstruct('input', prop);
        },
    };
};

//compressed copy of toadFish. Non-compressed copy should be included in the download package.
var toadFish={};toadFish.create2DArray=function(t){for(var r=[],l=0;t>l;++l)r[l]=[];return r},toadFish.structure=function(t,r){for(var l=$jConstruct("div",{collectionName:r}).css({clear:"left","float":"left",display:"block"}),e=0;e<t.length;++e){var a=$jConstruct("div");t[e].length?a.css({"float":"left"}):a.addChild(t[e]);for(var d=0;d<t[e].length;++d)a.addChild(t[e][d]);l.addChild(a)}return l.getCell=function(t,r){return l.children[r].children[t]},l};



/*  View full license in LICENSE.md
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
       \_________________/      Keep it black, keep it free.*/