/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, useCallback, createContext, useContext, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// Import specific icons from react-icons/fa for Font Awesome
import {
    FaGraduationCap, FaConciergeBell, FaShoppingCart, FaBars, FaTimes,
    FaThList, FaUserGraduate, FaStopwatch, FaInfoCircle, FaCartPlus,
    FaCheckCircle, FaHandshake, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
    FaClock, FaPaperPlane, FaTrashAlt, FaCreditCard, FaChalkboardTeacher,
    FaSpinner, FaSearch, FaSortAmountDown, FaSortAmountUp, FaFilter,
    FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaRss,
    FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram,
    FaWhatsapp,
    FaPhone,
    FaExpand, FaCompress, FaUserCircle, FaSignOutAlt, FaKey, FaUserEdit
} from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';

// Import hardcoded data
import {
    companyInfoData,
    locationsData,
    coursesData,
    servicesData as originalServicesData, // renamed to avoid conflict with state
    aboutUsData,
} from './appData'; // Assuming appData.js is in src/

const appServicesData = originalServicesData.map(service => ({
    ...service,
    // Ensure each service has a unique, URL-friendly ID.
    id: service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
}));


const navLinksData = [
    { id: 'home', text: 'Home', type: 'link' },
    {
        id: 'services-dropdown',
        text: 'Services',
        type: 'dropdown',
        subItems: [
            // Simplified dropdown with two distinct categories
            { id: 'nav-courses', text: 'Training Courses', href: '#courses' },
            { id: 'nav-consultancy', text: 'Consultancy Services', href: '#services' },
        ]
    },
    { id: 'about', text: 'About Us', type: 'link' },
    { id: 'contact', text: 'Contact', type: 'link' },
];


