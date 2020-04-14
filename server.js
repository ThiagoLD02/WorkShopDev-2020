const express = require('express');
const server = express();

const db = require("./db")

/*
const ideas = [
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        url:"https://rocketseat.com.br",
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title:"Karaokê",
        category:"Diversão",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        url:"https://rocketseat.com.br",
        
    },
];
*/
// Configurar arquivos estáticos (css,html,js)
server.use(express.static("public"));


//Haviliar express pra poder pegar somente os campos q temos no banco de dados


server.use(express.urlencoded({extended: true}))

//Configurando o nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views",{
    express: server,
    noCache: true, 
});

server.get("/",
    function(req,res){
        
        db.all(`SELECT * FROM ideas`, function(err,rows){
            if(err) return console.log(err)
    
            const reverseIdeas = [...rows].reverse();

            let lastIdeas = [];
            
            for(idea of reverseIdeas){
                if(lastIdeas.length<2){
                    lastIdeas.push(idea)
                }
            }
            return res.render("index.html", {ideas: lastIdeas});
        })

        
    }
    
);
server.get("/ideas",
    function(req,res){
        db.all(`SELECT * FROM ideas`, function(err,rows){
            
            if(err) {
                console.log(err)
                return res.send("Erro no banco de dados")
            }
            const reverseIdeas = [...rows].reverse();

            return res.render("ideas.html", {ideas: reverseIdeas});
        })
    }
    
);

server.post("/",function(req,res){
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES(?,?,?,?,?);
        `
    const values = [
    
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query,values,function(err){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        
        return res.redirect("/ideas")

    })
})







server.listen(3000);
