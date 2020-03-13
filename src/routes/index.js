const { countries, languages } = require("countries-list");

const routes = app => {
  app.get("/", (request, response) => {
    response.status(200).send("HELLO");
  });

  app.get("/country", (request, response) => {
    const code = request.query.code;
    response.json(countries[code]);
  });

  app.get("/languages/:lang", (request, response) => {
    console.log(request.params);
    const lang = languages[request.params.lang];
    if (lang) {
      response.json({ status: "OK", data: lang });
    } else {
      response.status(404).json({
        status: "NOT FOUND",
        data: `Language ${request.params.lang} not found.`
      });
    }
  });
  app.get("/info", (request, response) => {
    info("nodemon");
    response.send("INFO");
  });

  app.get("*", (request, response) => {
    response.status(404).send("Not Found");
  });
};

module.exports = routes;