// --- CSS (as a string to be injected) ---
const globalStyles = `
    :root {
        --primary-blue: #005A9C;
        --primary-blue-dark: #004273;
        --accent-lime: #A2D729;
        --accent-lime-dark: #82b01e;
        --accent-teal: #008080;
        --success-green: #28a745;
        --warning-orange: #fd7e14;
        --error-red: #dc3545;
        --neutral-lightest: #f8f9fa;
        --neutral-light-gray: #e9ecef;
        --neutral-medium-gray: #ced4da;
        --neutral-dark-gray: #6c757d;
        --text-dark: #212529;
        --text-light: #ffffff;

        --font-primary: 'Open Sans', sans-serif;
        --font-headings: 'Montserrat', sans-serif;

        --border-radius-sm: 6px;
        --border-radius-md: 10px;
        --box-shadow-light: 0 4px 12px rgba(0, 0, 0, 0.07);
        --box-shadow-medium: 0 8px 25px rgba(0, 0, 0, 0.1);
        --transition-speed: 0.3s;
        --transition-speed-fast: 0.2s;
        --easing-function: ease;
        --easing-dynamic: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        --easing-springy: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
        font-size: 100%;
        scroll-padding-top: 81px; /* Scrolled Header height */
    }

    body {
        font-family: var(--font-primary);
        line-height: 1.7;
        color: var(--text-dark);
        background-color: var(--neutral-lightest);
        font-size: 1rem;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .container {
        width: 90%;
        max-width: 1280px;
        margin: 0 auto;
    }

    h1, h2, h3, h4, h5, h6 { /* Added h5, h6 for service card content */
        font-family: var(--font-headings);
        color: var(--primary-blue);
        font-weight: 700;
        line-height: 1.3;
    }
    h1 { font-size: clamp(2.4rem, 5.5vw, 3.8rem); margin-bottom: 0.6em; font-weight: 800;}
    h2 { font-size: clamp(2rem, 4.5vw, 2.8rem); margin-bottom: 1em; text-align: center;}
    h3 { font-size: clamp(1.4rem, 3.5vw, 1.9rem); margin-bottom: 0.5em; color: var(--primary-blue-dark);}
    h4 { font-size: clamp(1.2rem, 3vw, 1.4rem); margin-bottom: 0.5em; color: var(--accent-teal);}
    h5 { font-size: clamp(1.1rem, 2.8vw, 1.3rem); margin-bottom: 0.4em; color: var(--primary-blue);}
    h6 { font-size: clamp(1rem, 2.5vw, 1.2rem); margin-bottom: 0.3em; color: var(--primary-blue-dark);}


    p { margin-bottom: 1.2em; color: var(--neutral-dark-gray); font-size: 1.05rem; }
    a { text-decoration: none; color: var(--accent-lime); transition: color var(--transition-speed) var(--easing-function); }
    a:hover { color: var(--accent-lime-dark); }
    ul { list-style: none; }
    img { max-width: 100%; height: auto; display: block; border-radius: var(--border-radius-sm); }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        padding: 0.75em 1.75em;
        border-radius: var(--border-radius-sm);
        font-weight: 700;
        font-family: var(--font-headings);
        font-size: 0.95rem;
        text-align: center;
        transition: all var(--transition-speed-fast) var(--easing-function);
        cursor: pointer;
        border: none;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        line-height: 1.5;
    }
    .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    .btn-primary {
        background-color: var(--accent-lime);
        color: var(--text-dark);
        box-shadow: 0 2px 5px rgba(162,215,41,0.3);
    }
    .btn-primary:hover:not(:disabled) {
        background-color: var(--accent-lime-dark);
        color: var(--text-light);
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(162,215,41,0.4);
    }
    .btn-secondary {
        background-color: transparent;
        color: var(--primary-blue);
        border: 2px solid var(--primary-blue);
    }
    .btn-secondary:hover:not(:disabled) {
        background-color: var(--primary-blue);
        color: var(--text-light);
        transform: translateY(-2px);
    }
    .btn-hero-secondary {
        background-color: transparent;
        color: var(--text-light);
        border: 2px solid var(--text-light);
    }
    .btn-hero-secondary:hover:not(:disabled) {
        background-color: var(--text-light);
        color: var(--primary-blue-dark);
        transform: translateY(-2px);
    }
    .btn-small { padding: 0.5em 1.25em; font-size: 0.85rem; }
    .btn svg { margin-right: 0.5em; font-size: 1.1em; }


    header {
        background-color: var(--text-light);
        padding: 0.75rem 0;
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        box-shadow: var(--box-shadow-light);
        transition: padding var(--transition-speed) var(--easing-function), box-shadow var(--transition-speed) var(--easing-function);
    }
    header.scrolled {
        padding: 0.5rem 0;
        box-shadow: var(--box-shadow-medium);
    }

    header .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logo-container { display: flex; align-items: center; }
    .logo-container img {
        height: 75px;
        transition: height var(--transition-speed) var(--easing-function);
    }
    header.scrolled .logo-container img {
        height: 65px;
    }

    /* Nav general */
    nav#mainNav ul {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    nav#mainNav ul li {
        margin-left: 1.75rem;
        position: relative; /* For dropdown positioning */
    }
    nav#mainNav ul li a, nav#mainNav ul li .nav-dropdown-toggle { /* Style toggle like a link */
        font-family: var(--font-headings);
        font-weight: 500;
        color: var(--neutral-dark-gray);
        font-size: 1rem;
        padding: 0.75rem 0.5rem;
        position: relative;
        cursor: pointer;
        letter-spacing: 0.3px;
        transition: color var(--transition-speed) var(--easing-function);
        display: inline-flex; /* For icon alignment in toggle */
        align-items: center;
        gap: 0.3em;
        background: none;
        border: none;
    }
    nav#mainNav ul li .nav-dropdown-toggle svg {
      font-size: 0.8em;
      transition: transform var(--transition-speed-fast) var(--easing-function);
    }
     nav#mainNav ul li:hover .nav-dropdown-toggle svg,
     nav#mainNav ul li .nav-dropdown-toggle.open svg {
        transform: rotate(180deg);
    }

    /* Dropdown Menu Styles */
    .nav-dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: var(--text-light);
        box-shadow: var(--box-shadow-medium);
        border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
        padding: 0.5rem 0;
        min-width: 220px;
        z-index: 1010; /* Above other nav items */
        opacity: 0;
        transform: translateY(10px);
        transition: opacity var(--transition-speed-fast) var(--easing-function), transform var(--transition-speed-fast) var(--easing-function);
    }
    nav#mainNav ul li:hover .nav-dropdown { /* Show on hover for desktop */
        display: block;
        opacity: 1;
        transform: translateY(0);
    }
    .nav-dropdown li {
        margin-left: 0 !important; /* Override parent li margin */
        width: 100%;
    }
    .nav-dropdown li a {
        display: block;
        padding: 0.6rem 1.2rem;
        color: var(--neutral-dark-gray);
        font-size: 0.95rem;
        white-space: nowrap;
    }
    .nav-dropdown li a:hover {
        background-color: var(--neutral-light-gray);
        color: var(--primary-blue);
    }
    .nav-dropdown li a::after { display: none !important; } /* No underline for dropdown items */


    @media (min-width: 992.02px) {
        nav#mainNav ul li a:not(.nav-dropdown-toggle)::after { /* Exclude toggle from underline */
            content: '';
            position: absolute;
            bottom: 0.25rem;
            left: 0.5rem;
            right: 0.5rem;
            width: 0;
            height: 3px;
            background-color: var(--accent-lime);
            transition: width var(--transition-speed) var(--easing-function);
            margin: 0 auto;
        }
        nav#mainNav ul li a:not(.nav-dropdown-toggle):hover::after,
        nav#mainNav ul li a:not(.nav-dropdown-toggle).active::after {
            width: calc(100% - 1rem);
        }
    }

    nav#mainNav ul li a:hover,
    nav#mainNav ul li .nav-dropdown-toggle:hover,
    nav#mainNav ul li a.active,
    nav#mainNav ul li .nav-dropdown-toggle.active {
        color: var(--primary-blue);
    }

    .header-right-items {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .header-cart-icon {
        position: relative;
        cursor: pointer;
        color: var(--primary-blue);
        padding: 0.5rem;
        transition: color var(--transition-speed-fast) var(--easing-function);
    }
    .header-cart-icon:hover {
      color: var(--primary-blue-dark);
    }
    .header-cart-icon svg { font-size: 1.6rem; }
    .cart-item-count {
        position: absolute;
        top: 0px;
        right: 0px;
        background-color: var(--warning-orange);
        color: var(--text-light);
        border-radius: 50%;
        width: 22px;
        height: 22px;
        font-size: 0.7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border: 2px solid var(--text-light);
    }
    .menu-toggle {
        display: none;
        font-size: 1.8rem;
        cursor: pointer;
        color: var(--primary-blue);
        background: none;
        border: none;
        padding: 0.5rem;
        transition: color var(--transition-speed-fast) var(--easing-function);
        line-height: 1;
    }
    .menu-toggle:hover {
      color: var(--primary-blue-dark);
    }

    .endorsement-badges {
        background-color: var(--text-light);
        padding: 1.5rem 0;
        text-align: center;
        border-bottom: 1px solid var(--neutral-medium-gray);
        position: static;
    }
    .endorsement-badges .container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        gap: 1.5rem;
    }
    .endorsement-badge img {
        max-height: 50px;
        max-width: 130px;
        transition: transform var(--transition-speed) var(--easing-function);
    }
    .endorsement-badge img:hover {
        transform: scale(1.08);
    }

    main section {
        padding: 5rem 0;
        display: none;
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    main section#home { padding-top: 0; }
    main section.active-section {
        display: block;
        opacity: 1;
        transform: translateY(0);
    }
    .section-header { text-align: center; margin-bottom: 3.5rem; }
    .section-header .subtitle {
        font-family: var(--font-primary);
        color: var(--accent-teal);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        display: block;
    }

    .hero {
        background: linear-gradient(rgba(0, 25, 50, 0.55), rgba(0, 10, 20, 0.7)), url('/assets/images/hero-background.jpg') no-repeat center center/cover;
        color: var(--text-light);
        padding: clamp(6rem, 15vh, 10rem) 0;
        text-align: left;
        display: flex;
        align-items: center;
        min-height: 80vh;
    }
    .hero-content { max-width: 800px; }
    .hero h1 {
        color: var(--text-light);
        font-weight: 800;
        font-size: clamp(2.8rem, 7vw, 4.5rem);
        margin-bottom: 0.5em;
        text-shadow: 2px 2px 6px rgba(0,0,0,0.3);
    }
    .hero .hero-subtitle {
        font-size: clamp(1.1rem, 2.8vw, 1.4rem);
        margin-bottom: 2.5em;
        opacity: 0.9;
        line-height: 1.8;
        max-width: 700px;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    }
    .hero .btn-group { display: flex; gap: 1rem; flex-wrap: wrap; }
    .hero .btn { margin-top: 0.5em; }


    .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
        gap: 2.5rem;
    }
    .course-card { /* Also used by ServiceCard */
        background-color: var(--text-light);
        border-radius: var(--border-radius-md);
        box-shadow: var(--box-shadow-light);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform var(--transition-speed) var(--easing-function), box-shadow var(--transition-speed) var(--easing-function);
        border: 1px solid var(--neutral-light-gray);
    }
    .course-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--box-shadow-medium);
    }
    .course-card__image-container {
        height: 240px;
        position: relative;
        overflow: hidden;
    }
    .course-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s var(--easing-function);
    }
    .course-card:hover .course-card__image { transform: scale(1.1); }
    .course-card__image-container .tag {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background-color: var(--accent-lime);
        color: var(--text-dark);
        padding: 0.3em 0.8em;
        border-radius: var(--border-radius-sm);
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
    }
    .course-card__content { padding: 1.75rem; flex-grow: 1; display: flex; flex-direction: column; }
    .course-card__title { margin-bottom: 0.5em; color: var(--primary-blue-dark); font-size: 1.5rem;}
    .course-card__instructor {
        font-size: 0.9rem;
        color: var(--neutral-dark-gray);
        margin-bottom: 1em;
        display: flex;
        align-items: center;
        gap: 0.4em;
    }
    .course-card__instructor svg { color: var(--accent-teal); }

    .course-card__meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
        color: var(--neutral-dark-gray);
        margin-bottom: 1.2em;
        border-top: 1px solid var(--neutral-light-gray);
        padding-top: 1.2em;
    }
    .course-card__meta span { display: flex; align-items: center; gap: 0.4em;}
    .course-card__meta svg { color: var(--accent-teal); font-size: 1.2rem; }
    .course-card__price { font-weight: 700; font-size: 1.4rem; color: var(--primary-blue); }

    .course-card__description {
        font-size: 0.95rem;
        color: var(--neutral-dark-gray);
        margin-bottom: 1.5em;
        flex-grow: 1;
        line-height: 1.6;
    }
    .course-card__actions {
        display: flex;
        gap: 0.75rem;
        margin-top: auto; /* This will push actions to bottom if content above is less */
    }
    .course-card__actions .btn { flex-grow: 1; }

    /* Styles for ServiceCard specific content */
    .service-content-block { margin-bottom: 1.5em; }
    .service-content-block h3, .service-content-block h4, .service-content-block h5 {
        margin-bottom: 0.6em;
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
    .service-content-block h3 svg, .service-content-block h4 svg { font-size: 0.8em; color: var(--primary-blue); }

    .service-content-block ul {
        list-style: disc;
        padding-left: 1.5rem;
        font-size: 0.95rem;
        color: var(--neutral-dark-gray);
    }
    .service-content-block ul li { margin-bottom: 0.5em; line-height: 1.6; }
    .service-content-block ul ul { /* Nested lists */
        margin-top: 0.5em;
        list-style-type: circle;
    }
    .service-content-block img {
        margin-top: 1em;
        margin-bottom: 1em;
        border: 1px solid var(--neutral-light-gray);
    }
    .two-column-service-list {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap; /* Allow stacking on small screens */
    }
    .two-column-service-list .column {
        flex: 1;
        min-width: 280px; /* Ensure columns don't get too squished */
    }
    .two-column-service-list .column-left {
        background-color: var(--primary-blue);
        color: var(--text-light);
        padding: 1.5rem;
        border-radius: var(--border-radius-sm);
    }
    .two-column-service-list .column-left h4, .two-column-service-list .column-left h5 {
        color: var(--accent-lime);
    }
    .two-column-service-list .column-left ul {
        list-style: none;
        padding-left: 0;
    }
    .two-column-service-list .column-left ul li {
        padding-left: 1.5em;
        position: relative;
        color: var(--neutral-lightest);
    }
    .two-column-service-list .column-left ul li::before {
        content: '✓';
        color: var(--accent-lime);
        position: absolute;
        left: 0;
        font-weight: bold;
    }
    .two-column-service-list .column-left ul ul {
        padding-left: 1em; /* Indent sub-items */
        margin-top: 0.3em;
    }
     .two-column-service-list .column-left ul ul li::before {
        content: '›'; /* Different marker for sub-items */
    }

    /* NEW: Styles for Service Detail Page */
    .service-detail-page {
        padding: 4rem 0;
        background-color: var(--text-light);
    }
    .service-detail-page .container {
        max-width: 960px; /* More focused content width */
    }
    .service-detail-page-header {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--neutral-light-gray);
    }
    .service-detail-page-header h1 {
        text-align: left;
    }
    .service-detail-page-header .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5em;
        color: var(--primary-blue);
        font-weight: 600;
        margin-bottom: 1rem;
    }
    .service-detail-page-header .back-link:hover {
        color: var(--primary-blue-dark);
    }
    .service-detail-page-content img {
        margin: 1.5rem 0;
        box-shadow: var(--box-shadow-light);
    }


    .skeleton-card {
        background-color: var(--text-light);
        border-radius: var(--border-radius-md);
        box-shadow: var(--box-shadow-light);
        overflow: hidden;
        border: 1px solid var(--neutral-light-gray);
    }
    .skeleton-card__image {
        height: 240px;
        background-color: var(--neutral-light-gray);
        animation: pulse 1.5s infinite ease-in-out;
    }
    .skeleton-card__content { padding: 1.75rem; }
    .skeleton-card__line {
        height: 1em;
        background-color: var(--neutral-light-gray);
        margin-bottom: 0.75em;
        border-radius: var(--border-radius-sm);
        animation: pulse 1.5s infinite ease-in-out;
    }
    .skeleton-card__line--title { width: 70%; height: 1.5em; margin-bottom: 1em; }
    .skeleton-card__line--short { width: 40%; }
    .skeleton-card__line--long { width: 90%; }

    @keyframes pulse {
        0% { background-color: var(--neutral-light-gray); }
        50% { background-color: var(--neutral-medium-gray); }
        100% { background-color: var(--neutral-light-gray); }
    }

    .course-filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      align-items: center;
      padding: 1rem;
      background-color: var(--text-light);
      border-radius: var(--border-radius-md);
      box-shadow: var(--box-shadow-light);
    }
    .filter-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .filter-group label {
      font-weight: 600;
      color: var(--primary-blue-dark);
      font-size: 0.9rem;
    }
    .filter-group select, .filter-group input[type="text"] {
      padding: 0.5em 0.75em;
      border: 1px solid var(--neutral-medium-gray);
      border-radius: var(--border-radius-sm);
      font-family: var(--font-primary);
      font-size: 0.9rem;
      background-color: var(--text-light);
      min-width: 150px;
      transition: border-color var(--transition-speed) var(--easing-function), box-shadow var(--transition-speed) var(--easing-function);
    }
    .filter-group select:focus, .filter-group input[type="text"]:focus {
        outline: none;
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(0, 90, 156, 0.2);
    }
    .filter-group select {
      cursor: pointer;
    }


    .about-layout { display: flex; gap: 3rem; align-items: flex-start; /* Align top for long text */ }
    .about-layout__text { flex: 1.2; }
    .about-layout__image-container {
        flex: 1;
        border-radius: var(--border-radius-md);
        overflow: hidden;
        box-shadow: var(--box-shadow-medium);
        position: sticky; /* Make image sticky if text is longer */
        top: 100px; /* Adjust based on header height + some padding */
    }
    .about-layout__image-container img { transition: transform 0.5s var(--easing-function); }
    .about-layout__image-container:hover img { transform: scale(1.05); }

    .about-section-content ul { padding-left: 1.2rem; margin-bottom: 1.5em; list-style: disc; }
    .about-section-content ul li {
        margin-bottom: 0.7em;
        color: var(--neutral-dark-gray);
        font-size: 1.05rem;
    }
    .about-section-content ul.check-list { padding-left: 0; list-style: none; }
    .about-section-content ul.check-list li {
        margin-bottom: 1em;
        padding-left: 2rem;
        position: relative;
    }
    .about-section-content ul.check-list li svg {
        color: var(--success-green);
        position: absolute;
        left: 0;
        top: 0.25em;
        font-size: 1.3rem;
    }
    .about-section-content h3 { margin-top: 1.5em; margin-bottom: 0.8em;}
    .about-section-content p:first-of-type { margin-top:0;}


    .testimonials-section {
      background-color: var(--neutral-light-gray);
    }
    .testimonial-card {
      background-color: var(--text-light);
      padding: 2rem;
      border-radius: var(--border-radius-md);
      box-shadow: var(--box-shadow-light);
      text-align: center;
      position: relative;
    }
    .testimonial-card__quote-icon {
      font-size: 2.5rem;
      color: var(--accent-lime);
      opacity: 0.5;
      position: absolute;
      top: 1rem;
      left: 1.5rem;
    }
    .testimonial-card p {
      font-style: italic;
      color: var(--neutral-dark-gray);
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
      line-height: 1.8;
    }
    .testimonial-card__author {
      font-weight: 700;
      color: var(--primary-blue-dark);
      font-family: var(--font-headings);
    }
    .testimonial-card__author-title {
      font-size: 0.85rem;
      color: var(--accent-teal);
    }
    .testimonial-navigation {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }
    .testimonial-navigation button {
      background: var(--primary-blue);
      color: var(--text-light);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color var(--transition-speed-fast) var(--easing-function);
    }
    .testimonial-navigation button:hover:not(:disabled) {
      background: var(--primary-blue-dark);
    }
    .testimonial-navigation button:disabled {
      background: var(--neutral-medium-gray);
      cursor: not-allowed;
      opacity: 0.7;
    }


    .contact-grid { display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 3rem; }
    .contact-form .form-group { margin-bottom: 1.5rem; }
    .contact-form label, .auth-form-container label, .account-section label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--primary-blue); font-size: 0.95rem;}
    .contact-form input, .contact-form textarea, .contact-form select, .auth-form-container input, .account-section input {
        width: 100%;
        padding: 0.8em 1em;
        border: 1px solid var(--neutral-medium-gray);
        border-radius: var(--border-radius-sm);
        font-size: 1rem;
        font-family: var(--font-primary);
        transition: border-color var(--transition-speed) var(--easing-function), box-shadow var(--transition-speed) var(--easing-function);
        background-color: var(--text-light);
    }
    .contact-form input:focus, .contact-form textarea:focus, .contact-form select:focus, .auth-form-container input:focus, .account-section input:focus {
        outline: none;
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(0, 90, 156, 0.2);
    }
    .contact-form textarea { resize: vertical; min-height: 160px; }

    .contact-info { background-color: var(--text-light); padding: 2.5rem; border-radius: var(--border-radius-md); box-shadow: var(--box-shadow-light); border: 1px solid var(--neutral-light-gray);}
    .contact-info__item { margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 1rem;}
    .contact-info__item svg {
        font-size: 1.6rem; color: var(--accent-teal); margin-top: 0.2em; width: 25px; text-align: center; flex-shrink: 0;
    }
    .contact-info__item strong { display: block; font-weight: 700; color: var(--primary-blue-dark); margin-bottom: 0.2rem; font-size: 1.05rem;}
    .contact-info__item p { margin-bottom: 0; font-size: 0.95rem; line-height: 1.6; white-space: pre-line; }
    .map-container {
        height: 200px;
        width: 100%;
        border-radius: var(--border-radius-sm);
        overflow: hidden;
        margin-top: 0.75rem;
        border: 1px solid var(--neutral-light-gray);
        background-color: var(--neutral-light-gray);
    }

    /* --- Styles for the maximizable map --- */
    .map-container-wrapper {
        position: relative;
        border-radius: var(--border-radius-sm);
        overflow: hidden;
    }
    .map-controls {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 5; /* Above map tiles */
    }
    .map-control-btn {
        background-color: rgba(255, 255, 255, 0.9);
        border: 1px solid var(--neutral-medium-gray);
        border-radius: var(--border-radius-sm);
        padding: 0;
        width: 32px;
        height: 32px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--box-shadow-light);
        transition: background-color 0.2s ease, transform 0.2s ease;
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
        z-index: 3000; /* High z-index to be on top of everything */
        border-radius: 0;
    }
    .map-container-wrapper.maximized .map-container {
        height: 100vh;
    }
    .map-container-wrapper.maximized .map-controls {
        top: 20px;
        right: 20px;
    }
    .map-container-wrapper.maximized .map-control-btn {
        width: 40px;
        height: 40px;
    }
    .map-container-wrapper.maximized .map-control-btn svg {
        font-size: 1.2rem;
    }


    footer {
        background-color: var(--primary-blue-dark);
        color: var(--neutral-light-gray);
        padding: 4rem 0 2rem;
        margin-top: 4rem;
    }
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2.5rem;
      text-align: left;
    }
    .footer-column h4 {
      color: var(--accent-lime);
      margin-bottom: 1rem;
      font-size: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .footer-column p, .footer-column ul li, .footer-column ul li a {
      color: var(--neutral-light-gray) !important;
      opacity: 0.85;
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
    }
    .footer-column ul li a {
        transition: color var(--transition-speed) var(--easing-function), opacity var(--transition-speed) var(--easing-function);
    }
    .footer-column ul li a:hover {
      color: var(--text-light) !important;
      opacity: 1;
      text-decoration: underline;
    }
    .footer-column-address p {
        white-space: pre-line;
        margin-bottom: 0.3em;
    }
    .footer-socials { display: flex; gap: 1rem; margin-top: 1rem; }
    .footer-socials a {
      color: var(--neutral-light-gray) !important;
      font-size: 1.5rem;
      opacity: 0.85;
      transition: color var(--transition-speed) var(--easing-function), transform var(--transition-speed) var(--easing-function);
    }
    .footer-socials a:hover {
      color: var(--accent-lime) !important;
      transform: scale(1.1);
    }
    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .footer-bottom p { color: var(--neutral-light-gray); opacity: 0.7; margin: 0; font-size: 0.9rem;}

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


    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 20, 40, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--transition-speed) var(--easing-function), visibility 0s var(--transition-speed) linear;
    }
    .modal-overlay.active {
        opacity: 1;
        visibility: visible;
        transition-delay: 0s;
    }
    .modal-dialog {
        background-color: var(--text-light);
        padding: 0;
        border-radius: var(--border-radius-md);
        width: 90%;
        max-width: 750px;
        box-shadow: var(--box-shadow-medium);
        transform: scale(0.9);
        opacity: 0;
        transition: transform var(--transition-speed) var(--easing-springy), opacity var(--transition-speed-fast) var(--easing-function);
        display: flex;
        flex-direction: column;
        max-height: 90vh;
    }
    .modal-overlay.active .modal-dialog { transform: scale(1); opacity: 1;}
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem 1.75rem;
        border-bottom: 1px solid var(--neutral-light-gray);
    }
    .modal-header h3 { margin-bottom: 0; font-size: 1.6rem; }
    .modal-close-btn { background: none; border: none; font-size: 1.8rem; color: var(--neutral-dark-gray); cursor: pointer; padding: 0.5rem; line-height: 1; transition: color var(--transition-speed-fast) var(--easing-function);}
    .modal-close-btn:hover { color: var(--text-dark); }
    .modal-body {
        padding: 1.75rem;
        overflow-y: auto;
        flex-grow: 1;
    }
    .modal-body::-webkit-scrollbar { width: 8px; }
    .modal-body::-webkit-scrollbar-thumb { background: var(--neutral-medium-gray); border-radius: 4px; }
    .modal-body img.course-image { width: 100%; max-height: 320px; object-fit: cover; border-radius: var(--border-radius-sm); margin-bottom: 1.5rem; }
    .modal-body .course-meta-details { display: flex; flex-wrap: wrap; gap: 1rem 1.75rem; margin-bottom: 1.5rem; font-size: 0.95rem; }
    .modal-body .course-meta-details span { display: flex; align-items: center; color: var(--neutral-dark-gray); gap: 0.5em;}
    .modal-body .course-meta-details svg { color: var(--accent-teal); font-size: 1.3rem; }
    .modal-body .course-price-modal { font-size: 2rem; font-weight: 700; color: var(--primary-blue); margin-bottom: 1.25rem; }
    .modal-body h4 { margin-top: 1.75rem; margin-bottom: 0.75rem; font-size: 1.3rem;}
    .modal-body ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
    .modal-body ul li { margin-bottom: 0.6rem; line-height: 1.6; }
    .modal-footer {
        text-align: right;
        padding: 1.25rem 1.75rem;
        border-top: 1px solid var(--neutral-light-gray);
        background-color: var(--neutral-lightest);
        border-bottom-left-radius: var(--border-radius-md);
        border-bottom-right-radius: var(--border-radius-md);
    }

    .cart-panel {
        position: fixed;
        top: 0;
        right: -450px;
        width: 100%;
        max-width: 450px;
        height: 100%;
        background-color: var(--text-light);
        box-shadow: -8px 0 30px rgba(0,0,0,0.1);
        z-index: 2001;
        transition: right var(--transition-speed) var(--easing-dynamic);
        display: flex;
        flex-direction: column;
    }
    .cart-panel.active { right: 0; }
    .cart-header {
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid var(--neutral-light-gray);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .cart-header h3 { margin: 0; color: var(--primary-blue); font-size: 1.4rem;}
    .cart-body { padding: 1.5rem; overflow-y: auto; flex-grow: 1; }
    .cart-item {
        display: flex;
        margin-bottom: 1.25rem;
        padding-bottom: 1.25rem;
        border-bottom: 1px solid var(--neutral-light-gray);
        gap: 1rem;
        align-items: center;
    }
    .cart-item:last-child { border-bottom: none; margin-bottom: 0; }
    .cart-item img { width: 80px; height: 60px; object-fit: cover; border-radius: var(--border-radius-sm); flex-shrink: 0;}
    .cart-item-details { flex-grow: 1; }
    .cart-item-details h5 { font-size: 1.05rem; margin-bottom: 0.3rem; color: var(--primary-blue-dark); }
    .cart-item-price { font-size: 0.9rem; color: var(--neutral-dark-gray); }
    .cart-item-remove { background: none; border: none; color: var(--warning-orange); cursor: pointer; font-size: 1.3rem; padding: 0.5rem; line-height: 1; transition: color var(--transition-speed-fast) var(--easing-function);}
    .cart-item-remove:hover { color: var(--error-red); }
    .cart-empty-message { text-align: center; color: var(--neutral-dark-gray); margin-top: 2rem; font-size: 1.05rem;}
    .cart-footer { padding: 1.5rem; border-top: 1px solid var(--neutral-light-gray); background-color: var(--neutral-lightest); }
    .cart-total { display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: 700; margin-bottom: 1.5rem; }
    .cart-total span:first-child { color: var(--neutral-dark-gray); }
    .cart-total span:last-child { color: var(--primary-blue); }

    .toast-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .toast {
      background-color: var(--text-dark);
      color: var(--text-light);
      padding: 1rem 1.5rem;
      border-radius: var(--border-radius-sm);
      box-shadow: var(--box-shadow-medium);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      opacity: 0;
      transform: translateX(100%);
      animation: slideInToast 0.3s var(--easing-dynamic) forwards, fadeOutToast 0.3s var(--easing-dynamic) 3.7s forwards;
    }
    .toast.success { background-color: var(--success-green); }
    .toast.error { background-color: var(--error-red); }
    .toast.info { background-color: var(--primary-blue); }
    .toast svg { font-size: 1.3rem; }

    @keyframes slideInToast {
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeOutToast {
      to { opacity: 0; transform: translateX(100%); }
    }

    /* --- CHECKOUT PAGE STYLES --- */
    .info-banner {
        border: 1px solid var(--accent-teal);
        background-color: #f0f8f8;
        padding: 1em 1.5em;
        margin-bottom: 2rem;
        border-radius: var(--border-radius-sm);
        font-size: 0.95rem;
    }
    .info-banner a {
        font-weight: 600;
        color: var(--accent-teal);
        text-decoration: underline;
    }
    .checkout-grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 3rem;
        align-items: flex-start;
    }
    .billing-details h3, .order-summary h3 {
        font-size: 1.8rem;
        color: var(--primary-blue-dark);
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--neutral-light-gray);
    }
    .form-row {
        display: flex;
        gap: 1.5rem;
    }
    .form-row .form-group {
        flex: 1;
    }
    .order-summary {
        padding: 2rem;
        border: 2px solid var(--primary-blue);
        border-radius: var(--border-radius-md);
        background-color: var(--text-light);
        position: sticky;
        top: 100px;
    }
    .order-summary-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1.5rem;
    }
    .order-summary-table thead th {
        text-align: left;
        padding-bottom: 0.8em;
        font-family: var(--font-headings);
        color: var(--primary-blue);
        border-bottom: 2px solid var(--neutral-light-gray);
        font-size: 1.1rem;
    }
    .order-summary-table tbody td {
        padding: 1em 0;
        border-bottom: 1px solid var(--neutral-light-gray);
        font-size: 0.9rem;
    }
    .order-summary-table .product-name {
        font-weight: 600;
        color: var(--neutral-dark-gray);
    }
     .order-summary-table .product-total {
        font-weight: 700;
        color: var(--text-dark);
        text-align: right;
    }
    .order-summary-table tfoot td {
        padding: 1em 0;
        font-weight: 700;
        font-size: 1.1rem;
    }
    .order-summary-table tfoot .total td {
        font-size: 1.4rem;
        color: var(--primary-blue);
    }

    .payment-methods {
        list-style: none;
        padding: 1.5rem;
        border: 1px solid var(--neutral-light-gray);
        border-radius: var(--border-radius-sm);
        background-color: var(--neutral-lightest);
    }
    .payment-methods li {
        margin-bottom: 0.5em;
    }
    .payment-methods li:last-child {
        margin-bottom: 0;
    }
    .payment-methods label {
        font-weight: 600;
        cursor: pointer;
    }
    .payment-methods input[type="radio"] {
        margin-right: 0.75em;
    }
    .payment-box {
        background-color: var(--text-light);
        padding: 1.25em;
        margin-top: 1em;
        border-radius: var(--border-radius-sm);
        font-size: 0.9rem;
        line-height: 1.6;
        border-left: 3px solid var(--accent-lime);
    }
    .payment-box p:last-child {
        margin-bottom: 0;
    }

    .place-order-btn {
        width: 100%;
        margin-top: 1.5rem;
        padding: 1em;
        font-size: 1.1rem;
    }

    /* --- AUTH & ACCOUNT STYLES --- */
    .auth-container, .account-container {
        max-width: 500px;
        margin: 0 auto;
        padding: 2.5rem;
        background-color: var(--text-light);
        border-radius: var(--border-radius-md);
        box-shadow: var(--box-shadow-medium);
    }
     .account-container {
        max-width: 800px;
    }
    .account-section .form-group {
        margin-bottom: 1.2rem;
    }
    .account-section h3 {
        margin-top: 2rem;
        margin-bottom: 1.5rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--neutral-light-gray);
    }
    .account-section h3:first-of-type {
        margin-top: 0;
    }
    .auth-tabs {
        display: flex;
        margin-bottom: 2rem;
        border-bottom: 2px solid var(--neutral-light-gray);
    }
    .auth-tab {
        flex: 1;
        text-align: center;
        padding: 0.8rem 1rem;
        font-family: var(--font-headings);
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--neutral-dark-gray);
        background: none;
        border: none;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        transition: all 0.2s ease;
    }
    .auth-tab.active {
        color: var(--primary-blue);
        border-bottom-color: var(--primary-blue);
    }
    .auth-form-container .form-group {
        margin-bottom: 1.2rem;
    }
    .auth-form-container .btn {
        width: 100%;
        margin-top: 1rem;
    }
    .auth-message {
        padding: 1rem;
        border-radius: var(--border-radius-sm);
        background-color: var(--success-green);
        color: var(--text-light);
        margin-bottom: 1.5rem;
        text-align: center;
    }
    .forgot-password-link {
        display: block;
        text-align: right;
        margin-top: -0.8rem;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
    }
    .header-user-menu {
        position: relative;
    }
     .header-user-menu-toggle {
        display: flex;
        align-items: center;
        gap: 0.5em;
        cursor: pointer;
        font-family: var(--font-headings);
        font-weight: 500;
        color: var(--neutral-dark-gray);
        background: none; border: none;
        font-size: 1rem;
    }
    .header-user-menu-toggle:hover {
        color: var(--primary-blue);
    }
     .header-user-menu-toggle svg {
        font-size: 1.5rem;
    }
    .user-dropdown {
        right: 0;
        min-width: 180px;
    }
    .user-dropdown li button {
        background: none;
        border: none;
        width: 100%;
        text-align: left;
        padding: 0.6rem 1.2rem;
        font-size: 0.95rem;
        color: var(--neutral-dark-gray);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.7em;
        font-family: var(--font-primary);
    }
     .user-dropdown li button:hover {
        background-color: var(--neutral-light-gray);
        color: var(--primary-blue);
    }


    @media (max-width: 992px) {
        html {
            scroll-padding-top: 75px;
        }

        nav#mainNav {
            position: fixed;
            top: 0;
            right: 0;
            width: 300px;
            height: 100vh;
            background-color: var(--text-light);
            box-shadow: var(--box-shadow-medium);
            transform: translateX(100%);
            transition: transform var(--transition-speed) var(--easing-dynamic);
            padding-top: 1rem;
            z-index: 1001;
            display: block;
        }
        nav#mainNav.active { transform: translateX(0); }

        nav#mainNav ul {
            flex-direction: column; /* Stack items vertically */
            align-items: flex-start; /* Align items to the start (left) */
            gap:0;
        }
        nav#mainNav ul li {
            margin-left: 0;
            width: 100%;
        }
        nav#mainNav ul li a, nav#mainNav ul li .nav-dropdown-toggle {
            display: block; /* Full width for touch targets */
            width: 100%;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--neutral-light-gray);
            text-align: left;
            justify-content: space-between; /* For toggle icon */
        }
        nav#mainNav ul li .nav-dropdown-toggle svg {
           font-size: 1em; /* Ensure icon is visible */
        }
        nav#mainNav ul li a::after { /* Mobile nav link indicator */
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: auto;
            width: 0;
            height: 100%;
            background-color: var(--accent-lime);
            opacity: 0;
            transition: width var(--transition-speed) var(--easing-function), opacity var(--transition-speed) var(--easing-function);
            z-index: -1;
            margin:0;
        }
        nav#mainNav ul li a:hover::after {
            width: 100%;
            opacity: 0.05;
        }
        nav#mainNav ul li a.active::after {
            width: 5px;
            opacity: 1;
        }

        /* Mobile Dropdown (Collapsible) */
        nav#mainNav .nav-dropdown {
            display: none; /* Hidden by default */
            position: static; /* Not absolute on mobile */
            opacity: 1;
            transform: none;
            box-shadow: none;
            padding-left: 1.5rem; /* Indent dropdown items */
            padding-top: 0;
            padding-bottom: 0;
            background-color: transparent;
        }
        nav#mainNav .nav-dropdown.open {
            display: block; /* Show when toggle is open */
        }
        nav#mainNav .nav-dropdown li a {
            padding: 0.75rem 1.5rem;
            font-size: 0.9rem;
            border-bottom: none; /* Remove border from sub-items or make it lighter */
             border-top: 1px solid var(--neutral-light-gray); /* Separator for sub-items */
        }

        .menu-toggle {
            display: block;
            z-index: 1002;
        }

        .hero-content { text-align: center; }
        .hero .btn-group { justify-content: center; }

        .contact-grid { grid-template-columns: 1fr; }
        .contact-info { margin-top: 2.5rem; }
        .about-layout { flex-direction: column; }
        .about-layout__image-container {
            margin-top: 2.5rem;
            width: 90%; margin-left: auto;
            margin-right: auto;
            position: static; /* Override sticky for mobile */
        }
        .footer-content { text-align: center;}
        .footer-socials {justify-content:center;}

        .checkout-grid { grid-template-columns: 1fr; }
        .order-summary { position: static; margin-top: 2.5rem; }
    }
     @media (max-width: 576px) {
        html {
            scroll-padding-top: 75px;
        }
        .logo-container img {
            height: 60px;
        }
        header.scrolled .logo-container img {
            height: 55px;
        }
        nav#mainNav { width: 280px; }

        .card-grid { grid-template-columns: 1fr; }
        .hero h1 { font-size: 2.2rem; }
        .hero .hero-subtitle { font-size: 1.05rem; }
        .btn { padding: 0.6em 1.5em; font-size: 0.9rem; }
        .course-card__actions { flex-direction: column; }
        .course-card__actions .btn { width: 100%; }
        .hero .btn-group { flex-direction: column; align-items: center;}
        .hero .btn { width: fit-content; min-width: 200px;}

        .cart-panel { max-width: 90vw; right: -90vw;}
        .testimonial-card {padding: 1.5rem;}

        .course-filters { flex-direction: column; align-items: stretch; }
        .filter-group select, .filter-group input[type="text"] { width: 100%; }

        .form-row { flex-direction: column; gap: 0;}
    }
`;

