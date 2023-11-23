import MenuButtonSvg from "../assets/images/MenuButton.svg";
import LogoSvg from "../assets/images/Logo.svg";
import InstagramSvg from "../assets/images/Instagram-Icon.svg";
import LinkedInSvg from "../assets/images/LinkedIn-Icon.svg";
import YouTubeSvg from "../assets/images/YouTube-Icon.svg";
import TwitterSvg from "../assets/images/Twitter-Icon.svg";
import MouseSvg from "../assets/images/Mouse.svg";
import { motion } from "framer-motion";
import { textLayer } from "../animations/variants";
import "./style.css";

const NavbarText = ({ children }) => {
  return <motion.div className="navbar-text">{children}</motion.div>;
};

const NavbarAnchor = ({ link, text }) => {
  return <a href={link}>
    <NavbarText>{text}</NavbarText>
  </a>
}

const NavbarSvg = ({ children }) => {
  return <motion.div className="navbar-svg center">{children}</motion.div>;
};

const SocialSvg = ({ children }) => {
  return <motion.div className="social-svg center">{children}</motion.div>;
};

const Navbar = () => (
  <motion.div className="navbar">
    {[
      <>
        <NavbarSvg>
          <motion.img src={MenuButtonSvg} alt="menu button" />
        </NavbarSvg>
        <NavbarAnchor link="team" text="Team"/>
        <NavbarAnchor link="events" text="Events"/>
      </>,
      <>
        {" "}
        <NavbarSvg>
          <motion.img src={LogoSvg} alt="VTC Logo button" />
        </NavbarSvg>
      </>,
      <>
        {" "}
        <SocialSvg>
          <motion.img src={InstagramSvg} alt="instagram" />
        </SocialSvg>
        <SocialSvg>
          <motion.img src={TwitterSvg} alt="twitter" />
        </SocialSvg>
        <SocialSvg>
          <motion.img src={LinkedInSvg} alt="linkedin" />
        </SocialSvg>
        <SocialSvg>
          <motion.img src={YouTubeSvg} alt="youtube" />
        </SocialSvg>
      </>,
    ].map((child, index) => (
      <motion.div
        className={`navbar-item navbar-item-${index + 1}`}
        key={index}
      >
        {child}
      </motion.div>
    ))}
  </motion.div>
);

function TextLayer() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{
        type: "tween",
        duration: 2,
        ease: "linear",
        delay: 1,
      }}
      variants={textLayer}
      className="text-layer layer center"
    >
      {/* <Navbar /> */}
      <motion.div className="center main-text">
        <motion.div className="main-text-heading">
          HIMALAYAN TRAVERSE
        </motion.div>
        <motion.p className="main-text-subtext">
          BE PREPARED FOR THE MOUNTAINS AND BEYOND...
        </motion.p>
      </motion.div>
      <motion.div className="center scroll-text">
        <motion.div className="scroll-text-1">SCROLL</motion.div>
        <motion.div className="scroll-text-2">
          <motion.img src={MouseSvg} alt="mouse" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default TextLayer;
