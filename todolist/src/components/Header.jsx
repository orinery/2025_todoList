import "./Header.css";
import { memo } from "react";

const Header = () => {
  return (
    <header className="header">
      <h1>TO DO LIST</h1>
    </header>
  );
};

export default memo(Header);
