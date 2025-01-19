require("dotenv").config({ path: __dirname + "/.env" });

const cors = require('cors');
const express = require('express');
const pool = require(__dirname + "/config/db.config.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;


const getPromos = (req, res) => {
    pool.query('SELECT * FROM promos', (error, promos) => {
        if (error) {
            throw error
        }
        res.status(200).json(promos.rows)
    })
}

const addPromo = async (req, res) => {
    try {
        console.log("Got a new promo!");
        console.log(req.body.category);
        const newTodo = await pool.query(`INSERT INTO public.promos (descrip, code, promo_category, starting_date) VALUES ('${req.body.description}', '${req.body.promoCode}', '${req.body.category}', '${req.body.date}')`);
        res.json(newTodo.rows[0]);
    } catch(error) {
        console.log(error.message);
    }

}

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get('/promos', getPromos);

app.post('/add', addPromo);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});