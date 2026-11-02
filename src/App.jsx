
import { useState, useEffect } from "react";
import {
  Menu, X, ArrowUpRight, MapPin, BedDouble,
  CalendarDays, Users, Sparkles, ChevronRight, Phone, MessageCircle
} from "lucide-react";
import "./App.css";

const rooms = [
  {
    number: "01",
    name: "A Place to Unwind",
    description: "A welcoming space to relax and enjoy your stay.",
    image: "/images/room-1.jpg",
  },
  {
    number: "02",
    name: "Comfort & Calm",
    description: "Make yourself at home in a comfortable setting.",
    image: "/images/room-2.jpg",
  },
  {
    number: "03",
    name: "Your Stay in Musanze",
    description: "A restful place to begin your Musanze experience.",
    image: "/images/room-3.jpg",
  },
];

const galleryImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <a href="#home" className="brand" onClick={closeMenu}>
        <span className="brand-name">OLYMPIC</span>
        <span className="brand-subtitle">MOTEL · MUSANZE</span>
      </a>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#rooms" onClick={closeMenu}>Rooms</a>
        <a href="#gallery" onClick={closeMenu}>Gallery</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a href="tel:+250785583640" className="nav-phone">
          <Phone size={15} /> +250 785 583 640
        </a>
        <a href="#booking" className="nav-book" onClick={closeMenu}>
          Book a Stay <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function App() {
  const heroImages = [
    "/images/hero.jpg",
    "/images/hero-2.jpg",
    "/images/hero-3.jpg",
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    room: "Any available room",
    name: "",
    email: "",
  });

  const [menuMessage, setMenuMessage] = useState("");

  const updateBooking = (event) => {
    setBooking({
      ...booking,
      [event.target.name]: event.target.value,
    });
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setMenuMessage("Sending your booking enquiry...");

    try {
      const formData = new FormData(form);
      formData.append("_subject", "New booking enquiry - Olympic Motel");

      const response = await fetch("https://formspree.io/f/mqppgkjl", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.errors
          ? result.errors.map((error) => error.message).join(", ")
          : "Could not submit your enquiry.";
        throw new Error(errorMessage);
      }

      setMenuMessage("Thank you! Your booking enquiry has been received.");
      form.reset();
    } catch (error) {
      setMenuMessage(error.message + " Please call +250 785 583 640.");
    }
  };

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="hero" id="home">
  <div className="hero-slides">
    {heroImages.map((image, index) => (
      <div
        key={image}
        className={`hero-slide ${activeSlide === index ? "active" : ""}`}
      >
        <img
          src={image}
          alt={index === 0 ? "Olympic Motel in Musanze" : ""}
          fetchPriority={index === 0 ? "high" : "auto"}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    ))}
  </div>

  <div className="hero-overlay"></div>

  <div className="hero-content">
    <span className="hero-eyebrow">
      YOUR STAY IN MUSANZE, RWANDA
    </span>

    <h1>
      A stay to remember.<br />
      <em>A place to belong.</em>
    </h1>

    <p>
      Welcome to Olympic Motel. Discover a warm and inviting
      place to pause, relax and enjoy your time in Musanze.
    </p>

    <div className="hero-actions">
      <a href="#rooms" className="button button-light">
        Explore the Motel <ArrowUpRight size={17} />
      </a>

      <a href="#about" className="hero-text-link">
        Discover Olympic <ChevronRight size={17} />
      </a>
    </div>
  </div>

  <div className="hero-bottom">
    <span>OLYMPIC MOTEL</span>

    <div className="slide-indicators">
      {heroImages.map((_, index) => (
        <button
          key={index}
          className={activeSlide === index ? "indicator active" : "indicator"}
          onClick={() => setActiveSlide(index)}
          aria-label={`Show slide ${index + 1}`}
        />
      ))}
    </div>

    <span>0{activeSlide + 1} — 03</span>
  </div>
