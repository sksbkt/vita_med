"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

const products = [
  {
    imgUrl:
      "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
    productName: "Organic Dark Roast Coffee",
    rating: 4,
    description:
      "Indulge in the rich, full-bodied taste of our Organic Dark Roast Coffee. Sourced from small, sustainable farms, these beans are carefully selected to deliver a bold and earthy flavor profile with subtle notes of chocolate and caramel. Perfect for coffee enthusiasts who love a deep, smooth cup to start their day or accompany their favorite dessert. Each 12 oz bag is crafted to be environmentally friendly and delivered fresh to preserve its aroma and taste. Enjoy this guilt-free coffee experience with every sip!",
    favorite: true,
  },
];

function Products() {
  return (
    <Container
      sx={{
        pb: "50px",
      }}
    >
      <Grid
        container
        justifyContent="flex-start" // Aligns items to the left
        spacing={2} // Spacing between grid items
        sx={{ p: "10px" }}
      >
        {[
          0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
          1, 2,
        ].map((value) => (
          <Grid
            key={value}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            {/* <Paper
              sx={(theme) => ({
                boxShadow:
                  "0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 5px rgba(0, 0, 0, 0.06),  0 5.3px 5.9px rgba(0, 0, 0, 0.072),  0 5.8px 13.4px rgba(0, 0, 0, 0.086),  0 5px 5px rgba(0, 0, 0, 0.12)",
                aspectRatio: 12 / 16,
                ...theme.applyStyles("dark", {
                  backgroundColor: "#1A2027",
                }),
              })}
            /> */}
            {products.map((product, index) => (
              <ProductCard
                key={index}
                productName={product.productName}
                imageUrl={product.imgUrl}
                description={product.description}
                rating={product.rating}
                favorite={product.favorite}
                favoriteChanged={(status) => {
                  // * in production it will replaced with patch call toward the backend
                  product.favorite = status;
                  console.log(status, product.favorite);
                }}
              />
            ))}
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Pagination
          onChange={(e, page) => {
            console.log(page);
          }}
          count={10}
          shape="rounded"
          sx={(theme) => ({
            display: "flex",
            justifyContent: "center",
            bottom: 0,
            boxShadow: "0 4px 6px rgba(0, 0, 0, .3)",
            backgroundColor: theme.palette.primary.contrastText,
            borderRadius: "10px",
            maxWidth: "50%",
            py: 1,
            [theme.breakpoints.down("md")]: {
              position: "fixed",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: theme.palette.primary.contrastText,
              bottom: "10px",
              maxWidth: "80%",
              width: "80%",
            },
          })}
        />
      </Box>
    </Container>
  );
}
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { on } from "events";
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
  useEffect(() => {
    favoriteChanged(localFavorite);
  }, [localFavorite]);
  return (
    <Card
      sx={(theme) => ({
        boxShadow:
          "0 2.8px 2.2px rgba(0, 0, 0, 0.034),  0 6.7px 5.3px rgba(0, 0, 0, 0.048),  0 12.5px 5px rgba(0, 0, 0, 0.06),  0 5.3px 5.9px rgba(0, 0, 0, 0.072),  0 5.8px 13.4px rgba(0, 0, 0, 0.086),  0 5px 5px rgba(0, 0, 0, 0.12)",
        aspectRatio: 11 / 16,
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
        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            p: 2,
          }}
          onClick={() => {
            setLocalFavorite((prev) => !prev);
          }}
        >
          {localFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      <CardContent
        sx={{
          p: 2,
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
            fontSize: "clamp(18px, 3vw, 10px)",
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
            component={"div"}
            sx={{ fontSize: "clamp(18pt, 2vw, 212pt)" }}
          >
            199.99$
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "10px", fontSize: "clamp(15px,2vw,14px)" }}
          >
            Buy
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
