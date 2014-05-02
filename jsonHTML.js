/*
                                         jsonHTML
                                   Author: Jesse Parnell
                                        Description
    This allows you to render html using jQuery dynamically. Was created for one of my own projects,
    in which virtually none of my div objects, or much of any of the HTML could have been written
    statically in HTML. It was not written for performance, therefore it may not be good for very
    large projects, but it is good if you need to write code quickly in a more intuitive manner. 
    Basically, if you can do something in javaScript, you can now do it to your HTML.
    
    Disclaimer: jsonHTML is provided to you as Free Software (refer to: gnu.org/philosophy/free-sw.html ), by using this code
    you agree not to hold me responsible for any damages, or consequences of your malicious or "friendly" use of this code.
    This code is provided with no warranties, or guarantees, all I ask is you retain credit back to me if you use my code.
    https://github.com/trillobite/jsonHTML
    
    Feel free to fork, and ask to become a contributor, if you have an improvement you have implemented in your fork, that 
    you believe is totally amazing, and should be included in the main project, ill review it, and possibly implement it, and
    give you credit as one of the authors or contributors.
*/

/*
    This is a hashing function. It works similar to an in memory database for this project.
    It can store any string you want, to see if that object already exists, it's a really powerful tool actually.
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
    if(!(jsonObj.id)) {
        jsonObj.id = makeID();
    }
    if(typeof jsonObj == 'function'){
        jsonObj = jsonObj();
    }
    $('#'+container).append(parsetype(jsonObj.type)(jsonObj));
    if(undefined !== jsonObj.children) {
        $.each(jsonObj.children, function () {
            appendHTML(this, jsonObj.id);
        });
    }
    if(undefined !== jsonObj.functions) {
        $.each(jsonObj.functions, function () {
            this();
        });
    }
}

//so that you can construct an object that will work just like any other javaScript object.
function $jConstruct(htmlType) {
    return {
        type: undefined !== htmlType ? htmlType : 'div', //defaults to a div
        children: [],
        functions: [],
        addChild: function (childObj) { this.children[this.children.length] = childObj },
        addFunction: function (addFunc) { this.functions[this.functions.length] = addFunc },
        appendTo: function(parent) { this.parent = parent; appendHTML(this, this.parent); },
    };
}