"use client";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Rating,
  SxProps,
  Theme,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MOCK_DATA } from "@/helpers/MOCK/mock_products";

// * MOCK

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

  return (
    <Card
      sx={{
        width: "100%",
        height: "40rem",
        ...sx,
      }}
    >
      <List
        // sx={{ width: "100%", backgroundColor: "transparent" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        disablePadding
        subheader={
          <ListSubheader
            sx={{
              backgroundColor: "transparent",
            }}
            component="div"
            id="nested-list-subheader"
          >
            Filters
          </ListSubheader>
        }
      >
        <CustomListButton
          onClick={() => {
            if (onAvailableChange) onAvailableChange(!available);
            setAvailable((prev) => !prev);
          }}
        >
          <ListItemIcon>
            {available ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>
          <ListItemText primary="Available" />
        </CustomListButton>
        <CustomListButton onClick={() => setFavorite((prev) => !prev)}>
          <ListItemIcon>
            {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </ListItemIcon>
          <ListItemText primary="Favorite" />
        </CustomListButton>
        {/* //? Rating */}
        <CollapseItem
          title={"Rating"}
          active={openCollapse}
          type="rating"
          onCollapseChange={(active) => setOpenCollapse(active)}
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
        </CollapseItem>
        <CollapseItem
          title={"Brands"}
          active={openCollapse}
          type="brand"
          onCollapseChange={(active) => setOpenCollapse(active)}
        >
          {MOCK_DATA.map((item, index) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  // onChange={handleToggle(value)}
                  // checked={checked.includes(value)}
                  // inputProps={{ "aria-labelledby": labelId }}
                />
              }
              sx={{
                p: 1,
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              }}
              disablePadding
            >
              <Avatar
                alt={item.brand}
                src={item.img}
                sx={{ width: "2rem", height: "2rem", p: 0 }}
              />
              <Typography
                sx={(theme) => ({
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  fontSize: "clamp(15px,12px,8px)",
                  [theme.breakpoints.up("md")]: {},
                  width: "50%",
                  px: 1,
                })}
              >
                {item.brand}
              </Typography>
            </ListItem>
          ))}
        </CollapseItem>
      </List>
    </Card>
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
        <Box
          sx={{
            "&:hover": { backgroundColor: "transparent" },
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            flexGrow: 1, // Add this line
          }}
        >
          {children}
        </Box>
      </Collapse>
    </>
  );
}
