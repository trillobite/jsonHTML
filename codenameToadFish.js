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