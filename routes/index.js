var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/search_shoes', function(req, res, next) { //Connect to the database
    req.pool.getConnection(function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        const search_room = req.body.search;
        var query = "SELECT room.room_id, room.size, room.rating FROM room  WHERE room.size = ?, room.rating = ?;";
       // var query = "SELECT user.user_id, user.last_name,venue.venue_name, check_in.log_in_time FROM check_in INNER JOIN user ON check_in.user_id = user.user_id INNER JOIN venue ON check_in.venue_id = venue.venue_id WHERE check_in.user_id = ?;";
        //var params =  [user_id, last_name , venue_name , log_in_time];
        var params = [search_room];
        // console.log(require);
        connection.query(query,params,function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.send(rows);
            console.log(rows);
        });
    });
});

module.exports = router;
