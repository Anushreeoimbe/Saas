import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, House, SearchX } from "lucide-react";

function NotFound() {
  return (
    <div className="module-not-found">
      <motion.div
        className="module-not-found-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="module-not-found-icon">
          <SearchX size={38} />
        </div>

        <span className="page-eyebrow">PAGE NOT FOUND</span>
        <h1>Oops! Lost in the clouds?</h1>
        <p>
          The page you are looking for does not exist or may have been moved.
          Return to your dashboard to continue managing your SaaS business.
        </p>

        <Link to="/" className="module-save-button">
          <House size={17} /> Back to Dashboard
        </Link>

        <button
          type="button"
          className="module-back-button"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={15} /> Go back
        </button>
      </motion.div>
    </div>
  );
}

export default NotFound;
