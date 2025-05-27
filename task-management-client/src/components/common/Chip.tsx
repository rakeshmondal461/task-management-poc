import "./styles/Chip.css";
const Chip = ({ children, type = "default", className = "", ...rest }) => {
  return (
    <div
      className={`${type||""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Chip;
