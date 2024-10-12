import NextBreadcrumb from "@/components/nextBreadCrumbs/nextBreadCrumb";
import { Container } from "@mui/material";
import React from "react";

function PageLayout({ children }: { children: React.ReactNode }) {
    return <Container>
        <NextBreadcrumb
        homeElement={'Home'}
        separator={<span> &gt; </span>}
        activeClasses='text-amber-500'
        containerClasses='flex py-5' 
        listClasses='hover:underline mx-2 font-bold'
        capitalizeLinks
        />
        {children}
    </Container>;
}

export default PageLayout;
