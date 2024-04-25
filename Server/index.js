//imports
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//open db
const db = new sqlite3.Database("showcase.db");

//handle sqlite3 errors
function handleSQLError(err, res) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while processing your request." });
}

//execute sql command
function executeSQL(sql, params, res, successMessage) {
    db.all(sql, params, (err, result) => {
    if (err) {
        handleSQLError(err, res);
    } else {
        res.send(result);
    }
    });
}

//get all projects using semester
app.get("/searchProj", (req, res) => {
    const { table } = req.query;
    const sql = `SELECT * FROM ${table}Projects`;

    executeSQL(sql, [], res, "Projects fetched successfully");
});

//get all users
app.get("/searchUser", (req, res) => {
    const sql = `SELECT * FROM Users`;
    executeSQL(sql, [], res, "Users fetched successfully");
});

//get all comments using semester
app.get("/searchComm", (req, res) => {
    const { table } = req.query;
    const sql = `SELECT * FROM ${table}Comments`;

    executeSQL(sql, [], res, "Comments fetched successfully");
});

//get all ratings using semester
app.get("/searchRate", (req, res) => {
    const { table } = req.query;
    const sql = `SELECT * FROM ${table}Ratings`;

    executeSQL(sql, [], res, "Ratings fetched successfully");
});

//get all semesters
app.get("/searchSemester", (req, res) => {
    const sql = `SELECT * FROM Semesters`;
    executeSQL(sql, [], res, "Ratings fetched successfully");
});

//get all peer reviews
app.get("/searchReview", (req, res) => {
    const sql = `SELECT * FROM PeerReview`;
    executeSQL(sql, [], res, "Ratings fetched successfully");
});

//get all announcements using semester
app.get("/searchAnnounce", (req, res) => {
  const { table } = req.query;
  const sql = `SELECT * FROM ${table}Announcements`;

  executeSQL(sql, [], res, "Announcements fetched successfully");
});

//insert announcement into table
app.post("/insertAnnounce", (req, res) => {
  const { table, title, desc, date, adv } = req.body.params;
  const sql = `INSERT INTO ${table}Announcements(Title, Description, Date, Advisor) VALUES(?,?,?,?)`;

    console.log(table, title, desc, date, adv);

  db.run(sql, [title, desc, date, adv], (err) => {
    if (err) {
      handleSQLError(err, res);
    } else {
      res.status(200).json({ message: "Announcement added successfully" });
    }
  });
});

//delete announcement from table
app.post("/deleteAnnounce", (req, res) => {
  const { table, title, desc } = req.body.params;
  const sql = `DELETE FROM ${table}Announcements WHERE Title=? AND Description=?`;

  db.run(sql, [title, desc], (err) => {
    if (err) {
      handleSQLError(err, res);
    } else {
      res.status(200).json({ message: "Announcement deleted successfully" });
    }
  });
});

//insert new project into db
app.post("/insertProj", (req, res) => {
    const { table, title, advisor, users, content, image, presentation1, presentation2, finalShowcase, team } = req.body.params;

    const sql = `INSERT INTO ${table}Projects(Title,Team,Members,Advisor,Description,Image,Presentation1,Presentation2,FinalShowcase) VALUES (?,?,?,?,?,?,?,?,?)`;

    db.run(sql, [title, team, users, advisor, content, image, presentation1, presentation2, finalShowcase], (err) => {
        if (err) {
            handleSQLError(err, res);
        } else {
            res.status(200).json({ message: "Rating removed successfully" });
        }
    });

});

//update project info
app.post("/updateProj", (req, res) => {
  const { table, title, advisor, content, image, presentation1, presentation2, finalShowcase, team } = req.body.params;
  const sql = `UPDATE ${table}Projects SET Title=?, Advisor=?, Description=?, Image=?, Presentation1=?, Presentation2=?, FinalShowcase=? WHERE Team=?`;

  db.run(sql, [title, advisor, content, image, presentation1, presentation2, finalShowcase, team], (err) => {
    if (err) {
      handleSQLError(err, res);
    } else {
      res.status(200).json({ message: `Project with Team ${team} updated successfully` });
    }
  });
});

//insert comment to table
app.post("/insertComm", (req, res) => {
  const { table, user, comment, team } = req.body.params;
  const sql = `INSERT INTO ${table}Comments(User, Comment, Team) VALUES (?,?,?)`;

  db.run(sql, [user, comment, team], (err) => {
    if (err) {
      handleSQLError(err, res);
    } else {
      res.status(200).json({ message: "Comment added successfully" });
    }
  });
});

