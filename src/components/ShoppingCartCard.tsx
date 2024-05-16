import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useShoppingCart } from "../context/ShoppingCartContext";

import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type CartItemProps = {
  id: number;
  quantity: number;
};

// { id, quantity }: CartItemProps

export default function ShoppingCartCard({ id, quantity }) {
  const theme = useTheme();

  const { removeFromCart } = useShoppingCart();

  const item = storeItems.find((i) => i.id == id);

  if (item == null) return null;

  return (
    <Card sx={{ display: "flex", height: 150 }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: 250 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {item.name}{" "}
            {quantity > 1 && (
              <span style={{ color: "gray" }}>x {quantity}</span>
            )}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {formatCurrency(item.price)}
          </Typography>
        </CardContent>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            {formatCurrency(item.price * quantity)}
          </Box>
          <Button
            onClick={() => removeFromCart(item.id)}
            size="small"
            sx={{ margin: "3px", width: "2px" }}
            variant="contained"
            color="error"
          >
            <DeleteForeverIcon />
          </Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        // sx={{ maxWidth: "100%", height: "auto" }}
        sx={{ objectFit: "cover" }}
        image={`./${item.imgUrl}`}
      />
    </Card>
  );
}
