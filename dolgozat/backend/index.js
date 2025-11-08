// galeria-backend.js
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

// In-memory image store
let images = [
  { id: 1, url: "https://picsum.photos/id/1/300", rating: 4 },
  { id: 2, url: "https://picsum.photos/id/2/300", rating: 5 }
];

let currentId = images.length + 1;

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Galéria API",
      version: "1.0.0",
      description: "Képgaléria backend dokumentáció Swagger-rel"
    },
    servers: [{ url: "http://localhost:3333" }]
  },
  apis: [__filename]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Lekérdezi az összes képet
 *     responses:
 *       200:
 *         description: Sikeres lekérdezés
 */
app.get("/api/images", (req, res) => {
  res.json(images);
});

/**
 * @swagger
 * /api/image:
 *   post:
 *     summary: Új kép hozzáadása
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: A kép sikeresen hozzáadva
 */
app.post("/api/image", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL kötelező" });
  const newImage = { id: currentId++, url, rating: 0 };
  images.push(newImage);
  res.json(images);
});

/**
 * @swagger
 * /api/rate:
 *   post:
 *     summary: Kép értékelése
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               rating:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Értékelés frissítve
 */
app.post("/api/rate", (req, res) => {
  const { id, rating } = req.body;
  const image = images.find(img => img.id === id);
  if (!image) return res.status(404).json({ error: "Kép nem található" });
  image.rating = rating;
  res.json(images);
});

app.listen(PORT, () => {
  console.log(`Backend fut: http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});
