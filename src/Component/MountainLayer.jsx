import { motion } from "framer-motion";
import { mountainLayer } from "../animations/variants";
import Mountain from "../assets/images/Mountain.png";
import "./style.css";

function MountainLayer() {
  return (
    <div className="layer mountain-layer-container center flex flex-col justify-end">
      <div className="w-full">
        <motion.img
          initial="initial"
          animate="animate"
          variants={mountainLayer}
          transition={{
            type: "tween",
            duration: 2,
            ease: "linear",
            delay: 1,
          }}
          src={Mountain}
          alt="mountain"
        />
      </div>
    </div>
  );
}

export default MountainLayer;
