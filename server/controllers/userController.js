const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// 
const userAuth = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, `${process.env.JWT_SECRET}`);
        //console.log(data);
        req.user = data;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};

// get user 
const fetchUser = async (req, res) => {
    try {
        const { username } = req.params;
        const results = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (results.rows.length > 0) {

            res.json({
                user: req.user,
                isValid: true,
                currentUser: {
                    id: results.rows[0].id,
                    username: results.rows[0].username,
                },
            });
        }
        if (!user) {
            // User not found
            return res.status(404).send({ message: 'User not found.' });
        }
    } catch (err) {
        console.error(err.message)
    }
};


module.exports = {
    userAuth,
    fetchUser
}