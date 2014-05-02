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
        }; 
        return html.id + html.class + html.onclick + html.onblur + html.onfocus;
    }
    var options = {
        textbox: function (element) {
            var html = {
                start: '<input type="text"',
                end: undefined !== element.text ? ' value="' + element.text + '">' : '>',
            };
            return html.start + ico(element) + html.end;
        },
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
    };
    return undefined !== options[type] ? options[type] : undefined;
};

//recursive function, simply loops until there are no more children objects,
//uses jQuery to append to the parent object (usually a div element).
function appendHTML(jsonObj, container) {
    if(typeof jsonObj == 'function') {
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
