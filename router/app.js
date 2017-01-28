const express = require("express");
const adminInfo = require("./../settings.json");
const database = require("./../core/database/index.js");
exports.app = express.Router();


exports.app
    .get('/', (req, res) => {
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        res.render("index", {
            admin: admin
        });
    })
    .get('/about-me', (req, res) => {
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        res.render("about", {
            admin: admin
        });
    })
    .get('/resume', (req, res) => {
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        res.render("resume", {
            admin: admin
        });
    })
    .get('/contact', (req, res) => {
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        res.render("contact", {
            admin: admin
        });
    })
    .get('/blog', (req, res) => {
        // [TODO] Add pages sistem with using req.query
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        database.db.blogs.then(blogs => {
            blogs.find({}).toArray().then(blog => {
                res.render("blog", {
                    admin: admin,
                    blog: blog
                });
            })
        })

    })
    .get('/blog/:blogurl', (req, res) => {
        // [TODO] Add pages sistem with using req.query
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        if(!req.params) return res.redirect("/");
        database.db.blogs.then(blogs => {
            blogs.findOne({ url : req.params.blogurl}).then(blog => {
                if(!blog) return res.redirect("/404");
                res.render("article", {
                    admin: admin,
                    blog: blog
                });
            })
        })

    })
    .get('/login', (req, res) => {
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        res.render("login", {
            admin: admin
        });
    })
    .get("/logout", (req, res) => {
        req.session.destroy(function (err) {
            if (err) return console.log(err)
            res.redirect('/');
        })
    })
    .get('/dashboard', (req, res) => {
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        if (admin == false) return res.redirect("/");
        res.render("dashboard", {
            admin: admin
        });
    })
    .get('/contact-request', (req, res) => {
        let admin = false;
        if (req.session.user) {
            if (req.session.user == adminInfo.email) admin = true;
        }
        if (admin == false) return res.redirect("/");
        res.render("contact-request", {
            admin: admin
        });
    })