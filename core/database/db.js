"use strict";
const mongodb = require("mongodb");

const dbAddr = process.env.ortaDb || "mongodb://127.0.0.1:27017/myblog";
if (!dbAddr) throw new Error("MyBlog environment variable is not set");

const db = mongodb.MongoClient.connect(dbAddr);

exports.blogs = db.then(db => db.collection("blogs"));
exports.contact = db.then(db => db.collection("contact"));
