"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  ListItemButton,
  Rating,
  Slider,
  SxProps,
  TextField,
  Theme,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { MOCK_DATA } from "@/helpers/MOCK/mock_products";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface filterProps {
  onAvailableChange?: (status: boolean) => void | undefined;
  onFavoriteChange?: (status: boolean) => void | undefined;
  onRatingChange?: (status: number) => void | undefined;
  sx?: SxProps<Theme> | undefined;
}
export type FilterType = {
  favorites: boolean;
  available: boolean;
  brans: [string];
  rating: number;
  priceRange: { min: number; max: number };
};

const FilterComponent = ({
  onAvailableChange,
  onFavoriteChange,
  onRatingChange,
  sx,
}: filterProps) => {
  const [available, setAvailable] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState(3);
  const [value, setValue] = useState<number[]>([200, 400]);
  const CustomListButton = styled(ListItemButton)(({ theme }) => ({
    paddingLeft: "2.5rem",
  }));

  const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
  }));
  const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
  }));
  function valuetext(value: number) {
    return `${value}°C`;
  }
  return (
    <Grid
      sx={(theme) => ({
        width: "100%",
        mb: 2,
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Typography sx={{ p: 2, fontSize: 21 }}>Filters</Typography>
      <FilterInput
        title={"Rating"}
        type="accordion"
      >
        <Rating
          name="hover-feedback"
          value={rating}
          // readOnly
          size={"medium"}
          onChange={(e, newValue) => {
            if (onRatingChange && newValue) onRatingChange(newValue);
            setRating(newValue ?? 3);
          }}
          sx={(theme) => ({
            color: theme.palette.primary.main,
          })}
        />
      </FilterInput>
      <FilterInput
        title="Price"
        type="accordion"
      >
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          max={1000}
          onChange={(e, newValue) => setValue(newValue as number[])}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <TextField
            id="outlined-basic"
            label="To"
            variant="outlined"
            value={value[0]}
            sx={{ width: "5rem" }}
            inputProps={{ style: { height: 10, resize: "both" } }}
            onChange={(e) => {
              const input = Number(e.target.value);

              setValue((prev) => {
                return [input, prev[1]];
              });
            }}
          />
          <TextField
            id="outlined-basic"
            label="From"
            variant="outlined"
            value={value[1]}
            sx={{ width: "5rem" }}
            inputProps={{ style: { height: 10, resize: "both" } }}
            onChange={(e) => {
              const input = Number(e.target.value);

              setValue((prev) => {
                return [prev[0], input];
              });
            }}
          />
        </Box>
      </FilterInput>
      <FilterInput title="sss">
        <FormControlLabel
          // required
          control={<Checkbox />}
          label="Favorite"
        />
        <FormControlLabel
          // required
          control={<Checkbox />}
          label="Available"
        />
      </FilterInput>
      <FilterInput
        title="Brands"
        type="accordion"
      >
        {MOCK_DATA.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label={item.brand}
              sx={{
                "& .MuiTypography-root": {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "clamp(100px,10vw,300px)",
                },
              }}
            />
            <Avatar
              src={item.imgUrl}
              sx={{ width: 30, height: 30 }}
            />
          </Box>
        ))}
      </FilterInput>
    </Grid>
  );
};

export default FilterComponent;

import React from "react";

interface FilterInputProps {
  title: string;
  children: React.ReactNode;
  type?: "accordion" | "header" | "checkBox" | undefined;
}
function FilterInput({ title, children, type }: FilterInputProps) {
  const content = () => {
    switch (type) {
      case "checkBox":
      case undefined:
        return (
          <Box
            sx={{
              display: "flex",
              justifyItems: "center",
              flexDirection: "column",
              width: "100%",
              p: 2,
            }}
          >
            {children}
          </Box>
        );
      case "accordion":
        return (
          <Accordion
            sx={{
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={(theme) => ({
                backgroundColor: theme.palette.background.paper,
                boxShadow: "none",
              })}
            >
              <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={(theme) => ({
                backgroundColor: theme.palette.background.paper,
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
              })}
            >
              {children}
            </AccordionDetails>
          </Accordion>
        );

      default:
        break;
    }
  };
  return content();
}
