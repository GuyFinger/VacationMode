require('dotenv').config({ path: __dirname + "/.env" })
const router = require('express').Router()
const e = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'project3'
});

const Query = (q, ...values) => {
    return new Promise((resolve, reject) => {
        con.query(q, values, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}



router.post('/signup', async (req, res) => {

    try {

        const hPassword = await bcrypt.hash(req.body.password, 10)
        const user = { auth: req.body.admin, firstName: req.body.firstName, lastName: req.body.lastName, userName: req.body.userName, password: hPassword }
        const q = `INSERT INTO users (userName,auth,password,firstName,lastName) VALUES (?,?,?,?,?) `
        await Query(q, user.userName, user.auth, user.password, user.firstName, user.lastName)
        const qq = `SELECT * FROM users`
        const users = await Query(qq)
        console.log(users);
        res.json(users)
    } catch (error) {
        console.log(error + "yup that's an error  ");
        res.sendStatus(500)
    }
})

router.post('/login', async (req, res) => {

    const q = `SELECT * FROM users WHERE userName = "${req.body.userName}"`
    const users = await Query(q)

    try {
        if (await bcrypt.compare(req.body.password, users[0].password)) {
            const accessToken = jwt.sign(users[0].userName, process.env.ACCESS_TOKEN_SECRET)
            console.log(accessToken)
            res.json({ userType: users[0].auth ? 'admin' : 'user', token: accessToken, userID: users[0].ID })
        } else {
            res.sendStatus(400)
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(`user not found`)
    }
})

router.get('/users', async (req, res) => {
    try {
        const q = `SELECT * FROM users`
        const users = await Query(q)
        res.json(users)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }

})
router.get('/userVacations', async (req, res) => {
    try {
        const q = `
                SELECT vacations.vacationName,
                COUNT(vacationID)  AS follows
                FROM uservacations, vacations
                where vacations.id = uservacations.vacationID
                GROUP BY vacationID
                HAVING COUNT(vacationID) >= 1`
        const userVacations = await Query(q)
        res.json(userVacations)
    } catch (err) {
        console.log(err);
        res.sendStatus
    }
})

router.post('/userVacations', async (req, res) => {
    try {
        const { userID, vacationID } = req.body
        const q = 'INSERT INTO uservacations (userID, vacationID) VALUES (?,?)';

        await Query(q, userID, vacationID)
        const qq = 'SELECT * FROM uservacations'
        const uservacations = await Query(qq)
        res.json(uservacations)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.delete('/userVacations', async (req, res) => {
    const sql = `DELETE FROM uservacations WHERE userID ="${req.body.userID}" AND vacationID = "${req.body.vacationID}"`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        res.sendStatus(200)
    })
})

router.get('/vacations', async (req, res) => {
    try {
        // TODO - use real userID
        const q = `SELECT *,  (SELECT count(*) FROM userVacations WHERE vacationID = vacations.ID  AND userID = ${req.headers.userid}) AS follow FROM vacations ORDER BY follow DESC, vacationName ASC`
        const vacations = await Query(q)
        res.json(vacations)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);

    }
})

router.post('/vacations', async (req, res) => {
    try {
        const { name, desc, dest, start, end, img, price } = req.body
        const q = 'INSERT INTO vacations (vacationName,description,image,start,end,price,destination) VALUES (?,?,?,?,?,?,?)'
        await Query(q, name, desc, img, start, end, price, dest)
        // TODO - use real userID  // TODO - use real userID
        const qq = `SELECT *,  (SELECT count(*) FROM userVacations WHERE vacationID = vacations.ID  AND userID = ${req.headers.userid}) AS follow FROM vacations ORDER BY follow DESC, vacationName ASC`
        const vacations = await Query(qq)
        res.json(vacations)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.put('/vacations/:id', async (req, res) => {
    const q = `UPDATE vacations SET 
        vacationName = "${req.body.name}",
        description = "${req.body.desc}",
        image= "${req.body.img}", 
        price= ${req.body.price},
        start = "${req.body.start}",  
        end = "${req.body.end}"
        WHERE ID = ${req.params.id}`

    await Query(q);
    if (req.body.follow) {
        const insertUserVacations = 'INSERT INTO userVacations (userID, vacationID) VALUES (?, ?) ON DUPLICATE KEY UPDATE userID = userID'
        // TODO - use real userID
        await Query(insertUserVacations, req.headers.userid, req.params.id);
    } else {
        // TODO - use real userID
        const deleteUserVacations = `DELETE FROM userVacations WHERE vacationID = ${req.params.id} AND userID = ${req.headers.userid}`
        // TODO - use real userID
        await Query(deleteUserVacations);
    }

    // TODO - use real userID
    const qq = `SELECT *,  (SELECT count(*) FROM userVacations WHERE vacationID = vacations.ID  AND userID = ${req.headers.userid}) AS follow FROM vacations ORDER BY follow DESC, vacationName ASC`
    const vacations = await Query(qq)
    res.json(vacations)

})

router.delete('/vacations/:id', async (req, res) => {
    const d = `DELETE FROM uservacations WHERE vacationID = ${req.params.id}`
    await Query(d)
    const q = `DELETE FROM vacations WHERE ID = ${req.params.id}`;
    await Query(q)
    // TODO - use real userID
    const qq = `SELECT *,  (SELECT count(*) FROM userVacations WHERE vacationID = vacations.ID AND userID = ${req.headers.userid}) AS follow FROM vacations ORDER BY follow DESC, vacationName ASC`
    const vacations = await Query(qq)
    res.json(vacations)
})





module.exports = router;

