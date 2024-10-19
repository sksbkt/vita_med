"use client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { blue, orange } from "@mui/material/colors";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import LazyLoad from "react-lazy-load";
interface ProductCardProps {
  id: string;
  productName: string;
  imgUrl: string;
  description: string;
  rating: number;
  favorite: boolean;
  price: number;
  favoriteChanged: (status: boolean) => void;
}
const ProductCardComponent = ({
  id,
  productName,
  imgUrl,
  description,
  rating,
  favorite,
  price,
  favoriteChanged,
}: ProductCardProps) => {
  const { push } = useRouter();
  const [localFavorite, setLocalFavorite] = useState(favorite);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const BuyButton = styled(Button)(({ theme }) => ({
    borderRadius: "10px",
    fontSize: "clamp(15px,2vw,14px)",
    // bgcolor: orange[500],
    backgroundColor: theme.palette.mode === "dark" ? orange[300] : blue[700],
    textTransform: "none",
  }));

  const ProductNameComponent = styled(Typography)(({ theme }) => ({
    height: "20%",
    overflow: "hidden",
    textOverflow: "clip",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    fontWeight: 600,
    fontSize: "clamp(12pt, calc(12pt + 0.5vw), 33pt)", // font size for medium screens and above

    [theme.breakpoints.only("xs")]: {
      fontSize: "30pt", // font size for small screens and above
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "clamp(12pt, calc(16pt + 0.5vw), 24pt)", // font size for small screens and above
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "clamp(12pt, calc(16pt + 0.5vw), 24pt)", // font size for small screens and above
    },
    // [theme.breakpoints.up("md")]: {
    //   fontSize: "clamp(12pt, calc(12pt + 0.5vw), 33pt)", // font size for medium screens and above
    // },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.5rem", // font size for large screens and above
    },
    mb: 1,
  }));

  const handleClick = () => {
    push(`products/${id}`);
  };

  const handleFavoriteClick = () => {
    setLocalFavorite((prev) => !prev);
    favoriteChanged(!favorite);
  };

  const lazyLoadStyles = {
    opacity: 0,
    transition: "opacity 2s ease-in-out",
    "& img": {
      objectFit: "cover", // Or use any other image fit property
    },
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
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
          <LazyLoad height={"100%"}>
            <CardMedia
              component={"img"}
              image={imgUrl}
              sx={(theme) => ({
                height: "100%",
                aspectRatio: 1 / 1,
                // ...lazyLoadStyles,
              })}
              onClick={() => {
                console.log("CLICK");
              }}
            />
          </LazyLoad>

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
          <Box
            sx={{
              display: "flex",
              height: "20%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Rating
              name="read-only"
              value={rating}
              readOnly
              size={isMobile ? "small" : "medium"}
            />
          </Box>
          <ProductNameComponent as={"div"}>{productName}</ProductNameComponent>
          <Box
            sx={{
              height: "40%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Typography
              // variant="body2"
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
                // maxHeight: "calc(2 * 1rem + 1rem)",
                wordBreak: "break-word",
                fontSize: "clamp(3pt, calc(5pt + 1vw), 13pt) !important",
                // variant: "h6",
                // ? by doing as a workaround :D this we are making the last line not stretch to the whole width of the div

                "&:last-child": {
                  textAlign: "left",
                  textIndent: "0",
                },
                [theme.breakpoints.up("xs")]: {
                  fontSize: "1.2rem",
                  WebkitLineClamp: 5,
                  lineClamp: 5,
                },
                [theme.breakpoints.up("sm")]: {
                  fontSize: "1.2rem", // font size for small screens and above
                  WebkitLineClamp: 3,
                  lineClamp: 3,
                },
                [theme.breakpoints.up("md")]: {
                  lineHeight: "1.2rem",
                  WebkitLineClamp: 2,
                  lineClamp: 2,
                },
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
              {price}$
            </Typography>
            <BuyButton variant="contained">Buy</BuyButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default ProductCardComponent;
