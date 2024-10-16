"use client";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Rating,
  SxProps,
  Theme,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MOCK_DATA } from "@/helpers/MOCK/mock_products";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface filterProps {
  onAvailableChange?: (status: boolean) => void | undefined;
  onFavoriteChange?: (status: boolean) => void | undefined;
  onRatingChange?: (status: number) => void | undefined;
  sx?: SxProps<Theme> | undefined;
}
type collapseList = "rating" | "brand" | "";
const FilterComponent = ({
  onAvailableChange,
  onFavoriteChange,
  onRatingChange,
  sx,
}: filterProps) => {
  const [openCollapse, setOpenCollapse] = useState<collapseList>("brand");
  const [available, setAvailable] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState(3);
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
              src={item.img}
              sx={{ width: 30, height: 30 }}
            />
          </Box>
        ))}
      </FilterInput>
      <Accordion>
        <CustomAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Accordion 2</Typography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </CustomAccordionDetails>
      </Accordion>
      <Accordion disabled>
        <CustomAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography>Disabled Accordion</Typography>
        </CustomAccordionSummary>
      </Accordion>
    </Grid>
    // <Card
    //   sx={{
    //     width: "100%",
    //     height: "40rem",
    //     ...sx,
    //   }}
    // >
    //   <List
    //     // sx={{ width: "100%", backgroundColor: "transparent" }}
    //     component="nav"
    //     aria-labelledby="nested-list-subheader"
    //     disablePadding
    //     subheader={
    //       <ListSubheader
    //         sx={{
    //           backgroundColor: "transparent",
    //         }}
    //         component="div"
    //         id="nested-list-subheader"
    //       >
    //         Filters
    //       </ListSubheader>
    //     }
    //   >
    //     <CustomListButton
    //       onClick={() => {
    //         if (onAvailableChange) onAvailableChange(!available);
    //         setAvailable((prev) => !prev);
    //       }}
    //     >
    //       <ListItemIcon>
    //         {available ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
    //       </ListItemIcon>
    //       <ListItemText primary="Available" />
    //     </CustomListButton>
    //     <CustomListButton onClick={() => setFavorite((prev) => !prev)}>
    //       <ListItemIcon>
    //         {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    //       </ListItemIcon>
    //       <ListItemText primary="Favorite" />
    //     </CustomListButton>
    //     {/* //? Rating */}
    //     <CollapseItem
    //       title={"Rating"}
    //       active={openCollapse}
    //       type="rating"
    //       onCollapseChange={(active) => setOpenCollapse(active)}
    //     >
    //       <Rating
    //         name="hover-feedback"
    //         value={rating}
    //         // readOnly
    //         size={"medium"}
    //         onChange={(e, newValue) => {
    //           if (onRatingChange && newValue) onRatingChange(newValue);
    //           setRating(newValue ?? 3);
    //         }}
    //         sx={(theme) => ({
    //           color: theme.palette.primary.main,
    //         })}
    //       />
    //     </CollapseItem>
    //     <CollapseItem
    //       title={"Brands"}
    //       active={openCollapse}
    //       type="brand"
    //       onCollapseChange={(active) => setOpenCollapse(active)}
    //     >
    //       {MOCK_DATA.map((item, index) => (
    //         <ListItem
    //           key={item.id}
    //           secondaryAction={
    //             <Checkbox
    //               edge="end"
    //               // onChange={handleToggle(value)}
    //               // checked={checked.includes(value)}
    //               // inputProps={{ "aria-labelledby": labelId }}
    //             />
    //           }
    //           sx={{
    //             p: 1,
    //             display: "flex",
    //             justifyItems: "center",
    //             alignItems: "center",
    //           }}
    //           disablePadding
    //         >
    //           <Avatar
    //             alt={item.brand}
    //             src={item.img}
    //             sx={{ width: "2rem", height: "2rem", p: 0 }}
    //           />
    //           <Typography
    //             sx={(theme) => ({
    //               display: "-webkit-box",
    //               overflow: "hidden",
    //               WebkitBoxOrient: "vertical",
    //               WebkitLineClamp: 1,
    //               fontSize: "clamp(15px,12px,8px)",
    //               [theme.breakpoints.up("md")]: {},
    //               width: "50%",
    //               px: 1,
    //             })}
    //           >
    //             {item.brand}
    //           </Typography>
    //         </ListItem>
    //       ))}
    //     </CollapseItem>
    //   </List>
    // </Card>
  );
};

export default FilterComponent;
interface collapseProps {
  children: React.ReactNode;
  onCollapseChange: (status: collapseList) => void;
  active: collapseList;
  type: collapseList;
  title: string;
}
function CollapseItem({
  children,
  active,
  type,
  title,
  onCollapseChange,
}: collapseProps) {
  const CustomListButton = styled(ListItemButton)(({ theme }) => ({
    paddingLeft: "2.5rem",
  }));

  return (
    <>
      <CustomListButton
        onClick={() => {
          onCollapseChange(active === type ? "" : type);
        }}
      >
        <ListItemIcon>
          {active === type ? <ExpandMore /> : <ExpandLess />}
        </ListItemIcon>
        <ListItemText primary={title} />
      </CustomListButton>
      <Collapse
        in={active === type}
        timeout="auto"
        unmountOnExit
      >
        <List
          sx={{
            "&:hover": { backgroundColor: "transparent" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            width: "100%",
            maxHeight: "30vh",
            overflowY: "auto",
            flexGrow: 1, // Add this line
          }}
        >
          {children}
        </List>
      </Collapse>
    </>
  );
}

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
            defaultExpanded
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
