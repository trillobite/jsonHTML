
/*
    FILE: 
        MICRONDB.JS
    DESCRIPTION: 
        A database which resides in the clents memory. This is 
        an ultra fast, experimental database for volatile
        memory operations. This was an experiment of mine, and 
        is actually used quite often in my projects. Refer to 
        the readme for more information.
        Enjoy!
*/

// get instance using myDB = new micronDB();
var micronDB = function() {
    return {
        db: [],
        hashTraverse: function(indx, func) {
            if(this.db[indx]) { //if there is something there...
                for(var i = 0; i < this.db[indx].length; ++i) {
                    if(this.db[indx][i]) { //check if something is there.
                        var tmp = func(this.db[indx][i]);
                        if(tmp) { //send the object into the callback function.
                            return tmp;
                        }                        
                    }
                }
                return false;
            }
            return false;
        },
        calcIndex: function(data) { //takes a string
            if(data) {
                var total = 0;
                for(var i = 0; i < data.length; ++i) {
                    total += data.charCodeAt(i);
                }
                return total % 50; //max hash table size.
            }
            return -1;
        },
        exists: function(data) { //takes a string object.
            var indx = this.calcIndex(data);
            return this.hashTraverse(indx, function(obj) {
                return obj ? obj.id == data : false;
            });
        },
        //trying to make micronDB handle the creation of ID's.
        makeID: function() {
            var scope = new micronDB();
            var sanity = 0;
            var idLen = 8;
            var gen = function() { //ID generator.
                var nwID = "";
                var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for(var i = 0; i < idLen; ++i) { nwID += chars.charAt(Math.floor(Math.random() * chars.length)) }
                return nwID;
            };

            var verify = function(nwID) {
                var check = function() { //ensures that ID's are not wasted.
                    var loops = Math.pow(idLen, 2)*62; //max loops determined by how many ID's can be generated.
                    while(scope.exists(nwID) && sanity < loops) { //will go through and make sure all possible id's are used.
                        ++sanity;
                        nwID = gen();
                    }
                };

                check();

                if(scope.exists(nwID)) { //if failed to fix the collision.
                    idLen = Math.round((idLen / 2) + idLen); //increase max length of ID's.
                    check();
                }
                
                return nwID;
            };

            return verify(gen());
        },

        hash: function(data) { //Adds a JSON formatted object, and stores it.
            data.id = (undefined === data.id) ? this.makeID() : data.id; //Checks if object has an ID, and creates one if required.
            if(!(this.exists(data.id))) {
                var indx = this.calcIndex(data.id);
                if(this.db[indx]) {
                    this.db[indx][this.db[indx].length] = data;
                    return data; //success
                } else {
                    this.db[indx] = [];
                    this.db[indx][this.db[indx].length] = data;
                    return data; //success
                }
            } else {
                return false; //already exists
            }
        },
        get: function(key) { //key is the id of the object.
            var indx = this.calcIndex(key);
            return this.hashTraverse(indx, function(obj) {
                if(obj.id == key) {
                    return obj;
                } 
            });
        },
        remove: function(key) {
            var indx = this.calcIndex(key);
            if(this.db[indx]) { //If it is in the hash row.
                for(var i = 0; i < this.db[indx].length; ++i) { //loop through the row
                    if(this.db[indx][i]) { //if the object exists.
                        if(this.db[indx][i] == this.get(key)) { //check if this is the object to remove.
                            this.db[indx].splice(i, 1);
                            return !this.exists(key);
                        }
                    }
                }
            }
        },
        
        match: {
            where: function(key, obj) { //where the key and object have matching values.
                for(var prop in obj) {
                    if(typeof key[prop] != 'undefined') { //make sure that it is something first.
                        if(typeof key[prop] == 'function') { //if my key value is a function, execute it.
                            if(key[prop](obj[prop]) === true) { //makes sure that it is a real function.
                                return obj;
                            }
                        } else if(obj[prop] == key[prop]) { //if not, just see if the keys match.
                            return obj;
                        }
                    }
                }
                return false;
            },
        },
        traverse: function(key, matchFunc, db) {
            var find = function(searchKey, source) {
                var found = [];

                for(var i = 0; i < source.length; ++i) {
                    if(Array.isArray(source[i])) { //if it's an array, traverse that array too.
                        var tmp = find(searchKey, source[i]);
                        if(tmp.length > 0) { 
                            if(Array.isArray(tmp) && tmp.length < 2) { //if the array only has a single item.
                                found[found.length] = tmp[0];
                            } else {
                                found[found.length] = tmp;
                            }
                        }
                    } else if(matchFunc(searchKey, source[i])) {
                        found[found.length] = matchFunc(searchKey, source[i]);
                    }
                }

                return found;
            };
            var result = [];
            var used = 0;
            var funcAnd = function(tmp, db, key, property) { //handle the $and statement.
                if(typeof key[property] != 'undefined' && typeof property != 'number') {
                    if(!used) {
                        result = find(tmp, db);
                    } else {
                        if(result.length > 0) { //if the previous $and query found nothing, then do not add anything.
                            result = find(tmp, result); //make sure all the objects picked up in the current query still fit the next definition.
                        }
                    }
                }
                ++used; //determines how many times the $and is used.
            };
            var funcOr = function(tmp, db, key, property) { //handle the $or statement.
                if(typeof key[property] != 'undefined' && typeof property != 'number') {
                    var found = find(tmp, db);
                    if(result.length > 0) { //because it's an or, you want all the objects that fit the bill.
                        var exists = function(obj, arr) {
                            for(var j = 0; j < arr.length; ++j) {
                                if(arr[j] == obj) {
                                    return true;
                                }
                            }
                            return false;
                        };
                        for(var i = 0; i < found.length; ++i) {
                            if(!(exists(found[i], result))) {
                                result[result.length] = found[i];
                            }
                        }
                    } else {
                        result = find(tmp, db);
                    }
                }
            };
            for(var initProperty in key) {
                if(initProperty == '$and') {
                    used = 0; //allows the use of $and multiple times in one query.
                }
                var tmp = {};
                tmp[initProperty] = key[initProperty];
                if(initProperty == '$or' || initProperty == '$and') {
                    for(var property in tmp[initProperty]) { //what's inside the $or / $and property?
                        var nwTmp = {};
                        nwTmp[property] = tmp[initProperty][property];
                        if(initProperty == '$or') {
                            funcOr(nwTmp, db, tmp[initProperty], property);
                        } else {
                            funcAnd(nwTmp, db, tmp[initProperty], property);
                        }
                    }
                } else {
                    funcAnd(tmp, db, key, initProperty);
                }
            }
            return result;
        },
        insert: function(obj) {
            return this.hash(obj);
        },
        query: function(query) {
            var current;
            for(var queryType in query) {
                if(typeof this.match[queryType] != 'undefined') { //if the query command exists.
                    if(undefined === current) {
                        current = this.traverse(query[queryType], this.match[queryType], this.db); //first time statement filter.
                    } else {
                        current = this.traverse(query[queryType], this.match[queryType], current); //filter again with the next statement.
                    }
                }
            }
            return current;
        },
    };
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