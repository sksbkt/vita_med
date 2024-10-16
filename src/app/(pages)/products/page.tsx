"use client";

import {
  Box,
  Container,
  Dialog,
  Grid,
  IconButton,
  Pagination,
  SxProps,
  Theme,
  styled,
  useMediaQuery,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useEffect, useState } from "react";
import FilterComponent from "@/components/products/FilterComponent";
import ProductCardComponent from "@/components/products/ProductCardComponent";
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
  const [showFilter, setShowFilter] = useState(false);
  const screenMd = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  useEffect(() => {
    console.log(screenMd);
    if (!screenMd) {
      setShowFilter(false);
    }
  }, [screenMd]);
  const Paginator = styled(Pagination)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    bottom: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, .3)",
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.primary.contrastText
        : "rgba(0,0,0,0.8)",
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
    "& .MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#333",
    },

    borderRadius: "10px",
    maxWidth: "50%",
    padding: "10px 0",
    [theme.breakpoints.down("md")]: {
      position: "fixed",
      left: "50%",
      transform: "translateX(-50%)",
      bottom: "10px",
      maxWidth: "80%",
      width: "80%",
    },
  }));

  return (
    <Container
      disableGutters
      sx={{
        pb: "50px",
        width: "100%",
      }}
    >
      <Grid
        container
        sx={{ display: "flex" }}
        gap={2}
      >
        <Grid
          container
          md={3}
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          })}
        >
          <FilterComponent
            onAvailableChange={(status) => console.log(status)}
            onRatingChange={(status) => console.log(status)}
          />
        </Grid>
        <Grid
          container
          justifyContent="flex-start" // Aligns items to the left
          spacing={2} // Spacing between grid items
          md={9}
        >
          {[
            0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
            1, 2,
          ].map((value, index) => (
            <ProductCardComponent
              key={index}
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
          page={3}
          shape="rounded"
        />
      </Box>
      <IconButton
        sx={(theme) => ({
          width: "4rem",
          aspectRatio: 1 / 1,
          position: "fixed",
          bottom: "10%",
          right: "10%",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.primary.contrastText
              : "rgba(0,0,0,.8)",
          color: "#fff",
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        })}
        disableRipple
        onClick={() => {
          setShowFilter((prev) => !prev);
        }}
      >
        <FilterListIcon />
      </IconButton>
      <Dialog
        open={showFilter}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShowFilter(false);
        }}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: { backgroundColor: "transparent" },
        }}
      >
        <FilterComponent sx={{ width: "clamp(300px, 5vw + 4rem ,300px)" }} />
      </Dialog>
    </Container>
  );
}
export default Products;
