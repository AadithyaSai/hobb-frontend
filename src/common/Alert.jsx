import { div } from "framer-motion/client";
import "./Alert.css";

export default function Alert({ active, message, type, setInactive }) {
  return (
    <div>
      <div className={`alert-backdrop visible-${active}`}></div>
      <div className={`alert alert-${type} visible-${active}`} role="alert">
        <div className="alert-content d-flex flex-column align-items-center">
          <h2>
            <i className="bi-exclamation-triangle me-2 text-danger"></i>
            {type === "danger" ? "Uh Oh!" : "Alert!"}
          </h2>
          {message}
          <a className="btn btn-success btn-sm mt-4" onClick={setInactive}>
            OK
          </a>
        </div>
      </div>
    </div>
  );
}
