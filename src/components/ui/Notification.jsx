import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function Notification({ show, onClose, message, type = "success" }) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header closeButton>
          <strong className="me-auto">
            {type === "success" ? "✅ Success" : "❌ Error"}
          </strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
} 