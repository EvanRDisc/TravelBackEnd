const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = 'American';

 router.post('/event', (req, res, next) => {
  db.query(
    'INSERT INTO events (owner, name, description, date) VALUES (?,?,?,?)',
    [owner, req.body.name, req.body.description, new Date(req.body.date)],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.put('/event/:id', function (req, res, next) {
  db.query(
    'UPDATE events SET name=?, description=?, date=? WHERE id=? AND owner=?',
    [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.get('/searchRestCity', function (req, res, next) {
  db.query(
    "SELECT place_name FROM place WHERE address LIKE '%" + req.query.address  + "%' and place_id IN ( SELECT place_id FROM Restaurant WHERE cus_id in ( SELECT cus_id FROM Cuisine WHERE cus_name = ?));",
	[req.query.cus],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/searchTouristCity', function (req, res, next) {
  db.query(
    "SELECT place_name FROM place WHERE address LIKE '%" + req.query.address  + "%' and place_id IN ( SELECT place_id FROM TouristSpot WHERE cat_id in ( SELECT cat_id FROM Category WHERE cat_name = ?));",
	[req.query.cat],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});



router.get('/searchFav', function (req, res, next) {
  db.query(
    "SELECT place_name FROM place WHERE place_id in (SELECT place_id FROM Favourite WHERE user_id IN (SELECT user_id FROM User WHERE user_fname = ?));",
	[req.query.fname],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/searchWant', function (req, res, next) {
  db.query(
    "SELECT place_name FROM place WHERE place_id in (SELECT place_id FROM WantsToGo WHERE user_id IN (SELECT user_id FROM User WHERE user_fname = ?));",
	[req.query.fname],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/searchVisit', function (req, res, next) {
  db.query(
    "SELECT place_name FROM place WHERE place_id in (SELECT place_id FROM Visited WHERE user_id IN (SELECT user_id FROM User WHERE user_fname = ?));",
	[req.query.fname],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/searchStar', function (req, res, next) {
  db.query(
    "SELECT place_name FROM place WHERE place_id in (SELECT place_id FROM Starred WHERE user_id IN (SELECT user_id FROM User WHERE user_fname = ?));",
	[req.query.fname],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/insertReview', (req, res, next) => {
  var isTrueSet = (req.query.recommended == req.query.recommended);

  db.query(
    'INSERT INTO Review VALUES(?, ?, ?, ?);',
    [req.query.place, req.query.user, req.query.rating, isTrueSet],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.post('/insertFav', (req, res, next) => {
  db.query(
    'INSERT INTO Favourite VALUES(?, ?);',
    [req.query.place, req.query.user],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});
router.post('/insertWant', (req, res, next) => {
  db.query(
    'INSERT INTO WantsToGo VALUES(?, ?);',
    [req.query.place, req.query.user],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});


router.post('/insertStar', (req, res, next) => {
  db.query(
    'INSERT INTO Starred VALUES(?, ?);',
    [req.query.place, req.query.user],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});


router.post('/insertVisit', (req, res, next) => {
  db.query(
     'INSERT INTO Visited VALUES(?, ?, ?);',
    [req.query.place, req.query.user, req.query.date],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.post('/insertUser', (req, res, next) => {
  db.query(
    'INSERT INTO User VALUES(?, ?, ?, ?, ?, ?);',
    [req.query.id, req.query.fname, req.query.lname, req.query.email, req.query.gender, req.query.dob],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

  return router;
}

module.exports = createRouter;