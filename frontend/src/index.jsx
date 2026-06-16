import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./components/App";

ReactDOM.render(
  <GoogleOAuthProvider clientId="509932624944-a03hncn3mdtr02276vcferq472np54iq.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById("root"),
);
