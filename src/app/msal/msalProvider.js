"use client";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
export default function MyMSALProvider({ children }) {
  const msalInstance = new PublicClientApplication(msalConfig);

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