//update comment info
app.post("/updateComm", (req, res) => {
  const { table, user, oldComment, newComment, team } = req.body.params;
  const sql = `UPDATE ${table}Comments SET Comment=? WHERE User=? AND Team=? AND Comment=?`;

  db.run(sql, [newComment, user, team, oldComment], (err) => {
    if (err) {
      handleSQLError(err, res);
    } else {
      res.status(200).json({ message: "Comment updated successfully" });
    }
  });
});

//remove comment from table
app.post("/removeComm", (req, res) => {
  const { table, user, comment, team } = req.body.params;
  const sql = `DELETE FROM ${table}Comments WHERE Comment=? AND User=? AND Team=?`;

  db.run(sql, [comment, user, team], (err) => {
    if (err) {
      handleSQLError(err, res);
    } else {
      res.status(200).json({ message: "Comment deleted successfully" });
    }
  });
});

//insert rating to table
app.post("/insertRate", (req, res) => {
  const { table, user, team } = req.body.params;
  const sql = `INSERT INTO ${table}Ratings(User, Team) VALUES(?,?)`;

  db.run(sql, [user, team], (err) => {
    if (err) {
      handleSQLError(err, res);
    } else {
      res.status(200).json({ message: "Rating added successfully" });
    }
  });
});

//delete rating from table
app.post("/deleteRate", (req, res) => {
  const { table, user, team } = req.body.params;
  const sql = `DELETE FROM ${table}Ratings WHERE User=? AND Team=?`;

  db.run(sql, [user, team], (err) => {
    if (err) {
      handleSQLError(err, res);
    } else {
      res.status(200).json({ message: "Rating removed successfully" });
    }
  });
});

//insert peer review into db
app.post("/insertReview", (req, res) => {
    const { reviews } = req.body.params;

    if (!Array.isArray(reviews) || reviews.length === 0) {
        return res.status(400).json({ error: "Invalid reviews data" });
    }


    const sql = `INSERT INTO PeerReview (Team) VALUES (?)`;

    db.run(sql, String(reviews), (err) => {
        if (err) {
            handleSQLError(err, res);
        } else {
            res.status(200).json({ message: "Rating removed successfully" });
        }
    });

});

//update users team
app.post("/updateUser", (req, res) => {
    const { user, team } = req.body.params;
    const sql = `UPDATE Users SET Team=? WHERE User=?`;

    db.run(sql, [team, user], (err) => {
        if (err) {
            handleSQLError(err, res);
        } else {
            res.status(200).json({ message: "Comment updated successfully" });
        }
    });
});



app.post("/archive", (req, res) => {
    const { semester, semesterReadable} = req.body.params;
    const sql = `INSERT INTO Semesters(Semester, SemesterReadable) VALUES(?,?)`;

    db.run(sql, [semester, semesterReadable], (err) => {
        if (err) {
            handleSQLError(err, res);
        } else {
        }
    });

    const sql1 = `CREATE TABLE IF NOT EXISTS ${semester}Projects(
                Title TEXT,
                Team TEXT,
                Members TEXT,
                Advisor TEXT,
                Description TEXT,
                Image TEXT,
                Presentation1 TEXT,
                Presentation2 TEXT,
                FinalShowcase TEXT
            );`


    db.run(sql1, [], (err) => {
        if (err) {
            handleSQLError(err, res);
        } else {
        }
    });

    const sql2 = `CREATE TABLE IF NOT EXISTS ${semester}Comments (
                User TEXT,
                Comment TEXT,
                Team TEXT
            );`

    db.run(sql2, [], (err) => {
        if (err) {
            handleSQLError(err, res);
        } else {
        }
    });

    const sql3 = `CREATE TABLE IF NOT EXISTS ${semester}Announcements (
                Title TEXT,
                Description TEXT,
                Date TEXT,
                Advisor TEXT
            );`

    db.run(sql3, [], (err) => {
        if (err) {
            handleSQLError(err, res);
        }
    });

    const sql4 = `CREATE TABLE IF NOT EXISTS ${semester}Ratings (
                User TEXT,
                Team TEXT
            );`

    db.run(sql4, [], (err) => {
        if (err) {
            handleSQLError(err, res);
        } else {
            res.status(200).json({ message: "Archived successfully" });
        }
    });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
