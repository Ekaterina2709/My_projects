/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function(operations, callback) {
    var promises = [];

    operations.forEach(function(operation) {
        var promise = new Promise(function(resolve, reject) {
            operation(function next(err, data) {
                err ? reject(err) : resolve(data);
            });
        });
        promises.push(promise);
    });

    Promise.all(promises)
        .then(function(res) {
            callback(null, res);
        })
        .catch(function(err) {
            callback(err);
        });
};