
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a href="#home" className="logo" onClick={closeMenu}>
        <span className="logo-name">OLYMPIC</span>
        <span className="logo-subtitle">MOTEL · MUSANZE</span>
      </a>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={25} /> : <Menu size={25} />}
      </button>

      <nav className={menuOpen ? "nav-links active" : "nav-links"}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#rooms" onClick={closeMenu}>Rooms</a>
        <a href="#gallery" onClick={closeMenu}>Gallery</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a href="#booking" className="book-button" onClick={closeMenu}>
          Book Now
        </a>
      </nav>
    </header>
  );
}

export default Header;
