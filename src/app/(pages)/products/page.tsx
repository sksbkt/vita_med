"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Container,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Paper,
  Rating,
  Stack,
  Typography,
  styled,
} from "@mui/material";

const product = {
  imgUrl:
    "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
  productName: "Organic Dark Roast Coffee",
  rating: 4,
  description:
    "Indulge in the rich, full-bodied taste of our Organic Dark Roast Coffee. Sourced from small, sustainable farms, these beans are carefully selected to deliver a bold and earthy flavor profile with subtle notes of chocolate and caramel. Perfect for coffee enthusiasts who love a deep, smooth cup to start their day or accompany their favorite dessert. Each 12 oz bag is crafted to be environmentally friendly and delivered fresh to preserve its aroma and taste. Enjoy this guilt-free coffee experience with every sip!",
  favorite: true,
};

function Products() {
  const Paginator = styled(Pagination)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    bottom: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, .3)",
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: "10px",
    maxWidth: "50%",
    padding: "10px 0",
    [theme.breakpoints.down("md")]: {
      position: "fixed",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: theme.palette.primary.contrastText,
      bottom: "10px",
      maxWidth: "80%",
      width: "80%",
    },
  }));

  return (
    <Container
      sx={{
        pb: "50px",
      }}
    >
      <Grid
        container
        sx={{ display: "flex" }}
        gap={2}
      >
        <Grid
          container
          justifyContent="flex-start" // Aligns items to the left
          spacing={2} // Spacing between grid items
          // sx={{ p: "10px" }}
          md={9}
        >
          {[
            0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            1, 2,
          ].map((value) => (
            <ProductCard
              key={value}
              productName={product.productName}
              imageUrl={product.imgUrl}
              description={product.description}
              rating={product.rating}
              favorite={product.favorite}
              favoriteChanged={(status) => {
                // * in production it will replaced with a patch call toward the api
                product.favorite = status;
                console.log(status, product.favorite);
              }}
            />
          ))}
        </Grid>
        <Grid
          container
          md={3}
          // sx={{ backgroundColor: "blue" }}
        >
          <Filter />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Paginator
          onChange={(e, page) => {
            console.log(page);
          }}
          count={10}
          shape="rounded"
        />
      </Box>
    </Container>
  );
}
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { blue, orange } from "@mui/material/colors";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
export default Products;
interface ProductCardProps {
  productName: string;
  imageUrl: string;
  description: string;
  rating: number;
  favorite: boolean;
  favoriteChanged: (status: boolean) => void;
}
const ProductCard = ({
  productName,
  imageUrl,
  description,
  rating,
  favorite,
  favoriteChanged,
}: ProductCardProps) => {
  const [localFavorite, setLocalFavorite] = useState(favorite);

  const BuyButton = styled(Button)(({ theme }) => ({
    borderRadius: "10px",
    fontSize: "clamp(15px,2vw,14px)",
    // bgcolor: orange[500],
    backgroundColor: theme.palette.mode === "dark" ? orange[300] : blue[700],
    textTransform: "none",
  }));

  useEffect(() => {
    favoriteChanged(localFavorite);
  }, [localFavorite]);
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
    >
      <Card
        elevation={5}
        // variant="outlined"
        sx={(theme) => ({
          // ? replaced with elevation variable
          // boxShadow:
          //   "0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 5px rgba(0, 0, 0, 0.06),  0 5.3px 5.9px rgba(0, 0, 0, 0.072),  0 5.8px 13.4px rgba(0, 0, 0, 0.086),  0 5px 5px rgba(0, 0, 0, 0.12)",
          aspectRatio: 9 / 16,
          ...theme.applyStyles("dark", {
            backgroundColor: "#1A2027",
          }),
          borderRadius: "20px",
        })}
      >
        <Box sx={{ position: "relative", height: "60%" }}>
          <CardMedia
            component={"img"}
            image={imageUrl}
            sx={(theme) => ({
              height: "100%",
              aspectRatio: 1 / 1,
            })}
          />
          <FavoriteBtn
            favorite={favorite}
            favoriteChanged={(status) => {
              favoriteChanged(status);
            }}
          />
        </Box>
        <CardContent
          sx={{
            p: 1,
            height: "40%",
          }}
        >
          <Box sx={{ height: "20%" }}>
            <Rating
              name="read-only"
              value={rating}
              readOnly
              // size={"medium"}
            />
          </Box>
          <Typography
            variant="h6"
            component={"div"}
            sx={{
              height: "20%",
              overflow: "hidden",
              textOverflow: "clip",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              fontSize: "clamp(15px, 3vw, 10px)",
              mb: 1,
            }}
          >
            {productName}
          </Typography>
          <Box
            sx={{
              height: "40%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Typography
              variant="body2"
              component={"div"}
              sx={(theme) => ({
                textAlign: "justify",
                textJustify: "inter-ideographic",
                overflow: "hidden",
                textOverflow: "ellipsis",
                // ? max number of lines
                WebkitLineClamp: 2,
                lineClamp: 2,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                maxHeight: "calc(2 * 1rem + 1rem)",
                wordBreak: "break-word",
                fontSize: "clamp(12px, 2vw, 12px)",
                // ? by doing as a workaround :D this we are making the last line not stretch to the whole width of the div
                "&:last-child": {
                  textAlign: "left",
                  textIndent: "0",
                },

                // [theme.breakpoints.down("md")]: {
                //   WebkitLineClamp: 1,
                //   lineClamp: 1,
                // },
                // [theme.breakpoints.down("sm")]: {
                //   WebkitLineClamp: 3,
                //   lineClamp: 3,
                // },
              })}
            >
              {description}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "20%",
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              component={"div"}
            >
              200$
            </Typography>
            <BuyButton variant="contained">Buy</BuyButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Filter = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card sx={{ width: "100%", borderRadius: "20px", p: 3 }}>
      <ListItemButton
        onClick={() => setOpen((prev) => !prev)}
        disableRipple
      >
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="Filter by" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List
          component="div"
          disablePadding
        >
          <ListItemButton
            sx={{ pl: 4 }}
            disableRipple
          >
            <ListItemIcon>
              {/* <StarBorder /> */}
              <FavoriteBtn favoriteChanged={() => console.log("filtered")} />
            </ListItemIcon>
            <ListItemText primary="Favorite" />
          </ListItemButton>
        </List>
      </Collapse>
    </Card>
  );
};

const FavoriteBtn = ({
  favorite = false,
  favoriteChanged,
}: {
  favorite?: boolean;
  favoriteChanged: (status: boolean) => void;
}) => {
  const [localFavorite, setLocalFavorite] = useState(favorite);
  useEffect(() => {
    favoriteChanged(localFavorite);
  }, [localFavorite]);
  return (
    <IconButton
      sx={{
        position: "absolute",
        bottom: 0,
        right: 0,
        p: 2,
      }}
      onClick={() => {
        setLocalFavorite((prev) => !prev);
        // favoriteChanged(!favorite);
      }}
    >
      {localFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};
