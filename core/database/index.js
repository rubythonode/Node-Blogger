const db = require("./db");

exports.db = { users: db.users, blogs:db.blogs, contact:db.contact };
