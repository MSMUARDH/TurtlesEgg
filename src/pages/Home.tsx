import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Products from "../data/items.json";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Grid container spacing={2}>
        {Products.map((product) => (
          <Grid key={product.id} item xs={12} md={4}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