const StyleInjector = ({ css }) => {
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        const styleId = 'global-app-styles';
        styleElement.id = styleId;

        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css;
        } else {
            styleElement.appendChild(document.createTextNode(css));
        }

        const oldStyle = document.getElementById(styleId);
        if (oldStyle) {
            oldStyle.remove();
        }
        document.head.appendChild(styleElement);

    }, [css]);
    return null;
};

// --- Supabase Client Initialization ---
const SUPABASE_URL = 'https://vkbjymcjlvctisskeghu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrYmp5bWNqbHZjdGlzc2tlZ2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjM5MTQsImV4cCI6MjA2NDU5OTkxNH0.wS8XzlzU5rygq50NfyY1y4JdoTzmfa64w2REea8EyO0';
let supabase;
try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (error) {
    console.error("Error initializing Supabase client with createClient:", error);
}

// --- Google Maps API Key ---
const GOOGLE_MAPS_API_KEY = 'AIzaSyDjbjUIXLo7d3FX6tezU66JUVKa40qHOKM';

// --- Toast Context for Notifications ---
const ToastContext = createContext();
const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const toastIdRef = useRef(0);

    const addToast = useCallback((message, type = 'info') => {
        const id = toastIdRef.current++;
        setToasts(prevToasts => [...prevToasts, { id, message, type }]);
        setTimeout(() => {
            setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
        }, 4000);
    }, []);

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast ${toast.type}`}>
                        {toast.type === 'success' && <FaCheckCircle />}
                        {toast.type === 'error' && <FaTimes />}
                        {toast.type === 'info' && <FaInfoCircle />}
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};


// --- Helper Components ---
const NavigateLink = ({ href, children, className, activeView, setView, setNavOpen, style }) => {
    const safeHref = href || '#';
    const mainSectionForHref = safeHref.startsWith('#service/') ? 'services' : safeHref.substring(1);
    const activeSection = (activeView || '').startsWith('service/') ? 'services' : activeView;

    const handleClick = (e) => {
        e.preventDefault();
        if (setView) {
            const targetView = safeHref.substring(1);
            setView(targetView);
        }
        if (setNavOpen) {
            setNavOpen(false);
        }
    };

    return (
        <a
            href={safeHref}
            onClick={handleClick}
            className={`${className || ''} ${activeSection === mainSectionForHref ? 'active' : ''}`}
            style={style}
        >
            {children}
        </a>
    );
};

const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton-card__image"></div>
        <div className="skeleton-card__content">
            <div className="skeleton-card__line skeleton-card__line--title"></div>
            <div className="skeleton-card__line skeleton-card__line--short"></div>
            <div className="skeleton-card__line skeleton-card__line--long"></div>
            <div className="skeleton-card__line"></div>
            <div style={{display: 'flex', gap: '0.5rem', marginTop: '1.5rem'}}>
                <div className="skeleton-card__line" style={{flexGrow: 1, height: '2.5em', marginBottom: 0}}></div>
                <div className="skeleton-card__line" style={{flexGrow: 1, height: '2.5em', marginBottom: 0}}></div>
            </div>
        </div>
    </div>
);

// --- Main App Component ---
function App() {
    const [view, setView] = useState('home');
    const [session, setSession] = useState(null);
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
    const [isNavOpen, setNavOpen] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    const [viewAfterLogin, setViewAfterLogin] = useState(null);
    const addToast = useToast();

    const allLocalCourses = coursesData;
    const featuredLocalCourses = coursesData.filter(c => c.is_featured).slice(0,3);
    const currentLocalServicesData = appServicesData;
    const currentLocalLocationsData = locationsData;
    const currentLocalCompanyInfo = companyInfoData;
    const currentLocalAboutUsData = aboutUsData;
    const currentNavLinksData = navLinksData;

    // --- Auth and Data Fetching Effects ---
    useEffect(() => {
        if (!supabase) return;

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
             if (_event === 'PASSWORD_RECOVERY') {
                setView('update-password');
            }
        });

        return () => subscription.unsubscribe();
    }, []);


    useEffect(() => {
        // if (!supabase) {
        //     console.warn("Supabase client not initialized. Testimonial fetching skipped.");
        //     setIsLoading(false);
        //     return;
        // }
        // setIsLoading(true);
        const fetchTestimonials = async () => {
            try {
                // const { data, error } = await supabase
                //     .from('testimonials')
                //     .select('*')
                //     .order('created_at', { ascending: false });

                // if (error) throw error;
                setTestimonials([]);
            } catch (error) {
                // console.error('Error fetching testimonials from Supabase:', error.message);
                // addToast(`Error loading testimonials: ${error.message}`, 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchTestimonials();
    }, [addToast]);

    useEffect(() => {
        window.initMapsWrapperGlobal = () => {
            setGoogleMapsLoaded(true);
        };
        if (GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY' || !GOOGLE_MAPS_API_KEY) {
            console.warn("Google Maps API key is not set. Maps will not load.");
            return;
        }
        const scriptId = 'google-maps-api-script';
        if (document.getElementById(scriptId)) {
             if (window.google && window.google.maps) setGoogleMapsLoaded(true);
             return;
        }
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMapsWrapperGlobal&loading=async&defer`;
        script.async = true; script.defer = true;
        document.head.appendChild(script);
        return () => { delete window.initMapsWrapperGlobal; };
    }, []);

    // --- Navigation and Routing Logic ---
    useEffect(() => {
        const handleScroll = () => setIsHeaderScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const currentHash = window.location.hash.substring(1);
        if (currentHash.startsWith('access_token')) {
            // This is likely a password reset callback, let the onAuthStateChange handle it.
            return;
        }
        if (currentHash === 'checkout' && !session) {
            setView('login');
            setViewAfterLogin('checkout');
        } else {
            setView(currentHash || 'home');
        }
    }, []);

    useEffect(() => {
        const handlePopState = (event) => {
            const newView = event.state?.view || window.location.hash.substring(1) || 'home';
            setView(newView);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
         if (view === 'checkout' && !session) {
            setView('login');
            setViewAfterLogin('checkout');
            addToast('Please sign in to proceed to checkout.', 'info');
            return;
        }
        const newHash = `#${view}`;
        if (window.location.hash !== newHash) {
            history.pushState({ view }, '', newHash);
        }

        const mainSectionId = view.startsWith('service/') ? 'services' : view;

        setTimeout(() => {
             const element = mainSectionId === 'home' ? document.body : document.getElementById(mainSectionId);
             if (element) {
                const offset = (view.startsWith('service/') || ['checkout', 'login', 'account', 'password-reset', 'update-password'].includes(view)) ? 81 : 0;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - (mainSectionId === 'home' ? 0 : offset);
                
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 100);
    }, [view, session]);

    // --- Cart, Modal, and Auth Handlers ---
    useEffect(() => {
        const storedCart = localStorage.getItem('gmtSafetyCart');
        if (storedCart) {
            try { setCart(JSON.parse(storedCart)); }
            catch (e) { console.error("Error parsing cart", e); localStorage.removeItem('gmtSafetyCart');}
        }
    }, []);
    useEffect(() => { localStorage.setItem('gmtSafetyCart', JSON.stringify(cart)); }, [cart]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setView('home');
        addToast("You have been signed out.", "info");
    };

    const openCourseModal = (course) => { setSelectedCourseForModal(course); setIsModalOpen(true); };
    const closeCourseModal = () => setIsModalOpen(false);

    const addToCartHandler = (courseToAdd) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === courseToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === courseToAdd.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
                );
            }
            return [...prevCart, { ...courseToAdd, quantity: 1, imageSeed: courseToAdd.image_seed || courseToAdd.imageSeed }];
        });
        addToast(`${courseToAdd.title} added to cart!`, 'success');
        setIsCartOpen(true);
    };

    const handleAddToCartAndCloseModal = (course) => { addToCartHandler(course); closeCourseModal(); }
    const removeFromCartHandler = (courseId) => {
        const removedItem = cart.find(item => item.id === courseId);
        setCart(prevCart => prevCart.filter(item => item.id !== courseId));
        if (removedItem) addToast(`${removedItem.title} removed from cart.`, 'info');
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            addToast('Your cart is empty.', 'error');
            return;
        }
        setIsCartOpen(false);
        if (session) {
            setView('checkout');
        } else {
            setViewAfterLogin('checkout');
            setView('login');
            addToast('Please sign in to continue.', 'info');
        }
    };

    // --- Render Logic ---
    const serviceId = view.startsWith('service/') ? view.substring('service/'.length) : null;
    const serviceToShow = serviceId ? currentLocalServicesData.find(s => s.id === serviceId) : null;
    const activeMainSection = view.startsWith('service/') ? 'services' : view;
    
    const renderContent = () => {
        switch (view) {
            case 'login':
                return <AuthSection id="login" activeSection={activeMainSection} supabaseClient={supabase} setView={setView} addToast={addToast} viewAfterLogin={viewAfterLogin} />;
            case 'password-reset':
                return <PasswordResetSection id="password-reset" activeSection={activeMainSection} supabaseClient={supabase} setView={setView} addToast={addToast} />;
            case 'update-password':
                 return <UpdatePasswordSection id="update-password" activeSection={activeMainSection} supabaseClient={supabase} setView={setView} addToast={addToast} />;
            case 'account':
                if (!session) { setView('login'); return null; } // Guard route
                return <AccountSection id="account" activeSection={activeMainSection} session={session} supabaseClient={supabase} addToast={addToast} />;
            case 'checkout':
                 if (!session) { setView('login'); return null; } // Guard route
                 return <CheckoutSection id="checkout" activeSection={activeMainSection} cart={cart} setCart={setCart} setView={setView} supabaseClient={supabase} addToast={addToast} session={session}/>;
            default:
                if (serviceToShow) {
                    return <ServiceDetailPage service={serviceToShow} setView={setView} />;
                }
                return (
                    <>
                        <HomeSection id="home" activeSection={activeMainSection} featuredCourses={featuredLocalCourses} onCourseCardClick={openCourseModal} onAddToCart={addToCartHandler} setView={setView} isLoading={false} />
                        <CoursesSection id="courses" activeSection={activeMainSection} allCourses={allLocalCourses} onCourseCardClick={openCourseModal} onAddToCart={addToCartHandler} isLoading={false} />
                        <ServicesSection id="services" activeSection={activeMainSection} services={currentLocalServicesData} setView={setView} isLoading={false} />
                        <TestimonialsSection id="testimonials" activeSection={activeMainSection} testimonials={testimonials} isLoading={isLoading} />
                        <AboutSection id="about" activeSection={activeMainSection} setView={setView} aboutData={currentLocalAboutUsData} />
                        <ContactSection id="contact" activeSection={activeMainSection} locations={currentLocalLocationsData} companyInfo={currentLocalCompanyInfo} googleMapsLoaded={googleMapsLoaded} supabaseClient={supabase}/>
                    </>
                );
        }
    };

    return (
        <>
            <StyleInjector css={globalStyles} />
            <Header
                isScrolled={isHeaderScrolled}
                isNavOpen={isNavOpen}
                setNavOpen={setNavOpen}
                activeView={view}
                setView={setView}
                cartItemCount={cart.reduce((sum, item) => sum + (item.quantity || 0), 0)}
                onCartIconClick={() => setIsCartOpen(true)}
                navLinks={currentNavLinksData}
                session={session}
                onSignOut={handleSignOut}
            />
            <EndorsementBadges />
            <main>
                {renderContent()}
            </main>
            <Footer
                companyInfo={currentLocalCompanyInfo}
                locations={currentLocalLocationsData}
                setView={setView}
                googleMapsLoaded={googleMapsLoaded}
            />
            {isModalOpen && selectedCourseForModal && (
                <CourseDetailsModal course={selectedCourseForModal} onClose={closeCourseModal} onAddToCart={handleAddToCartAndCloseModal} />
            )}
            <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onRemoveItem={removeFromCartHandler} onCheckout={handleCheckout} />
        </>
    );
}

