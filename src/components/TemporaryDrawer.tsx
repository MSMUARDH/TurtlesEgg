import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCard from "./ShoppingCartCard";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const { cartItems } = useShoppingCart();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ maxWidth: 450 }} role="presentation">
      <h2 style={{ margin: "10px" }}>Cart Items</h2>
      <List>
        {cartItems.map((item, index) => (
          <ListItem key={index}>
            <ShoppingCartCard id={item.id} quantity={item.quantity} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleDrawer(true)}
      >
        <ShoppingCartIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            fontWeight: "bold",
            fontSize: 20,
            marginRight: "20px",
          }}
        >
          {" "}
          Total :{" "}
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = storeItems.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </Box>
      </Drawer>
    </div>
  );
}
