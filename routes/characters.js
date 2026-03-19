// import le package express
const express = require("express");
const axios = require("axios");

// Création d'un router
const router = express.Router();

const MARVEL_API_KEY = process.env.MARVEL_API_KEY;
const MARVEL_BASE_URL = process.env.MARVEL_BASE_URL;

// Une instance d'Axios personnalisée
const marvel = axios.create({
  baseURL: MARVEL_BASE_URL,
  timeout: 10000,
});

/*
Une route qui permet de récuperer la liste de personages (characters)
  GET /characters?name=spider&page=1&limit=100
*/
router.get("/characters", async (req, res) => {
  try {
    // const { name = "" } = req.query;
    // const { page, limit, skip } = getPageConfig(
    //   req.query.page,
    //   req.query.limit,
    // );

    const response = await marvel.get("/characters", {
      params: {
        apiKey: MARVEL_API_KEY,
        // name,
        // limit,
        // skip,
      },
    });

    const data = response.data;

    return res.status(200).json({
      count: data.count,
      results: data.results,
      //   pagination: buildPagination(data.count, page, limit),
    });
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      message: "Impossible de récupérer les personnages",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
