// GlobalStyles.js
export const GlobalStyles = `
/*
==========================================================================
UI/UX ENHANCEMENT NOTES:
- REFINED COLOR & SHADOWS: Introduced softer, layered box shadows for depth.
- TYPOGRAPHY & SPACING: Improved typographic scale, line-height, and spacing for readability and visual hierarchy.
- SMOOTHER TRANSITIONS: Implemented cubic-bezier easing for more natural and polished animations.
- INTERACTIVITY: Enhanced hover states, focus rings, and visual feedback across all interactive elements.
- LAYOUT & COMPOSITION: Modernized layouts (Hero, About, Contact) and improved component-level design (Cards, Modals).
- RESPONSIVENESS: Overhauled mobile navigation and created adaptive layouts for key components like the Dashboard.
==========================================================================
*/
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
  /* Enhanced Shadows for a more realistic depth */
  --box-shadow-light: 0 1px 2px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.04);
  --box-shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --box-shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --box-shadow-inset: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  /* Transitions for smoother animations */
  --transition-speed: 0.3s;
  --transition-speed-fast: 0.2s;
  --easing-function: ease-in-out;
  --easing-dynamic: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --easing-springy: cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  /* This value is crucial for anchor link navigation. It ensures that when
     the page scrolls to a section, the content is not hidden behind the
     sticky header. It should match the height of the static header. */
  scroll-padding-top: 90px;
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

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-headings);
  color: var(--primary-blue);
  font-weight: 700;
  line-height: 1.3;
}

h1 {
  font-size: clamp(2.5rem, 5.5vw, 4rem);
  margin-bottom: 0.6em;
  font-weight: 800;
}

h2 {
  font-size: clamp(2.2rem, 4.5vw, 3rem);
  margin-bottom: 1em;
  text-align: center;
}

h3 {
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  margin-bottom: 0.5em;
  color: var(--primary-blue-dark);
}

h4 {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  margin-bottom: 0.5em;
  color: var(--accent-teal);
}

h5 {
  font-size: clamp(1.1rem, 2.8vw, 1.3rem);
  margin-bottom: 0.4em;
  color: var(--primary-blue);
}

h6 {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  margin-bottom: 0.3em;
  color: var(--primary-blue-dark);
}

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

a:hover {
  color: var(--accent-lime-dark);
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: var(--border-radius-sm);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  padding: 0.8em 1.8em;
  border-radius: var(--border-radius-pill);
  font-weight: 500;
  font-family: var(--font-headings);
  font-size: 15px;
  text-align: center;
  transition: all var(--transition-speed-fast) var(--easing-dynamic);
  cursor: pointer;
  border: 2px solid transparent;
  text-transform: uppercase;
  line-height: 1.5;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-primary {
  background-color: var(--accent-lime);
  color: var(--text-dark);
  border-color: var(--accent-lime);
  box-shadow: 0 4px 15px -5px rgba(162, 215, 41, 0.6);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--accent-lime-dark);
  border-color: var(--accent-lime-dark);
  color: var(--text-light);
  transform: translateY(-3px);
  box-shadow: 0 7px 20px -5px rgba(162, 215, 41, 0.5);
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary-blue);
  border-color: var(--primary-blue);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--primary-blue);
  color: var(--text-light);
  transform: translateY(-3px);
}

.btn-hero-secondary {
  background-color: transparent;
  color: var(--text-light);
  border-color: var(--text-light);
}

.btn-hero-secondary:hover:not(:disabled) {
  background-color: var(--text-light);
  color: var(--primary-blue-dark);
  transform: translateY(-3px);
}

.btn-small {
  padding: 0.6em 1.4em;
  font-size: 0.85rem;
}

.btn svg {
  font-size: 1.1em;
}

/* ==========================================================================
   MODIFIED: STATIC HEADER STYLES
   The header now has a single, fixed appearance. All 'scrolled' states and
   transitions have been removed to prevent any jitter or animation.
   ========================================================================== */
header {
  /* Core layout properties */
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  
  /* Static "scrolled" appearance */
  padding: 0.12rem;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--box-shadow-medium);
  border-bottom: 1px solid var(--neutral-light-gray);
  transition: padding var(--transition-speed) var(--easing-function);
}

header.scrolled {
  padding: 0.01rem;
}

/* REMOVED: The header.scrolled class is no longer needed. */

header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
}

/* MODIFIED: The logo now has a single, fixed size. */
.logo-container img {
  height: 64px;
  margin-top: 12px;
  margin-bottom: 10px;
  transition: height var(--transition-speed) var(--easing-springy);
  /* REMOVED: No transition needed for a static element. */
}

header.scrolled .logo-container img {
  height: 48px;
}

/* REMOVED: The 'header.scrolled .logo-container img' rule is no longer needed. */

/* DESKTOP NAVIGATION */
nav#desktopNav ul {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

nav#desktopNav ul li {
  margin-left: 1.75rem;
  position: relative;
}

nav#desktopNav ul li a,
nav#desktopNav ul li .nav-dropdown-toggle {
  font-family: var(--font-headings);
  font-weight: 500;
  color: var(--neutral-dark-gray);
  font-size: 1rem;
  padding: 0.75rem 0.5rem;
  position: relative;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: color var(--transition-speed) var(--easing-function);
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  background: none;
  border: none;
}

nav#desktopNav ul li .nav-dropdown-toggle svg {
  font-size: 0.8em;
  transition: transform var(--transition-speed-fast) var(--easing-function);
}

nav#desktopNav ul li:hover .nav-dropdown-toggle svg {
  transform: rotate(180deg);
}

/* Refined Desktop Dropdown Menu */
.nav-dropdown {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background-color: var(--text-light);
  box-shadow: var(--box-shadow-large);
  border-radius: var(--border-radius-md);
  padding: 0.75rem;
  min-width: 240px;
  z-index: 1010;
  transition: opacity var(--transition-speed-fast) var(--easing-function), transform var(--transition-speed-fast) var(--easing-function);
  border: 1px solid var(--neutral-light-gray);
  overflow: hidden;
}

nav#desktopNav ul li:hover .nav-dropdown {
  visibility: visible;
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  transition-delay: 0s;
}

.nav-dropdown li {
  margin-left: 0 !important;
  width: 100%;
  display: block !important; /* Ensure vertical stacking */
}

.nav-dropdown li a {
  display: block !important;
  padding: 0.7rem 1.2rem;
  color: var(--neutral-dark-gray);
  font-size: 0.95rem;
  white-space: nowrap;
  border-radius: var(--border-radius-sm);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-dropdown li a:hover {
  background-color: var(--neutral-light-gray);
  color: var(--primary-blue);
}

.nav-dropdown li a::after {
  display: none !important;
}

/* Refined Nav link underline effect for desktop */
nav#desktopNav ul li a:not(.nav-dropdown-toggle)::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0.5rem;
  right: 0.5rem;
  height: 3px;
  background-color: var(--accent-lime);
  border-radius: 3px;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--transition-speed) var(--easing-dynamic);
}

nav#desktopNav ul li a:not(.nav-dropdown-toggle):hover::after,
nav#desktopNav ul li a:not(.nav-dropdown-toggle).active::after {
  transform: scaleX(1);
}


nav#desktopNav ul li a:hover,
nav#desktopNav ul li .nav-dropdown-toggle:hover,
nav#desktopNav ul li a.active {
  color: var(--primary-blue);
}

.header-right-items {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-cart-icon {
  position: relative;
  cursor: pointer;
  color: var(--primary-blue);
  padding: 0.5rem;
  transition: color var(--transition-speed-fast) ease, transform 0.2s ease;
}

.header-cart-icon:hover {
  color: var(--primary-blue-dark);
  transform: scale(1.1);
}

.header-cart-icon svg {
  font-size: 1.7rem;
}

.cart-item-count {
  position: absolute;
  top: -2px;
  right: -4px;
  background-color: var(--warning-orange);
  color: var(--text-light);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: 2px solid var(--text-light);
  box-shadow: 0 0 10px rgba(253, 126, 20, 0.5);
}

.menu-toggle {
  display: none; /* Hidden on desktop */
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--primary-blue);
  background: none;
  border: none;
  padding: 0.5rem;
  transition: color var(--transition-speed-fast) ease, transform 0.3s var(--easing-dynamic);
  line-height: 1;
  z-index: 1005;
}

.menu-toggle:hover {
  color: var(--primary-blue-dark);
}

/* --- UPDATED: Endorsement Badges Styles --- */
.endorsement-badges {
  background-color: var(--text-light);
  padding: 2rem 0;
  text-align: center;
}

.endorsement-badges .container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  place-items: center;
}

.endorsement-badge {
  transition: transform 0.3s ease;
}

.endorsement-badge:hover {
  transform: scale(1.1);
}

.endorsement-badge img {
  max-height: 100px;
  max-width: 200px;
}

main {
  /* This overflow property is managed by body tag */
}

main section {
  padding: 6rem 0;
  display: none;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

main section#home {
  padding-top: 0;
}

main section#checkout,
main section#account,
main section#dashboard {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

main section#checkout,
main section#account,
main section#dashboard {
  padding-top: 2rem;
  padding-bottom: 2rem;
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

.hero {
  background: linear-gradient(rgba(0, 42, 115, 0.45), rgba(0, 10, 20, 0.85)), url('/assets/images/hero-background.jpg') no-repeat center center/cover;
  color: var(--text-light);
  padding: clamp(7rem, 20vh, 12rem) 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  position: relative;
}

.hero-content {
  max-width: 900px;
  animation: fadeInHero 1s ease-out forwards;
}

@keyframes fadeInHero {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero h1 {
  color: white;
  font-weight: 800;
  font-size: clamp(3rem, 7vw, 4.8rem);
  line-height: 1.15;
  margin-bottom: 0.6em;
  text-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  letter-spacing: -1.5px;
  text-wrap: balance;
}

.hero .hero-subtitle {
  color: rgba(245, 245, 245, 0.95);
  font-size: clamp(1.15rem, 3vw, 1.4rem);
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 3em;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6), 0 3px 10px rgba(0, 0, 0, 0.4);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hero .btn-group {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: center;
}

.hero .btn {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.hero .btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2.5rem;
}

/* Universal Card Styling */
.gmt-card {
  background-color: var(--text-light);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-light);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-speed) var(--easing-dynamic), box-shadow var(--transition-speed) var(--easing-dynamic);
  border: 1px solid var(--neutral-light-gray);
}

.gmt-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--box-shadow-large);
}

.gmt-card__image-container {
  height: 240px;
  position: relative;
  overflow: hidden;
  background-color: var(--neutral-light-gray);
}

.gmt-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--easing-dynamic);
}

.gmt-card:hover .gmt-card__image {
  transform: scale(1.08);
}

.course-card__image-container .tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--accent-lime);
  color: var(--text-dark);
  padding: 0.4em 1em;
  border-radius: var(--border-radius-pill);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  box-shadow: var(--box-shadow-light);
}

.gmt-card__content {
  padding: 1.75rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.gmt-card__title {
  margin-bottom: 0.5em;
  color: var(--primary-blue-dark);
  font-size: 1.6rem;
  line-height: 1.2;
}

.course-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--neutral-dark-gray);
  margin: 1rem 0 1.2rem;
  border-top: 1px solid var(--neutral-light-gray);
  padding-top: 1.2em;
}

.course-card__meta span {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.course-card__meta svg {
  color: var(--accent-teal);
  font-size: 1.2rem;
}

.course-card__price {
  font-weight: 700;
  font-size: 1.6rem;
  color: var(--primary-blue);
}

.btn btn-secondary {
  margin-right: 12px;
}

.gmt-card__description {
  font-size: 1rem;
  color: var(--neutral-dark-gray);
  margin-bottom: 1.5em;
  flex-grow: 1;
  line-height: 1.6;
}

.gmt-card__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.gmt-card__actions .btn {
  flex-grow: 1;
}

/* Service Detail Page Refinements */
.service-detail-page {
  padding: 4rem 0;
  background-color: var(--text-light);
}

.service-detail-page .container {
  max-width: 960px;
}

.service-detail-page-header {
  margin-bottom: 3rem;
  text-align: left;
}

.service-detail-page-header .back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  color: var(--primary-blue);
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.service-detail-page-header .back-link:hover {
  color: var(--primary-blue-dark);
  text-decoration: underline;
}

.service-detail-page-header h1 {
  text-align: left;
}

.service-detail-page-content img.featured-image {
  margin-bottom: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-medium);
}

.service-content-block {
  margin-bottom: 2.5em;
}

.service-content-block h3,
.service-content-block h4 {
  margin-bottom: 0.8em;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--neutral-light-gray);
}

.service-content-block ul {
  list-style: none;
  padding-left: 0;
  font-size: 1rem;
  color: var(--neutral-dark-gray);
}

.service-content-block ul li {
  margin-bottom: 0.8em;
  line-height: 1.6;
  padding-left: 2em;
  position: relative;
}

.service-content-block ul li::before {
  content: '✓';
  color: var(--accent-lime);
  position: absolute;
  left: 0;
  top: 2px;
  font-weight: bold;
  font-size: 1.2rem;
}

.service-content-block ul ul {
  margin-top: 0.8em;
  padding-left: 1.5rem;
}

.service-content-block ul ul li::before {
  content: '›';
  top: 0px;
}

/* Skeleton Loading Polish */
.skeleton-card {
  background-color: var(--text-light);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-light);
  overflow: hidden;
  border: 1px solid var(--neutral-light-gray);
}

@keyframes pulse {
  0%,
  100% {
    background-color: var(--neutral-light-gray);
  }
  50% {
    background-color: #e6e9ed;
  }
}

.skeleton-card__image {
  height: 240px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-card__content {
  padding: 1.75rem;
}

.skeleton-card__line {
  height: 1em;
  margin-bottom: 0.75em;
  border-radius: 4px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-card__line--title {
  width: 70%;
  height: 1.5em;
  margin-bottom: 1em;
}

.skeleton-card__line--short {
  width: 40%;
}

.skeleton-card__line--long {
  width: 90%;
}

/* Course Filters Polish */
.course-filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--text-light);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--neutral-light-gray);
  box-shadow: var(--box-shadow-light);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-group label {
  font-weight: 600;
  color: var(--primary-blue-dark);
  font-size: 0.9rem;
}

.filter-group select,
.filter-group input[type="text"] {
  padding: 0.6em 1em;
  border: 1px solid var(--neutral-medium-gray);
  border-radius: var(--border-radius-sm);
  font-family: var(--font-primary);
  font-size: 0.95rem;
  background-color: var(--text-light);
  min-width: 180px;
  transition: border-color var(--transition-speed-fast) ease, box-shadow var(--transition-speed-fast) ease;
}

.filter-group select:focus,
.filter-group input[type="text"]:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 4px rgba(0, 90, 156, 0.15);
}

/* ======================================================== */
/* === FINAL REFINED ABOUT US SECTION STYLES === */
/* ======================================================== */
/* --- 1. The Intro Block (Side-by-Side Layout) --- */
.about-intro-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
  margin-bottom: 4rem;
}

.about-intro__text h3 {
  margin-top: 0;
  margin-bottom: 1em;
  border-left: 4px solid var(--accent-lime);
  padding-left: 1rem;
  font-size: clamp(1.5rem, 4vw, 1.8rem);
  color: var(--primary-blue-darker);
}

.about-intro__text p {
  line-height: 1.7;
  max-width: 60ch;
}

.about-intro__image {
  position: sticky;
  top: 120px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--box-shadow-large);
}

.about-intro__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- 2. The Credentials Block (NOW NESTED) --- */
.about-credentials {
  margin-top: 3rem;
}

.about-credentials h4 {
  margin-top: 0;
  margin-bottom: 1.25rem;
  color: var(--primary-blue-dark);
  font-size: 1.3rem;
}

.about-credentials ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.about-credentials li {
  padding-left: 1.75rem;
  position: relative;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.about-credentials li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 2px;
  color: var(--accent-lime);
  font-weight: bold;
  font-size: 1.1rem;
}

/* --- 3. The Details Block (Principles Grid) --- */
.about-details-content {
  margin-top: 2rem;
}

.about-principles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.principle-card {
  /* FIX: Corrected undefined variables */
  background-color: var(--text-light); 
  border: 1px solid var(--neutral-light-gray);
  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-medium);
}

.principle-card h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--primary-blue-dark);
  border-left: 3px solid var(--accent-teal);
  padding-left: 0.75rem;
}

.principle-card ul {
  padding-left: 20px;
  margin-bottom: 0;
}

.principle-card li {
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

.principle-card--full-width {
  grid-column: 1 / -1;
}

/* Testimonials Section Polish */
.testimonials-section {
  background: linear-gradient(to bottom, var(--neutral-lightest), var(--neutral-light-gray));
}

.testimonial-slider {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.testimonial-card {
  background-color: var(--text-light);
  padding: 3rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-large);
  text-align: center;
  position: relative;
}

.testimonial-card__quote-icon {
  font-size: 4rem;
  color: var(--accent-lime);
  opacity: 0.2;
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  transform: rotate(-10deg);
}

.testimonial-card p {
  font-style: italic;
  color: var(--neutral-dark-gray);
  margin-bottom: 1.5rem;
  font-size: 1.15rem;
  line-height: 1.8;
}

.testimonial-card__author {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--primary-blue-dark);
  font-family: var(--font-headings);
}

.testimonial-card__author-title {
  font-size: 0.9rem;
  color: var(--accent-teal);
}

.testimonial-navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
}

.testimonial-navigation button {
  background: var(--text-light);
  color: var(--primary-blue);
  border: 1px solid var(--neutral-medium-gray);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--box-shadow-light);
  transition: all var(--transition-speed-fast) ease;
}

.testimonial-navigation button:hover:not(:disabled) {
  background: var(--primary-blue);
  color: var(--text-light);
  transform: scale(1.1);
  box-shadow: var(--box-shadow-medium);
}

.testimonial-navigation button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/*
==========================================================================
                      CONTACT SECTION & FORM
==========================================================================
*/
.contact-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  align-items: flex-start;
}

.contact-form-wrapper {
  background: var(--text-light);
  padding: 2.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-medium);
  border: 1px solid var(--neutral-light-gray);
}

.contact-form-wrapper h3 {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 600;
  color: var(--primary-blue-dark);
  font-size: 0.95rem;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
textarea,
select {
  width: 100%;
  padding: 0.8em 1em;
  border: 1px solid var(--neutral-medium-gray);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  font-family: var(--font-primary);
  transition: border-color var(--transition-speed-fast) ease, box-shadow var(--transition-speed-fast) ease;
  background-color: var(--neutral-lightest);
  box-shadow: var(--box-shadow-inset);
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 4px rgba(0, 90, 156, 0.15), var(--box-shadow-inset);
}

textarea {
  resize: vertical;
  min-height: 150px;
}

.contact-info-wrapper {
  background: var(--text-light);
  padding: 2.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-medium);
  border: 1px solid var(--neutral-light-gray);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-info-wrapper h3 {
  margin-bottom: 0;
}

.contact-info__item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--neutral-light-gray);
}

.contact-info__item:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.contact-info__item svg {
  font-size: 1.5rem;
  color: var(--accent-teal);
  margin-top: 0.2em;
  width: 25px;
  text-align: center;
  flex-shrink: 0;
}

.contact-info__item div strong {
  display: block;
  font-weight: 700;
  color: var(--primary-blue-dark);
  margin-bottom: 0.2rem;
  font-size: 1.1rem;
}

.contact-info__item div p,
.contact-info__item div a {
  margin-bottom: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--neutral-dark-gray) !important;
}

.contact-info__item div a:hover {
  color: var(--primary-blue) !important;
  text-decoration: underline;
}

.location-card {
  background-color: var(--neutral-lightest);
  border: 1px solid var(--neutral-medium-gray);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: all 0.3s var(--easing-dynamic);
  box-shadow: var(--box-shadow-light);
}

.location-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow-large);
  border-color: var(--primary-blue);
}

.location-card h4 {
  background-color: var(--neutral-light-gray);
  margin: 0;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75em;
  color: var(--primary-blue-dark);
  font-size: 1.2rem;
  border-bottom: 1px solid var(--neutral-medium-gray);
}

.location-card h4 svg {
  color: var(--primary-blue);
}

.location-card .location-address {
  padding: 1rem 1.5rem 0 1.5rem;
  margin-bottom: 0.75rem;
  font-style: italic;
  color: var(--neutral-dark-gray);
}

.location-card .location-contact-details {
  padding: 0 1.5rem 1rem 1.5rem;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.location-card .location-contact-details p {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin: 0;
}

.location-card .location-contact-details p a {
  color: var(--primary-blue) !important;
  font-weight: 500;
  transition: color 0.2s ease;
}

.location-card .location-contact-details p a:hover {
  color: var(--accent-lime-dark) !important;
}

.location-card .location-contact-details p svg {
  color: var(--accent-teal);
}

.location-card:first-of-type {
  position: relative;
  border: 1px solid var(--accent-lime);
}

.location-card:first-of-type::after {
  content: 'Head Office';
  position: absolute;
  top: 1rem;
  right: -1px;
  background-color: var(--accent-lime);
  color: var(--text-dark);
  padding: 0.25em 1em;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: var(--font-headings);
  border-radius: var(--border-radius-pill) 0 0 var(--border-radius-pill);
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.1);
}

.map-container-wrapper {
  position: relative;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin-top: 1.5rem;
  border: 1px solid var(--neutral-light-gray);
  box-shadow: var(--box-shadow-light);
}

.map-container {
  height: 250px;
}

.map-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
}

.map-control-btn {
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--neutral-medium-gray);
  border-radius: var(--border-radius-sm);
  padding: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--box-shadow-light);
  transition: all 0.2s ease;
}

.map-control-btn:hover {
  background-color: var(--text-light);
  transform: scale(1.1);
}

.map-control-btn svg {
  color: var(--primary-blue-dark);
  font-size: 1rem;
}

.map-container-wrapper.maximized {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3000;
  border-radius: 0;
}

.map-container-wrapper.maximized .map-container {
  height: 100vh;
}

footer {
  background-color: var(--primary-blue-dark);
  color: var(--neutral-light-gray);
  padding: 5rem 0 3rem; /* Increased padding for more space */
  border-top: 8px solid var(--accent-lime); /* Thicker, more prominent border */
  box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.1); /* Subtle inner shadow */
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Adjusted min-width for better responsiveness */
  gap: 3.5rem; /* Increased gap between columns */
  margin-bottom: 3.5rem; /* Increased margin */
  text-align: left;
}

.footer-column h4 {
  color: var(--accent-lime);
  margin-bottom: 1.5rem; /* Consistent margin */
  font-size: 1.6rem; /* Larger font for headings */
  text-transform: uppercase;
  letter-spacing: 1.5px; /* More pronounced letter spacing */
  text-shadow: 1px 1px 3px rgba(0,0,0,0.3); /* Stronger text shadow */
}

.footer-column p,
.footer-column ul li,
.footer-column ul li a {
  color: rgba(255, 255, 255, 0.85) !important; /* Lighter text for better readability */
  opacity: 1;
  font-size: 1rem; /* Standard font size */
  line-height: 1.8; /* Improved line height for readability */
  margin-bottom: 0.8rem; /* Consistent margin */
}

.footer-column ul li a {
  transition: color 0.3s ease, transform 0.3s ease; /* Smoother transition */
  display: inline-block;
  position: relative; /* For underline effect */
}

.footer-column ul li a:hover {
  color: var(--text-light) !important;
  transform: translateX(5px); /* More noticeable slide effect */
}

.footer-column ul li a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: var(--accent-lime);
  transition: width 0.3s ease; /* Underline animation */
}

.footer-column ul li a:hover::after {
  width: 100%;
}

.footer-socials {
  display: flex;
  gap: 1.5rem; /* Increased gap for social icons */
  margin-top: 2rem; /* Increased margin */
}

.footer-socials a {
  color: rgba(255, 255, 255, 0.75) !important; /* More visible social icons */
  font-size: 2rem; /* Larger social icons */
  opacity: 1;
  transition: all 0.3s ease; /* Smoother transition */
}

.footer-socials a:hover {
  color: var(--accent-lime) !important;
  transform: scale(1.25) translateY(-5px); /* More pronounced hover effect */
}

.footer-bottom {
  text-align: center;
  padding-top: 2.5rem; /* Increased padding */
  border-top: 1px solid rgba(255, 255, 255, 0.15); /* More visible border */
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.65); /* More visible copyright text */
  opacity: 1;
  margin: 0;
  font-size: 0.9rem; /* Standard font size */
}

.footer-column select {
  width: 100%;
  padding: 0.75em;
  margin-bottom: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-sm);
  font-family: var(--font-primary);
  cursor: pointer;
}

.footer-column select:focus {
  outline: none;
  border-color: var(--accent-lime);
}

.footer-column option {
  background-color: var(--primary-blue-dark);
  color: var(--text-light);
}

/* Modal Polish */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 42, 115, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-speed) ease, visibility 0s var(--transition-speed) linear;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
}

.modal-dialog {
  background-color: var(--text-light);
  padding: 0;
  border-radius: var(--border-radius-lg);
  width: 90%;
  max-width: 800px;
  box-shadow: var(--box-shadow-large);
  transform: scale(0.95) translateY(20px);
  opacity: 0;
  transition: transform var(--transition-speed) var(--easing-springy), opacity var(--transition-speed-fast) ease;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.modal-overlay.active .modal-dialog {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--neutral-light-gray);
}

.modal-header h3 {
  margin-bottom: 0;
  font-size: 1.8rem;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--neutral-dark-gray);
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  transition: color 0.2s ease, transform 0.2s ease;
}

.modal-close-btn:hover {
  color: var(--error-red);
  transform: rotate(90deg);
}

.modal-body {
  padding: 2rem;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-body img.course-image {
  width: 100%;
  max-height: 350px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
  margin-bottom: 2rem;
}

.modal-body .course-meta-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  padding: 1rem 0;
  border-top: 1px solid var(--neutral-light-gray);
  border-bottom: 1px solid var(--neutral-light-gray);
}

.modal-body .course-price-modal {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 1.5rem;
}

.modal-body h4 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.modal-body ul li {
  margin-bottom: 0.7rem;
  line-height: 1.7;
  padding-left: 1.5rem;
  position: relative;
}

.modal-body ul li::before {
  content: '•';
  color: var(--accent-lime);
  position: absolute;
  left: 0;
  font-weight: bold;
}

.modal-footer {
  text-align: right;
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--neutral-light-gray);
  background-color: var(--neutral-lightest);
  border-bottom-left-radius: var(--border-radius-lg);
  border-bottom-right-radius: var(--border-radius-lg);
}

/* Cart Panel Polish */
.cart-panel {
  position: fixed;
  top: 0;
  right: -500px;
  width: 100%;
  max-width: 480px;
  height: 100%;
  background-color: var(--text-light);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
  z-index: 2001;
  transition: right var(--transition-speed) var(--easing-dynamic);
  display: flex;
  flex-direction: column;
}

.cart-panel.active {
  right: 0;
}

.cart-header {
  /* UPDATED: Position close button properly */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--neutral-light-gray);
}

.cart-header h3 {
  margin: 0;
  color: var(--primary-blue);
  font-size: 1.5rem;
}

.cart-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex-grow: 1;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--neutral-light-gray);
  gap: 1.25rem;
  align-items: center;
}

.cart-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.cart-item img {
  width: 90px;
  height: 70px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
}

.cart-item-details h5 {
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
  color: var(--primary-blue-dark);
  line-height: 1.3;
}

.cart-item-price {
  font-size: 0.95rem;
  color: var(--neutral-dark-gray);
}

.cart-item-remove {
  background: none;
  border: none;
  color: var(--neutral-medium-gray);
  cursor: pointer;
  font-size: 1.4rem;
  padding: 0.5rem;
  line-height: 1;
  transition: all 0.2s ease;
}

.cart-item-remove:hover {
  color: var(--error-red);
  transform: scale(1.1);
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--neutral-light-gray);
  background-color: var(--neutral-lightest);
  box-shadow: 0 -5px 15px -5px rgba(0, 0, 0, 0.05);
}

.cart-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.cart-total span:first-child {
  color: var(--neutral-dark-gray);
}

.cart-total span:last-child {
  color: var(--primary-blue);
}

/* Toast Notification Polish */
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toast {
  color: var(--text-light);
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow-large);
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transform: translateX(120%);
  animation: slideInToast 0.4s var(--easing-dynamic) forwards, fadeOutToast 0.4s var(--easing-dynamic) 3.6s forwards;
  min-width: 320px;
}

.toast.success {
  background: linear-gradient(to right, var(--success-green), #34c759);
}

.toast.error {
  background: linear-gradient(to right, var(--error-red), #e55353);
}

.toast.info {
  background: linear-gradient(to right, var(--primary-blue), #007aff);
}

.toast svg {
  font-size: 1.5rem;
  flex-shrink: 0;
}

@keyframes slideInToast {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOutToast {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(120%);
  }
}

/* Checkout Page Polish */
.checkout-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  align-items: flex-start;
}

.billing-details-form {
  background: var(--text-light);
  padding: 2.5rem;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--neutral-light-gray);
  box-shadow: var(--box-shadow-medium);
}

.billing-details-form h3,
.order-summary h3 {
  font-size: 1.8rem;
  color: var(--primary-blue-dark);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--neutral-light-gray);
}

.order-summary {
  padding: 2.5rem;
  border: 2px solid var(--primary-blue);
  border-radius: var(--border-radius-lg);
  background-color: var(--text-light);
  position: sticky;
  top: 110px;
  box-shadow: var(--box-shadow-medium);
}

.order-summary-table tfoot .total td {
  font-size: 1.6rem;
  color: var(--primary-blue);
}

.banking-details-box {
  background-color: var(--neutral-light-gray);
  border: 1px solid var(--neutral-medium-gray);
  border-left: 5px solid var(--accent-lime);
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: var(--border-radius-md);
}

.banking-details-box h4 {
  color: var(--primary-blue-dark);
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.banking-details-box ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.banking-details-box li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.banking-details-box p.status-note {
  font-size: 0.9rem;
  font-style: italic;
  color: var(--neutral-dark-gray);
}

.place-order-btn {
  width: 100%;
  margin-top: 1.5rem;
  padding: 1.1em;
  font-size: 1.1rem;
}

/* Dashboard Polish */
.dashboard-container {
  max-width: 1100px;
}

.orders-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1rem;
  background-color: transparent;
  box-shadow: none;
}

.orders-table thead {
  display: none;
}

.orders-table tbody tr {
  background-color: var(--text-light);
  box-shadow: var(--box-shadow-medium);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  display: block;
  margin-bottom: 1.5rem;
  transition: box-shadow 0.2s ease;
}

.orders-table tbody tr:hover {
  box-shadow: var(--box-shadow-large);
}

.order-main-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  align-items: center;
  cursor: pointer;
}

.order-cell {
  display: flex;
  flex-direction: column;
}

.order-cell-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--neutral-dark-gray);
  margin-bottom: 0.25rem;
}

.order-cell-value {
  font-weight: 600;
  color: var(--text-dark);
}

.status-badge {
  padding: 0.4em 1em;
  border-radius: var(--border-radius-pill);
  font-weight: 600;
  font-size: 0.8rem;
  white-space: nowrap;
  text-align: center;
}

.status-badge.pending-payment {
  background-color: #fff8e1;
  color: #f57f17;
}

.status-badge.processing {
  background-color: #e3f2fd;
  color: #1565c0;
}

.status-badge.completed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-badge.cancelled {
  background-color: #ffebee;
  color: #c62828;
}

.order-details-content-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out, padding 0.4s ease-in-out;
  padding: 0 1.5rem;
  background-color: #fafcfe;
}

.order-details-content-wrapper.expanded {
  max-height: 1000px;
  padding: 1.5rem;
  border-top: 1px solid var(--neutral-light-gray);
}

.order-details-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.order-details-content h4 {
  grid-column: 1 / -1;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  border-bottom: 1px solid var(--neutral-light-gray);
  padding-bottom: 0.5rem;
}

/* Expandable Section */
.expandable-section {
  background-color: var(--neutral-lightest);
  border: 1px solid var(--neutral-light-gray);
  border-radius: var(--border-radius-md);
  margin-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: var(--box-shadow-light);
}

.expandable-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: var(--neutral-light-gray);
  border: none;
  cursor: pointer;
  font-family: var(--font-headings);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-blue-dark);
  transition: background-color 0.2s ease;
}

.expandable-header:hover {
  background-color: var(--neutral-medium-gray);
}

.expandable-header h3 {
  margin: 0; /* Override default h3 margin */
  color: inherit; /* Inherit color from parent button */
}

.expandable-header svg {
  transition: transform 0.3s ease;
}

.expandable-header svg.expanded {
  transform: rotate(180deg);
}

.expandable-content {
  padding: 0 1.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, padding 0.5s ease-in-out;
}

.expandable-content.open {
  max-height: 500px; /* Adjust as needed based on content height */
  padding: 1.5rem;
}

.expandable-content form {
  padding-top: 1rem; /* Add some space above the form fields */
}

/* Expandable Section */
.expandable-section {
  background-color: var(--neutral-lightest);
  border: 1px solid var(--neutral-light-gray);
  border-radius: var(--border-radius-md);
  margin-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: var(--box-shadow-light);
}

.expandable-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: var(--neutral-light-gray);
  border: none;
  cursor: pointer;
  font-family: var(--font-headings);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-blue-dark);
  transition: background-color 0.2s ease;
}

.expandable-header:hover {
  background-color: var(--neutral-medium-gray);
}

.expandable-header h3 {
  margin: 0; /* Override default h3 margin */
  color: inherit; /* Inherit color from parent button */
}

.expandable-header svg {
  transition: transform 0.3s ease;
}

.expandable-header svg.expanded {
  transform: rotate(180deg);
}

.expandable-content {
  padding: 0 1.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, padding 0.5s ease-in-out;
}

.expandable-content.open {
  max-height: 500px; /* Adjust as needed based on content height */
  padding: 1.5rem;
}

.expandable-content form {
  padding-top: 1rem; /* Add some space above the form fields */
}

/* Expandable Section */
.expandable-section {
  background-color: var(--neutral-lightest);
  border: 1px solid var(--neutral-light-gray);
  border-radius: var(--border-radius-md);
  margin-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: var(--box-shadow-light);
}

.expandable-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: var(--neutral-light-gray);
  border: none;
  cursor: pointer;
  font-family: var(--font-headings);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-blue-dark);
  transition: background-color 0.2s ease;
}

.expandable-header:hover {
  background-color: var(--neutral-medium-gray);
}

.expandable-header h3 {
  margin: 0; /* Override default h3 margin */
  color: inherit; /* Inherit color from parent button */
}

.expandable-header svg {
  transition: transform 0.3s ease;
}

.expandable-header svg.expanded {
  transform: rotate(180deg);
}

.expandable-content {
  padding: 0 1.5rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, padding 0.5s ease-in-out;
}

.expandable-content.open {
  max-height: 500px; /* Adjust as needed based on content height */
  padding: 1.5rem;
}

.expandable-content form {
  padding-top: 1rem; /* Add some space above the form fields */
}

/* Auth & Account Polish */
.auth-container,
.account-container {
  max-width: 550px;
  margin: 0 auto;
  padding: 3rem;
  background-color: var(--text-light);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-large);
  border-top: 5px solid var(--primary-blue);
}

.account-container {
  max-width: 800px;
}

.account-section h3 {
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--neutral-light-gray);
}

.auth-tabs {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--neutral-medium-gray);
}

.auth-tab {
  flex: 1;
  text-align: center;
  padding: 1rem;
  font-family: var(--font-headings);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--neutral-dark-gray);
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
  margin-bottom: -1px;
}

.auth-tab.active {
  color: var(--primary-blue);
  border-bottom-color: var(--primary-blue);
}

/* User Menu Polish */
.desktop-only {
  display: flex;
  align-items: center;
}

.header-user-menu-toggle {
  display: flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
  font-family: var(--font-headings);
  font-weight: 500;
  color: var(--neutral-dark-gray);
  background: var(--neutral-light-gray);
  border: 1px solid var(--neutral-medium-gray);
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-pill);
  transition: all 0.2s ease;
}

.header-user-menu-toggle:hover {
  color: var(--primary-blue);
  background-color: #e9ecef;
}

.header-user-menu-toggle svg:last-child {
  transition: transform 0.2s ease;
}

.user-dropdown {
  right: 0;
  min-width: 200px;
  left: auto;
  transform: none;
}

.user-dropdown li button {
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 0.7rem 1.2rem;
  font-size: 0.95rem;
  color: var(--neutral-dark-gray);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8em;
  font-family: var(--font-primary);
  border-radius: var(--border-radius-sm);
}

.user-dropdown li button:hover {
  background-color: var(--neutral-light-gray);
  color: var(--primary-blue);
}


/* ==========================================================================
                     NEW MOBILE NAVIGATION STYLES
   These styles create the full-screen modal navigation for mobile/tablet.
   ========================================================================== */

/* Keyframes for the modal fade-in animation */
@keyframes fadeInModal {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Base styles are hidden, only shown inside the media query */
.mobile-nav-container {
    display: none;
}


/* ==========================================================================
                       RESPONSIVE STYLES
========================================================================== */

/* --- Tablet & Mobile Breakpoint (1024px and below) --- */
@media (max-width: 1024px) {
  /* --- 1. Hide Desktop Nav & Show Mobile Hamburger Icon --- */
  nav#desktopNav {
    display: none;
  }
  .desktop-only {
    display: none;
  }
  .menu-toggle {
    display: block;
  }

  /* --- UPDATED: Endorsement Badges Styles --- */
.endorsement-badges {
  background-color: var(--text-light);
  padding: 0px;
  text-align: center;
}

.endorsement-badges .container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  place-items: start;
}

.endorsement-badge {
  transition: transform 0.3s ease;
}

.endorsement-badge:hover {
  transform: scale(1.1);
}

.endorsement-badge img {
  max-height: 100px;
  max-width: 200px;
  padding: 10px;
}

  

  /* --- 2. Mobile Nav Modal Container --- */
  .mobile-nav-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1050;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0s 0.3s linear;
  }
  .mobile-nav-container.active {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }

  /* --- 3. Dark Overlay with Brand Color --- */
  .mobile-nav-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* CHANGED: Use a semi-transparent version of the brand's dark blue */
    background-color: var(--primary-blue-dark); 
    backdrop-filter: blur(4px);
  }

  /* --- 4. The Modal Itself with Brand Color --- */
  .mobile-nav-modal {
    position: relative;
    /* CHANGED: Use the brand's dark blue for the background */
    background-color: var(--primary-blue-dark);
    width: 90%;
    max-width: 400px;
    padding: 3rem 1.5rem;
    border-radius: var(--border-radius-lg);
    /* Add a subtle border */
    border: 1px solid var(--primary-blue);
    box-shadow: var(--box-shadow-large);
    animation: fadeInModal 0.4s var(--easing-dynamic) forwards;
  }
  
  /* --- 5. Close Button --- */
  .mobile-nav-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--text-light);
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
    opacity: 0.7;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .mobile-nav-close:hover {
    opacity: 1;
    /* CHANGED: Use accent color on hover for consistency */
    color: var(--accent-lime);
    transform: rotate(90deg);
  }

  /* --- 6. Navigation List & Items --- */
  .mobile-nav-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .mobile-nav-item {
    /* CHANGED: Use a more subtle branded border color */
    border-bottom: 1px solid rgba(0, 90, 156, 0.4);
  }
  .mobile-nav-item:last-child {
    border-bottom: none;
  }
  
  /* --- 7. Main Links & Accordion Toggles --- */
  .mobile-nav-link, .mobile-nav-accordion-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1.2rem 0.5rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-light); /* White text is perfect on dark blue */
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-headings);
    transition: color 0.2s ease;
  }
  /* Use the brand's primary accent color for hovers and active states */
  .mobile-nav-link:hover, 
  .mobile-nav-accordion-toggle:hover,
  .mobile-nav-accordion-toggle svg {
    color: var(--accent-lime);
  }

  /* --- 8. Submenu (Accordion Content) --- */
  .mobile-nav-submenu-wrapper {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0.2); /* Slightly darker nested area */
    border-radius: var(--border-radius-sm);
  }
  .mobile-nav-submenu-wrapper.open {
    max-height: 200px;
    padding-bottom: 0.5rem;
  }
  .mobile-nav-submenu {
    padding: 0.5rem 0 0.5rem 1.5rem;
  }
  .mobile-nav-sublink {
    display: block;
    padding: 0.5rem;
    font-size: 1rem;
    color: var(--neutral-medium-gray); /* Lighter gray for secondary links */
    transition: color 0.2s ease, padding-left 0.2s ease;
  }
  
  /* NEW: Style for the sign-out button to match the link */
  button.mobile-nav-sublink {
      background: none;
      border: none;
      cursor: pointer;
      width: 100%;
      text-align: left;
      font-family: inherit; /* Inherit from the modal's font */
      font-weight: 400; /* Match link styles */
  }

  .mobile-nav-sublink:hover, button.mobile-nav-sublink:hover {
    color: var(--accent-lime);
    padding-left: 10px;
  }

  /* --- 9. Other Layout Adjustments for Mobile --- */
  .about-intro-layout, .contact-grid, .checkout-grid { grid-template-columns: 1fr; }
  .about-intro__image { order: -1; position: static; margin-bottom: 2rem; }
  .contact-info-wrapper, .order-summary { position: static; margin-top: 2rem; }
  .order-details-content { grid-template-columns: 1fr; }
}


/* --- Smaller Mobile Breakpoint --- */
@media (max-width: 768px) {
 .card-grid, .about-principles-grid, .endorsement-badges .container, .form-row, .order-main-info {
    grid-template-columns: 1fr;
  }
  .course-filters { flex-direction: column; align-items: stretch; }
  .filter-group { flex-direction: column; align-items: flex-start; }
  .filter-group select, .filter-group input[type="text"] { width: 100%; }
  .endorsement-badges .container { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  .endorsement-badge img { max-height: 65px; }
}

@media (max-width: 576px) {
  .hero h1 { font-size: 2.4rem; }
  .hero .hero-subtitle { font-size: 1.1rem; }
  .btn { padding: 0.7em 1.6em; font-size: 0.9rem; }
  .hero .btn-group, .gmt-card__actions { flex-direction: column; }
  .cart-panel { max-width: 100vw; right: -100vw; }
  .auth-container, .account-container { padding: 2rem; }
}
`;