// --- Child Components ---
const Header = ({ isScrolled, isNavOpen, setNavOpen, activeView, setView, cartItemCount, onCartIconClick, navLinks, session, onSignOut }) => {
    const closeNav = () => setNavOpen(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const userMenuRef = useRef(null);

    const handleDropdownToggle = (itemId) => {
        if (window.innerWidth <= 992) {
             setOpenDropdown(openDropdown === itemId ? null : itemId);
        }
    };

     // Close user dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isNavOpen) {
            setOpenDropdown(null);
        }
    }, [isNavOpen]);

    const UserMenu = () => (
        <div className="header-user-menu" ref={userMenuRef}>
            <button className="header-user-menu-toggle" onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                <FaUserCircle /> My Account <FaChevronDown style={{fontSize: '0.8em', transform: userDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease'}}/>
            </button>
            {userDropdownOpen && (
                 <ul className="nav-dropdown user-dropdown" style={{display: 'block', opacity: 1, transform: 'none'}}>
                    <li>
                        <button onClick={() => { setView('account'); setUserDropdownOpen(false); }}><FaUserEdit /> My Account</button>
                    </li>
                    <li>
                        <button onClick={() => { onSignOut(); setUserDropdownOpen(false); }}><FaSignOutAlt /> Sign Out</button>
                    </li>
                </ul>
            )}
        </div>
    );

    return (
        <header id="mainHeader" className={isScrolled ? 'scrolled' : ''}>
            <div className="container">
                <NavigateLink href="#home" className="logo-container" activeView={activeView} setView={setView} setNavOpen={closeNav}>
                    <img src="/assets/images/logo.png" alt="GMT Safety Logo" />
                </NavigateLink>

                <nav id="mainNav" className={isNavOpen ? 'active' : ''}>
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.id}>
                                {link.type === 'dropdown' ? (
                                    <>
                                        <button
                                            className={`nav-dropdown-toggle ${openDropdown === link.id ? 'open' : ''}`}
                                            onClick={() => handleDropdownToggle(link.id)}
                                            aria-expanded={openDropdown === link.id}
                                            aria-controls={`dropdown-${link.id}`}
                                        >
                                            {link.text} <FaChevronDown />
                                        </button>
                                        <ul
                                            className={`nav-dropdown ${openDropdown === link.id ? 'open' : ''}`}
                                            id={`dropdown-${link.id}`}
                                        >
                                            {link.subItems.map(subItem => (
                                                <li key={subItem.id}>
                                                    <NavigateLink
                                                        href={subItem.href}
                                                        activeView={activeView}
                                                        setView={setView}
                                                        setNavOpen={closeNav}
                                                    >
                                                        {subItem.text}
                                                    </NavigateLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <NavigateLink
                                        href={`#${link.id}`}
                                        activeView={activeView}
                                        setView={setView}
                                        setNavOpen={closeNav}
                                    >
                                        {link.text}
                                    </NavigateLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="header-right-items">
                    {session ? <UserMenu /> : <NavigateLink href="#login" className="btn btn-secondary btn-small" setView={setView}>Sign In</NavigateLink>}
                    <div className="header-cart-icon" onClick={() => {onCartIconClick(); if(isNavOpen) closeNav();}}>
                        <FaShoppingCart />
                        {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
                    </div>
                    <button className="menu-toggle" aria-label="Toggle navigation menu" onClick={() => {setNavOpen(!isNavOpen); if(isNavOpen) setOpenDropdown(null);}}>
                        {isNavOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
            {isNavOpen && <div className="nav-overlay" onClick={closeNav} style={{position: 'fixed', top:0, left:0, width:'100%', height:'100%', background: 'rgba(0,0,0,0.5)', zIndex:1000, cursor:'pointer'}}></div>}
        </header>
    );
};


const EndorsementBadges = () => (
    <div className="endorsement-badges">
        <div className="container">
            {[1, 2, 3, 4].map(num => (
                <div className="endorsement-badge" key={num}>
                    <img src={`/assets/images/badge${num}.png`} alt={`Endorsement Badge ${num}`} />
                </div>
            ))}
        </div>
    </div>
);

const Hero = ({setView}) => (
    <div className="hero">
        <div className="container">
            <div className="hero-content">
                <h1>Building Safer Workplaces, Together.</h1>
                <p className="hero-subtitle">GMT Safety Solutions provides accredited health & safety training and expert consultancy services. Empower your team, ensure compliance, and cultivate a culture of safety excellence.</p>
                <div className="btn-group">
                    <NavigateLink href="#courses" className="btn btn-primary" setView={setView}>
                        <FaGraduationCap /> Explore Our Courses
                    </NavigateLink>
                    <NavigateLink href="#services" className="btn btn-hero-secondary" setView={setView}>
                        <FaConciergeBell /> Our Services
                    </NavigateLink>
                </div>
            </div>
        </div>
    </div>
);

const CourseCard = ({ course, onCardClick, onAddToCart }) => {
    const imagePath = course.image_path || `/assets/images/${(course.image_seed || 'default').toLowerCase()}.jpg`;
    const [addedFeedback, setAddedFeedback] = useState(false);

    const handleAddToCartClick = (e) => {
        e.stopPropagation();
        onAddToCart(course);
        setAddedFeedback(true);
        setTimeout(() => setAddedFeedback(false), 2000);
    };

    return (
        <article className="course-card" data-course-id={course.id}>
            <div className="course-card__image-container">
                <img src={imagePath} alt={course.title} className="course-card__image" />
                {course.type && <span className="tag">{course.type}</span>}
            </div>
            <div className="course-card__content">
                <h3 className="course-card__title">{course.title}</h3>
                <div className="course-card__meta">
                    <span><FaStopwatch /> {course.duration || 'N/A'}</span>
                    <span className="course-card__price">R{Number(course.price).toFixed(2)}</span>
                </div>
                <p className="course-card__description">{course.short_description || 'Details coming soon.'}</p>
                <div className="course-card__actions">
                    <button className="btn btn-secondary btn-small" onClick={() => onCardClick(course)}>
                        <FaInfoCircle /> View Details
                    </button>
                    <button className="btn btn-primary btn-small" onClick={handleAddToCartClick} disabled={addedFeedback}>
                        {addedFeedback ? <FaCheckCircle /> : <FaCartPlus />} {addedFeedback ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </article>
    );
};

const HomeSection = ({ id, activeSection, featuredCourses, onCourseCardClick, onAddToCart, setView, isLoading }) => (
    <section id={id} className={activeSection === id ? 'active-section' : ''}>
        <Hero setView={setView}/>
        <div className="container" style={{ paddingTop: '4rem' }}>
            <div className="section-header">
                <span className="subtitle">Featured Training</span>
                <h2>Invest in Your Team's Safety</h2>
            </div>
            <div className="card-grid">
                {isLoading && featuredCourses.length === 0 ? (
                    [...Array(3)].map((_, i) => <SkeletonCard key={`featured-skeleton-${i}`} />)
                ) : featuredCourses.length > 0 ? (
                    featuredCourses.map(course => <CourseCard key={course.id} course={course} onCardClick={onCourseCardClick} onAddToCart={onAddToCart} />)
                ) : (
                    <p>No featured courses available at the moment.</p>
                )}
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <NavigateLink href="#courses" className="btn btn-primary btn-lg" setView={setView}>
                    <FaThList /> View All Courses
                </NavigateLink>
            </div>
        </div>
    </section>
);

const CoursesSection = ({ id, activeSection, allCourses, onCourseCardClick, onAddToCart, isLoading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const courseTypes = useMemo(() => {
        if (!allCourses) return [];
        const types = new Set(allCourses.map(course => course.type).filter(Boolean));
        return Array.from(types).sort();
    }, [allCourses]);


    const filteredAndSortedCourses = useMemo(() => {
        if (!allCourses) return [];
        let courses = [...allCourses];

        if (searchTerm) {
            courses = courses.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (course.short_description && course.short_description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        if (filterType) {
            courses = courses.filter(course => course.type === filterType);
        }
        if (sortOrder) {
            courses.sort((a, b) => {
                switch (sortOrder) {
                    case 'price-asc': return Number(a.price) - Number(b.price);
                    case 'price-desc': return Number(b.price) - Number(a.price);
                    case 'name-asc': return a.title.localeCompare(b.title);
                    case 'name-desc': return b.title.localeCompare(a.title);
                    default: return 0;
                }
            });
        }
        return courses;
    }, [allCourses, searchTerm, filterType, sortOrder]);


    return (
        <section id={id} className={activeSection === id ? 'active-section' : ''}>
            <div className="container">
                <div className="section-header">
                    <span className="subtitle">Our Curriculum</span>
                    <h2>Accredited Health & Safety Courses</h2>
                    <p style={{ maxWidth: '700px', margin: '1rem auto 0', color: 'var(--neutral-dark-gray)' }}>Choose from a wide range of courses designed to meet industry standards and your specific organizational needs. Available online and on-site.</p>
                </div>

                <div className="course-filters">
                    <div className="filter-group">
                        <label htmlFor="search-courses"><FaSearch /> Search:</label>
                        <input type="text" id="search-courses" placeholder="Keywords..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="filter-group">
                        <label htmlFor="filter-type"><FaFilter/> Type:</label>
                        <select id="filter-type" value={filterType} onChange={e => setFilterType(e.target.value)}>
                            <option value="">All Types</option>
                            {courseTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="sort-order"><FaSortAmountDown/> Sort By:</label>
                        <select id="sort-order" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                            <option value="">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                        </select>
                    </div>
                </div>

                <div className="card-grid">
                    {isLoading && filteredAndSortedCourses.length === 0 ? (
                        [...Array(6)].map((_, i) => <SkeletonCard key={`all-skeleton-${i}`} />)
                    ) : filteredAndSortedCourses.length > 0 ? (
                        filteredAndSortedCourses.map(course => <CourseCard key={course.id} course={course} onCardClick={onCourseCardClick} onAddToCart={onAddToCart} />)
                    ) : (
                        <p style={{gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.1rem'}}>No courses match your criteria. Please adjust filters or search term.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

const ServiceContentRenderer = ({ block, index }) => {
    const HeadingTag = `h${block.level || 4}`; // Default to h4 if level not specified
    switch (block.type) {
        case 'heading':
            return (
                <HeadingTag key={index} className="service-content-heading">
                    {block.withArrows && <FaChevronRight style={{ transform: 'rotate(0deg)', marginRight: '0.3em' }} />}
                    {block.text}
                    {block.withArrows && <FaChevronLeft style={{ transform: 'rotate(0deg)', marginLeft: '0.3em' }} />}
                </HeadingTag>
            );
        case 'paragraph':
            return <p key={index}>{block.text}</p>;
        case 'list':
            return (
                <ul key={index}>
                    {block.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                            {typeof item === 'string' ? item : item.text}
                            {item.subItems && item.subItems.length > 0 && (
                                <ul>
                                    {item.subItems.map((sub, subIndex) => <li key={subIndex}>{sub}</li>)}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            );
        case 'twoColumnList':
            return (
                <div key={index} className="two-column-service-list">
                    <div className="column column-left">
                        {block.leftHeading && <h4>{block.leftHeading}</h4>}
                        <ul>
                            {block.leftList.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    {typeof item === 'string' ? item : item.text}
                                    {item.subItems && item.subItems.length > 0 && (
                                        <ul>
                                            {item.subItems.map((sub, subIndex) => <li key={subIndex}>{sub}</li>)}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="column column-right">
                        {block.rightHeading && <h4>{block.rightHeading}</h4>}
                        <ul>
                             {block.rightList.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                        </ul>
                        {block.image && block.image.src && (
                            <img src={block.image.src} alt={block.image.alt || block.rightHeading || 'Service Image'} style={{marginTop: '1.5rem'}}/>
                        )}
                    </div>
                </div>
            );
        case 'image':
            return <img key={index} src={block.src} alt={block.alt || 'Service Illustration'} />;
        default:
            return null;
    }
};

const ServiceDetailPage = ({ service, setView }) => {
    if (!service) return null;
    const imagePath = service.image_path || `/assets/images/service-default.jpg`;

    const handleBackClick = (e) => {
        e.preventDefault();
        setView('services');
    };

    return (
        <section className="service-detail-page active-section">
            <div className="container">
                <div className="service-detail-page-header">
                    <a href="#services" onClick={handleBackClick} className="back-link">
                        <FaChevronLeft /> Back to All Services
                    </a>
                    <h1>{service.title}</h1>
                </div>
                <div className="service-detail-page-content">
                    <img src={imagePath} alt={service.title} className="course-card__image" style={{ marginBottom: '2rem' }} />
                    <p className="course-card__description" style={{ fontSize: '1.1rem' }}>{service.description || 'More information coming soon.'}</p>

                    {service.contentBlocks && service.contentBlocks.map((block, index) => (
                        <div key={index} className="service-content-block">
                            <ServiceContentRenderer block={block} index={index} />
                        </div>
                    ))}

                    <div style={{marginTop: '3rem', borderTop: '1px solid var(--neutral-light-gray)', paddingTop: '2rem'}}>
                        <h3>Interested in this Service?</h3>
                        <p>Contact us today for a consultation and find out how we can help your business.</p>
                        <NavigateLink
                            href="#contact"
                            className="btn btn-primary"
                            setView={setView}
                          >
                            <FaHandshake/> Enquire Now
                        </NavigateLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ service, onSelectService }) => {
    const imagePath = service.image_path || `/assets/images/service-default.jpg`;

    const handleLearnMore = (e) => {
        e.preventDefault();
        onSelectService(service.id);
    };

    return (
        <article className="course-card" id={`service-summary-${service.id}`}> {/* Reusing course-card styling */}
            <div className="course-card__image-container">
                <img src={imagePath} alt={service.title} className="course-card__image" />
            </div>
            <div className="course-card__content">
                <h3 className="course-card__title">{service.title}</h3>
                <p className="course-card__description">{service.description || 'More information coming soon.'}</p>

                <div className="course-card__actions" style={{marginTop: 'auto'}}>
                     <a
                        href={`#service/${service.id}`}
                        onClick={handleLearnMore}
                        className="btn btn-secondary"
                        style={{width: '100%'}}
                      >
                        <FaInfoCircle/> Learn More
                    </a>
                </div>
            </div>
        </article>
    );
};

const ServicesSection = ({ id, activeSection, services, setView, isLoading }) => (
    <section id={id} className={activeSection === id ? 'active-section' : ''}>
        <div className="container">
            <div className="section-header">
                <span className="subtitle">Expert Solutions</span>
                <h2>Comprehensive Safety Services</h2>
                <p style={{ maxWidth: '700px', margin: '1rem auto 0', color: 'var(--neutral-dark-gray)' }}>Beyond training, we offer expert consultancy and support services to help you establish and maintain robust safety management systems.</p>
            </div>
            <div className="card-grid">
                 {isLoading && services.length === 0 ? (
                    [...Array(3)].map((_, i) => <SkeletonCard key={`services-skeleton-${i}`} />)
                ) : services.length > 0 ? (
                    services.map(service =>
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onSelectService={(serviceId) => setView(`service/${serviceId}`)}
                        />
                    )
                ) : (
                    <p>No services listed at the moment. Please check back later.</p>
                )}
            </div>
        </div>
    </section>
);

const TestimonialsSection = ({ id, activeSection, testimonials, isLoading }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };
    const handleNext = () => {
        setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    if (isLoading && testimonials.length === 0) {
        return (
            <section id={id} className={`testimonials-section ${activeSection === id ? 'active-section' : ''}`}>
                <div className="container">
                    <div className="section-header">
                        <span className="subtitle">Client Feedback</span>
                        <h2>What Our Clients Say</h2>
                    </div>
                    <div className="testimonial-card">
                        <div className="skeleton-card__line" style={{width: '30%', margin:'0 auto 1rem'}}></div>
                        <div className="skeleton-card__line" style={{width: '80%', margin:'0 auto 0.5rem'}}></div>
                        <div className="skeleton-card__line" style={{width: '70%', margin:'0 auto 1.5rem'}}></div>
                        <div className="skeleton-card__line skeleton-card__line--short" style={{margin:'0 auto'}}></div>
                    </div>
                </div>
            </section>
        );
    }


    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id={id} className={`testimonials-section ${activeSection === id ? 'active-section' : ''}`}>
            <div className="container">
                <div className="section-header">
                    <span className="subtitle">Client Feedback</span>
                    <h2>What Our Clients Say</h2>
                </div>
                <div className="testimonial-card">
                    <FaQuoteLeft className="testimonial-card__quote-icon" />
                    <p>"{currentTestimonial.quote}"</p>
                    <div className="testimonial-card__author">{currentTestimonial.author_name}</div>
                    {currentTestimonial.author_title_company && <div className="testimonial-card__author-title">{currentTestimonial.author_title_company}</div>}
                </div>
                {testimonials.length > 1 && (
                    <div className="testimonial-navigation">
                        <button onClick={handlePrev} aria-label="Previous testimonial" disabled={testimonials.length <=1}><FaChevronLeft /></button>
                        <button onClick={handleNext} aria-label="Next testimonial" disabled={testimonials.length <=1}><FaChevronRight /></button>
                    </div>
                )}
            </div>
        </section>
    );
};


const AboutSection = ({ id, activeSection, setView, aboutData }) => (
    <section id={id} className={`about-section ${activeSection === id ? 'active-section' : ''}`}>
        <div className="container">
            <div className="section-header">
                <span className="subtitle">Who We Are</span>
                <h2>{aboutData.pageTitle || "Your Trusted Partner in Safety"}</h2>
            </div>
            <div className="about-layout">
                <div className="about-layout__text about-section-content">
                    {aboutData.sections.map((section, index) => (
                        <div key={index}>
                            {section.title && <h3>{section.title}</h3>}
                            {section.type === 'paragraphs' && section.content.map((paragraph, pIndex) => (
                                <p key={pIndex}>{paragraph}</p>
                            ))}
                            {section.type === 'list' && (
                                <ul className={section.listType === 'check' ? 'check-list' : ''}>
                                    {section.content.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            {section.listType === 'check' && <FaCheckCircle />}
                                            {typeof item === 'string' ? item : item.text} {/* Handle simple strings or objects with text property */}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                     <NavigateLink href="#contact" className="btn btn-primary" setView={setView} style={{marginTop: '2rem'}}>
                        <FaHandshake /> Work With Us
                    </NavigateLink>
                </div>
                <div className="about-layout__image-container">
                    <img src="/assets/images/about-gmt.jpg" alt="GMT Safety Team discussion" />
                </div>
            </div>
        </div>
    </section>
);

const GoogleMapInstance = ({ location, googleMapsLoaded }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [isMaximized, setIsMaximized] = useState(false);

    // Effect for initializing and updating the map
    useEffect(() => {
        if (googleMapsLoaded && window.google && window.google.maps && mapRef.current && location.latitude && location.longitude) {
            try {
                // Initialize map only once. Don't re-create it on every render.
                if (!mapInstance.current) {
                    const map = new window.google.maps.Map(mapRef.current, {
                        center: { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) },
                        zoom: 13,
                        disableDefaultUI: false,
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        styles: [ // Using the same styles as before
                            { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
                            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                            { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
                            { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
                            { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
                            { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
                            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
                            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
                            { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
                            { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
                            { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
                            { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
                            { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
                            { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
                            { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
                            { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
                            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }
                        ]
                    });
                    new window.google.maps.Marker({
                        position: { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) },
                        map: map,
                        title: location.office_name,
                        icon: {
                            url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(getComputedStyle(document.documentElement).getPropertyValue('--primary-blue').trim())}" width="36px" height="36px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`,
                            scaledSize: new window.google.maps.Size(36, 36)
                        }
                    });
                    mapInstance.current = map;
                } else {
                    // If map already exists, just update its center if location prop changes
                    mapInstance.current.setCenter({ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) });
                }
            } catch (e) {
                console.error("Map error:", e);
            }
        }
    }, [location, googleMapsLoaded]);

    // Effect for handling maximized state
    useEffect(() => {
        const map = mapInstance.current;
        if (map) {
            // We need to trigger a resize event for Google Maps to redraw correctly.
            // A small delay ensures the container has finished its CSS transition.
            setTimeout(() => {
                window.google.maps.event.trigger(map, 'resize');
                map.setCenter({ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) });
            }, 300); // Corresponds to --transition-speed
        }

        // Add/remove class from body to prevent scrolling in background
        if (isMaximized) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setIsMaximized(false);
            }
        };

        window.addEventListener('keydown', handleEsc);

        // Cleanup function
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto'; // Ensure scroll is restored on component unmount
        };
    }, [isMaximized, location]);

    // --- Conditional Rendering Logic ---
    // If API isn't loaded, show a placeholder
    if (!googleMapsLoaded) {
        return (
            <div className="map-container" style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--neutral-light-gray)' }}>
                <p style={{ color: 'var(--neutral-dark-gray)' }}>Initializing map service...</p>
            </div>
        );
    }
    // If location data is missing, show a different placeholder
    if (!location.latitude || !location.longitude) {
        return (
            <div className="map-container" style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--neutral-light-gray)' }}>
                <p style={{ color: 'var(--neutral-dark-gray)' }}>Map data unavailable.</p>
            </div>
        );
    }

    // If all checks pass, render the actual map component wrapper
    return (
        <div className={`map-container-wrapper ${isMaximized ? 'maximized' : ''}`}>
             <div className="map-controls">
                {isMaximized ? (
                    <button className="map-control-btn" onClick={() => setIsMaximized(false)} aria-label="Minimize Map">
                        <FaCompress />
                    </button>
                ) : (
                    <button className="map-control-btn" onClick={() => setIsMaximized(true)} aria-label="Maximize Map">
                        <FaExpand />
                    </button>
                )}
            </div>
            {/* This div is now the dedicated, empty container for Google Maps */}
            <div ref={mapRef} className="map-container" style={{ minHeight: '200px' }}>
                {/* This div MUST remain empty in JSX for React to prevent conflicts */}
            </div>
        </div>
    );
};


const ContactSection = ({ id, activeSection, locations, companyInfo, googleMapsLoaded, supabaseClient }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addToast = useToast();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!supabaseClient) {
            addToast("Submission service unavailable.", 'error');
            return;
        }
        setIsSubmitting(true);
        try {
            const { error } = await supabaseClient.from('contact_messages').insert([{ ...formData, phone: formData.phone || null }]);
            if (error) throw error;
            addToast('Message sent successfully!', 'success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            console.error('Supabase form submission error:', error.message);
            addToast(`Error: ${error.message}. Please try again.`, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id={id} className={activeSection === id ? 'active-section' : ''}>
            <div className="container">
                <div className="section-header">
                    <span className="subtitle">Get In Touch</span>
                    <h2>We're Here to Help</h2>
                    <p style={{ maxWidth: '750px', margin: '1rem auto 0', color: 'var(--neutral-dark-gray)', fontSize:'1.1rem' }}>Have questions or ready to discuss your safety needs? Fill out the form below, or contact us directly through our office details.</p>
                </div>
                <div className="contact-grid">
                    <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g., John Doe" disabled={isSubmitting} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g., john.doe@example.com" disabled={isSubmitting} />
                        </div>
                         <div className="form-group">
                            <label htmlFor="phone">Phone Number (Optional)</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., 012 345 6789" disabled={isSubmitting} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="e.g., Course Enquiry" disabled={isSubmitting} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="How can we assist you today?" disabled={isSubmitting}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? <FaSpinner className="fa-spin"/> : <FaPaperPlane />} {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                    <div className="contact-info">
                        <h3>Office Information</h3>
                        <div id="locationsContainer">
                            {locations && locations.length > 0 ? (
                                locations.map(loc => (
                                    <div className="contact-info__item" key={loc.id || loc.office_name}>
                                        <FaMapMarkerAlt/>
                                        <div>
                                            <strong>{loc.office_name}</strong>
                                            <p>{loc.display_details || 'Address not available'}</p>
                                            {(loc.latitude && loc.longitude) &&
                                                <GoogleMapInstance location={loc} googleMapsLoaded={googleMapsLoaded} key={`map-${loc.id || loc.office_name}`} />
                                            }
                                        </div>
                                    </div>
                                ))
                            ) : ( <p>Office locations not available.</p> )}
                        </div>
                        <hr style={{ margin: '2rem 0', borderColor: 'var(--neutral-light-gray)' }} />
                        {companyInfo ? <>
                            <div className="contact-info__item"><FaPhoneAlt /><div><strong>Phone Lines</strong><p>{companyInfo.primary_phone}</p></div></div>
                            <div className="contact-info__item"><FaWhatsapp /><div><strong>WhatsApp Us</strong><p>{companyInfo.secondary_phone || 'N/A'}</p></div></div>
                            <div className="contact-info__item"><FaEnvelope /><div><strong>Email Us</strong><p>{companyInfo.email ? <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a> : 'N/A'}</p></div></div>
                            <div className="contact-info__item"><FaClock /><div><strong>Business Hours</strong><p>{companyInfo.business_hours || 'N/A'}</p></div></div>
                        </> : <p>Company contact details not available.</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

const AuthSection = ({ id, activeSection, supabaseClient, setView, addToast, viewAfterLogin }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) {
            addToast(error.message, 'error');
        } else {
            addToast('Signed in successfully!', 'success');
            setView(viewAfterLogin || 'home');
        }
        setLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        const { error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone,
                }
            }
        });
        if (error) {
            addToast(error.message, 'error');
        } else {
            setMessage('Please check your email to verify your account.');
        }
        setLoading(false);
    };

    return (
        <section id={id} className={`auth-section ${activeSection === id ? 'active-section' : ''}`}>
            <div className="auth-container">
                <div className="auth-tabs">
                    <button onClick={() => setActiveTab('login')} className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}>Login</button>
                    <button onClick={() => setActiveTab('register')} className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}>Register</button>
                </div>

                {message && <div className="auth-message">{message}</div>}

                {activeTab === 'login' ? (
                    <form onSubmit={handleLogin} className="auth-form-container">
                        <div className="form-group">
                            <label htmlFor="login-email">Email address</label>
                            <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Password</label>
                            <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <NavigateLink href="#password-reset" setView={setView} className="forgot-password-link">Lost your password?</NavigateLink>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <FaSpinner className="fa-spin" /> : 'Log in'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSignUp} className="auth-form-container">
                         <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="register-firstName">First Name</label>
                                <input id="register-firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="register-lastName">Last Name</label>
                                <input id="register-lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="register-phone">Phone Number</label>
                            <input id="register-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-email">Email address</label>
                            <input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-password">Password</label>
                            <input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                         <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <FaSpinner className="fa-spin" /> : 'Register'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

const PasswordResetSection = ({ id, activeSection, supabaseClient, setView, addToast }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + window.location.pathname,
        });

        if (error) {
            addToast(error.message, 'error');
        } else {
            addToast('Password reset link sent! Please check your email.', 'success');
            setView('login');
        }
        setLoading(false);
    };

    return (
        <section id={id} className={`password-reset-section ${activeSection === id ? 'active-section' : ''}`}>
             <div className="auth-container">
                <h3>Reset Password</h3>
                <p>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
                <form onSubmit={handlePasswordReset} className="auth-form-container">
                    <div className="form-group">
                        <label htmlFor="reset-email">Email address</label>
                        <input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <FaSpinner className="fa-spin" /> : 'Reset password'}
                    </button>
                </form>
            </div>
        </section>
    );
};

const UpdatePasswordSection = ({ id, activeSection, supabaseClient, setView, addToast }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabaseClient.auth.updateUser({ password });

        if (error) {
            addToast(error.message, 'error');
        } else {
            addToast('Password updated successfully! You can now sign in.', 'success');
            setView('login');
        }
        setLoading(false);
    };
    
    return (
        <section id={id} className={`update-password-section ${activeSection === id ? 'active-section' : ''}`}>
             <div className="auth-container">
                <h3>Create New Password</h3>
                 <form onSubmit={handleUpdatePassword} className="auth-form-container">
                    <div className="form-group">
                        <label htmlFor="new-password">New Password</label>
                        <input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your new password" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <FaSpinner className="fa-spin" /> : 'Save new password'}
                    </button>
                </form>
             </div>
        </section>
    );
};

const AccountSection = ({ id, activeSection, session, supabaseClient, addToast }) => {
    const [details, setDetails] = useState({ firstName: '', lastName: '', phone: '' });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    useEffect(() => {
        if (session?.user?.user_metadata) {
            setDetails({
                firstName: session.user.user_metadata.first_name || '',
                lastName: session.user.user_metadata.last_name || '',
                phone: session.user.user_metadata.phone || ''
            });
        }
    }, [session]);

    const handleDetailsChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleDetailsUpdate = async (e) => {
        e.preventDefault();
        setDetailsLoading(true);
        const { error } = await supabaseClient.auth.updateUser({
            data: {
                first_name: details.firstName,
                last_name: details.lastName,
                phone: details.phone
            }
        });
        if (error) {
            addToast(error.message, 'error');
        } else {
            addToast('Account details updated successfully!', 'success');
        }
        setDetailsLoading(false);
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            addToast('Passwords do not match.', 'error');
            return;
        }
        if (password.length < 6) {
             addToast('Password must be at least 6 characters.', 'error');
            return;
        }
        setPasswordLoading(true);
        const { error } = await supabaseClient.auth.updateUser({ password });
        if (error) {
            addToast(error.message, 'error');
        } else {
            addToast('Password updated successfully!', 'success');
            setPassword('');
            setConfirmPassword('');
        }
        setPasswordLoading(false);
    };

    return (
        <section id={id} className={`account-section ${activeSection === id ? 'active-section' : ''}`}>
            <div className="account-container">
                <div className="section-header" style={{marginBottom: '2rem'}}>
                    <h2>My Account</h2>
                </div>
                
                <form onSubmit={handleDetailsUpdate}>
                    <h3>Account Details</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="acc-firstName">First Name</label>
                            <input id="acc-firstName" name="firstName" type="text" value={details.firstName} onChange={handleDetailsChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="acc-lastName">Last Name</label>
                            <input id="acc-lastName" name="lastName" type="text" value={details.lastName} onChange={handleDetailsChange} required />
                        </div>
                    </div>
                     <div className="form-group">
                        <label htmlFor="acc-phone">Phone</label>
                        <input id="acc-phone" name="phone" type="tel" value={details.phone} onChange={handleDetailsChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="acc-email">Email Address</label>
                        <input id="acc-email" name="email" type="email" value={session?.user?.email || ''} disabled readOnly />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={detailsLoading}>
                        {detailsLoading ? <FaSpinner className="fa-spin"/> : <FaUserEdit />} Save Details
                    </button>
                </form>

                <form onSubmit={handlePasswordUpdate}>
                    <h3>Password Change</h3>
                     <div className="form-group">
                        <label htmlFor="acc-password">New Password</label>
                        <input id="acc-password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Leave blank to keep the same"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="acc-confirmPassword">Confirm New Password</label>
                        <input id="acc-confirmPassword" name="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={passwordLoading}>
                       {passwordLoading ? <FaSpinner className="fa-spin"/> : <FaKey />} Save Password
                    </button>
                </form>
            </div>
        </section>
    );
};


const CheckoutSection = ({ id, activeSection, cart, setCart, setView, supabaseClient, addToast, session }) => {
    const [billingDetails, setBillingDetails] = useState({
        firstName: '', lastName: '', companyName: '', country: 'South Africa',
        streetAddress: '', city: '', province: '', zipCode: '', phone: '', email: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('bacs');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setBillingDetails(prev => ({
                ...prev,
                email: session.user.email || '',
                firstName: session.user.user_metadata?.first_name || '',
                lastName: session.user.user_metadata?.last_name || '',
                phone: session.user.user_metadata?.phone || ''
            }));
        }
    }, [session]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prev => ({ ...prev, [name]: value }));
    };

    const totalAmount = useMemo(() =>
        cart.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0),
    [cart]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!supabaseClient) {
            addToast("Order submission service is currently unavailable.", 'error');
            return;
        }
        setIsSubmitting(true);
        try {
            const orderPayload = {
                billing_details: billingDetails,
                order_items: cart.map(item => ({id: item.id, title: item.title, quantity: item.quantity, price: item.price})),
                order_total: totalAmount,
                payment_method: paymentMethod,
                user_id: session?.user?.id,
            };

            const { error } = await supabaseClient.from('orders').insert([orderPayload]);
            if (error) throw error;

            addToast('Order placed successfully! Thank you.', 'success');
            setCart([]); // Clear the cart
            setView('home'); // Redirect to home page

        } catch (error) {
            console.error('Supabase order submission error:', error.message);
            addToast(`Could not place order: ${error.message}`, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const provinces = ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"];

    return (
        <section id={id} className={`checkout-section ${activeSection === id ? 'active-section' : ''}`}>
            <div className="container">
                <div className="section-header">
                    <h2>Checkout</h2>
                </div>
                <form id="billingForm" onSubmit={handleSubmit} className="contact-form">
                    <div className="checkout-grid">
                        <div className="billing-details">
                            <h3>Billing details</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First name *</label>
                                    <input type="text" name="firstName" id="firstName" value={billingDetails.firstName} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last name *</label>
                                    <input type="text" name="lastName" id="lastName" value={billingDetails.lastName} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyName">Company name (optional)</label>
                                <input type="text" name="companyName" id="companyName" value={billingDetails.companyName} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country / Region *</label>
                                <input type="text" name="country" id="country" value={billingDetails.country} readOnly disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="streetAddress">Street address *</label>
                                <input type="text" name="streetAddress" id="streetAddress" placeholder="House number and street name" value={billingDetails.streetAddress} onChange={handleInputChange} required />
                            </div>
                             <div className="form-group">
                                <label htmlFor="city">Town / City *</label>
                                <input type="text" name="city" id="city" value={billingDetails.city} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="province">Province *</label>
                                <select name="province" id="province" value={billingDetails.province} onChange={handleInputChange} required>
                                    <option value="">Select a province...</option>
                                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipCode">Postcode / ZIP *</label>
                                <input type="text" name="zipCode" id="zipCode" value={billingDetails.zipCode} onChange={handleInputChange} required />
                            </div>
                             <div className="form-group">
                                <label htmlFor="phone">Phone *</label>
                                <input type="tel" name="phone" id="phone" value={billingDetails.phone} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address *</label>
                                <input type="email" name="email" id="email" value={billingDetails.email} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        <div className="order-summary">
                            <h3>Your order</h3>
                            <table className="order-summary-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item.id}>
                                            <td className="product-name">{item.title} &times; {item.quantity}</td>
                                            <td className="product-total">R{(Number(item.price) * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td className="product-total">R{totalAmount.toFixed(2)}</td>
                                    </tr>
                                    <tr className="total">
                                        <td>Total</td>
                                        <td className="product-total">R{totalAmount.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="payment-section">
                                <ul className="payment-methods">
                                    <li>
                                        <input type="radio" id="bacs" name="paymentMethod" value="bacs" checked={paymentMethod === 'bacs'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                        <label htmlFor="bacs">Direct bank transfer</label>
                                        {paymentMethod === 'bacs' && (
                                            <div className="payment-box">
                                                <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                            </div>
                                        )}
                                    </li>
                                </ul>
                                <button type="submit" form="billingForm" className="btn btn-primary place-order-btn" disabled={isSubmitting}>
                                    {isSubmitting ? <FaSpinner className="fa-spin" /> : <FaCreditCard />}
                                    {isSubmitting ? 'Placing Order...' : 'Place order'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

const Footer = ({ companyInfo, locations, setView, googleMapsLoaded }) => {
    const [selectedLocationId, setSelectedLocationId] = useState('');

    useEffect(() => {
        if (locations && locations.length > 0 && !selectedLocationId) {
            setSelectedLocationId(locations[0].id);
        }
    }, [locations, selectedLocationId]);

    const selectedLocation = useMemo(() => {
        return locations?.find(loc => loc.id === selectedLocationId) || null;
    }, [selectedLocationId, locations]);

    const handleLocationChange = (e) => {
        setSelectedLocationId(e.target.value);
    };

    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    {/* Column 1: Company Info */}
                    <div className="footer-column">
                        <h4>{companyInfo.name || "GMT Safety Solutions"}</h4>
                        <p>{companyInfo.footer_description || "Dedicated to safety excellence."}</p>
                        {companyInfo.email && <div><span><FaEnvelope /> <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a></span></div>}
                        {companyInfo.primary_phone && <div><span><FaPhone /> {companyInfo.primary_phone}</span></div>}
                        {companyInfo.secondary_phone && <div><span><FaWhatsapp /> {companyInfo.secondary_phone}</span></div>}
                    </div>

                    {/* Column 2: Quick Links (Middle) */}
                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><NavigateLink href="#home" setView={setView}>Home</NavigateLink></li>
                            <li><NavigateLink href="#courses" setView={setView}>Courses</NavigateLink></li>
                            <li><NavigateLink href="#services" setView={setView}>Services</NavigateLink></li>
                            <li><NavigateLink href="#about" setView={setView}>About Us</NavigateLink></li>
                            <li><NavigateLink href="#contact" setView={setView}>Contact</NavigateLink></li>
                        </ul>
                    </div>

                    {/* Column 3: Branch Locator (Far Right) */}
                    <div className="footer-column">
                        <h4>Branch Locator</h4>
                        {locations && locations.length > 0 ? (
                            <>
                                <select onChange={handleLocationChange} value={selectedLocationId}>
                                    {locations.map(loc => (
                                        <option key={loc.id} value={loc.id}>
                                            {loc.office_name}
                                        </option>
                                    ))}
                                </select>
                                {selectedLocation && (
                                    <GoogleMapInstance
                                        location={selectedLocation}
                                        googleMapsLoaded={googleMapsLoaded}
                                        key={selectedLocation.id} // Add key to ensure re-render on change
                                    />
                                )}
                            </>
                        ) : (
                            <p>Branch information is currently unavailable.</p>
                        )}
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} {companyInfo.name || "GMT Safety Solutions"}. All Rights Reserved. Professional Safety Training & Consultancy.</p>
                </div>
            </div>
        </footer>
    );
};

const CourseDetailsModal = ({ course, onClose, onAddToCart }) => {
    if (!course) return null;
    useEffect(() => {
        const handleEsc = (event) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);
    const imagePath = course.image_path || `/assets/images/${(course.image_seed || 'default').toLowerCase()}.jpg`;

    return (
        <div className="modal-overlay active" onClick={onClose}>
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{course.title}</h3>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close modal"><FaTimes /></button>
                </div>
                <div className="modal-body">
                    {/*<img src={imagePath} alt={course.title} className="course-image"/>*/}
                    <div className="course-meta-details">
                        <span><FaClock/> Duration: <strong>{course.duration || 'N/A'}</strong></span>
                        <span><FaMapMarkerAlt/> Type: <strong>{course.type || 'N/A'}</strong></span>
                    </div>
                    <div className="course-price-modal">R{Number(course.price).toFixed(2)}</div>
                    <h4>Full Description:</h4>
                    <p>{course.full_description || 'Detailed description not available.'}</p>
                    {course.learning_outcomes && course.learning_outcomes.length > 0 && <>
                        <h4>Learning Outcomes:</h4>
                        <ul>
                            {course.learning_outcomes.map((outcome, index) => <li key={index}>{outcome}</li>)}
                        </ul>
                    </>}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={() => onAddToCart(course)}><FaCartPlus /> Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

const CartPanel = ({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) => {
    useEffect(() => {
        const handleEsc = (event) => { if (event.key === 'Escape' && isOpen) onClose();};
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const totalAmount = cartItems.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 0)), 0);

    return (
        <div className={`cart-panel ${isOpen ? 'active' : ''}`}>
            <div className="cart-header">
                <h3>Your Shopping Cart</h3>
                <button className="modal-close-btn" onClick={onClose} aria-label="Close cart"><FaTimes /></button>
            </div>
            <div className="cart-body">
                {cartItems.length === 0 ? (
                    <p className="cart-empty-message">Your cart is currently empty.</p>
                ) : (
                    cartItems.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.image_path || `/assets/images/${(item.imageSeed || 'default').toLowerCase()}.jpg`} alt={item.title} />
                            <div className="cart-item-details">
                                <h5>{item.title}</h5>
                                <p className="cart-item-price">R{Number(item.price).toFixed(2)} x {item.quantity || 0}</p>
                            </div>
                            <button className="cart-item-remove" onClick={() => onRemoveItem(item.id)} aria-label={`Remove ${item.title}`}><FaTrashAlt /></button>
                        </div>
                    ))
                )}
            </div>
            <div className="cart-footer">
                <div className="cart-total">
                    <span>Total:</span>
                    <span>R{totalAmount.toFixed(2)}</span>
                </div>
                <button className="btn btn-primary" onClick={onCheckout} style={{ width: '100%' }} disabled={cartItems.length === 0}>
                    <FaCreditCard /> Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

const AppWrapper = () => (
    <ToastProvider>
        <App />
    </ToastProvider>
);

export default AppWrapper;