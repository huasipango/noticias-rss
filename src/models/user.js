const mysql = require('mysql');

connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'newsRss'
});

let userModel = {};

userModel.getUsers = (callback) =>{
    if(connection){
        connection.query(
            'SELECT * FROM noticia',
            (err,rows) => {
                if (err) {
                    throw err;
                }else{
                    callback(null, rows);
                }
            }
        )           
    }
};
userModel.insertUser = (userData, callback)=>{
    if(connection){
        connection.query(
            'INSERT INTO noticia set ?', userData,
            (err,result) =>{
                if(err){
                    throw err;
                }else{
                    callback(null,{
                        'insertId': result.insertId
                    })
                }
            }
        )
    }
};

userModel.updateUser = (userData, callback)=>{
    if(connection){
        const sql=`
        UPDATE noticia SET 
        not_author = ${connection.escape(userData.not_author)}, 
        not_title = ${connection.escape(userData.not_title)}, 
        not_description = ${connection.escape(userData.not_description)} 
        WHERE not_id = ${connection.escape(userData.not_id)}`;
        
        connection.query(sql, function(err, result){
            if(err){
                throw err;
            }else{
                callback(null,{
                    "msg": "success"
                });
            }
        });
    }
};

userModel.deleteUser = (not_id, callback)=>{
    if(connection){
        const sql=`
        SELECT * FROM noticia WHERE not_id = ${connection.escape(not_id)}`;
        connection.query(sql, (err,row)=>{
            if(row){
                let sql = `DELETE FROM noticia WHERE not_id = ${not_id}`;
                connection.query(sql, (err, result)=>{
                    if(err){
                        throw err;
                    }else{
                        callback(null,{
                            msg:'deleted'
                        })
                    }
                })
            }else{
                callback(null,{
                    msg:'not exists'
                })
            }
        });
    }
};

module.exports=userModel;