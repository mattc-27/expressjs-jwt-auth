const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Register
const createUser = async (req, res) => {
    try {
        const { username } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *',
            [username, hash]
        );
        res.status(200).send({ message: 'Login created successfully!' });
        console.log(newUser.rows[0])
    } catch (err) {
        return res.status(500).json(err);
    }
};


// Login 
const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const findUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (findUser.rows.length > 0) {
            const hashedPassword = findUser.rows[0].password;

            bcrypt.compare(password, hashedPassword, function (err, isValid) {

                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal server error' });

                } else if (isValid) {

                    const token = jwt.sign({ username }, `${process.env.JWT_SECRET}`)

                    return res.cookie('auth_token', token, {
                        httpOnly: true,
                        maxAge: 36000000,
                        path: '/',
                    }).status(200).json(
                        { isValid: true, token, username, message: 'Logged in successfully!' }
                    )


                } else {
                    res.status(200).json({ isValid: false });
                }

            })
        } else {
            res.status(200).json({ isValid: false });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

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



const verifyUser = async (req, res) => {
    try {
      const { username } = req.params;
      return res.json({ user: req.user, isValid: true });
    } catch (error) {
      console.error(error.message);
      res.sendStatus(500);
    }
  };

  const userLogout = async (req, res) => {
    res.clearCookie('auth_token', {
        httpOnly: true,
        path: '/'
    });
    return res.status(200).send({ message: 'Logout success' });
  }


module.exports = {
    createUser,
    userLogin,
    userAuth,
    verifyUser,
    userLogout
}