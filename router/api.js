const express = require("express");
const getSlug = require("speakingurl");
const adminInfo = require("./../settings.json");
const database = require("./../core/database/index.js");


exports.api = express.Router();

exports.api
    .post('/login', (req, res) => {
        if (!req.body["email"] || !req.body["password"]) return res.json({
            error: "Missing fields",
            code: 0
        });
        if (adminInfo.email != req.body["email"]) return res.json({
            error: "User not found.",
            code: 0
        })
        if (adminInfo.password != req.body["password"]) return res.json({
            error: "Wrong password. Please try again.",
            code: 0
        })
        if (adminInfo.email == req.body.email && adminInfo.password == req.body.password) {
            req.session.user = adminInfo.email;
            res.json({
                code: 1,
                status: "Login was successfuly."
            })
        }
    })
    .post("/contact-me", (req, res) => {
        if (!req.body) return res.json({
            code: 0,
            error: "Missing fields"
        })
        if (!req.body.email || !req.body.message || !req.body.name) return res.json({
            code: 0,
            error: "Missing fields"
        })
        database.db.contact.then(contacts => {
            contacts.insert({
                name: req.body.name,
                email: req.body.email,
                message: req.body.message
            }).then(result => {
                if (!result || result.result.ok != 1 || result.result.n != 1) return res.json({
                    code: 0,
                    error: "Somethings wrong. Please come back later..."
                })
                res.json({
                    code: 1,
                    status: "Your message successfuly saved."
                })
            })
        })
    })
    .post("/add-article", (req, res) => {
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        if (admin == false) return res.redirect("/");
        if (!req.body) return res.json({
            code: 0,
            error: "Missing fields"
        })
        if (!req.body.title || !req.body.detail) return res.json({
            code: 0,
            error: "Missing fields"
        })
        let data = req.body;
        database.db.blogs.then(blogs => {
            blogs.findOne({
                url: getSlug(data.title)
            }).then(blog => {
                data.url = blog ? getSlug(data.title) + "-" + Date.now() : getSlug(data.title);
                data.created_date = new Date();
                database.db.blogs.then(insertBlog => {
                    insertBlog.insert(data).then(result => {
                        if (!result || result.result.ok != 1 || result.result.n != 1) return res.json({
                            code: 0,
                            error: "Somethings wrong. Please come back later..."
                        })
                        res.json({
                            code: 1,
                            status: "Your article successfuly saved."
                        })
                    })
                })
            })
        })
    })
    .post("/remove-article", (req, res) => {
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        if (admin == false) return res.redirect("/");
        if (!req.body || !req.body.url) return res.json({
            code: 0,
            error: "Missing fields"
        })
        database.db.blogs.then(blogs=>{
            blogs.remove({ url : req.body["url"] }).then(result=>{
                if(result.result.ok != 1 || result.result.n != 1) return res.json({
                    code : 0,
                    error : "We can not delete this blog. Please try again later."
                })
                res.json({
                    code : 1,
                    status : "This blog post was successfully deleted."
                })
            })
        })
    })