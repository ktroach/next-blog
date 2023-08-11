// "use client"

// import { useState } from "react";
// import { useOrganization, useUser } from "@clerk/nextjs";
// import type {
//     MembershipRole,
//     OrganizationMembershipResource,
//   } from "@clerk/types";
// import { useOrganizationList } from "@clerk/nextjs"

// export const AdminWelcome = () => {
//     const {
//         organization: currentOrganization,
//         isLoaded,
//     } = useOrganization();

//     console.log(">>> isLoaded >>> ", isLoaded);
//     console.log(">>> currentOrganization >>> ", currentOrganization);

//     const {
//         user: { id: userId },
//     } = useUser();  
//     console.log(">>> userId >>> ", userId);  

//     const { membershipList, membership } = useOrganization({
//         membershipList: {},
//     });
//     console.log(">>> membershipList >>> ", membershipList);
    
//     const { organizationList } = useOrganizationList()
//     console.log(">>> organizationList >>> ", organizationList);

//     // if (!isLoaded || !currentOrganization) {
//     //     return null;
//     // }

//     const isAdmin = membership && membership.role === "admin";
//     console.log(">>> membership >>> ", membership);

//     // if (!isAdmin) {
//     //     return null;
//     // }

//     return (
//         <>
//             <h4>Welcome, Admin!</h4>
//         </>
//     );
// };