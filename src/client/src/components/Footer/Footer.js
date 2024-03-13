/**
 * @function Footer
 * @description Renders a simple footer component at the bottom of the page.
 * @returns {JSX.Element} The JSX representation of the footer.
 * @author @Tarak1246
 * @date Mar 13, 2024
 */

const Footer = () => {
  return (
    <div
      style={{
        height: "50px",
        background: "#333",
        color: "#fff",
        textAlign: "center",
        lineHeight: "50px",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      @CodeCrafters
    </div>
  );
};

export default Footer;