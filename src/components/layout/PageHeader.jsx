import { motion } from "framer-motion";

function PageHeader({ title, description, action }) {
  return (
    <motion.div
      className="page-header"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      {action && <div>{action}</div>}
    </motion.div>
  );
}

export default PageHeader;