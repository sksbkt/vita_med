"use client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { blue, orange } from "@mui/material/colors";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
// import FilterComponent from "@/components/products/FilterComponent";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
  styled,
} from "@mui/material";
interface ProductCardProps {
  productName: string;
  imageUrl: string;
  description: string;
  rating: number;
  favorite: boolean;
  favoriteChanged: (status: boolean) => void;
}
const ProductCardComponent = ({
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

  const ProductDescription = styled(Typography)(({ theme }) => ({
    height: "20%",
    overflow: "hidden",
    textOverflow: "clip",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    fontSize: "1rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem", // font size for small screens and above
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem", // font size for medium screens and above
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.8rem", // font size for large screens and above
    },
    mb: 1,
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
        sx={(theme) => ({
          // ? replaced with elevation variable
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

          <IconButton
            sx={{ position: "absolute", bottom: 0, right: 0 }}
            disableRipple
            onClick={() => {
              setLocalFavorite((prev) => !prev);
              // favoriteChanged(!favorite);
            }}
          >
            {localFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
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
          <ProductDescription
            // variant="h6"
            as={"div"}
            // component={"div"}
            // sx={{
            //   height: "20%",
            //   overflow: "hidden",
            //   textOverflow: "clip",
            //   display: "-webkit-box",
            //   WebkitLineClamp: "1",
            //   WebkitBoxOrient: "vertical",
            //   fontSize: "clamp(15px, 3vw, 10px)",
            //   mb: 1,
            // }}
          >
            {productName}
          </ProductDescription>
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
export default ProductCardComponent;
