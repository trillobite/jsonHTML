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
var micronDB=function(){return{db:[],hashTraverse:function(t,r){if(this.db[t]){for(var n=0;n<this.db[t].length;++n)if(this.db[t][n]){var e=r(this.db[t][n]);if(e)return e}return!1}return!1},calcIndex:function(t){if(t){for(var r=0,n=0;n<t.length;++n)r+=t.charCodeAt(n);return r%50}return-1},exists:function(t){var r=this.calcIndex(t);return this.hashTraverse(r,function(r){return r?r.id==t:!1})},makeID:function(){var t=new micronDB,r=0,n=8,e=function(){for(var t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=0;n>e;++e)t+=r.charAt(Math.floor(Math.random()*r.length));return t},i=function(i){var h=function(){for(var h=62*Math.pow(n,2);t.exists(i)&&h>r;)++r,i=e()};return h(),t.exists(i)&&(n=Math.round(n/2+n),h()),i};return i(e())},hash:function(t){if(t.id=void 0===t.id?this.makeID():t.id,this.exists(t.id))return!1;var r=this.calcIndex(t.id);return this.db[r]?(this.db[r][this.db[r].length]=t,t):(this.db[r]=[],this.db[r][this.db[r].length]=t,t)},get:function(t){var r=this.calcIndex(t);return this.hashTraverse(r,function(r){return r.id==t?r:void 0})},remove:function(t){var r=this.calcIndex(t);if(this.db[r])for(var n=0;n<this.db[r].length;++n)if(this.db[r][n]&&this.db[r][n]==this.get(t))return this.db[r].splice(n,1),!this.exists(t)},match:{where:function(t,r){for(var n in r)if("undefined"!=typeof t[n])if("function"==typeof t[n]){if(t[n](r[n])===!0)return r}else if(r[n]==t[n])return r;return!1}},traverse:function(t,r,n){var e=function(t,n){for(var i=[],h=0;h<n.length;++h)if(Array.isArray(n[h])){var f=e(t,n[h]);f.length>0&&(Array.isArray(f)&&f.length<2?i[i.length]=f[0]:i[i.length]=f)}else r(t,n[h])&&(i[i.length]=r(t,n[h]));return i},i=[],h=0,f=function(t,r,n,f){"undefined"!=typeof n[f]&&"number"!=typeof f&&(h?i.length>0&&(i=e(t,i)):i=e(t,r)),++h},a=function(t,r,n,h){if("undefined"!=typeof n[h]&&"number"!=typeof h){var f=e(t,r);if(i.length>0)for(var a=function(t,r){for(var n=0;n<r.length;++n)if(r[n]==t)return!0;return!1},s=0;s<f.length;++s)a(f[s],i)||(i[i.length]=f[s]);else i=e(t,r)}};for(var s in t){"$and"==s&&(h=0);var o={};if(o[s]=t[s],"$or"==s||"$and"==s)for(var u in o[s]){var d={};d[u]=o[s][u],"$or"==s?a(d,n,o[s],u):f(d,n,o[s],u)}else f(o,n,t,s)}return i},insert:function(t){return this.hash(t)},query:function(t){var r;for(var n in t)"undefined"!=typeof this.match[n]&&(r=void 0===r?this.traverse(t[n],this.match[n],this.db):this.traverse(t[n],this.match[n],r));return r}}};
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
var toadFish={};toadFish.create2DArray=function(t){for(var d=[],e=0;t>e;++e)d[e]=[];return d},toadFish.structure=function(t,d){for(var e=$jConstruct("div",{collectionName:d}).css({clear:"left","float":"left",display:"block"}),n=0;n<t.length;++n){var i=$jConstruct("div");t[n].length?i.css({"float":"left"}):i.addChild(t[n]);for(var l=0;l<t[n].length;++l)i.addChild(t[n][l]);e.addChild(i)}return e.getCell=function(t,d){return e.children[d].children[t]},e},toadFish.drop=function(t){var d=sig("div",{"class":"dropdown"}).event("click",function(){var t=document.getElementById(e.id);("none"==t.style.display||""==t.style.display)&&(e.css({display:"block"}),toadFish.dropVisible=1)}),e=sig("div",{"class":"dropdown-content"}).event("mouseleave",function(){var t=document.getElementById(e.id);"block"==t.style.display&&(e.css({display:"none"}),toadFish.dropVisible=0)});return d.addOption=function(t){var d=sig("div",{text:t.name,"class":"dropdown-content-link"}).event(t.event.type,t.event.func);return e.addChild(d),d},d.addChild(t),d.addChild(e),d};