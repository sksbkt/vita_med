"use client";

import {
  Box,
  Container,
  Dialog,
  Grid,
  IconButton,
  Pagination,
  Theme,
  styled,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useEffect, useState } from "react";
import FilterComponent from "@/components/products/FilterComponent";
import ProductCardComponent from "@/components/products/ProductCardComponent";
import { MOCK_DATA } from "@/helpers/MOCK/mock_products";
import { useRouter, useSearchParams } from "next/navigation";
import { generateQueryParams, parseQueryParams } from "@/helpers/url";

function Products() {
  const screenMd = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const router = useRouter();

  const params = useSearchParams();

  const [showFilter, setShowFilter] = useState(false);
  // const filterParam = { page: params.get("page") };
  const filterParam = parseQueryParams(params.toString());

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
  useEffect(() => {
    console.log(filterParam);
  }, []);
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
          {MOCK_DATA.map((product, index) => (
            <ProductCardComponent
              key={index}
              // productName={product.productName}
              // imageUrl={product.imgUrl}
              // description={product.description}
              // rating={product.rating}
              // favorite={product.favorite}

              {...product}
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
          onChange={(e, pageChange) => {
            filterParam.page = pageChange.toString();

            router.push(`products${generateQueryParams(filterParam)}`);
          }}
          count={10}
          page={Number(filterParam.page ?? 1)}
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
      {screenMd ? (
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
      ) : (
        <></>
      )}
    </Container>
  );
}
export default Products;
