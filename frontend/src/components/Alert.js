import React from "react";
import { AlertContext } from "../context/AlertContext";

export default function Alert() {
  const { alert } = React.useContext(AlertContext);
  const alertType = alert.type === "success" ? "alert-success" : "alert-danger";
  return (    
    <div className={!alert.show ? 'invisible' :''} style={{height: '60px'}}>
      <div className={`alert ${alertType}`} role="alert">
        {alert.message}
      </div>
    </div>
  );
}
