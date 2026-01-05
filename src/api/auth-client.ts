import { createAuthClient } from "better-auth/react";
// inferAdditionalFields import korar dorkar nei jodi 'auth' file access na thake
// import { inferAdditionalFields } from "better-auth/client/plugins"; 

export const authClient = createAuthClient({
    // Live Backend URL
    baseURL: "https://shareapp-liart.vercel.app",
    plugins: [ ] 
});