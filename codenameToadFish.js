/*
	FILE: jsonHTML_Experimental.js
	
	CODE NAME: TOADFISH.
	
	Description: Experimental objects which may be included within the jsonHTML
				 project in the near future.
				 These are more advanced objects that mainly produce grid like
				 structures, and are managed utilizing micronDB.
*/

var toadFish = {};

toadFish.create2DArray = function(r) {
	var arr = [];
	for(var i = 0; i < r; ++i) {
		arr[i] = [];
	}
	return arr;
};

toadFish.structure = function(arr, colName) {
	var container = $jConstruct('div', {
		collectionName: colName,
	}).css({
		'clear': 'left',
		'float': 'left',
		'display': 'block',
	});
	for(var i = 0; i < arr.length; ++i) {
		var holder = $jConstruct('div');
		if(!arr[i].length) { //in case it's not a 2D array.
			holder.addChild(arr[i]);
		} else { //then it is a 2D array.
			holder.css({
				'float': 'left',
			});
		}
		for(var j = 0; j < arr[i].length; ++j) {
			holder.addChild(arr[i][j]);
		}
		container.addChild(holder);
	}
	container.getCell = function(r, c) {
		return container.children[c].children[r];
	};
	return container;
};


/*
	NAME:
		DROP

	DESCRIPTION:
		An object class which can generate single layer
		drop-down menu's using jsonHTML and CSS.

	REQUIRES:
	dropDown.css

	SYNTAX AND USE:
	var btn = sig();
	var dropDown = new toadFish.drop(btn);
	dropDown.addOption({
		name: 'new group',
		event: {
			func: function() { 
				console.log(this);
			},
			type: 'click',
		},
	});
	dropDown.appendTo('#parentObject');
*/

toadFish.drop = function(inputBtn) {
	var container = sig('div', {
		class: 'dropdown',
	}).event('click', function() {
		var elm = document.getElementById(dropDownContainer.id);
		if(elm.style.display == 'none' || elm.style.display == "") {
			dropDownContainer.css({
				'display': 'block',
			});
			toadFish.dropVisible = 1;				
		}
	});
	var dropDownContainer = sig('div', {
		class: 'dropdown-content',
	}).event('mouseleave', function() {
		var elm = document.getElementById(dropDownContainer.id);
		if(elm.style.display == 'block') {
			dropDownContainer.css({
				'display': 'none',
			});
			toadFish.dropVisible = 0;				
		}
	});
	container.addOption = function(obj) {
		var nwOption = sig('div', {
			text: obj.name,
			class: 'dropdown-content-link',
		}).event(obj.event.type, obj.event.func);

		dropDownContainer.addChild(nwOption);
		return nwOption
	};
	container.addChild(inputBtn);
	container.addChild(dropDownContainer);
	return container;
};

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