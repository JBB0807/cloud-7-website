// Set strict mode
"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");

const combineHTML = (req, res, next) => {
    const header = fs.readFileSync(
      path.join(__dirname, "..", "partials", "header.html"),
      "utf8"
    );
    const footer = fs.readFileSync(
      path.join(__dirname, "..", "partials", "footer.html"),
      "utf8"
    );
  
    res.locals.header = header;
    res.locals.footer = footer;
    next();
  };

  module.exports = combineHTML;
