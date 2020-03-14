const productsRoutes = require("./products-routes.js");
const userRoutes = require("./users-routes.js");


module.exports = app => {
    app.use("/api/v1/users",userRoutes);
    app.use("/api/v1/products",productsRoutes);
};