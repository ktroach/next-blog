"use client"

import { useState, useEffect } from "react";
import { useOrganization } from "@clerk/nextjs";
import type { OrganizationMembershipResource } from "@clerk/types";

export const AdminWelcome = () => {
    const {
        organization: currentOrganization,
        membership,
        isLoaded,
    } = useOrganization();

    // if (!isLoaded || !currentOrganization) {
    //     return null;
    // }

    const isAdmin = membership && membership.role === "admin";

    // if (!isAdmin) {
    //     return null;
    // }

    return (
        <>
            <h4>Welcome, Admin!</h4>
        </>
    );
};