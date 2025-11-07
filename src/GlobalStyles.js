export const GlobalStyles = `
.order-details-scroll-container {
  width: 100%;
  overflow-x: visible;
}
@media (max-width: 700px) {
  .order-details-scroll-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.5rem;
    max-width: 100vw;
  }
  .order-details-grid {
    min-width: 520px;
    gap: 1rem;
  }
}

:root {
  --primary-blue: #005A9C;
  --primary-blue-dark: #004273;
  --accent-lime: #A2D729;
  --accent-lime-dark: #82b01e;
  --accent-teal: #008080;
  --success-green: #28a745;
  --warning-orange: #fd7e14;
  --error-red: #dc3545;
  --neutral-lightest: #fdfdff;
  --neutral-light-gray: #f0f2f5;
  --neutral-medium-gray: #d9dde2;
  --neutral-dark-gray: #5a6470;
  --text-dark: #212529;
  --text-light: #ffffff;
  --font-primary: 'Open Sans', sans-serif;
  --font-headings: 'Montserrat', sans-serif;
  --border-radius-sm: 6px;
  --border-radius-md: 12px;
  --border-radius-lg: 18px;
  --border-radius-pill: 50px;
  --box-shadow-light: 0 1px 2px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.04);
  --box-shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --box-shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --box-shadow-inset: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  --transition-speed: 0.3s;
  --transition-speed-fast: 0.2s;
  --easing-function: ease-in-out;
  --easing-dynamic: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --easing-springy: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --section-top-padding: 24px;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px; /* Adjust if header height changes */
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

body {
  font-family: var(--font-primary);
  line-height: 1.7;
  color: var(--text-dark);
  background-color: var(--neutral-lightest);
  font-size: 16px;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}

.container {
  width: 92%;
  max-width: 1280px;
  margin: 0 auto;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-headings);
  color: var(--primary-blue);
  font-weight: 700;
  line-height: 1.3;
}
h1 { font-size: clamp(2.5rem, 5.5vw, 4rem); margin-bottom: 0.6em; font-weight: 800; }
h2 { font-size: clamp(2.2rem, 4.5vw, 3rem); margin-bottom: 1em; text-align: center; }
h3 { font-size: clamp(1.5rem, 3.5vw, 2rem); margin-bottom: 0.5em; color: var(--primary-blue-dark); }
h4 { font-size: clamp(1.2rem, 3vw, 1.5rem); margin-bottom: 0.5em; color: var(--accent-teal); }
h5 { font-size: clamp(1.1rem, 2.8vw, 1.3rem); margin-bottom: 0.4em; color: var(--primary-blue); }
h6 { font-size: clamp(1rem, 2.5vw, 1.2rem); margin-bottom: 0.3em; color: var(--primary-blue-dark); }

p {
  margin-bottom: 1.5em;
  color: var(--neutral-dark-gray);
  font-size: 1.05rem;
}

a {
  text-decoration: none;
  color: var(--accent-lime);
  transition: color var(--transition-speed) var(--easing-function);
}
a:hover { color: var(--accent-lime-dark); }
ul { list-style: none; }
img { max-width: 100%; height: auto; display: block; border-radius: var(--border-radius-sm); }

.btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 0.6em; padding: 0.8em 1.8em; border-radius: var(--border-radius-pill);
  font-weight: 500; font-family: var(--font-headings); font-size: 15px;
  text-align: center; transition: all var(--transition-speed-fast) var(--easing-dynamic);
  cursor: pointer; border: 2px solid transparent; text-transform: uppercase; line-height: 1.5;
}
.btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
.btn-primary { background-color: var(--accent-lime); color: var(--text-dark); border-color: var(--accent-lime); box-shadow: 0 4px 15px -5px rgba(162, 215, 41, 0.6); }
.btn-primary:hover:not(:disabled) { background-color: var(--accent-lime-dark); border-color: var(--accent-lime-dark); color: var(--text-light); transform: translateY(-3px); box-shadow: 0 7px 20px -5px rgba(162, 215, 41, 0.5); }
.btn-secondary { background-color: transparent; color: var(--primary-blue); border-color: var(--primary-blue); }
.btn-secondary:hover:not(:disabled) { background-color: var(--primary-blue); color: var(--text-light); transform: translateY(-3px); }
.btn-hero-secondary { background-color: transparent; color: var(--text-light); border-color: var(--text-light); }
.btn-hero-secondary:hover:not(:disabled) { background-color: var(--text-light); color: var(--primary-blue-dark); transform: translateY(-3px); }
.btn-small { padding: 0.6em 1.4em; font-size: 0.85rem; }
.btn svg { font-size: 1.1em; }

/*
==========================================================================
                      HEADER STYLES (STATIC VERSION)
==========================================================================
*/
.gmt-header {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 0.12rem 0;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid var(--neutral-light-gray);
  box-shadow: var(--box-shadow-medium);
}

.gmt-header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92%;
  max-width: 1280px;
  margin: 0 auto;
}

.gmt-header__logo img {
  height: 52px;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* --- Desktop Navigation --- */
.gmt-header__nav { display: none; }
.gmt-header__nav-list { display: flex; align-items: center; gap: 0.5rem; list-style-type: none; }
.gmt-header__nav-item { margin-left: 1.75rem; position: relative; }
.gmt-header__nav-link,
.gmt-header__dropdown-toggle {
  font-family: var(--font-headings); font-weight: 500; color: var(--neutral-dark-gray);
  font-size: 1rem; padding: 0.75rem 0.5rem; position: relative; cursor: pointer;
  letter-spacing: 0.3px; transition: color var(--transition-speed) var(--easing-function);
  display: inline-flex; align-items: center; gap: 0.4em; background: none; border: none;
}
.gmt-header__dropdown-toggle svg { font-size: 0.8em; transition: transform var(--transition-speed-fast) var(--easing-function); }
.gmt-header__nav-item:hover .gmt-header__dropdown-toggle svg { transform: rotate(180deg); }
.gmt-header__nav-link:hover, .gmt-header__dropdown-toggle:hover, .gmt-header__nav-link.active { color: var(--primary-blue); }
.gmt-header__nav-link::after {
  content: ''; position: absolute; bottom: 5px; left: 0.5rem; right: 0.5rem;
  height: 3px; background-color: var(--accent-lime); border-radius: 3px;
  transform: scaleX(0); transform-origin: center;
  transition: transform var(--transition-speed) var(--easing-dynamic);
}
.gmt-header__nav-link:hover::after, .gmt-header__nav-link.active::after { transform: scaleX(1); }

/* --- Dropdown Menus --- */
.gmt-header__dropdown-menu {
  position: absolute; top: 100%; left: 50%; z-index: 1010;
  opacity: 0; visibility: hidden; transform: translateX(-50%) translateY(10px);
  transition: opacity var(--transition-speed-fast) var(--easing-function), transform var(--transition-speed-fast) var(--easing-function), visibility 0s var(--transition-speed-fast) linear;
  display: flex; flex-direction: column; gap: 0.25rem;
  background-color: var(--text-light); box-shadow: var(--box-shadow-large);
  border-radius: var(--border-radius-md); padding: 0.5rem; min-width: 240px;
  border: 1px solid var(--neutral-light-gray); list-style-type: none;
}
.gmt-header__nav-item:hover > .gmt-header__dropdown-menu,
.gmt-header__user-menu:hover > .gmt-header__dropdown-menu {
  opacity: 1; visibility: visible; transform: translateX(-50%) translateY(5px); transition-delay: 0s;
}
.gmt-header__dropdown-menu li { margin: 0 !important; width: 100%; }
.gmt-header__dropdown-menu li a, .gmt-header__dropdown-menu li button {
  display: flex; align-items: center; gap: 0.8em; width: 100%; padding: 0.75rem 1rem;
  border-radius: var(--border-radius-sm); color: var(--primary-blue-dark); font-size: 0.95rem;
  font-weight: 500; white-space: nowrap; text-align: left; background: none; border: none;
  cursor: pointer; transition: background-color 0.2s ease, color 0.2s ease;
}
.gmt-header__dropdown-menu li a:hover, .gmt-header__dropdown-menu li button:hover {
  background-color: var(--primary-blue); color: var(--text-light); text-decoration: none;
}
.gmt-header__user-menu-dropdown { left: auto; right: 0; transform: translateX(0) translateY(10px); }
.gmt-header__user-menu:hover > .gmt-header__user-menu-dropdown { transform: translateX(0) translateY(5px); }

/* --- Header Actions (Right Side) --- */
.gmt-header__actions { display: flex; align-items: center; gap: 1rem; }
.gmt-header__desktop-only { display: none; }
.gmt-header__cart {
  position: relative; cursor: pointer; color: var(--primary-blue);
  padding: 0.5rem; transition: color var(--transition-speed-fast) ease, transform 0.2s ease;
  background: none; border: none;
}
.gmt-header__cart:hover { color: var(--primary-blue-dark); transform: scale(1.1); }
.gmt-header__cart svg { font-size: 1.7rem; }
.gmt-header__cart-count {
  position: absolute; top: -2px; right: -4px; background-color: var(--warning-orange);
  color: var(--text-light); border-radius: 50%; width: 24px; height: 24px;
  font-size: 0.75rem; display: flex; justify-content: center; align-items: center;
  font-weight: bold; border: 2px solid var(--text-light);
  box-shadow: 0 0 10px rgba(253, 126, 20, 0.5);
}
.gmt-header__mobile-toggle {
  display: block; font-size: 1.8rem; cursor: pointer; color: var(--primary-blue);
  background: none; border: none; padding: 0.5rem;
  transition: color var(--transition-speed-fast) ease, transform 0.3s var(--easing-dynamic);
  line-height: 1; z-index: 1005;
}
.gmt-header__mobile-toggle:hover { color: var(--primary-blue-dark); }

@media (min-width: 1024px) {
  .gmt-header__nav { display: flex; }
  .gmt-header__desktop-only { display: block; }
  .gmt-header__mobile-toggle { display: none; }
}

main section {
  padding-top: var(--section-top-padding); 
  padding-bottom: 6rem;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  display: none;
}
main section.active-section {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}
.section-header .subtitle {
  font-family: var(--font-headings);
  color: var(--accent-teal);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: block;
}
.section-header p {
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
  color: var(--neutral-dark-gray);
}

/* Service Detail Page Refinements */
.service-detail-page { padding: 4rem 0; background-color: var(--text-light); }
.service-detail-page .container { max-width: 960px; }
.service-detail-page-header { margin-bottom: 3rem; text-align: left; }
.service-detail-page-header .back-link {
  display: inline-flex; align-items: center; gap: 0.5em; color: var(--primary-blue);
  font-weight: 600; margin-bottom: 1.5rem; font-size: 1rem;
}
.service-detail-page-header .back-link:hover { color: var(--primary-blue-dark); text-decoration: underline; }
.service-detail-page-header h1 { text-align: left; }
.service-detail-page-content img.featured-image { margin-bottom: 2rem; border-radius: var(--border-radius-lg); box-shadow: var(--box-shadow-medium); }
.service-content-block { margin-bottom: 2.5em; }
.service-content-block h3, .service-content-block h4 { margin-bottom: 0.8em; padding-bottom: 0.5rem; border-bottom: 1px solid var(--neutral-light-gray); }
.service-content-block ul { list-style: none; padding-left: 0; font-size: 1rem; color: var(--neutral-dark-gray); }
.service-content-block ul li { margin-bottom: 0.8em; line-height: 1.6; padding-left: 2em; position: relative; }
.service-content-block ul li::before {
  content: '✓'; color: var(--accent-lime); position: absolute; left: 0; top: 2px; font-weight: bold; font-size: 1.2rem;
}
.service-content-block ul ul { margin-top: 0.8em; padding-left: 1.5rem; }
.service-content-block ul ul li::before { content: '›'; top: 0px; }

/* Course Filters Polish */
.course-filters {
  display: flex; gap: 1.5rem; margin-bottom: 3rem; flex-wrap: wrap;
  align-items: center; padding: 1.5rem; background-color: var(--text-light);
  border-radius: var(--border-radius-lg); border: 1px solid var(--neutral-light-gray);
  box-shadow: var(--box-shadow-light);
}
.filter-group { display: flex; align-items: center; gap: 0.75rem; }
.filter-group label { font-weight: 600; color: var(--primary-blue-dark); font-size: 0.9rem; }
.filter-group select, .filter-group input[type="text"] {
  padding: 0.6em 1em; border: 1px solid var(--neutral-medium-gray); border-radius: var(--border-radius-sm);
  font-family: var(--font-primary); font-size: 0.95rem; background-color: var(--text-light);
  min-width: 180px; transition: border-color var(--transition-speed-fast) ease, box-shadow var(--transition-speed-fast) ease;
}
.filter-group select:focus, .filter-group input[type="text"]:focus {
  outline: none; border-color: var(--primary-blue); box-shadow: 0 0 0 4px rgba(0, 90, 156, 0.15);
}

/* About Us Section Styles */
.about-intro-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: start; margin-bottom: 4rem; }
.about-intro__text h3 { margin-top: 0; margin-bottom: 1em; border-left: 4px solid var(--accent-lime); padding-left: 1rem; font-size: clamp(1.5rem, 4vw, 1.8rem); color: var(--primary-blue-darker); }
.about-intro__text p { line-height: 1.7; max-width: 60ch; }
.about-intro__image { position: sticky; top: 120px; border-radius: var(--border-radius-lg); overflow: hidden; box-shadow: var(--box-shadow-large); }
.about-intro__image img { display: block; width: 100%; height: 100%; object-fit: cover; }
.about-credentials { margin-top: 3rem; }
.about-credentials h4 { margin-top: 0; margin-bottom: 1.25rem; color: var(--primary-blue-dark); font-size: 1.3rem; }
.about-credentials ul { list-style: none; padding-left: 0; margin-bottom: 0; }
.about-credentials li { padding-left: 1.75rem; position: relative; margin-bottom: 1rem; line-height: 1.6; }
.about-credentials li::before { content: '✓'; position: absolute; left: 0; top: 2px; color: var(--accent-lime); font-weight: bold; font-size: 1.1rem; }
.about-details-content { margin-top: 2rem; }
.about-principles-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.principle-card { background-color: var(--text-light); border: 1px solid var(--neutral-light-gray); padding: clamp(1.5rem, 4vw, 2rem); border-radius: var(--border-radius-lg); box-shadow: var(--box-shadow-medium); }
.principle-card h4 { margin-top: 0; margin-bottom: 1rem; color: var(--primary-blue-dark); border-left: 3px solid var(--accent-teal); padding-left: 0.75rem; }
.principle-card ul { padding-left: 20px; margin-bottom: 0; }
.principle-card li { margin-bottom: 0.5rem; line-height: 1.7; }
.principle-card--full-width { grid-column: 1 / -1; }

/* Testimonials Section */
.testimonials-section { background: linear-gradient(to bottom, var(--neutral-lightest), var(--neutral-light-gray)); }
.testimonial-slider { position: relative; max-width: 800px; margin: 0 auto; }
.testimonial-card { background-color: var(--text-light); padding: 3rem; border-radius: var(--border-radius-lg); box-shadow: var(--box-shadow-large); text-align: center; position: relative; }
.testimonial-card__quote-icon { font-size: 4rem; color: var(--accent-lime); opacity: 0.2; position: absolute; top: 1rem; left: 1.5rem; transform: rotate(-10deg); }
.testimonial-card p { font-style: italic; color: var(--neutral-dark-gray); margin-bottom: 1.5rem; font-size: 1.15rem; line-height: 1.8; }
.testimonial-card__author { font-weight: 700; font-size: 1.1rem; color: var(--primary-blue-dark); font-family: var(--font-headings); }
.testimonial-card__author-title { font-size: 0.9rem; color: var(--accent-teal); }
.testimonial-navigation { display: flex; justify-content: center; gap: 1rem; margin-top: 2.5rem; }
.testimonial-navigation button { background: var(--text-light); color: var(--primary-blue); border: 1px solid var(--neutral-medium-gray); border-radius: 50%; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: var(--box-shadow-light); transition: all var(--transition-speed-fast) ease; }
.testimonial-navigation button:hover:not(:disabled) { background: var(--primary-blue); color: var(--text-light); transform: scale(1.1); box-shadow: var(--box-shadow-medium); }
.testimonial-navigation button:disabled { opacity: 0.5; cursor: not-allowed; }

/* Map & Footer */
.map-container-wrapper, .map-container-wrapper.maximized { position: relative; border-radius: var(--border-radius-md); overflow: hidden; margin-top: 1.5rem; border: 1px solid var(--neutral-light-gray); box-shadow: var(--box-shadow-light); }
.map-container { height: 250px; }
.map-controls { position: absolute; top: 10px; right: 10px; z-index: 5; }
.map-control-btn { background-color: rgba(255, 255, 255, 0.9); border: 1px solid var(--neutral-medium-gray); border-radius: var(--border-radius-sm); padding: 0; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: var(--box-shadow-light); transition: all 0.2s ease; }
.map-control-btn:hover { background-color: var(--text-light); transform: scale(1.1); }
.map-control-btn svg { color: var(--primary-blue-dark); font-size: 1rem; }
.map-container-wrapper.maximized { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 3000; border-radius: 0; }
.map-container-wrapper.maximized .map-container { height: 100vh; }
/* ... (Footer styles remain unchanged) ... */

/* Modal & Cart Panel */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 42, 115, 0.6); backdrop-filter: blur(5px);
  display: flex; align-items: center; justify-content: center; z-index: 2000;
  opacity: 0; visibility: hidden;
  transition: opacity var(--transition-speed) ease, visibility 0s var(--transition-speed) linear;
}
.modal-overlay.active { opacity: 1; visibility: visible; transition-delay: 0s; }
.modal-dialog {
  background-color: var(--text-light); padding: 0; border-radius: var(--border-radius-lg);
  width: 90%; max-width: 800px; box-shadow: var(--box-shadow-large);
  transform: scale(0.95) translateY(20px); opacity: 0;
  transition: transform var(--transition-speed) var(--easing-springy), opacity var(--transition-speed-fast) ease;
  display: flex; flex-direction: column; max-height: 90vh;
}
.modal-overlay.active .modal-dialog { transform: scale(1) translateY(0); opacity: 1; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; border-bottom: 1px solid var(--neutral-light-gray); }
.modal-header h3 { margin-bottom: 0; font-size: 1.8rem; }
.modal-close-btn { background: none; border: none; font-size: 2rem; color: var(--neutral-dark-gray); cursor: pointer; padding: 0.5rem; line-height: 1; transition: color 0.2s ease, transform 0.2s ease; }
.modal-close-btn:hover { color: var(--error-red); transform: rotate(90deg); }
.modal-body { padding: 2rem; overflow-y: auto; flex-grow: 1; }
.modal-footer { text-align: right; padding: 1.5rem 2rem; border-top: 1px solid var(--neutral-light-gray); background-color: var(--neutral-lightest); border-bottom-left-radius: var(--border-radius-lg); border-bottom-right-radius: var(--border-radius-lg); }

.cart-panel {
  position: fixed; top: 0; right: -500px; width: 100%; max-width: 480px; height: 100%;
  background-color: var(--text-light); box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
  z-index: 2001; transition: right var(--transition-speed) var(--easing-dynamic);
  display: flex; flex-direction: column;
}
.cart-panel.active { right: 0; }
.cart-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid var(--neutral-light-gray); }
.cart-header h3 { margin: 0; color: var(--primary-blue); font-size: 1.5rem; }
.cart-body { padding: 1.5rem; overflow-y: auto; flex-grow: 1; }
.cart-item { display: grid; grid-template-columns: auto 1fr auto; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--neutral-light-gray); gap: 1.25rem; align-items: center; }
.cart-item:last-child { border-bottom: none; margin-bottom: 0; }
.cart-item img { width: 90px; height: 70px; object-fit: cover; border-radius: var(--border-radius-md); }
.cart-item-details h5 { font-size: 1.1rem; margin-bottom: 0.4rem; color: var(--primary-blue-dark); line-height: 1.3; }
.cart-item-price { font-size: 0.95rem; color: var(--neutral-dark-gray); }
.cart-item-remove { background: none; border: none; color: var(--neutral-medium-gray); cursor: pointer; font-size: 1.4rem; padding: 0.5rem; line-height: 1; transition: all 0.2s ease; }
.cart-item-remove:hover { color: var(--error-red); transform: scale(1.1); }
.cart-footer { padding: 1.5rem; border-top: 1px solid var(--neutral-light-gray); background-color: var(--neutral-lightest); box-shadow: 0 -5px 15px -5px rgba(0, 0, 0, 0.05); }
.cart-total { display: flex; justify-content: space-between; font-size: 1.4rem; font-weight: 700; margin-bottom: 1.5rem; }
.cart-total span:first-child { color: var(--neutral-dark-gray); }
.cart-total span:last-child { color: var(--primary-blue); }

/* Toast Notifications */
.toast-container { position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 1rem; }
.toast {
  color: var(--text-light); padding: 1rem 1.5rem; border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-large); display: flex; align-items: center; gap: 1rem;
  opacity: 0; transform: translateX(120%);
  animation: slideInToast 0.4s var(--easing-dynamic) forwards, fadeOutToast 0.4s var(--easing-dynamic) 3.6s forwards;
  min-width: wrap;
}
.toast.success { background: linear-gradient(to right, var(--success-green), #34c759); }
.toast.error { background: linear-gradient(to right, var(--error-red), #e55353); }
.toast.info { background: linear-gradient(to right, var(--primary-blue), #007aff); }
.toast svg { font-size: 1.5rem; flex-shrink: 0; }
@keyframes slideInToast { to { opacity: 1; transform: translateX(0); } }
@keyframes fadeOutToast { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(120%); } }

/* Checkout & Dashboard */
.checkout-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 3rem; align-items: flex-start; }
.billing-details-form { background: var(--text-light); padding: 2.5rem; border-radius: var(--border-radius-lg); border: 1px solid var(--neutral-light-gray); box-shadow: var(--box-shadow-medium); }
.order-summary { padding: 2.5rem; border: 2px solid var(--primary-blue); border-radius: var(--border-radius-lg); background-color: var(--text-light); position: sticky; top: 110px; box-shadow: var(--box-shadow-medium); }
.dashboard-container { max-width: 1100px; }
.orders-list-container { display: flex; flex-direction: column; }
.order-card-wrapper { margin-bottom: 1.5rem; }
.order-card-wrapper:last-child { margin-bottom: 0; }
.order-card { background-color: var(--text-light); border-radius: var(--border-radius-lg); box-shadow: var(--box-shadow-medium); border-left: 6px solid var(--neutral-medium-gray); transition: box-shadow 0.3s var(--easing-dynamic); overflow: hidden; }
.order-card:hover { box-shadow: var(--box-shadow-large); }
.order-card.pending-payment { border-left-color: var(--warning-orange); }
.order-card.processing { border-left-color: var(--primary-blue); }
.order-card.completed { border-left-color: var(--success-green); }
.order-card.cancelled { border-left-color: var(--error-red); }
.order-card-header { display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; padding: 1.25rem 1.5rem; width: 100%; text-align: left; background: none; border: none; cursor: pointer; }
.order-main-info, .order-status-info { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.order-id { font-family: var(--font-headings); font-size: 1.2rem; font-weight: 700; color: var(--primary-blue-dark); }
.order-meta { display: flex; align-items: center; gap: 0.5em; font-size: 0.9rem; color: var(--neutral-dark-gray); }
.order-total { font-weight: 700; font-size: 1.1rem; color: var(--text-dark); }
.status-badge { padding: 0.4em 1em; border-radius: var(--border-radius-pill); font-weight: 600; font-size: 0.8rem; white-space: nowrap; text-align: center; }
.status-badge.pending-payment { background-color: #fff8e1; color: #f57f17; }
.status-badge.processing { background-color: #e3f2fd; color: #1565c0; }
.status-badge.completed { background-color: #e8f5e9; color: #2e7d32; }
.status-badge.cancelled { background-color: #ffebee; color: #c62828; }
.order-expand-icon { font-size: 1rem; color: var(--neutral-dark-gray); transition: transform 0.3s var(--easing-dynamic); }
.order-expand-icon.expanded { transform: rotate(180deg); }
.order-details-content-wrapper { max-height: 0; overflow: hidden; transition: max-height 0.5s ease-in-out; background-color: var(--neutral-lightest); }
.order-details-content-wrapper.expanded { max-height: 1000px; border-top: 1px solid var(--neutral-light-gray); }
.order-details-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; padding: 2rem 1.5rem; }

/* Auth & Account */
.auth-container, .account-container { max-width: 550px; margin: 0 auto; padding: 3rem; background-color: var(--text-light); border-radius: var(--border-radius-lg); box-shadow: var(--box-shadow-large); border-top: 5px solid var(--primary-blue); }
.account-container { max-width: 800px; }

/* Mobile Nav */
.mobile-nav-container { display: none; }
@media (max-width: 1024px) {
  .gmt-header__nav, .gmt-header__desktop-only { display: none; }
  .gmt-header__mobile-toggle { display: block; }
  .mobile-nav-container { display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1050; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0s 0.3s linear; }
  .mobile-nav-container.active { opacity: 1; visibility: visible; transition-delay: 0s; }
  .mobile-nav-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 66, 115, 0.8); backdrop-filter: blur(4px); }
  .mobile-nav-modal { position: relative; background-color: var(--primary-blue-dark); width: 90%; max-width: 400px; padding: 3rem 1.5rem; border-radius: var(--border-radius-lg); border: 1px solid var(--primary-blue); box-shadow: var(--box-shadow-large); animation: fadeInModal 0.4s var(--easing-dynamic) forwards; }
  .mobile-nav-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-light); font-size: 2rem; cursor: pointer; padding: 0.5rem; line-height: 1; opacity: 0.7; transition: opacity 0.2s ease, transform 0.2s ease; }
  .mobile-nav-close:hover { opacity: 1; color: var(--accent-lime); transform: rotate(90deg); }
  .mobile-nav-list { display: flex; flex-direction: column; width: 100%; }
  .mobile-nav-item { border-bottom: 1px solid rgba(0, 90, 156, 0.4); }
  .mobile-nav-item:last-child { border-bottom: none; }
  .mobile-nav-link, .mobile-nav-accordion-toggle { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 1.2rem 0.5rem; font-size: 1.2rem; font-weight: 500; color: var(--text-light); text-align: left; background: none; border: none; cursor: pointer; font-family: var(--font-headings); transition: color 0.2s ease; }
  .mobile-nav-link:hover, .mobile-nav-accordion-toggle:hover, .mobile-nav-accordion-toggle svg { color: var(--accent-lime); }
  .mobile-nav-submenu-wrapper { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-in-out; background-color: rgba(0, 0, 0, 0.2); border-radius: var(--border-radius-sm); }
  .mobile-nav-submenu-wrapper.open { max-height: 200px; padding-bottom: 0.5rem; }
  .mobile-nav-submenu { padding: 0.5rem 0 0.5rem 1.5rem; }
  .mobile-nav-sublink, button.mobile-nav-sublink { display: block; padding: 0.5rem; font-size: 1rem; color: var(--neutral-medium-gray); transition: color 0.2s ease, padding-left 0.2s ease; }
  button.mobile-nav-sublink { background: none; border: none; cursor: pointer; width: 100%; text-align: left; font-family: inherit; font-weight: 400; }
  .mobile-nav-sublink:hover, button.mobile-nav-sublink:hover { color: var(--accent-lime); padding-left: 10px; }
  .about-intro-layout, .checkout-grid { grid-template-columns: 1fr; }
  .about-intro__image { order: -1; position: static; margin-bottom: 2rem; }
  .order-summary { position: static; margin-top: 2rem; }
}
@media (max-width: 768px) {
  .about-principles-grid { grid-template-columns: 1fr; }
  .course-filters { flex-direction: column; align-items: stretch; }
  .filter-group { flex-direction: column; align-items: flex-start; }
  .filter-group select, .filter-group input[type="text"] { width: 100%; }
  .order-card-header { flex-direction: column; align-items: flex-start; }
  .order-status-info { width: 100%; justify-content: space-between; }
  .order-details-scroll-container .order-details-grid { min-width: 600px; grid-template-columns: 1fr 1fr; }
}
@media (max-width: 576px) {
  .cart-panel { max-width: 100vw; right: -100vw; }
  .auth-container, .account-container { padding: 2rem; }
}
`;
