module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    this.mass=[]
}


// Методы коллекции
Collection.prototype.values = function () {
    return this.mass
};
// другие методы
Collection.prototype.append = function(arg){
    if (arg.splice) {
        for (var i=0; i<arg.length; i++){
            this.mass.push(arg[i]);
        }
    } else if (arg instanceof Collection){
        var arr = arg.mass;
        for (var i=0; i<arr.length; i++){
            this.mass.push(arr[i]);
        }
    } else {
        this.mass.push(arg);
    }
}
Collection.prototype.at = function(number){
    if (number>this.mass.length || number <=0){
        return null;
    } else {
        return this.mass[number-1];
    }
}
Collection.prototype.removeAt = function(number){
    if (number>this.mass.length || number <=0){
        return false;
    } else {
        this.mass.splice(number-1,1);
        return true;
    }
}
/**
 * Создание коллекции из массива значений
 */
Collection.from = function (arg) {
    var col = new Collection();
    col.append(arg);
    return col;
};