</section>

        {/* INTRO STRIP */}
        <section className="intro-strip">
          <div><MapPin size={19} /><span>Musanze, Rwanda</span></div>
          <span className="intro-divider"></span>
          <p>A welcoming place for your journey.</p>
          <a href="#booking">Plan your stay <ArrowUpRight size={15} /></a>
        </section>

        {/* ABOUT */}
        <section className="about section-padding" id="about">
          <div className="about-image image-frame">
            <img src="/images/about.jpg" alt="Olympic Motel" loading="lazy" decoding="async" />
            <span className="image-caption">A WELCOME IN MUSANZE</span>
          </div>

          <div className="about-content">
            <span className="eyebrow">GET TO KNOW US</span>
            <h2>More than a place to stay.</h2>
            <p>
              Every journey deserves a comfortable place to pause.
              At Olympic Motel, we welcome you to experience Musanze
              from a place you can call your home away from home.
            </p>
            <p>
              Whether you are visiting the area or simply looking
              for a place to relax, we look forward to welcoming you.
            </p>
            <a href="#contact" className="text-link">
              Get in touch <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* ROOMS */}
        <section className="rooms section-padding" id="rooms">
          <SectionHeading
            eyebrow="STAY WITH US"
            title="Find your space."
            description="Take a look at our accommodation. Add the official room names, details and prices when they are confirmed."
          />

          <div className="room-grid">
            {rooms.map((room) => (
              <article className="room-card" key={room.number}>
                <div className="room-image">
                  <img src={room.image} alt={room.name} loading="lazy" decoding="async" />
                  <span className="room-number">{room.number}</span>
                </div>
                <div className="room-info">
                  <div>
                    <h3>{room.name}</h3>
                    <p>{room.description}</p>
                  </div>
                  <a href="#booking" aria-label={`Ask about ${room.name}`}>
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* HIGHLIGHT */}
        <section className="highlight">
          <div className="highlight-image"></div>
          <div className="highlight-content">
            <span className="eyebrow">THE OLYMPIC EXPERIENCE</span>
            <h2>Make room for a little more comfort.</h2>
            <p>
              Your time away should feel special. Discover Olympic
              Motel and make your next visit to Musanze memorable.
            </p>
            <a href="#booking" className="button button-dark">
              Enquire About a Stay <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        {/* GALLERY */}
        <section className="gallery section-padding" id="gallery">
          <SectionHeading
            eyebrow="A CLOSER LOOK"
            title="A glimpse of Olympic."
            description="Explore the spaces and moments that make up the motel. These photographs can be replaced with your own."
          />
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div className={`gallery-item gallery-item-${index + 1}`} key={image}>
                <img src={image} alt={`Olympic Motel gallery ${index + 1}`} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </section>

        {/* BOOKING */}
        <section className="booking section-padding" id="booking">
          <div className="booking-intro">
            <span className="eyebrow">PLAN YOUR VISIT</span>
            <h2>Let's make your stay happen.</h2>
            <p>
              Tell us a little about your visit. You can use this form
              to prepare a booking enquiry.
            </p>
            <div className="booking-note">
              <CalendarDays size={22} />
              <span>Choose your dates and share your details.</span>
            </div>
          </div>

          <form className="booking-form" onSubmit={submitBooking}>
            <h3>Booking enquiry</h3>

            <div className="form-row">
              <label>
                Check-in
                <input
                  type="date"
                  name="checkIn"
                  value={booking.checkIn}
                  onChange={updateBooking}
                  required
                />
              </label>
              <label>
                Check-out
                <input
                  type="date"
                  name="checkOut"
                  value={booking.checkOut}
                  onChange={updateBooking}
                  min={booking.checkIn || undefined}
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Guests
                <select name="guests" value={booking.guests} onChange={updateBooking}>
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                  <option value="5+">5 or more</option>
                </select>
              </label>
              <label>
                Room preference
                <select name="room" value={booking.room} onChange={updateBooking}>
                  <option>Any available room</option>
                  <option>Room 1</option>
                  <option>Room 2</option>
                  <option>Room 3</option>
                </select>
              </label>
            </div>

            <label>
              Your name
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={booking.name}
                onChange={updateBooking}
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={booking.email}
                onChange={updateBooking}
                required
              />
            </label>

            <button type="submit" className="button button-dark form-submit">
              Send Booking Enquiry <ArrowUpRight size={17} />
            </button>

            {menuMessage && <p className="form-message">{menuMessage}</p>}
            <small>Your enquiry will be sent to Olympic Motel. Our team will contact you to confirm availability.</small>
          </form>
        </section>

        {/* CONTACT */}
        <section className="contact section-padding" id="contact">
  <div>
    <span className="eyebrow">WE WOULD LOVE TO HEAR FROM YOU</span>
    <h2>Planning a visit?</h2>
    <p>
      Have questions or need help planning your stay?
      Contact Olympic Motel directly. We would be happy to hear from you.
    </p>
  </div>

  <div className="contact-card">
    <span className="contact-icon"><MapPin size={23} /></span>
    <span className="eyebrow">FIND US</span>
    <h3>Musanze, Rwanda</h3>

    <div className="contact-actions">
      <a href="tel:+250785583640">
        <Phone size={17} /> +250 785 583 640
      </a>
      <a href="https://wa.me/250785583640" target="_blank" rel="noreferrer">
        <MessageCircle size={17} /> Chat on WhatsApp
      </a>
    </div>
  </div>
</section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <a href="#home" className="brand footer-brand">
            <span className="brand-name">OLYMPIC</span>
            <span className="brand-subtitle">MOTEL · MUSANZE</span>
          </a>
          <p>A welcoming place to stay in Musanze, Rwanda.</p>
          <a href="#home" className="back-top">Back to top ↑</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Olympic Motel. All rights reserved.</span>
          <span>Made with care in Rwanda.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
