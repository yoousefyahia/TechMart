import React from "react";
import { Toast } from "react-bootstrap";

export default function Notification({ show, onClose, message, type = "success" }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        minWidth: 350,
        maxWidth: "90vw",
        pointerEvents: "auto"
      }}
    >
      <Toast show={show} onClose={onClose} delay={3000} autohide style={{ minWidth: 350, textAlign: "center" }}>
        <Toast.Header closeButton>
          <strong className="me-auto">
            {type === "success" ? "✅ Success" : "❌ Error"}
          </strong>
        </Toast.Header>
        <Toast.Body style={{ textAlign: "center" }}>{message}</Toast.Body>
      </Toast>
    </div>
  );
} 