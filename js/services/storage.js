'use strict';

function saveToStorage(key, value){
    var jsonStr = JSON.stringify(value);
    localStorage.setItem(key, jsonStr);
}
function loadFromStorage(key){
    var jsonStr = localStorage.getItem(key)
    var value = JSON.parse(jsonStr);
    return  value;
}
