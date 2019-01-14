const Noticia = require('../models/user');

module.exports = function (app){
    app.get('/users', (req, res)=>{
          Noticia.getUsers((err,data)=>{
              res.status(200).json(data);
          });
    }); 

    app.post('/users', (req, res) =>{
        const userData = {
            not_id: null,
            not_author: req.body.not_author,
            not_title: req.body.not_title,
            not_description: req.body.not_description,
            not_url: null,
            not_urlToImage: null,
            not_publishedAt: null,
            not_content: null
        };
        Noticia.insertUser(userData, (err,data) =>{
            if(data && data.insertId){
                console.log(data);                
                res.json({
                    success: true,
                    msg: 'Noticia insertada',
                    data: data
                })
            }else{
                res.status(500).json({
                    success:false,
                    msg:'Error'
                })
            }
        })
    });

    app.put('/users/:not_id', (req,res) => {
        const userData = {
            not_id: req.params.not_id,
            not_author: req.body.not_author,
            not_title: req.body.not_title,
            not_description: req.body.not_description,
            not_url: null,
            not_urlToImage: null,
            not_publishedAt: null,
            not_content: null
        };

        Noticia.updateUser(userData, function(err, data){
            if(data && data.msg){
                res.status(200).json({data});
            }else{
                res.status(500).json({
                    success: false,
                    msg: 'error'
                });
            }
        });
    });

    app.delete('/users/:not_id', (req,res)=>{
        Noticia.deleteUser(req.params.not_id, (err, data)=>{
            if(data && data.msg === 'deleted' || data.msg === 'not exists'){
                res.json({
                    success: true
                })
            }else{
                res.status(500).json({
                    msg:'Error'
                })
            }
        })
    });

};