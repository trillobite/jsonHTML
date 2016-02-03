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
		return container.children[r].children[c];
	};
	container.global = function(property, input0, input1) {
		for(var r = 0; r < container.children.length; ++r) {
			for(var c = 0; c < container.children[r].length; ++c) {
				container.getCell(r, c)[property](input0, input1);
			}
		}
	}
	return container;
};

/*
	TILES

	arr - Array of JSON data to describe each tile.
	tileCollectionName - Name of this collection.
	
	returns: jsonHTML objects combined in a grid-like manner.
*/
toadFish.tiles = function(arr, tileCollectionName) {
	var main = $jConstruct('div', { //holds everything into one single container.
		collectionName: tileCollectionName, //so micronDB can find this object collection.
	}).css({
		'clear': 'left',
		'float': 'left',
		'display': 'block',	
	});
	for(var i = 0; i < arr.length; ++i) {
		var holder = $jConstruct('div').addChild($jConstruct('div', arr[i])); //holder prevents refresh from moving object to the bottom of the stack.
		main.addChild(holder); //structure: [main[holder[object]]]
	}
	main.getTile = function(indx) {
		return main.children[indx].children[0];
	}
	main.removeTile = function(indx) {
		var tmp = main.getTile(indx);
		$('#'+tmp.id).remove();
		arrdb.remove(tmp.id);
	}
	main.updateTiles = function(property, param0, param1) {
		for(var i = 0; i < arr.length; ++i) {
			main.getTile(i)[property](param0, param1);
		}
	}
	return main;
};


/*
	GRID
	
	col - how many cells vertically should be generated.
	row - how many cells horizontally should be generated.
	
	returns: jsonHTML objects combined in a grid-like manner.
*/
toadFish.grid = function(row, col, gridCollectionName) {
	col++;
	row++;
	var main = toadFish.tiles(Array(row), {
		collectionName: gridCollectionName,
	}).css({
		'width': 'auto',
		'height': 'auto',	
	});
	//main.getRow = main.getTile; //getRow makes more sense than the default getTile.
	//console.log('main:', main);
	//row++; //so that the loop goes until the last row.
	for(var i = 0; i < row; ++i) {
		//main.getTile(i).addChild(toadFish.tiles(Array(col), gridCollectionName+'row'+i.toString()));
		main.children[i] = toadFish.tiles(Array(col), gridCollectionName+'row'+i.toString());
		for(var j = 0; j < col; ++j) {
			main.children[i].children[j].css({
				'float': 'left', //floats each cell to the left so they will stack properly.
			});
		}
	}
	main.getCell = function(r, c) { //get an individual cell in the grid.
		//console.log('getCell:', main.getTile(r));
		//return main.getTile(r).children[c];
		return main.children[r].children[c];
	}
	main.removeCell = function(r, c) {
		var cell = main.getCell(r, c);
		$('#'+cell.id).remove();
		arrdb.remove(cell.id); //will have to check this part to ensure arrdb can execute.
	}
	main.removeRow = function(r) {
		main.removeTile(r);
	}
	main.rowAssign = function(indx, property, input0, input1) {
		main.children[indx].updateTiles(property, input0, input1);
	}
	main.globalAssign = function(property, input0, input1) { //allows functions to be executed on every single cell.
		for(var i = 0; i < row; ++i) {
			main.rowAssign(i, property, input0, input1);
		}
	}
	return main;
};

/*  View full license in README.md
             )
c            (
o        )   )
p        (             v1.3
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