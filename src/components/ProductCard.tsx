import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

type ProductProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const ProductCard = ({ id, name, price, imgUrl }: ProductProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/product/${id}`}>
          <CardMedia sx={{ height: 160, cursor: "pointer" }} image={imgUrl} />
        </Link>

        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="text.secondary"
          >
            {formatCurrency(price)}
          </Typography>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "center" }}>
          {quantity === 0 ? (
            <Button
              variant="contained"
              size="medium"
              onClick={() => increaseCartQuantity(id)}
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
                  onClick={() => decreaseCartQuantity(id)}
                >
                  -
                </Button>
                <div style={{ margin: "7px", fontSize: 20 }}>
                  <span>{quantity}</span> in cart
                </div>
                <Button
                  variant="contained"
                  onClick={() => increaseCartQuantity(id)}
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
                  onClick={() => removeFromCart(id)}
                  variant="contained"
                  color="error"
                  size="small"
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
