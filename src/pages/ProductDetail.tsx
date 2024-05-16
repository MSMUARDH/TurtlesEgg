import { useParams } from "react-router-dom";

import StoredItems from "../data/items.json";
import StandardImageList from "../components/StandardImageList";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect, useState } from "react";
import { formatCurrency } from "../utilities/formatCurrency";

const ProductDetail = () => {
  const theme = useTheme();
  const { idParam } = useParams();

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    const quantity = getItemQuantity(parseInt(idParam));
    console.log("patram", idParam);
    setQuantity(quantity);
  }, [
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    getItemQuantity,
  ]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const item = StoredItems.find((i) => i.id == parseInt(idParam));

  if (item == null) return null;

  return (
    <div>
      <h1>Product details of - {item?.name} </h1>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={isSmallScreen ? 12 : 6}>
          <StandardImageList images={item?.images} />
        </Grid>
        <Grid item xs={12} sm={isSmallScreen ? 12 : 6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Description</h2>
            <p style={{ margin: "5px" }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Dignissimos, corporis similique. Voluptatum quia ipsa nesciunt
              autem, corporis, illo eligendi minus eum a non voluptates. Dolor
              vitae quam aperiam mollitia itaque. dfdf fsdf sdf sdfsdfsdfsdf
              sdfsd fsdf
            </p>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Price : {formatCurrency(item.price)}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              Total : {formatCurrency(item.price * quantity)}
            </Box>

            <div>
              {quantity === 0 ? (
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => increaseCartQuantity(item.id)}
                >
                  + Add to Cart
                </Button>
              ) : (
                <div>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => decreaseCartQuantity(item.id)}
                    >
                      -
                    </Button>
                    <div style={{ margin: "7px", fontSize: 20 }}>
                      <span>{quantity}</span> in cart
                    </div>
                    <Button
                      variant="contained"
                      onClick={() => increaseCartQuantity(item.id)}
                    >
                      +
                    </Button>
                  </Box>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
