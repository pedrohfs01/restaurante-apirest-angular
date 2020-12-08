"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password == this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "pedro@gmail.com": new User('pedro@gmail.com', "pedro", "123"),
    "mario@gmail.com": new User('mario@gmail.com', "mario", "123")
};
