document.querySelector(".menu-toggle").addEventListener("click", function(e){
    document.querySelector(".menu-toggle").classList.toggle("on");
    document.querySelector(".menu-section").classList.toggle("on");
    document.querySelector("nav ul").classList.toggle("hidden");
    document.querySelector("nav").classList.toggle("on");
})

if(document.getElementById("send")){
    document.getElementById("send").addEventListener("click", function(e){
        e.preventDefault();
        var name = document.getElementById("name").value,
            email = document.getElementById("email").value,
            message = document.getElementById("message").value;
        if(!name || !email || !message) return alert("Missing fields!")
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "/api/contact-me", true);
        ajax.onreadystatechange = function(){
            if (ajax.readyState != 4 || ajax.status != 200) return;
            var res = JSON.parse(ajax.response)
            if(res.code === 0) return alert(res.error);
            alert(res.status)
        }
        ajax.send(JSON.stringify({
            name : name,
            email : email,
            message : message
        }))
    })
}

if(document.getElementById("signin")){
    document.getElementById("signin").addEventListener("click", function(e){
        var email = document.getElementById("email").value,
            password = document.getElementById("password").value;
        if(!email || !password) return alert("Missing fields!");
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "/api/login", true);
        ajax.onreadystatechange = function(){
            if (ajax.readyState != 4 || ajax.status != 200) return;
            var res = JSON.parse(ajax.response)
            if(res.code === 0) return alert(res.error);
            window.location.href = "/dashboard"
        }
        ajax.send(JSON.stringify({
            email : email,
            password : password
        }))
    })
}

if(document.getElementById("save")){
    document.getElementById("save").addEventListener("click", function(e){
        e.preventDefault();
        var data = {}
        data.title = document.getElementById("title").value,
        data.description = document.getElementById("description").value,
        data.keywords = document.getElementById("keywords").value,
        data.detail = tinyMCE.get('detail').getContent();
        if(!data.title || !data.detail) return alert("Missing fields! You need to write title and detail");
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "/api/add-article", true);
        ajax.onreadystatechange = function(){
            if (ajax.readyState != 4 || ajax.status != 200) return;
            var res = JSON.parse(ajax.response)
            if(res.code === 0) return alert(res.error);
            alert(res.status)
        }
        ajax.send(JSON.stringify(data))
    })
}

if(document.getElementById("remove-article")){
    document.getElementById("remove-article").addEventListener("click", function(e){
        e.preventDefault();
        var article = e.target.value;
        console.log(article)
        if(!article) return;
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "/api/remove-article", true);
        ajax.onreadystatechange = function(){
            if (ajax.readyState != 4 || ajax.status != 200) return;
            var res = JSON.parse(ajax.response)
            if(res.code === 0) return alert(res.error);
            alert(res.status)
        }
        ajax.send(JSON.stringify({url : article}))
    })
}