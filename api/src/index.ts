import express from "express";
import productsRoutes from "./routes/products";

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/products", productsRoutes);

app.listen(PORT, () => {
	console.log("Listening to PORT - ", PORT);
});
