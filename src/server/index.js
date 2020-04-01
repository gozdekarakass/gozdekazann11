import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import routes from "../shared/routes";
import App from "../shared/App";
import sourceMapSupport from "source-map-support";

if (process.env.NODE_ENV === "development") {
  sourceMapSupport.install();
}

const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route));

  const requestInitialData =
    activeRoute.component.requestInitialData && activeRoute.component.requestInitialData();

  Promise.resolve(requestInitialData)
    .then(initialData => {
      const context = { initialData };
;

      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );


      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>n11.com - Alışverişin Uğurlu Adresi</title>
          <meta name="description" content="Cep telefonu, TV, bilgisayar, saat, moda, bisiklet, tatil, kitap ve dahası en uygun fiyatları ile online alışveriş sitesi ve alışverişin uğurlu adresi n11.com'da!"/>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

          <link rel="shortcut icon" href="https://n11scdn.akamaized.net/static/favicon.ico" />
          <link rel="stylesheet" href="/resources/css/main.css">
          <script src="/resources/js/bundle.js" defer></script>
 
        </head>

        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
      `);
    })
    .catch(next);
});

if(!module.parent){
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server is listening");
  });
}