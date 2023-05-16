const express = require('express');
const dbConnet = require('./config/dbConnect');
const app  = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require('./routes/productRoute');
const blogRouter = require("./routes/blogRoute");
const prodCatergoryRouter = require("./routes/prod_catergoryRoute");
const blogCatergoryRouter = require("./routes/blogCatergotyRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandle');
const morgan = require('morgan');
dbConnet();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/prodcatergory", prodCatergoryRouter);
app.use("/api/blogcatergory", blogCatergoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})

