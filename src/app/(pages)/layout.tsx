"use client";
import NextBreadcrumb from "@/components/nextBreadCrumbs/nextBreadCrumb";
import { Container, styled } from "@mui/material";
import React from "react";

function PageLayout({ children }: { children: React.ReactNode }) {
  const LayoutContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1920px",
      width: "90%",
    },
  }));

  return (
    <LayoutContainer
      sx={{}}
      maxWidth={false}
    >
      <Container maxWidth="lg">
        <NextBreadcrumb
          homeElement={"Home"}
          separator={<span> / </span>}
          activeClasses="text-amber-500"
          containerClasses="flex py-5"
          listClasses="hover:underline mx-2 font-bold"
          capitalizeLinks
        />
      </Container>
      {children}
    </LayoutContainer>
  );
}

export default PageLayout;
