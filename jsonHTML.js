/*
                                         jsonHTML
                                   Author: Jesse Parnell
                                       Description:
    This allows you to render html using jQuery dynamically. Was created for one of my own projects,
    in which virtually none of my div objects, or much of any of the HTML could have been written
    statically in HTML. It was not written for performance, therefore it may not be good for very
    large projects, but it is good if you need to write code quickly in a more intuitive manner. 
    Basically, if you can do something in javaScript, you can now do it to your HTML.

(c) v1.3.1        /\\\\
 o               /  \\\\
 p              /    \\\\
 y             /      \\\\
 r            /=======|\\\\
 i           / \\       \\\\
 g          /   \\       \\\\
 h         /    //        \\\\
 t        /    //          \\\\.
         /    .=======|     \\\\=
 2      /....................\\\\==
 0     github.com/trillobite/jsonHTML
 1
 6    View full license in  LICENSE.md

*/

//view un-minified micronDB code under the micronDB project repository.
var micronDB=function(){return{db:[],hashTraverse:function(r,t){if(this.db[r]){for(var n=0;n<this.db[r].length;++n){var e=t(this.db[r][n]);if(e)return e}return!1}return!1},calcIndex:function(r){if(r){for(var t=0,n=0;n<r.length;++n)t+=r.charCodeAt(n);return t%50}return-1},exists:function(r){var t=this.calcIndex(r);return this.hashTraverse(t,function(t){return t.id==r})},makeID:function(){var r=new micronDB,t=0,n=8,e=function(){for(var r="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=0;n>e;++e)r+=t.charAt(Math.floor(Math.random()*t.length));return r},i=function(i){var h=function(){for(var h=62*Math.pow(n,2);r.exists(i)&&h>t;)++t,i=e()};return h(),r.exists(i)&&(n=Math.round(n/2+n),h()),i};return i(e())},hash:function(r){if(r.id=void 0===r.id?this.makeID():r.id,this.exists(r.id))return!1;var t=this.calcIndex(r.id);return this.db[t]?(this.db[t][this.db[t].length]=r,r):(this.db[t]=[],this.db[t][this.db[t].length]=r,r)},get:function(r){var t=this.calcIndex(r);return this.hashTraverse(t,function(t){return t.id==r?t:void 0})},remove:function(r){var t=this.calcIndex(r);if(this.db[t])for(var n=0;n<this.db[t].length;++n)if(this.db[t][n])return delete this.db[t][n]},match:{where:function(r,t){for(var n in t)if("undefined"!=typeof r[n])if("function"==typeof r[n]){if(r[n](t[n])===!0)return t}else if(t[n]==r[n])return t;return!1}},traverse:function(r,t,n){var e=function(r,n){for(var i=[],h=0;h<n.length;++h)if(Array.isArray(n[h])){var a=e(r,n[h]);a.length>0&&(Array.isArray(a)&&a.length<2?i[i.length]=a[0]:i[i.length]=a)}else t(r,n[h])&&(i[i.length]=t(r,n[h]));return i},i=[],h=0,a=function(r,t,n,a){"undefined"!=typeof n[a]&&"number"!=typeof a&&(h?i.length>0&&(i=e(r,i)):i=e(r,t)),++h},f=function(r,t,n,h){if("undefined"!=typeof n[h]&&"number"!=typeof h){var a=e(r,t);if(i.length>0)for(var f=function(r,t){for(var n=0;n<t.length;++n)if(t[n]==r)return!0;return!1},o=0;o<a.length;++o)f(a[o],i)||(i[i.length]=a[o]);else i=e(r,t)}};for(var o in r){"$and"==o&&(h=0);var u={};if(u[o]=r[o],"$or"==o||"$and"==o)for(var s in u[o]){var d={};d[s]=u[o][s],"$or"==o?f(d,n,u[o],s):a(d,n,u[o],s)}else a(u,n,r,o)}return i},insert:function(r){return this.hash(r)},query:function(r){var t;for(var n in r)"undefined"!=typeof this.match[n]&&(t=void 0===t?this.traverse(r[n],this.match[n],this.db):this.traverse(r[n],this.match[n],t));return t}}};
var arrdb = new micronDB();
/*var idCache = new micronDB();*/

var sig = function(typ, prop) {
    //Returns a small chunk of HTML as a string back to the parent function.
    //Can produce HTML for a button, text box, or a div element.
    var mkHTML = function (type) {
        var isInput = function(typ) {
            //these are input objects that require the input tag name.
            return ['text', 'textbox', 'password', 'checkbox', 'radio', 'file', 'image', 'submit'].indexOf(typ) > -1;
        };
        var ico = function(element) {
            var ico = "";
            for(var k in element) {
                var obj = k.toString();
                if(typeof element[k] == 'string') { //makes sure that the object is a property, and not an array, or function, or object, or whatever.
                    //run ico on 'type,' only if it is an input object, or the property is not 'text.'
                    if((k == 'type' && isInput(type)) || (k != 'text')) {
                        ico += ' ' + obj + '="' + element[k] + '"';
                    }
                }
            }
            return ico;
        };
        //this is actually what creates the HTML.
        var options = {
            generic: function(element) { //this can be used to generate div's
                var html = {
                    start: '<' + element.type,
                    end: element.text ? '>' + element.text + '</' + element.type + '>' : '></' + element.type + '>',
                };
                return html.start + ico(element) + html.end;
            },
            input: function (element) { //generic input type html object.
                var html = {
                    start: '<input',
                    end: element.text ? ' value="' + element.text + '"></input>' : '></input>',
                };
                return html.start + ico(element) + html.end;
            },
            html: function (element) {
                return element.data;
            },
        };

        return isInput(type) ? options['input'] : options[type] ? options[type] : options['generic'];
    };

    //recursive function, simply loops until there are no more children objects,
    //uses jQuery to append to the parent object (usually a div element).
    function appendHTML(jsonObj, container, type) {
        var dfd = new $.Deferred();
        var exec = function () {
            type = type ? type : 'append';
            jsonObj = (typeof(jsonObj) == 'function') ? jsonObj() : jsonObj; //execute if a function.
            jsonObj.id = (undefined === jsonObj.id) ? arrdb.makeID() : jsonObj.id; //checks if object has an ID.
            jsonObj.parent = jsonObj.parent ? jsonObj.parent : container;

            var obj = arrdb.get(jsonObj.id);
            if(obj) { //if object hashed into micronDB.
                obj.append = type; //save the type of appending style.
            } else {
                arrdb.hash(jsonObj); //hash it.
            }
            
            $(container)[type](mkHTML(jsonObj.type)(jsonObj));

            if(undefined !== jsonObj.children) { //append all of the child objects.
                for(var i = 0; i < jsonObj.children.length; ++i) { //8x faster to use a for loop.
                    appendHTML(jsonObj.children[i], '#'+jsonObj.id);
                }
            }
            if(undefined !== jsonObj.functions) { //execute all of the functions.
                for(var i = 0; i < jsonObj.functions.length; ++i) { //8x faster to use a for loop.
                    jsonObj.functions[i]();
                }
            }
            dfd.resolve(); //finished!
        };
        exec();
        return dfd.promise();
    }

    var objManip = {
        //what you can immediately call on any object created by $jConstruct.
        basicPropInsrt: function(tmp, directInsert) {
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
                var id = typeof(parent) == 'object' ? '#'+parent.id : parent; //is parent another jsonHTML object?
                this.state = appendHTML(this, id, type).done(function () {
                    dfd.resolve();
                }); 
                return this; //returns appendHTML promise.
            };
            tmp.event = function(type, func) {
                var divId = '#'+this.id;
                if($(divId)[0]) { //if the object is on the DOM.
                    if(func) {
                        $(divId)[type](func);
                    } else { //even if func is undefined, method below handles it better.
                        $(divId)[type]();
                    }
                } else {
                    if(func) {
                        tmp.addFunction(function () { $(divId)[type](func) });
                    } else { //even if func is undefined, method below handles it better.
                        tmp.addFunction(function () { $(divId)[type]() });
                    }
                }
                return this;
            };
            tmp.css = function(input) { //sets CSS to the current element.
                var divId = '#'+this.id;
                var obj = $(divId); //use to reduce jQuery calls.
                if(obj[0]) { //if the object is rendered on the DOM.
                    if(input) {
                        obj.css(input); //set the css
                    } else { //if there was no input
                        return obj[0].style; //return the object styles.
                    }
                } else { //if not rendered on the DOM
                    if(input) { //if css was input
                        this.addFunction(function() { //set CSS after it is rendered on the DOM.
                            $(divId).css(input);
                        });
                    } else { //if there was no input
                        return obj[0].style; //return the object styles.
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
        propertyAdd: function(tmp, directInsert) {
            for(var propertyName in directInsert) {
                tmp[propertyName] = directInsert[propertyName];
            }
            return this;
        }
    };

    return (function() {
        var tmp = {
            type: undefined !== typ ? typ : 'div', //defaults to a div
            children: [],
            functions: [],
        };
        if(prop) { //dynamically add all properties to the object from prop that the user inputs.
            objManip.propertyAdd(tmp, prop);
        }
        if(undefined === tmp.id) {
            tmp.id = arrdb.makeID();
        }
        objManip.basicPropInsrt(tmp, prop);
        
        return tmp;        
    })();
};

//for some backwards compatibility.
function $jConstruct(typ, prop) {
    return sig(typ, prop);
}

//compressed copy of toadFish. Non-compressed copy should be included in the download package.
var toadFish={};toadFish.create2DArray=function(t){for(var n=[],d=0;t>d;++d)n[d]=[];return n},toadFish.structure=function(t,n){for(var d=$jConstruct("div",{collectionName:n}).css({clear:"left","float":"left",display:"block"}),e=0;e<t.length;++e){var i=$jConstruct("div");t[e].length?i.css({"float":"left"}):i.addChild(t[e]);for(var o=0;o<t[e].length;++o)i.addChild(t[e][o]);d.addChild(i)}return d.getCell=function(t,n){return d.children[n].children[t]},d},toadFish.drop=function(t){var n,d=sig("div",{"class":"dropdown"}).event("click",function(){n||(e.css({display:"block"}),n=1)}),e=sig("div",{"class":"dropdown-content"}).event("mouseleave",function(){n&&(e.css({display:"none"}),n=0)});return d.addOption=function(t){var n=sig("div",{text:t.name,"class":"dropdown-content-link"}).event(t.event.type,t.event.func);e.addChild(n)},d.addChild(t),d.addChild(e),d};
