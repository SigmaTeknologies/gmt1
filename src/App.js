/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from "react";
import { createClient } from "@supabase/supabase-js";
import { GlobalStyles } from "./GlobalStyles"; // Import global styles
// Import specific icons from react-icons/fa for Font Awesome
import {
  FaTrophy,
  FaGraduationCap,
  FaBook,
  FaFileArchive,
  FaConciergeBell,
  FaCode,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaFacebook,
  FaFileAlt,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaDownload,
  FaArrowLeft,
  FaThList,
  FaStopwatch,
  FaInfoCircle,
  FaCartPlus,
  FaCheckCircle,
  FaHandshake,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaTrashAlt,
  FaCreditCard,
  FaSpinner,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaPhone,
  FaExpand,
  FaCompress,
  FaUserCircle,
  FaSignOutAlt,
  FaKey,
  FaUserEdit,
  FaTachometerAlt,
  FaPlus,
  FaMinus,
  FaEye, // <-- Present only once
  FaEyeSlash, // <-- Present only once
  FaBookOpen,
  FaCheck,
  FaRegCopy,
} from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import Lottie from "lottie-react";
import JSZip from "jszip";
import { SpeedInsights } from "@vercel/speed-insights/react";

// NOTE: Hardcoded data import has been removed.
// All data is now fetched from Supabase.
import { aboutUsData } from "./appData"; // Kept for About Us as it's complex and not in the initial schema request. Can be made dynamic later.

const navLinksData = [
  { id: "home", text: "Home", type: "link" },
  {
    id: "services-dropdown",
    text: "Services",
    type: "dropdown",
    subItems: [
      { id: "nav-courses", text: "Training Courses", href: "#courses" },
      {
        id: "nav-consultancy",
        text: "Consultancy Services",
        href: "#services",
      },
    ],
  },
  { id: "about", text: "About Us", type: "link" },
  { id: "contact", text: "Contact", type: "link" },
];

// --- Banking Details Component ---
const BankingDetails = () => {
  const [isCopied, setIsCopied] = useState(false);
  const accountNumber = "62793528830"; // Store account number for easy access

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <>
      <style>{`
        /* --- Animation --- */
        @keyframes float-animation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .banking-details-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* --- Main Two-Column Grid --- */
        .card-body-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr; /* 55% for details, 45% for illustration */
        }

        /* --- Details Column (Left) --- */
        .details-column {
          /* This column will contain all the textual information */
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          color: #1e293b;
        }

        .card-header h4 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .card-header svg {
           color: #005A9C;
        }

        .card-content {
          padding: 24px;
        }

        .card-content p {
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.6;
          margin-top: 0;
          margin-bottom: 24px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px 24px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-item .label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-item .value {
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
        }
        
        .account-number-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .account-number-value {
          font-family: 'Roboto Mono', monospace;
          font-size: 1.1rem;
          letter-spacing: 1px;
        }

        .copy-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .copy-button:hover {
          background: #e2e8f0;
          color: #1e293b;
        }
        
        .copy-button.copied {
          background-color: #dcfce7;
          border-color: #86efac;
          color: #166534;
        }

        .card-footer {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #f0f9ff;
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
        }
        
        .card-footer svg {
          color: #0284c7;
          margin-top: 3px;
          flex-shrink: 0;
        }
        
        .card-footer .status-note {
          margin: 0;
          font-size: 0.85rem;
          color: #0369a1;
          line-height: 1.5;
        }

        /* --- Illustration Column (Right) --- */
        .illustration-column {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 100%);
          border-left: 1px solid #e2e8f0;
          padding: 32px;
          overflow: hidden;
        }
        
        .wallet-illustration {
           width: 100%;
           max-width: 250px;
           height: auto;
           animation: float-animation 4s ease-in-out infinite;
        }

        /* --- Responsive Adjustments --- */
        @media (max-width: 900px) {
          .card-body-grid {
            grid-template-columns: 1fr; /* Stack columns */
          }
          
          .illustration-column {
            order: -1; /* Move illustration to the top */
            border-left: none;
            border-bottom: 1px solid #e2e8f0;
            padding: 40px 24px;
          }
        }
      
        @media (max-width: 600px) {
          .details-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .card-content {
            padding: 16px;
          }
          
          .card-header, .card-footer {
            padding: 12px 16px;
          }
        }
      `}</style>

      <div className="banking-details-card">
        <div className="card-body-grid">
          {/* --- Illustration Column --- */}
          <div className="illustration-column">
            <svg
              className="wallet-illustration"
              viewBox="0 0 200 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                {/* Background shapes */}
                <circle cx="150" cy="40" r="50" fill="#bae6fd" opacity="0.5" />
                <circle cx="50" cy="140" r="40" fill="#bfdbfe" opacity="0.5" />

                {/* Wallet Body */}
                <path
                  d="M20 60C20 54.4772 24.4772 50 30 50H170C175.523 50 180 54.4772 180 60V140C180 145.523 175.523 150 170 150H30C24.4772 150 20 145.523 20 140V60Z"
                  fill="#005A9C"
                />
                <path
                  d="M20 70H180V80C180 85.5228 175.523 90 170 90H30C24.4772 90 20 85.5228 20 80V70Z"
                  fill="#003d6b"
                />

                {/* Credit Card */}
                <g transform="translate(40, 20) rotate(-10, 80, 50)">
                  <rect
                    x="40"
                    y="20"
                    width="120"
                    height="70"
                    rx="8"
                    fill="#ffffff"
                    stroke="#e0e7ff"
                    strokeWidth="2"
                  />
                  <rect
                    x="50"
                    y="65"
                    width="60"
                    height="10"
                    rx="3"
                    fill="#cbd5e1"
                  />
                  <rect
                    x="130"
                    y="68"
                    width="20"
                    height="5"
                    rx="2"
                    fill="#94a3b8"
                  />
                  <circle cx="145" cy="35" r="8" fill="#fbbf24" />
                  <circle cx="135" cy="35" r="8" fill="#f87171" opacity="0.8" />
                </g>

                {/* Success Checkmark */}
                <circle cx="165" cy="135" r="15" fill="#34d399" />
                <path
                  d="M160 135L164 139L170 133"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>

          {/* --- Details Column --- */}
          <div className="details-column">
            <div className="card-header">
              <FaCreditCard size="1.2em" />
              <h4>Payment Information (EFT)</h4>
            </div>
            <div className="card-content">
              <p>
                Please make your payment to the bank account below. Use your{" "}
                <strong>Order ID</strong> as the payment reference.
              </p>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Bank</span>
                  <span className="value">FNB (First National Bank)</span>
                </div>
                <div className="detail-item">
                  <span className="label">Account Holder</span>
                  <span className="value">GMT Safety Solutions (Pty) Ltd</span>
                </div>
                <div className="detail-item">
                  <span className="label">Account Number</span>
                  <div className="account-number-wrapper">
                    <span className="value account-number-value">
                      {accountNumber}
                    </span>
                    <button
                      onClick={handleCopy}
                      className={`copy-button ${isCopied ? "copied" : ""}`}
                      title={isCopied ? "Copied!" : "Copy to clipboard"}
                    >
                      {isCopied ? <FaCheck /> : <FaRegCopy />}
                    </button>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="label">Branch Code</span>
                  <span className="value">250655 (Welkom)</span>
                </div>
                <div className="detail-item">
                  <span className="label">Account Type</span>
                  <span className="value">Cheque</span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <FaInfoCircle />
              <p className="status-note">
                Your order status will be updated to "Processing" once payment
                is confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StyleInjector = ({ css }) => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    const styleId = "global-app-styles";
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
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
let supabase;
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (error) {
  console.error("Error initializing Supabase client with createClient:", error);
}

// --- Google Maps API Key ---
// REMOVE THE IMPORT: config.GoogleApiKey
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// --- Toast Context for Notifications ---
const ToastContext = createContext();
const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const addToast = useCallback((message, type = "info") => {
    const id = toastIdRef.current++;
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === "success" && <FaCheckCircle />}
            {toast.type === "error" && <FaTimes />}
            {toast.type === "info" && <FaInfoCircle />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ExpandableSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="expandable-section">
      <button className="expandable-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <FaChevronDown className={isOpen ? "expanded" : ""} />
      </button>
      <div className={`expandable-content ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
};

// --- Helper Components ---
const formatCurrency = (amount) => {
  const number = Number(amount);
  if (isNaN(number)) {
    return "R 0.00";
  }
  return `R ${number.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const NavigateLink = ({
  href,
  children,
  className,
  activeView,
  setView,
  setNavOpen,
  style,
}) => {
  // Use a default href to prevent errors if it's undefined
  const safeHref = href || "#";

  // Determine the main section for comparison. This logic groups all "service/..." links
  // under a single "services" section for highlighting the main navigation link.
  const mainSectionForHref = safeHref.startsWith("#service/")
    ? "services"
    : safeHref.substring(1);

  // Similarly, determine the active section from the activeView prop.
  const activeSection = (activeView || "").startsWith("service/")
    ? "services"
    : activeView;

  const handleClick = (e) => {
    e.preventDefault();

    // If a setView function is provided, use it to change the view.
    if (setView) {
      const targetView = safeHref.substring(1);
      setView(targetView);
    }

    // If a setNavOpen function is provided (likely for mobile menus), close the navigation.
    if (setNavOpen) {
      setNavOpen(false);
    }
  };

  return (
    <a
      href={safeHref}
      onClick={handleClick}
      // Combine provided className with a dynamic 'active' class
      className={`${className || ""} ${
        activeSection === mainSectionForHref ? "active" : ""
      }`}
      style={style}
    >
      {children}
    </a>
  );
};

const MobileNavModal = ({ isOpen, onClose, setView, navLinks, onSignOut }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`mobile-nav-container ${isOpen ? "active" : ""}`}
      aria-modal="true"
      role="dialog"
    >
      <div className="mobile-nav-overlay" onClick={onClose}></div>
      <nav className="mobile-nav-modal">
        <button
          className="mobile-nav-close"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <FaTimes />
        </button>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.id || link.text} className="mobile-nav-item">
              {link.type === "link" && (
                <NavigateLink
                  href={link.href}
                  setView={setView}
                  setNavOpen={onClose}
                  className="mobile-nav-link"
                >
                  {link.text}
                </NavigateLink>
              )}
              {link.type === "expandable" && (
                <>
                  <button
                    className="mobile-nav-accordion-toggle"
                    onClick={() => toggleAccordion(link.id)}
                  >
                    <span>{link.text}</span>
                    {openAccordion === link.id ? <FaMinus /> : <FaPlus />}
                  </button>
                  <div
                    className={`mobile-nav-submenu-wrapper ${
                      openAccordion === link.id ? "open" : ""
                    }`}
                  >
                    <ul className="mobile-nav-submenu">
                      {link.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          {subItem.type === "action" ? (
                            <button
                              className="mobile-nav-sublink"
                              onClick={() => {
                                onSignOut();
                                onClose();
                              }}
                            >
                              {subItem.text}
                            </button>
                          ) : (
                            <NavigateLink
                              href={subItem.href}
                              setView={setView}
                              setNavOpen={onClose}
                              className="mobile-nav-sublink"
                            >
                              {subItem.text}
                            </NavigateLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

function App() {
  const [view, setView] = useState("home");
  const [session, setSession] = useState(undefined);
  const [authEvent, setAuthEvent] = useState(null);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [locations, setLocations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [viewAfterLogin, setViewAfterLogin] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const addToast = useToast();

  // STATE ADDED: To manage the password reset email flow between components
  const [emailForPasswordReset, setEmailForPasswordReset] = useState("");

  // --- MEMOIZED CALLBACKS for performance ---
  // These functions are passed to memoized children (Header, MobileNavModal)
  const onCartIconClick = useCallback(() => setIsCartOpen(true), []);
  const onMenuToggle = useCallback(() => setNavOpen(true), []);
  const closeMobileNav = useCallback(() => setNavOpen(false), []);

  const confirmSignOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setView("home");
    setAuthEvent(null);
    addToast("You have been signed out.", "info");
  }, [addToast, setView]);

  const featuredCourses = useMemo(
    () => courses.filter((c) => c.is_featured).slice(0, 3),
    [courses]
  );

  useEffect(() => {
    if (isModalOpen || isCartOpen || isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, isCartOpen, isNavOpen]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [
          companyInfoRes,
          locationsRes,
          coursesRes,
          servicesRes,
          testimonialsRes,
        ] = await Promise.all([
          supabase.from("company_info").select("*").eq("id", 1).single(),
          supabase.from("locations").select("*").order("display_order"),
          supabase.from("courses").select("*").order("title"),
          supabase.from("services").select("*").order("title"),
          supabase.from("testimonials").select("*").eq("is_approved", true),
        ]);

        if (companyInfoRes.error) throw companyInfoRes.error;
        setCompanyInfo(companyInfoRes.data);
        if (locationsRes.error) throw locationsRes.error;
        setLocations(locationsRes.data);
        if (coursesRes.error) throw coursesRes.error;
        setCourses(coursesRes.data);
        if (servicesRes.error) throw servicesRes.error;
        setServices(servicesRes.data);
        if (testimonialsRes.error) throw testimonialsRes.error;
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        addToast(
          "Could not load site content. Please try again later.",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (supabase) fetchInitialData();
  }, [addToast]);

  const fetchOrders = useCallback(async () => {
    if (!supabase || !session) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }
    setOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, [session, addToast]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthEvent(_event);
      if (_event === "PASSWORD_RECOVERY") {
        setView("update-password");
      }
    });
    return () => subscription.unsubscribe();
  }, [setView]);

  useEffect(() => {
    if (session) fetchOrders();
  }, [session, fetchOrders]);

  useEffect(() => {
    window.initMapsWrapperGlobal = () => setGoogleMapsLoaded(true);
    if (
      !GOOGLE_MAPS_API_KEY ||
      GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY"
    ) {
      console.warn("Google Maps API key is not set. Maps will not load.");
      return;
    }
    const scriptId = "google-maps-api-script";
    if (document.getElementById(scriptId)) {
      if (window.google?.maps) setGoogleMapsLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMapsWrapperGlobal&loading=async&defer`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      delete window.initMapsWrapperGlobal;
    };
  }, []);

  useEffect(() => {
    if (!supabase || !session) return;
    const channel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${session.user.id}`,
        },
        (payload) => {
          console.log("Order change detected, refreshing orders:", payload);
          fetchOrders();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [session, supabase, fetchOrders]);

  // Optimized scroll handler - only applies to desktop screens
  useEffect(() => {
    const handleScroll = () => {
      // Only enable scroll effects on desktop (1024px+)
      if (window.innerWidth >= 1024) {
        if (window.scrollY > 50) setIsHeaderScrolled(true);
        else if (window.scrollY < 20) setIsHeaderScrolled(false);
      } else {
        // Keep header static on mobile/tablet
        setIsHeaderScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    // Add resize listener to handle orientation changes
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsHeaderScrolled(false);
      } else {
        handleScroll();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const currentHash = window.location.hash.substring(1);
    if (currentHash.startsWith("access_token")) return;
    setView(currentHash || "home");
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      setView(event.state?.view || window.location.hash.substring(1) || "home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const protectedRoutes = ["account", "dashboard", "checkout"];
    const authRoutes = ["login", "password-reset", "update-password"];
    if (session === undefined) return;

    if (authEvent === "PASSWORD_RECOVERY" && view !== "update-password") {
      setView("update-password");
      addToast("Please update your password before continuing.", "info");
      return;
    }

    if (!session && protectedRoutes.includes(view)) {
      if (view === "checkout" && cart.length > 0) setViewAfterLogin("checkout");
      setView("login");
      addToast("Please sign in to continue.", "info");
      return;
    }
    if (session && authRoutes.includes(view)) {
      if (view === "update-password" && authEvent === "PASSWORD_RECOVERY") {
      } else {
        setView(viewAfterLogin || "dashboard");
        if (viewAfterLogin) setViewAfterLogin(null);
        return;
      }
    }
    if (window.location.hash !== `#${view}`) {
      history.pushState({ view }, "", `#${view}`);
    }
  }, [
    view,
    session,
    cart,
    viewAfterLogin,
    addToast,
    setView,
    setViewAfterLogin,
    authEvent,
  ]);

  useEffect(() => {
    const nonScrollingRoutes = [
      "account",
      "dashboard",
      "checkout",
      "login",
      "password-reset",
      "update-password",
    ];
    if (nonScrollingRoutes.includes(view)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const scrollTimeout = setTimeout(() => {
      const mainSectionId = view.startsWith("service/") ? "services" : view;
      const element = document.getElementById(mainSectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (view === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(scrollTimeout);
  }, [view]);

  useEffect(() => {
    const storedCart = localStorage.getItem("gmtSafetyCart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        localStorage.removeItem("gmtSafetyCart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gmtSafetyCart", JSON.stringify(cart));
  }, [cart]);

  const openCourseModal = (course) => {
    setSelectedCourseForModal(course);
    setIsModalOpen(true);
  };
  const closeCourseModal = () => setIsModalOpen(false);

  const addToCartHandler = (courseToAdd) => {
    const existingItem = cart.find((item) => item.id === courseToAdd.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === courseToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      addToast("Quantity updated in cart.", "info");
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { ...courseToAdd, quantity: 1, image_url: courseToAdd.image_url },
      ]);
      addToast(`${courseToAdd.title} added to cart!`, "success");
    }
  };

  const handleAddToCartAndCloseModal = (course) => {
    addToCartHandler(course);
    closeCourseModal();
  };
  const removeFromCartHandler = (courseId) => {
    const removedItem = cart.find((item) => item.id === courseId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== courseId));
    if (removedItem)
      addToast(`${removedItem.title} removed from cart.`, "info");
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }
    setIsCartOpen(false);
    setView("checkout");
  };

  const serviceSlug = view.startsWith("service/")
    ? view.substring("service/".length)
    : null;
  const serviceToShow = serviceSlug
    ? services.find((s) => s.slug === serviceSlug)
    : null;
  const activeMainSection = view.startsWith("service/") ? "services" : view;

  const mobileNavLinksData = useMemo(() => {
    const links = [
      { id: "home-nav", text: "Home", href: "#home", type: "link" },
      {
        id: "resources-nav",
        text: "Resources",
        type: "expandable",
        subItems: [
          { id: "nav-courses", text: "Training Courses", href: "#courses" },
          {
            id: "nav-consultancy",
            text: "Consultancy Services",
            href: "#services",
          },
        ],
      },
      { id: "contact-nav", text: "Contact", href: "#contact", type: "link" },
      { id: "about-nav", text: "About", href: "#about", type: "link" },
    ];
    if (session) {
      links.push({
        id: "my-account-nav",
        text: "My Account",
        type: "expandable",
        subItems: [
          { id: "account", text: "Account Details", href: "#account" },
          { id: "dashboard", text: "Dashboard", href: "#dashboard" },
          { id: "sign-out", text: "Sign Out", type: "action" },
        ],
      });
    } else {
      links.push({
        id: "login-nav",
        text: "Sign In",
        href: "#login",
        type: "link",
      });
    }
    return links;
  }, [session]);

  const renderContent = () => {
    if (isLoading && session === undefined) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <FaSpinner
            className="fa-spin"
            style={{ fontSize: "3rem", color: "var(--primary-blue)" }}
          />
        </div>
      );
    }
    switch (view) {
      case "login":
        return (
          <AuthSection
            id="login"
            activeSection={activeMainSection}
            supabaseClient={supabase}
            setView={setView}
            addToast={addToast}
            setViewAfterLogin={setViewAfterLogin}
            setEmailForPasswordReset={setEmailForPasswordReset}
          />
        );
      case "password-reset":
        return (
          <PasswordResetSection
            id="password-reset"
            activeSection={activeMainSection}
            supabaseClient={supabase}
            setView={setView}
            addToast={addToast}
            emailForPasswordReset={emailForPasswordReset}
          />
        );
      case "update-password":
        return (
          <UpdatePasswordSection
            id="update-password"
            activeSection={activeMainSection}
            supabaseClient={supabase}
            setView={setView}
            addToast={addToast}
          />
        );
      case "account":
        if (session === undefined) return null;
        return (
          <AccountSection
            id="account"
            activeSection={activeMainSection}
            session={session}
            supabaseClient={supabase}
            addToast={addToast}
          />
        );
      case "dashboard":
        if (session === undefined) return null;
        return (
          <DashboardSection
            id="dashboard"
            activeSection={activeMainSection}
            orders={orders}
            loading={ordersLoading}
            setView={setView}
          />
        );
      case "checkout":
        if (session === undefined) return null;
        return (
          <CheckoutSection
            id="checkout"
            activeSection={activeMainSection}
            cart={cart}
            setCart={setCart}
            setView={setView}
            supabaseClient={supabase}
            addToast={addToast}
            session={session}
            refreshOrders={fetchOrders}
          />
        );
      default:
        if (serviceToShow) {
          return (
            <ServiceDetailPage service={serviceToShow} setView={setView} />
          );
        }
        return (
          <>
            <HomeSection
              id="home"
              activeSection={activeMainSection}
              featuredCourses={featuredCourses}
              onCourseCardClick={openCourseModal}
              onAddToCart={addToCartHandler}
              setView={setView}
              isLoading={isLoading}
            />
            <CoursesSection
              id="courses"
              activeSection={activeMainSection}
              allCourses={courses}
              onCourseCardClick={openCourseModal}
              onAddToCart={addToCartHandler}
              isLoading={isLoading}
            />
            <ServicesSection
              id="services"
              activeSection={activeMainSection}
              services={services}
              setView={setView}
              isLoading={isLoading}
            />
            <TestimonialsSection
              id="testimonials"
              activeSection={activeMainSection}
              testimonials={testimonials}
              isLoading={isLoading}
            />
            <AboutSection
              id="about"
              activeSection={activeMainSection}
              setView={setView}
            />
            <ContactSection
              id="contact"
              activeSection={activeMainSection}
              locations={locations}
              companyInfo={companyInfo}
              googleMapsLoaded={googleMapsLoaded}
              supabaseClient={supabase}
              addToast={useToast()}
              session={session}
            />
          </>
        );
    }
  };

  return (
    <>
      <StyleInjector css={GlobalStyles} />
      <Header
        isScrolled={isHeaderScrolled}
        activeView={view}
        setView={setView}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartIconClick={onCartIconClick}
        session={session}
        onSignOut={confirmSignOut}
        logoUrl={companyInfo?.logo_url}
        onMenuToggle={onMenuToggle}
      />
      <MobileNavModal
        isOpen={isNavOpen}
        onClose={closeMobileNav}
        setView={setView}
        navLinks={mobileNavLinksData}
        onSignOut={confirmSignOut}
      />
      <main style={{ background: "var(--neutral-light-gray)" }}>
        {renderContent()}
      </main>
      <Footer
        companyInfo={companyInfo}
        locations={locations}
        setView={setView}
        googleMapsLoaded={googleMapsLoaded}
      />
      {isModalOpen && selectedCourseForModal && (
        <CourseDetailsModal
          course={selectedCourseForModal}
          onClose={closeCourseModal}
          onAddToCart={handleAddToCartAndCloseModal}
        />
      )}
      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={removeFromCartHandler}
        onCheckout={handleCheckout}
      />
      <SpeedInsights />
    </>
  );
}

// This is now a memoized component. It will not re-render unless its props change.
const Header = React.memo(
  ({
    isScrolled,
    activeView,
    setView,
    cartItemCount,
    onCartIconClick,
    session,
    onSignOut,
    logoUrl,
    onMenuToggle,
  }) => {
    // UserMenu is now defined inside Header and also memoized.
    const UserMenu = React.memo(() => {
      const [open, setOpen] = React.useState(false);
      const [isSignOutPopoverOpen, setIsSignOutPopoverOpen] =
        React.useState(false);

      const menuRef = React.useRef(null);
      const buttonRef = React.useRef(null);
      const popoverRef = React.useRef(null);

      React.useEffect(() => {
        const handleClick = (e) => {
          if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false);
          }
          if (
            popoverRef.current &&
            !popoverRef.current.contains(e.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(e.target)
          ) {
            setIsSignOutPopoverOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
      }, []);

      React.useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === "Escape") {
            setOpen(false);
            setIsSignOutPopoverOpen(false);
          }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }, []);

      const [highlighted, setHighlighted] = React.useState(-1);

      const items = React.useMemo(
        () => [
          {
            id: "account",
            label: "Account Details",
            action: () => {
              setView("account");
              setOpen(false);
            },
          },
          {
            id: "dashboard",
            label: "Dashboard",
            action: () => {
              setView("dashboard");
              setOpen(false);
            },
          },
          {
            id: "signout",
            label: "Sign Out",
            action: () => {
              setIsSignOutPopoverOpen(true);
              setOpen(false);
            },
          },
        ],
        [setView]
      );

      return (
        <div className="gmt-header__user-menu" ref={menuRef}>
          {/* Simplified popover styles */}
          <style>{`
          .user-menu-popover-container {
            position: absolute; top: calc(100% + 6px); right: 0; z-index: 21;
          }
          .user-menu-popover {
            background-color: var(--text-light, #ffffff);
            border-radius: var(--border-radius-md, 12px);
            box-shadow: var(--box-shadow-large);
            padding: 1.5rem; width: 300px; text-align: center;
            border: 1px solid var(--neutral-light-gray);
          }
          .user-menu-popover-arrow {
            content: ''; position: absolute; bottom: 100%; right: 20px;
            transform: translateX(50%); border-width: 8px; border-style: solid;
            border-color: transparent transparent var(--text-light, #ffffff) transparent;
          }
          .user-menu-popover-message {
            font-size: 1rem; color: var(--neutral-dark-gray);
            margin-bottom: 1.5rem; font-weight: 500;
          }
          .user-menu-popover-actions { display: flex; gap: 0.75rem; justify-content: center; }
          .user-menu-popover-button {
            padding: 0.6rem 1.2rem; border-radius: var(--border-radius-pill);
            font-weight: 600; font-family: var(--font-headings);
            border: none; cursor: pointer;
          }
          .user-menu-popover-cancel { background-color: var(--neutral-light-gray); color: var(--neutral-dark-gray); }
          .user-menu-popover-confirm { background-color: #dc3545; color: #ffffff; }
        `}</style>
          <button
            className="gmt-header__user-menu-toggle"
            type="button"
            ref={buttonRef}
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <FaUserCircle />
            <span>My Account</span>
            <FaChevronDown className={`chevron-icon ${open ? "open" : ""}`} />
          </button>
          {open && (
            <ul className="gmt-header__dropdown-menu gmt-header__user-menu-dropdown">
              {items.map((item, idx) => (
                <li key={item.id}>
                  <button
                    className="gmt-header__dropdown-item"
                    style={{
                      background:
                        highlighted === idx ? "var(--primary-blue)" : "none",
                      color:
                        highlighted === idx ? "#fff" : "var(--primary-blue)",
                    }}
                    onClick={item.action}
                    onMouseEnter={() => setHighlighted(idx)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {isSignOutPopoverOpen && (
            <div className="user-menu-popover-container" ref={popoverRef}>
              <div className="user-menu-popover">
                <div className="user-menu-popover-arrow"></div>
                <p className="user-menu-popover-message">
                  Are you sure you want to sign out?
                </p>
                <div className="user-menu-popover-actions">
                  <button
                    type="button"
                    className="user-menu-popover-button user-menu-popover-cancel"
                    onClick={() => setIsSignOutPopoverOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="user-menu-popover-button user-menu-popover-confirm"
                    onClick={onSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });

    return (
      <>
        {/* Optimized styles with mobile-first approach and standardized dropdown transitions */}
        <style>{`
        .gmt-header {
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 0.3rem 0;
          position: sticky; top: 0; left: 0; width: 100%;
          z-index: 1000;
          border-bottom: 1px solid var(--neutral-light-gray);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .gmt-header__container {
          display: flex; justify-content: space-between; align-items: center;
          width: 92%; max-width: 1280px; margin: 0 auto;
        }
        .gmt-header__logo img {
          height: 48px;
        }
        .gmt-header__nav { display: none; }
        .gmt-header__actions { display: flex; align-items: center; gap: 1rem; }
        .gmt-header__cart {
          position: relative; cursor: pointer; color: var(--primary-blue);
          padding: 0.5rem; background: none; border: none;
        }
        .gmt-header__cart svg { font-size: 1.6rem; }
        .gmt-header__cart-count {
          position: absolute; top: -2px; right: -4px;
          background-color: var(--warning-orange); color: var(--text-light);
          border-radius: 50%; width: 22px; height: 22px; font-size: 0.7rem;
          display: flex; justify-content: center; align-items: center; font-weight: bold;
          border: 2px solid var(--text-light);
        }
        .gmt-header__mobile-toggle {
          display: block; font-size: 1.6rem; cursor: pointer; color: var(--primary-blue);
          background: none; border: none; padding: 0.5rem; line-height: 1;
        }
        .gmt-header__user-menu { display: none; }

        /* Desktop styles - only applied on larger screens with standardized dropdown transitions */
        @media (min-width: 1024px) {
          .gmt-header {
            padding: ${isScrolled ? "0.2rem 0" : "0.5rem 0"};
            border-bottom: 1px solid ${
              isScrolled ? "var(--neutral-light-gray)" : "transparent"
            };
            box-shadow: ${isScrolled ? "var(--box-shadow-medium)" : "none"};
            transition: all 0.3s ease;
          }
          .gmt-header__logo img {
            height: ${isScrolled ? "52px" : "56px"};
            transition: height 0.3s ease;
          }
          .gmt-header__nav { display: block; }
          .gmt-header__nav-list { display: flex; align-items: center; gap: 0.5rem; list-style-type: none; }
          .gmt-header__nav-item { margin-left: 1.75rem; position: relative; }
          .gmt-header__nav-link, .gmt-header__dropdown-toggle {
            font-family: var(--font-headings); font-weight: 500; color: var(--neutral-dark-gray);
            font-size: 1rem; padding: 0.75rem 0.5rem; position: relative; cursor: pointer;
            letter-spacing: 0.3px; transition: color 0.2s ease;
            display: inline-flex; align-items: center; gap: 0.4em; background: none; border: none;
          }
          .gmt-header__dropdown-toggle svg { font-size: 0.8em; transition: transform 0.15s ease; }
          .gmt-header__nav-item:hover .gmt-header__dropdown-toggle svg { transform: rotate(180deg); }
          .gmt-header__nav-link:hover, .gmt-header__dropdown-toggle:hover, .gmt-header__nav-link.active { color: var(--primary-blue); }
          .gmt-header__nav-link::after {
            content: ''; position: absolute; bottom: 5px; left: 0.5rem; right: 0.5rem;
            height: 3px; background-color: var(--accent-lime); border-radius: 3px;
            transform: scaleX(0); transform-origin: center; transition: transform 0.2s ease;
          }
          .gmt-header__nav-link:hover::after, .gmt-header__nav-link.active::after { transform: scaleX(1); }
          .gmt-header__dropdown-menu {
            position: absolute; top: 100%; left: 50%; z-index: 1010;
            opacity: 0; visibility: hidden; transform: translateX(-50%) translateY(10px);
            transition: opacity 1.5s ease, transform 1.5s ease, visibility 0s 1.5s;
            background-color: var(--text-light); box-shadow: var(--box-shadow-large);
            border-radius: var(--border-radius-md); padding: 0.5rem; min-width: 240px;
            border: 1px solid var(--neutral-light-gray); list-style-type: none;
          }
          .gmt-header__nav-item:hover > .gmt-header__dropdown-menu, .gmt-header__user-menu:hover > .gmt-header__user-menu-dropdown {
            opacity: 1; visibility: visible; transform: translateX(-50%) translateY(5px); transition-delay: 0s;
          }
          .gmt-header__dropdown-menu li { margin: 0 !important; width: 100%; }
          .gmt-header__dropdown-item {
            display: flex; align-items: center; gap: 0.8em; width: 100%;
            padding: 0.75rem 1rem; border-radius: var(--border-radius-sm);
            color: var(--primary-blue-dark); font-size: 0.95rem; font-weight: 500;
            white-space: nowrap; text-align: left; background: none; border: none;
            cursor: pointer; transition: background-color 0.15s ease, color 0.15s ease;
          }
          .gmt-header__dropdown-item:hover { background-color: var(--primary-blue); color: var(--text-light); text-decoration: none; }
          .gmt-header__user-menu { display: block; }
          .gmt-header__user-menu-dropdown { 
            left: auto; right: 0; transform: translateX(0) translateY(10px); 
            transition: opacity 1.5s ease, transform 1.5s ease, visibility 0s 1.5s;
          }
          .gmt-header__user-menu:hover > .gmt-header__user-menu-dropdown { 
            transform: translateX(0) translateY(5px);
          }
          .gmt-header__cart:hover { color: var(--primary-blue-dark); transform: scale(1.05); }
          .gmt-header__cart { transition: color 0.15s ease, transform 0.15s ease; }
          .gmt-header__cart svg { font-size: 1.7rem; }
          .gmt-header__cart-count { width: 24px; height: 24px; font-size: 0.75rem; }
          .gmt-header__mobile-toggle { display: none; }
          .gmt-header__user-menu-toggle {
            display: flex; align-items: center; gap: 0.5em; font-family: var(--font-headings);
            font-weight: 600; color: var(--primary-blue); background: var(--neutral-light-gray);
            border: 1.5px solid var(--primary-blue); font-size: 1.05rem;
            padding: 0.55rem 1.25rem 0.55rem 1.05rem; border-radius: var(--border-radius-pill);
            transition: box-shadow 0.15s ease; cursor: pointer;
          }
          .gmt-header__user-menu-toggle:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10); }
          .gmt-header__user-menu-toggle > svg { font-size: 1.3em; }
          .gmt-header__user-menu-toggle > span { font-weight: 600; }
          .gmt-header__user-menu-toggle > .chevron-icon {
            font-size: 1.1em; margin-left: 0.2em; transition: transform 0.15s ease;
          }
          .gmt-header__user-menu-toggle > .chevron-icon.open { transform: rotate(180deg); }
        }
      `}</style>
        <header className="gmt-header">
          <div className="gmt-header__container">
            <NavigateLink
              href="#home"
              className="gmt-header__logo"
              setView={setView}
            >
              <img
                src={logoUrl || "/assets/images/logo.png"}
                alt="GMT Safety Logo"
              />
            </NavigateLink>
            <nav className="gmt-header__nav">
              <ul className="gmt-header__nav-list">
                {navLinksData.map((link) => (
                  <li key={link.id} className="gmt-header__nav-item">
                    {link.type === "dropdown" ? (
                      <>
                        <span className="gmt-header__dropdown-toggle">
                          {link.text} <FaChevronDown />
                        </span>
                        <ul className="gmt-header__dropdown-menu">
                          {link.subItems.map((subItem) => (
                            <li key={subItem.id}>
                              <NavigateLink
                                href={subItem.href}
                                activeView={activeView}
                                setView={setView}
                                className="gmt-header__dropdown-item"
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
                        className="gmt-header__nav-link"
                      >
                        {link.text}
                      </NavigateLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="gmt-header__actions">
              <div className="gmt-header__desktop-only">
                {session === undefined ? null : session ? (
                  <UserMenu />
                ) : (
                  <NavigateLink
                    href="#login"
                    className="btn btn-secondary btn-small"
                    setView={setView}
                  >
                    Sign In
                  </NavigateLink>
                )}
              </div>
              <button
                className="gmt-header__cart"
                onClick={onCartIconClick}
                aria-label={`View cart with ${cartItemCount} items`}
              >
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <span className="gmt-header__cart-count">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                className="gmt-header__mobile-toggle"
                aria-label="Toggle navigation menu"
                onClick={onMenuToggle}
              >
                <FaBars />
              </button>
            </div>
          </div>
        </header>
      </>
    );
  }
);

const EndorsementBadges = () => {
  const [endorsements, setEndorsements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEndorsements = async () => {
      if (!supabase) {
        setIsLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("endorsements")
          .select("*")
          .order("display_order");

        if (error) throw error;
        setEndorsements(data || []);
      } catch (error) {
        console.error("Error fetching endorsements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEndorsements();
  }, []);

  // Enhanced styles with professional spacing and shine effect
  const styles = `
    .endorsement-loader-container {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      // background-color: red;
      padding: 1rem 0;
    }

    .endorsement-loader-spinner {
      color: var(--neutral-medium-gray);
    }

    .endorsement-badges-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2.4rem;
      place-items: center;
      padding: 2rem 2rem;
      margin: 2rem 0;
    }

    .endorsement-badge {
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      padding: 1.5rem;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(0, 0, 0, 0.04);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      cursor: pointer;
    }

    .endorsement-badge::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.8) 50%,
        transparent 70%
      );
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
      transition: transform 0.6s ease;
      pointer-events: none;
    }

    .endorsement-badge:hover {
      transform: translateY(-8px) scale(1.05);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      border-color: rgba(0, 0, 0, 0.1);
    }

    .endorsement-badge:hover::before {
      transform: translateX(100%) translateY(-100%) rotate(45deg);
    }

    .endorsement-badge img {
      max-height: 100px;
      max-width: 200px;
      object-fit: contain;
      filter: brightness(1) contrast(1.05);
      transition: filter 0.3s ease;
    }

    .endorsement-badge:hover img {
      filter: brightness(1.1) contrast(1.1);
    }

    @media (max-width: 1024px) {
      .endorsement-badges-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem;
        padding: 2.5rem 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .endorsement-badges-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        padding: 2rem 1rem;
      }
      
      .endorsement-badge {
        padding: 1.25rem;
      }
      
      .endorsement-badge img {
        max-height: 60px;
        max-width: 120px;
      }
    }

    @media (max-width: 480px) {
      .endorsement-badges-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        padding: 1.5rem 0.75rem;
      }
      
      .endorsement-badge {
        padding: 0.75rem;
        width: 100%;
      }
      
      .endorsement-badge img {
        max-height: 50px;
        max-width: 100px;
      }
    }
  `;

  if (isLoading) {
    return (
      <>
        <style>{styles}</style>
        <div className="endorsement-loader-container">
          <div className="endorsement-loader-spinner">Loading...</div>
        </div>
      </>
    );
  }

  if (endorsements.length === 0) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="endorsement-badges-container">
        {endorsements.map((badge) => (
          <div key={badge.id} className="endorsement-badge">
            <img src={badge.image_url} alt={badge.alt_text} loading="lazy" />
          </div>
        ))}
      </div>
    </>
  );
};

const Hero = ({ setView }) => (
  <>
    {/* Styles moved from GlobalStyles.js for the Hero component */}
    <style>{`
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
    `}</style>
    <div className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Building Safer Workplaces, Together.</h1>
          <p className="hero-subtitle">
            GMT Safety Solutions provides accredited health & safety training
            and expert consultancy. Empower your team, ensure compliance, and
            cultivate a culture of safety excellence.
          </p>
          <div className="btn-group">
            <NavigateLink
              href="#courses"
              className="btn btn-primary"
              setView={setView}
            >
              <FaGraduationCap /> Explore Our Courses
            </NavigateLink>
            <NavigateLink
              href="#services"
              className="btn btn-hero-secondary"
              setView={setView}
            >
              <FaConciergeBell /> Our Services
            </NavigateLink>
          </div>
        </div>
      </div>
    </div>
  </>
);

const SkeletonCard = () => (
  <>
    {/* Styles moved from GlobalStyles.js for the SkeletonCard component */}
    <style>{`
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
    `}</style>
    <div className="skeleton-card">
      <div className="skeleton-card__image"></div>
      <div className="skeleton-card__content">
        <div className="skeleton-card__line skeleton-card__line--title"></div>
        <div className="skeleton-card__line skeleton-card__line--short"></div>
        <div className="skeleton-card__line skeleton-card__line--long"></div>
        <div className="skeleton-card__line"></div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
          <div
            className="skeleton-card__line"
            style={{ flexGrow: 1, height: "2.5em", marginBottom: 0 }}
          ></div>
          <div
            className="skeleton-card__line"
            style={{ flexGrow: 1, height: "2.5em", marginBottom: 0 }}
          ></div>
        </div>
      </div>
    </div>
  </>
);

// Utility functions to truncate text fields
const truncateText = (text, maxLength = 60) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};
const truncateByWords = (text, maxWords = 20) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

const CourseCard = ({ course, onCardClick, onAddToCart }) => {
  const imagePath = course.image_url || "/assets/images/course-default.jpg";
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Truncate fields to prevent overflow from long DB text
  const title = truncateText(course.title, 60);
  const shortDescription = truncateByWords(course.short_description, 25);
  const duration = truncateText(course.duration, 40);
  const type = truncateText(course.type, 25);

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart(course);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <>
      {/* Styles moved from GlobalStyles.js for the CourseCard component */}
      <style>{`
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
          white-space: nowrap;
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
        
        @media (max-width: 576px) {
          .gmt-card__actions { 
            flex-direction: column; 
          }
        }
      `}</style>
      <article className="gmt-card" data-course-id={course.id}>
        <div className="gmt-card__image-container course-card__image-container">
          <img src={imagePath} alt={title} className="gmt-card__image" />
          {type && <span className="tag">{type}</span>}
        </div>
        <div className="gmt-card__content">
          <h3 className="gmt-card__title" title={course.title}>
            {title}
          </h3>
          <div className="course-card__meta">
            <span>
              <FaStopwatch /> {duration || "N/A"}
            </span>
            <span className="course-card__price">
              {formatCurrency(course.price)}
            </span>
          </div>
          <p className="gmt-card__description" title={course.short_description}>
            {shortDescription || "Details coming soon."}
          </p>
          <div className="gmt-card__actions">
            <button
              className="btn btn-secondary btn-small"
              onClick={() => onCardClick(course)}
            >
              <FaInfoCircle /> View Details
            </button>
            <button
              className="btn btn-primary btn-small"
              onClick={handleAddToCartClick}
              disabled={addedFeedback}
            >
              {addedFeedback ? <FaCheckCircle /> : <FaCartPlus />}{" "}
              {addedFeedback ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

// --- REFACTORED HomeSection COMPONENT (with Integrated Styles) ---

const HomeSection = ({
  id,
  activeSection,
  featuredCourses,
  onCourseCardClick,
  onAddToCart,
  setView,
  isLoading,
}) => {
  // Utility function to truncate text
  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  // Utility function to truncate text by word count
  const truncateByWords = (text, maxWords = 20) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  // Function to sanitize and truncate course data
  const sanitizeCourseData = (courses) => {
    return courses.map((course) => ({
      ...course,
      title: truncateText(course.title, 60),
      description: truncateByWords(course.description, 25),
      // Truncate other potentially long fields
      instructor: truncateText(course.instructor, 30),
      category: truncateText(course.category, 25),
      // Keep original data for full view
      originalTitle: course.title,
      originalDescription: course.description,
    }));
  };

  return (
    <section id={id} className={activeSection === id ? "active-section" : ""}>
      <style>{`
        /* Set padding-top to 0 for the home section only */
        main section#home {
          padding-top: 0;
        }
        
        /* General layout for card grids */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.5rem;
        }
        
        @media (max-width: 768px) {
          .card-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Additional styles for text handling */
        .course-title {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 0.75rem;
          /* Ensure title doesn't break layout */
          word-wrap: break-word;
          hyphens: auto;
        }

        .course-description {
          font-size: 0.95rem;
          line-height: 1.5;
          color: #666;
          margin-bottom: 1rem;
          /* Set fixed height to maintain card consistency */
          min-height: 4.5rem;
          /* Handle overflow gracefully */
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .course-meta {
          font-size: 0.85rem;
          color: #888;
          /* Prevent meta info from growing too large */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Wrapper for the endorsement section */
        .home-endorsement-section {
          background: var(--neutral-light-gray);
          padding: 1.2rem 0 0.8rem 0;
        }
        
        .home-endorsement-section .section-header {
          margin-bottom: 1.1rem;
        }

        .home-endorsement-section .section-header .subtitle {
          text-align: center;
          margin-bottom: 64px;
        }
        
        .home-endorsement-section .endorsement-badges-container {
          margin-bottom: 0;
        }
        
        .home-featured-courses-container {
          padding-top: 2.5rem;
        }
        
        .home-view-all-link-wrapper {
          text-align: center;
          margin-top: 4rem;
        }

        .subtitle {
          margin-top: 24px;
        }

        /* Tooltip for showing full text on hover */
        .truncated-text {
          position: relative;
          cursor: help;
        }

        .truncated-text:hover::after {
          content: attr(data-full-text);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: white;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          white-space: normal;
          max-width: 300px;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        /* Error handling for missing content */
        .course-error {
          background: #f8f8f8;
          border: 1px dashed #ccc;
          padding: 2rem;
          text-align: center;
          color: #666;
          border-radius: 8px;
        }
      `}</style>

      <Hero setView={setView} />

      {/* Endorsement Section on a light grey background */}
      <div className="home-endorsement-section">
        <div className="section-header">
          <span className="subtitle">Accreditation & Professional Bodies</span>
        </div>
        <div className="endorsement-badges">
          <EndorsementBadges />
        </div>
      </div>

      {/* Featured Courses Section on the default grey background */}
      <div className="container home-featured-courses-container">
        <div className="section-header">
          <span className="subtitle">Featured Training</span>
          <h2>Invest in Your Team's Safety</h2>
        </div>
        <div className="card-grid">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <SkeletonCard key={`featured-skeleton-${i}`} />
            ))
          ) : featuredCourses.length > 0 ? (
            sanitizeCourseData(featuredCourses).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onCardClick={onCourseCardClick}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <div className="course-error">
              <p>No featured courses available at the moment.</p>
            </div>
          )}
        </div>
        <div className="home-view-all-link-wrapper">
          <NavigateLink
            href="#courses"
            className="btn btn-primary btn-lg"
            setView={setView}
          >
            <FaThList /> View All Courses
          </NavigateLink>
        </div>
      </div>
    </section>
  );
};

// --- FIXED CertificateModal Component ---
const CertificateModal = ({ isOpen, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Effect to manage body scroll and Escape key listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Reset image states when modal re-opens
  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [isOpen]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-dialog certificate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Sample Certificate</h3>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>
        <div className="modal-body certificate-modal-body">
          {/*
            This structure ensures that the loader and error messages are displayed correctly,
            and the image loading is handled robustly.
          */}
          {!imageLoaded && !imageError && (
            <div className="image-loading">
              <div className="spinner"></div>
              <p>Loading certificate...</p>
            </div>
          )}
          {imageError && (
            <div className="image-error">
              <p>Sorry, the certificate image could not be loaded.</p>
              <p>
                Please ensure the file exists at:{" "}
                <code>public/assets/images/sample-certificate.png</code>
              </p>
            </div>
          )}
          {/*
            THE FIX: The <img> tag is always rendered (unless an error occurs).
            Its visibility is toggled with `opacity`, which is more reliable for firing `onLoad`
            than using `display: none`. This prevents the "blank modal" issue where the load
            event never fires.
          */}
          <img
            src="/assets/images/sample-certificate.png"
            alt="Sample Certificate of Completion"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              display: !imageError ? "block" : "none", // Render as a block unless there is an error
              opacity: imageLoaded ? 1 : 0, // Fade the image in when it's loaded
              transition: "opacity 0.4s ease-in-out", // Smooth transition effect
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Updated CoursesSection component with simplified certificate viewing
const CoursesSection = ({
  id,
  activeSection,
  allCourses,
  onCourseCardClick,
  onAddToCart,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const courseTypes = useMemo(() => {
    if (!allCourses) return [];
    const types = new Set(
      allCourses.map((course) => course.type).filter(Boolean)
    );
    return Array.from(types).sort();
  }, [allCourses]);

  const filteredAndSortedCourses = useMemo(() => {
    if (!allCourses) return [];
    let courses = [...allCourses];

    if (searchTerm) {
      courses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (course.short_description &&
            course.short_description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }
    if (filterType) {
      courses = courses.filter((course) => course.type === filterType);
    }
    if (sortOrder) {
      courses.sort((a, b) => {
        switch (sortOrder) {
          case "price-asc":
            return Number(a.price) - Number(b.price);
          case "price-desc":
            return Number(b.price) - Number(a.price);
          case "name-asc":
            return a.title.localeCompare(b.title);
          case "name-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }
    return courses;
  }, [allCourses, searchTerm, filterType, sortOrder]);

  return (
    <section id={id} className={activeSection === id ? "active-section" : ""}>
      <style>{`
        .course-section-info {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.1rem;
          color: var(--neutral-dark-gray);
        }

        .link-style-button {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          color: var(--primary-blue);
          text-decoration: underline;
          cursor: pointer;
          font-weight: 600;
        }

        .link-style-button:hover {
          color: var(--primary-blue-dark);
        }

        .info-banner.course-prerequisites {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          background-color: var(--text-light);
          padding: 1.5rem;
          margin: 1rem 0 1.5rem;
          border: 1px solid var(--neutral-light-gray);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--box-shadow-light);
        }

        .info-banner-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
        }

        .info-banner-icon {
          color: var(--primary-blue);
          font-size: 2rem;
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info-banner-content {
          flex: 1;
        }

        .info-banner-content h4 {
          margin: 0;
          color: var(--primary-blue-dark);
          font-size: 1.3rem;
        }

        .info-banner-content ul {
          list-style: none;
          padding-left: 0;
          margin: 1.5rem 0 0 0;
        }

        .info-banner-content li {
          padding-left: 2em;
          position: relative;
          margin-bottom: 0.8em;
          line-height: 1.6;
          color: var(--neutral-dark-gray);
        }

        .info-banner-content li::before {
          content: '✓';
          position: absolute;
          left: 0;
          top: 2px;
          color: var(--accent-lime);
          font-weight: bold;
          font-size: 1.2rem;
        }

        /* Tablet styles */
        @media (max-width: 1024px) and (min-width: 769px) {
          /* Add tablet-specific styles here */
        }

        /* Mobile/Cellphone styles */
        @media (max-width: 768px) {
          .container {
            margin-top: 56px;
          }
          
          /* Align all elements to top */
          * {
            vertical-align: top;
          }
          
          .section-header,
          .course-section-info,
          .info-banner,
          .course-filters,
          .card-grid {
            text-align: left;
          }
          
          .section-header h2,
          .section-header p,
          .section-header .subtitle {
            text-align: left;
          }
        }
      `}</style>

      <div className="container">
        <div className="section-header">
          <span className="subtitle">Our Curriculum</span>
          <h2>Accredited Health & Safety Courses</h2>
          <p>
            Choose from a wide range of courses designed to meet industry
            standards and your specific organizational needs. Available online
            and on-site.
          </p>
        </div>

        <div className="course-section-info">
          <p>
            Upon successful completion of any course, a certificate is awarded.{" "}
            <a
              href="/assets/images/sample-certificate.png"
              target="_blank"
              rel="noopener noreferrer"
              className="link-style-button"
            >
              Click here to view a sample.
            </a>
          </p>
        </div>

        <div className="info-banner course-prerequisites">
          <div className="info-banner-header">
            <div className="info-banner-icon">
              <FaInfoCircle />
            </div>
            <div className="info-banner-content">
              <h4>Important Information</h4>
            </div>
          </div>
          <div className="info-banner-content">
            <ul>
              <li>
                All courses can be conducted at a client's premises on request.
              </li>
              <li>
                A minimum of 25 delegates is required to constitute a class.
              </li>
              <li>
                Delegates must provide their own PPE for practicals, depending
                on the training course (unless otherwise indicated).
              </li>
              <li>
                All delegates must produce proof of payment when attending the
                training course.
              </li>
              <li>
                All delegates must have matric as a pre-requisite to all
                courses.
              </li>
            </ul>
          </div>
        </div>

        <div className="course-filters">
          <div className="filter-group">
            <label htmlFor="search-courses">Search:</label>
            <input
              type="text"
              id="search-courses"
              placeholder="Keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="filter-type">Type:</label>
            <select
              id="filter-type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              {courseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sort-order">Sort:</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        <div className="card-grid">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <SkeletonCard key={`all-skeleton-${i}`} />
            ))
          ) : filteredAndSortedCourses.length > 0 ? (
            filteredAndSortedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onCardClick={onCourseCardClick}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                fontSize: "1.2rem",
                padding: "3rem 0",
                color: "var(--neutral-dark-gray)",
              }}
            >
              No courses match your criteria. Please adjust filters or search
              term.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const ServiceContentRenderer = ({ block, index }) => {
  const HeadingTag = `h${block.level || 4}`; // Default to h4 if level not specified
  switch (block.type) {
    case "heading":
      return (
        <HeadingTag key={index} className="service-content-heading">
          {block.withArrows && (
            <FaChevronRight
              style={{ transform: "rotate(0deg)", marginRight: "0.3em" }}
            />
          )}
          {block.text}
          {block.withArrows && (
            <FaChevronLeft
              style={{ transform: "rotate(0deg)", marginLeft: "0.3em" }}
            />
          )}
        </HeadingTag>
      );
    case "paragraph":
      return <p key={index}>{block.text}</p>;
    case "list":
      return (
        <ul key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              {typeof item === "string" ? item : item.text}
              {item.subItems && item.subItems.length > 0 && (
                <ul>
                  {item.subItems.map((sub, subIndex) => (
                    <li key={subIndex}>{sub}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      );
    case "twoColumnList":
      return (
        <div key={index} className="two-column-service-list">
          {/* ... implementation ... */}
        </div>
      );
    case "image":
      return (
        <img
          key={index}
          src={block.src}
          alt={block.alt || "Service Illustration"}
        />
      );
    default:
      return null;
  }
};

const ServiceDetailPage = ({ service, setView }) => {
  if (!service) return null;
  const imagePath = service.image_url || "/assets/images/service-default.jpg";

  // Function to truncate title after 3rd word
  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return title;
  };

  const styles = `
    .service-detail-page {
      /* The entire page now has a light gray background */
      background-color: var(--neutral-light-gray);
    }

    .service-detail-page-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .back-link-large {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      padding: 0.5rem;
      line-height: 1;
      background-color: #f0f0f0;
      border-radius: var(--border-radius-md);
      color: var(--text-dark);
      transition: background-color 0.2s ease-in-out;
    }
    
    .back-link-large:hover {
      background-color: #e0e0e0;
    }

    .service-header-title {
      margin: 0;
    }

    @media (max-width: 768px) {
      .service-header-title {
        font-size: 1.5rem; /* H3 size for mobile */
      }
    }

    .enquire-now-container {
      margin-top: 3rem;
      border-top: 1px solid #ddd; /* Adjusted border for white background */
      padding: 2rem;
      /* Swapped background to white to stand out on the gray page */
      background: #fff; 
      border-radius: var(--border-radius-md);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      {/* Added 'service-detail-page' class to apply the new background */}
      <section className="service-detail-page active-section">
        <div className="container">
          <div className="service-detail-page-header">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                setView("services");
              }}
              className="back-link-large"
            >
              <FaChevronLeft />
            </a>
            <h2 className="service-header-title">
              {truncateTitle(service.title)}
            </h2>
          </div>

          <div className="service-detail-page-content">
            <img
              src={imagePath}
              alt={service.title}
              className="featured-image"
            />
            <p
              className="gmt-card__description"
              style={{ fontSize: "1rem", color: "var(--text-dark)" }}
            ></p>

            {service.content_blocks &&
              service.content_blocks.map((block, index) => (
                <div key={index} className="service-content-block">
                  <ServiceContentRenderer block={block} index={index} />
                </div>
              ))}

            {/* The inline styles were replaced with a dedicated class */}
            <div className="enquire-now-container">
              <h3>Interested in this Service?</h3>
              <p>
                Contact us today for a consultation and find out how we can help
                your business achieve safety excellence.
              </p>
              <NavigateLink
                href="#contact"
                className="btn btn-primary"
                setView={setView}
              >
                <FaHandshake /> Enquire Now
              </NavigateLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ServiceCard = ({ service, onSelectService }) => {
  const imagePath = service.image_url || "/assets/images/service-default.jpg";
  return (
    <article className="gmt-card" id={`service-summary-${service.slug}`}>
      <div className="gmt-card__image-container">
        <img src={imagePath} alt={service.title} className="gmt-card__image" />
      </div>
      <div className="gmt-card__content">
        <h3 className="gmt-card__title">{service.title}</h3>

        <p className="gmt-card__description">
          {service.description || "More information coming soon."}
        </p>
        <div className="gmt-card__actions">
          <a
            href={`#service/${service.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectService(service.slug);
            }}
            className="btn btn-secondary"
            style={{ width: "100%" }}
          >
            <FaInfoCircle /> Learn More
          </a>
        </div>
      </div>
    </article>
  );
};

const ServicesSection = ({
  id,
  activeSection,
  services,
  setView,
  isLoading,
}) => (
  <section id={id} className={activeSection === id ? "active-section" : ""}>
    <div className="container">
      <div className="section-header">
        <span className="subtitle">Expert Solutions</span>
        <h2>Comprehensive Safety Services</h2>
        <p>
          Beyond training, we offer expert consultancy and support services to
          help you establish and maintain robust safety management systems.
        </p>
      </div>
      <div className="card-grid">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <SkeletonCard key={`services-skeleton-${i}`} />
          ))
        ) : services.length > 0 ? (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={(serviceSlug) =>
                setView(`service/${serviceSlug}`)
              }
            />
          ))
        ) : (
          <p>No services listed at the moment. Please check back later.</p>
        )}
      </div>
    </div>
  </section>
);

const TestimonialsSection = ({
  id,
  activeSection,
  testimonials,
  isLoading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) {
    return null; // Don't show a skeleton, just hide if not loaded
  }
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id={id}
      className={`testimonials-section ${
        activeSection === id ? "active-section" : ""
      }`}
    >
      <div className="container">
        <div className="section-header">
          <span className="subtitle">Client Feedback</span>
          <h2>What Our Clients Say</h2>
        </div>
        <div className="testimonial-slider">
          <div className="testimonial-card">
            <FaQuoteLeft className="testimonial-card__quote-icon" />
            <p>"{currentTestimonial.quote}"</p>
            <div className="testimonial-card__author">
              {currentTestimonial.author_name}
            </div>
            {currentTestimonial.author_title_company && (
              <div className="testimonial-card__author-title">
                {currentTestimonial.author_title_company}
              </div>
            )}
          </div>
        </div>
        {testimonials.length > 1 && (
          <div className="testimonial-navigation">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              disabled={testimonials.length <= 1}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              disabled={testimonials.length <= 1}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const AboutSection = ({ id, activeSection, setView }) => (
  <section
    id={id}
    className={`about-section ${activeSection === id ? "active-section" : ""}`}
  >
    <div className="container">
      {/* === Section Header === */}
      <div className="section-header">
        <span className="subtitle">Who We Are</span>
        <h2>A Foundation of Professionalism & Expertise</h2>
        <p>
          Learn more about our dedication to creating safer, compliant, and more
          productive work environments across South Africa.
        </p>
      </div>

      {/* === 1. THE INTRO BLOCK (Side-by-Side) === */}
      <div className="about-intro-layout">
        <div className="about-intro__text">
          {/* --- Main Narrative --- */}
          <h3>Our Story</h3>
          <p>
            GMT-SAFETY (Pty) Ltd is a Professional Environmental Health &
            Occupational Health and Safety Consultancy established in 2014,
            taking the reins from its sister company, GMT Occupational Health
            Consulting.
          </p>
          <p>
            Owned and led by George Mambo, an innovative and dedicated Executive
            Director, our company has expanded its footprint across Mpumalanga,
            Limpopo, Free State, Gauteng, and now the North West, building on a
            strong legacy of service.
          </p>

          {/* --- ACCREDITATION MOVED HERE --- */}
          {/* This block now sits neatly under the text, filling the space. */}
          <div className="about-credentials">
            <h4>Accreditation & Status</h4>
            <ul>
              <li>
                <strong>Company Status:</strong> 100% Black Owned
              </li>
              <li>
                <strong>B-BBEE:</strong> Level Four (4) Contributor
              </li>
              <li>
                <strong>Corporate Member:</strong> SAIOSH (No. 29335345)
              </li>
              <li>
                <strong>Director:</strong> Registered OHS Professional (No.
                29890805)
              </li>
              <li>
                <strong>Director:</strong> Graduate Member, IOSH South Africa
              </li>
            </ul>
          </div>
        </div>
        <div className="about-intro__image">
          <img
            src="/assets/images/about-gmt.jpg"
            alt="GMT Safety Solutions team collaborating on a project."
          />
        </div>
      </div>

      {/* === 2. THE DETAILS BLOCK (Remains below) === */}
      <div className="about-details-content">
        <div className="about-principles-grid">
          <div className="principle-card">
            <h4>Our Mission</h4>
            <p>
              To reduce the burden of human illness, injury, and disability by
              understanding how the environment influences the development and
              progression of human diseases.
            </p>
          </div>
          {/* ... other principle cards ... */}
          <div className="principle-card">
            <h4>Our Commitment</h4>
            <ul>
              <li>To offer outcome-based assistance.</li>
              <li>To foster knowledge and professional growth.</li>
              <li>To maintain dignity and confidentiality.</li>
              <li>To respond to our clients' needs.</li>
            </ul>
          </div>
          <div className="principle-card principle-card--full-width">
            <h4>Our Core Objectives</h4>
            <ul>
              <li>
                To ensure acceptable standards of environmental and occupational
                health are achieved.
              </li>
              <li>
                To provide the necessary information, instruction, training, and
                supervision for a safe working environment.
              </li>
              <li>
                To assist with all measures required to comply with the
                Occupational Health and Safety Act.
              </li>
              <li>
                To advise on eliminating or mitigating hazards before resorting
                to personal protective equipment.
              </li>
              <li>
                To promote people-driven approaches to sustainable development.
              </li>
            </ul>
          </div>
          <div className="principle-card principle-card--full-width">
            <h4>Our Approach</h4>
            <p>
              To play an important role in supporting the integration of primary
              and preventative measures in all places where there is human
              activity. As specialists in productivity management, your
              organization can benefit from our expertise within Occupational
              Health, Ergonomics, Hygiene, Waste Management, and more to
              optimize the well-being of your employees.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/**
 * A component to display a Google Map for a specific location.
 * It supports a "maximized" view that is controlled by its parent component.
 * This version correctly manages the Map and Marker instances in refs to prevent
 * re-initialization and common errors.
 *
 * @param {object} props - The component's props.
 * @param {object} props.location - The location object with latitude and longitude.
 * @param {boolean} props.googleMapsLoaded - A boolean indicating if the Google Maps API script has loaded.
 * @param {boolean} props.isMaximized - A boolean state from the parent, determining if the map should be maximized.
 * @param {function} props.onToggleMaximize - A callback function from the parent to toggle the maximized state.
 */
const GoogleMapInstance = ({
  location,
  googleMapsLoaded,
  isMaximized,
  onToggleMaximize,
}) => {
  // A ref to hold the HTML element where the map will be rendered.
  const mapRef = useRef(null);
  // A ref to hold the Google Maps object instance, to avoid re-initializing it.
  const mapInstance = useRef(null);
  // A ref to hold the single Google Maps Marker instance to prevent errors.
  const markerInstance = useRef(null);

  // This effect handles both the initialization of the map and updates when the location changes.
  useEffect(() => {
    // Only proceed if the API is loaded, we have a DOM element, and valid location data.
    if (
      googleMapsLoaded &&
      window.google &&
      mapRef.current &&
      location?.latitude &&
      location?.longitude
    ) {
      // --- INITIALIZE THE MAP AND MARKER (only once) ---
      if (!mapInstance.current) {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          zoom: 14,
          disableDefaultUI: true,
          zoomControl: true,
        });
        // Create a single, reusable marker and store its instance in a ref.
        markerInstance.current = new window.google.maps.Marker({
          map: mapInstance.current,
        });
      }

      // --- UPDATE THE MAP AND MARKER (on every location change) ---
      const position = {
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude),
      };

      mapInstance.current.setCenter(position);

      // Safely update the marker's position and details using its dedicated ref.
      if (markerInstance.current) {
        markerInstance.current.setPosition(position);
        markerInstance.current.setTitle(location.office_name);
        markerInstance.current.setIcon({
          url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${encodeURIComponent(
            getComputedStyle(document.documentElement)
              .getPropertyValue("--primary-blue")
              .trim()
          )}" width="40px" height="40px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`,
          scaledSize: new window.google.maps.Size(40, 40),
        });
      }
    }
  }, [location, googleMapsLoaded]);

  // This effect handles resizing the map when its container's dimensions change.
  useEffect(() => {
    if (mapInstance.current && location) {
      // Delaying the resize allows the CSS transitions to complete first.
      setTimeout(() => {
        window.google.maps.event.trigger(mapInstance.current, "resize");
        // Re-center the map after resizing.
        mapInstance.current.setCenter({
          lat: parseFloat(location.latitude),
          lng: parseFloat(location.longitude),
        });
      }, 400); // This duration should match the CSS transition time.
    }
  }, [isMaximized, location]);

  return (
    // A conditional class is added to the wrapper to trigger the different CSS layouts.
    <div className={`map-container-wrapper ${isMaximized ? "maximized" : ""}`}>
      {/* Conditionally render the correct controls based on the view state. */}
      {isMaximized ? (
        <>
          {/* "Back" button for the desktop maximized-footer view. */}
          <button
            className="map-back-btn"
            onClick={onToggleMaximize}
            aria-label="Minimize Map"
          >
            <FaChevronLeft /> Back
          </button>
          {/* "Close" button for the mobile fullscreen view. */}
          <button
            className="map-close-btn-mobile"
            onClick={onToggleMaximize}
            aria-label="Close Map"
          >
            <FaTimes />
          </button>
        </>
      ) : (
        // "Expand" button for the normal, non-maximized view.
        <div className="map-controls">
          <button
            className="map-control-btn"
            onClick={onToggleMaximize}
            aria-label="Maximize Map"
          >
            <FaExpand />
          </button>
        </div>
      )}

      {/* This is the DOM element where the Google Map is actually rendered into. */}
      <div ref={mapRef} className="map-container"></div>
    </div>
  );
};

const ContactSection = ({
  id,
  activeSection,
  locations,
  companyInfo,
  googleMapsLoaded,
  supabaseClient,
  addToast,
  session,
}) => {
  const formatSAPHoneNumber = (phone) => {
    if (!phone) return "";
    let digits = phone.toString().replace(/\D/g, "");
    if (digits.length === 10 && digits.startsWith("0")) {
      digits = "27" + digits.substring(1);
    } else if (digits.length === 11 && digits.startsWith("27")) {
      // Correct format
    } else if (digits.length > 11) {
      return phone;
    } else {
      return phone;
    }
    if (digits.length === 11) {
      return `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(
        4,
        7
      )} ${digits.slice(7, 11)}`;
    }
    return phone;
  };

  const getUserName = (user) => {
    if (!user) return "";
    if (user.user_metadata && user.user_metadata.full_name)
      return user.user_metadata.full_name;
    if (user.user_metadata && user.user_metadata.name)
      return user.user_metadata.name;
    if (user.email) return user.email.split("@")[0];
    return "";
  };

  const userName = session?.user ? getUserName(session.user) : "";
  const userEmail = session?.user?.email || "";

  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: userName,
      email: userEmail,
    }));
  }, [userName, userEmail]);

  const handleChange = (e) => {
    if (
      (e.target.name === "name" || e.target.name === "email") &&
      session?.user
    )
      return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabaseClient) {
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabaseClient
        .from("contact_messages")
        .insert([{ ...formData, phone: formData.phone || null }]);
      if (error) throw error;

      // ====================================================== //
      // ============== THIS IS THE ONLY CHANGE =============== //
      // We are updating the success message to be more specific.
      // ====================================================== //
      addToast(
        "Message sent! You will receive a reply via email shortly.",
        "success"
      );

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Supabase form submission error:", error.message);
      addToast(`Error: ${error.message}`, "error"); // Also improved error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} className={activeSection === id ? "active-section" : ""}>
      <style>{`
        /* Styles remain the same, no changes needed here */
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
          position: relative;
        }
        .location-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--box-shadow-large);
          border-color: var(--primary-blue);
        }
        .location-card--head-office {
          border-color: var(--accent-lime);
        }
        .location-card--head-office::after {
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
          font-style: normal;
          color: var(--neutral-dark-gray);
          white-space: pre-wrap;
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
        @media (max-width: 1024px) {
          .contact-grid { 
            grid-template-columns: 1fr; 
          }
          .contact-info-wrapper {
            position: static;
            margin-top: 2rem;
          }
        }
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          .container { padding-left: 1rem; padding-right: 1rem; }
          .contact-form-wrapper, .contact-info-wrapper { padding: 1.5rem; }
          .location-card h4 { padding: 0.8rem 1rem; }
          .location-card .location-address { padding: 0.8rem 1rem 0 1rem; }
          .location-card .location-contact-details { padding: 0 1rem 0.8rem 1rem; }
        }
        @media (max-width: 480px) {
          .container { padding-left: 0.50rem; padding-right: 0.5rem; }
          .contact-form-wrapper, .contact-info-wrapper { padding: 1.25rem; }
          .location-card h4 { padding: 0.75rem; font-size: 1.1rem; }
          .location-card .location-address { padding: 0.75rem 0.75rem 0 0.75rem; }
          .location-card .location-contact-details { padding: 0 0.75rem 0.75rem 0.75rem; }
          .contact-grid { gap: 1.5rem; }
        }
      `}</style>

      <div className="container">
        <div className="section-header">
          <span className="subtitle">Get In Touch</span>
          <h2>We're Here to Help</h2>
          <p>
            Have questions or ready to discuss your safety needs? Fill out the
            form below, or contact us directly through our office details.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-form-wrapper">
            <h3>Send Us a Message</h3>
            <form
              id="contactForm"
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., John Doe"
                  disabled={isSubmitting || !!session?.user}
                  readOnly={!!session?.user}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g., john.doe@example.com"
                  disabled={isSubmitting || !!session?.user}
                  readOnly={!!session?.user}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Course Enquiry"
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we assist you today?"
                  rows="5"
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FaSpinner className="fa-spin" />
                ) : (
                  <FaPaperPlane />
                )}{" "}
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="contact-info-wrapper">
            <h3>Office Information</h3>
            {companyInfo?.secondary_phone && (
              <div className="contact-info__item">
                <FaWhatsapp />
                <div>
                  <strong>WhatsApp Us</strong>
                  <p>
                    <a
                      href={`https://wa.me/${companyInfo.secondary_phone.replace(
                        /\D/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {formatSAPHoneNumber(companyInfo.secondary_phone)}
                    </a>
                  </p>
                </div>
              </div>
            )}
            {companyInfo?.business_hours && (
              <div className="contact-info__item">
                <FaClock />
                <div>
                  <strong>Business Hours</strong>
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {companyInfo.business_hours}
                  </p>
                </div>
              </div>
            )}
            {locations && locations.length > 0 ? (
              locations.map((location) => (
                <div
                  key={location.id}
                  className={`location-card ${
                    location.is_head_office ? "location-card--head-office" : ""
                  }`}
                >
                  <h4>
                    <FaMapMarkerAlt /> {location.office_name}
                  </h4>
                  <p className="location-address">{location.display_details}</p>
                  <div className="location-contact-details">
                    {location.phone && (
                      <p>
                        <FaPhoneAlt />{" "}
                        <a href={`tel:${location.phone}`}>
                          {formatSAPHoneNumber(location.phone)}
                        </a>
                      </p>
                    )}
                    {location.email && (
                      <p>
                        <FaEnvelope />{" "}
                        <a href={`mailto:${location.email}`}>
                          {location.email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Office locations are currently unavailable.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// This hook should be present in your file, right after the imports
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const AuthSection = ({
  id,
  activeSection,
  supabaseClient, // Keep receiving the global client for registration
  setView,
  addToast,
  setViewAfterLogin,
  setEmailForPasswordReset,
}) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+27 ");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const debouncedEmail = useDebounce(email, 500);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const formatSAPhoneNumber = (value) => {
    if (!value) return "+27 ";
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return "+27 ";

    const localNumber = digits.substring(2);
    const parts = [];
    if (localNumber.length > 0) parts.push(localNumber.substring(0, 2));
    if (localNumber.length > 2) parts.push(localNumber.substring(2, 5));
    if (localNumber.length > 5) parts.push(localNumber.substring(5, 9));

    return `+27 ${parts.join(" ")}`;
  };

  const unformatPhoneNumber = (value) => {
    return value.replace(/\D/g, "");
  };

  const handlePhoneInputChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.startsWith("27") && rawValue.length <= 11) {
      setPhone(formatSAPhoneNumber(rawValue));
    } else if (!rawValue.startsWith("27")) {
      setPhone("+27 ");
    }
  };

  const handlePhoneKeyDown = (e) => {
    const input = e.target;
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      input.selectionStart <= 4
    ) {
      e.preventDefault();
    }
  };

  const isPasswordStrong = useMemo(() => {
    if (activeTab !== "register") return true;
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    return checks.every(Boolean);
  }, [password, activeTab]);

  useEffect(() => {
    const checkEmail = async () => {
      if (
        activeTab === "register" &&
        debouncedEmail &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail) &&
        emailTouched
      ) {
        setIsCheckingEmail(true);
        setEmailExists(false);
        try {
          const { data, error } = await supabaseClient.rpc(
            "check_email_exists",
            {
              email_to_check: debouncedEmail,
            }
          );

          if (error) throw new Error(error.message);
          setEmailExists(data);
        } catch (error) {
          console.error("Email check RPC error:", error);
          setEmailExists(false);
        } finally {
          setIsCheckingEmail(false);
        }
      } else {
        setEmailExists(false);
      }
    };
    checkEmail();
  }, [debouncedEmail, activeTab, supabaseClient, emailTouched]);

  // ================================================================== //
  // ==================== THIS IS THE CORE FIX ======================== //
  // ================================================================== //
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let authClient;

    if (rememberMe) {
      // If "Remember Me" is checked, create a new Supabase client
      // that uses localStorage for persistent sessions.
      authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          storage: localStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      });
    } else {
      // Otherwise, use the default client passed via props,
      // which uses sessionStorage (cleared on browser close).
      authClient = supabaseClient;
    }

    // Use the selected client (either persistent or temporary) to sign in.
    const { error } = await authClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      addToast(error.message, "error");
    } else {
      addToast("Signed in successfully!", "success");
      // IMPORTANT: After a successful login with a custom client,
      // you must reload the page to ensure the entire app
      // is now using the same session from localStorage.
      if (rememberMe) {
        window.location.reload();
      }
    }
    setLoading(false);
  };
  // ======================= END OF FIX =========================== //

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (emailExists) {
      addToast(
        "This email is already registered. Please log in or reset your password.",
        "error"
      );
      return;
    }
    if (!isPasswordStrong) {
      addToast("Please create a stronger password.", "error");
      return;
    }
    setLoading(true);
    setMessage("");

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: unformatPhoneNumber(phone),
        },
      },
    });

    if (error) {
      addToast(error.message, "error");
    } else {
      setMessage("Please check your email to verify your account.");
      addToast("Verification email sent!", "info");
    }
    setLoading(false);
  };

  const handleForgotPasswordClick = () => {
    setEmailForPasswordReset(email);
    setView("password-reset");
  };

  const styles = {
    authSection: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 100px)",
      padding: "2rem 1rem",
      backgroundColor: "var(--neutral-light-gray)",
      boxSizing: "border-box",
    },
    authContainer: {
      maxWidth: "480px",
      width: "100%",
      backgroundColor: "var(--text-light)",
      borderRadius: "var(--border-radius-lg)",
      boxShadow: "var(--box-shadow-large)",
      border: "1px solid var(--neutral-light-gray)",
      overflow: "hidden",
    },
    authHeader: {
      padding: "2rem 2.5rem 1rem",
      textAlign: "center",
      borderBottom: "1px solid var(--neutral-light-gray)",
    },
    authTitle: {
      fontFamily: "var(--font-headings)",
      color: "var(--primary-blue-dark)",
      fontSize: "2rem",
      fontWeight: 700,
      margin: "0 0 0.5rem 0",
    },
    authSubtitle: {
      color: "var(--neutral-dark-gray)",
      fontSize: "1rem",
      margin: 0,
    },
    authTabs: { display: "flex" },
    authTab: (isActive) => ({
      flex: 1,
      padding: "1rem",
      border: "none",
      background: "none",
      fontFamily: "var(--font-headings)",
      fontSize: "1.1rem",
      fontWeight: 600,
      color: isActive ? "var(--primary-blue)" : "var(--neutral-dark-gray)",
      cursor: "pointer",
      position: "relative",
      transition: "color 0.2s ease-in-out",
      borderBottom: isActive
        ? "3px solid var(--primary-blue)"
        : "3px solid transparent",
    }),
    authMessage: {
      padding: "1rem",
      margin: "1.5rem 2.5rem 0",
      backgroundColor: "var(--accent-teal-light)",
      color: "var(--accent-teal-dark)",
      border: "1px solid var(--accent-teal)",
      borderRadius: "var(--border-radius-sm)",
      textAlign: "center",
      fontSize: "0.95rem",
    },
    authFormContainer: {
      padding: "2.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    formRow: { display: "flex", gap: "1.5rem" },
    formGroup: { flex: 1, width: "100%" },
    label: {
      display: "block",
      marginBottom: "0.6rem",
      fontWeight: 600,
      color: "var(--primary-blue-dark)",
      fontSize: "0.95rem",
    },
    input: {
      width: "100%",
      padding: "0.8em 1em",
      border: "1px solid var(--neutral-medium-gray)",
      borderRadius: "var(--border-radius-sm)",
      fontSize: "1rem",
      boxSizing: "border-box",
    },
    passwordInputWrapper: { position: "relative", width: "100%" },
    passwordToggleBtn: {
      position: "absolute",
      right: "1px",
      top: "1px",
      bottom: "1px",
      width: "44px",
      background: "transparent",
      border: "none",
      padding: 0,
      margin: 0,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--neutral-dark-gray)",
      fontSize: "1.2rem",
      borderRadius: "0 var(--border-radius-sm) var(--border-radius-sm) 0",
    },
    forgotPasswordButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      textAlign: "right",
      width: "100%",
      color: "var(--primary-blue)",
      textDecoration: "none",
      fontWeight: 500,
      fontSize: "0.9rem",
      marginTop: "-0.75rem",
    },
    rememberMeContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
    },
    rememberMeCheckbox: {
      width: "auto",
      margin: 0,
      accentColor: "var(--primary-blue)",
      height: "1em",
      width: "1em",
    },
    rememberMeLabel: {
      display: "inline",
      marginBottom: 0,
      fontWeight: 500,
      color: "var(--neutral-dark-gray)",
      fontSize: "0.9rem",
      cursor: "pointer",
    },
    emailFeedback: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.85rem",
      marginTop: "0.5rem",
      minHeight: "1.2em",
    },
    emailChecking: { color: "var(--neutral-dark-gray)" },
    emailAvailable: { color: "#28a745" },
    emailTaken: { color: "#dc3545" },
  };

  return (
    <section
      id={id}
      style={styles.authSection}
      className={`auth-section ${activeSection === id ? "active-section" : ""}`}
    >
      <div style={styles.authContainer}>
        <div style={styles.authHeader}>
          <h3 style={styles.authTitle}>
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </h3>
          <p style={styles.authSubtitle}>
            {activeTab === "login"
              ? "Sign in to access your dashboard."
              : "Join us to start your safety journey."}
          </p>
        </div>
        <div style={styles.authTabs}>
          <button
            onClick={() => setActiveTab("login")}
            style={styles.authTab(activeTab === "login")}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            style={styles.authTab(activeTab === "register")}
          >
            Register
          </button>
        </div>
        {message && <div style={styles.authMessage}>{message}</div>}

        {activeTab === "login" ? (
          <form onSubmit={handleLogin} style={styles.authFormContainer}>
            <div style={styles.formGroup}>
              <label htmlFor="login-email" style={styles.label}>
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="login-password" style={styles.label}>
                Password
              </label>
              <div style={styles.passwordInputWrapper}>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  style={styles.passwordToggleBtn}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              style={styles.forgotPasswordButton}
            >
              Lost your password?
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? <FaSpinner className="fa-spin" /> : "Log in"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} style={styles.authFormContainer}>
            <div style={styles.formGroup}>
              <label htmlFor="register-firstName" style={styles.label}>
                First Name
              </label>
              <input
                id="register-firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="register-lastName" style={styles.label}>
                Last Name
              </label>
              <input
                id="register-lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="register-phone" style={styles.label}>
                Phone Number
              </label>
              <input
                id="register-phone"
                type="tel"
                value={phone}
                onChange={handlePhoneInputChange}
                onKeyDown={handlePhoneKeyDown}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="register-email" style={styles.label}>
                Email address
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                required
                style={styles.input}
              />
              <div style={styles.emailFeedback}>
                {isCheckingEmail && (
                  <span style={styles.emailChecking}>
                    <FaSpinner className="fa-spin" /> Checking availability...
                  </span>
                )}
                {!isCheckingEmail && emailExists && (
                  <span style={styles.emailTaken}>
                    <FaTimes /> Email already registered.{" "}
                    <a
                      href="#login"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("login");
                      }}
                    >
                      Log in?
                    </a>
                  </span>
                )}
                {!isCheckingEmail &&
                  !emailExists &&
                  debouncedEmail &&
                  emailTouched &&
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail) && (
                    <span style={styles.emailAvailable}>
                      <FaCheckCircle /> Email is available!
                    </span>
                  )}
              </div>
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="register-password" style={styles.label}>
                Password
              </label>
              <div style={styles.passwordInputWrapper}>
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  style={styles.passwordToggleBtn}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <PasswordStrengthMeter password={password} />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !isPasswordStrong || emailExists}
              style={{ width: "100%", marginTop: "0.5rem" }}
            >
              {loading ? <FaSpinner className="fa-spin" /> : "Register"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const PasswordResetSection = ({
  id,
  activeSection,
  supabaseClient,
  setView,
  addToast,
  emailForPasswordReset,
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // NEW STATE: Tracks if the form has been successfully submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (emailForPasswordReset) {
      setEmail(emailForPasswordReset);
    }
  }, [emailForPasswordReset]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const redirectTo = window.location.origin + window.location.pathname;

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });

    if (error) {
      addToast(error.message, "error");
    } else {
      // UPDATED LOGIC: Instead of redirecting, show the confirmation screen.
      setIsSubmitted(true);
    }
    setLoading(false);
  };

  const styles = {
    section: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 100px)",
      padding: "2rem 1rem",
      backgroundColor: "var(--neutral-light-gray)",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "480px",
      width: "100%",
      backgroundColor: "var(--text-light)",
      borderRadius: "var(--border-radius-lg)",
      boxShadow: "var(--box-shadow-large)",
      border: "1px solid var(--neutral-light-gray)",
      overflow: "hidden",
      transition: "height 0.3s ease-in-out",
    },
    header: {
      padding: "2.5rem 2.5rem 1.5rem",
      textAlign: "center",
      borderBottom: "1px solid var(--neutral-light-gray)",
    },
    h3: {
      fontFamily: "var(--font-headings)",
      color: "var(--primary-blue-dark)",
      fontSize: "2rem",
      fontWeight: 700,
      margin: "0 0 0.5rem 0",
    },
    p: {
      color: "var(--neutral-dark-gray)",
      fontSize: "1rem",
      margin: 0,
      lineHeight: 1.6,
    },
    formContainer: {
      padding: "2rem 2.5rem 1.5rem",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      marginBottom: "0.6rem",
      fontWeight: 600,
      color: "var(--primary-blue-dark)",
      fontSize: "0.95rem",
    },
    input: {
      width: "100%",
      padding: "0.8em 1em",
      border: "1px solid var(--neutral-medium-gray)",
      borderRadius: "var(--border-radius-sm)",
      fontSize: "1rem",
      boxSizing: "border-box",
    },
    backLinkContainer: {
      padding: "0 2.5rem 2.5rem",
      textAlign: "center",
      marginTop: "0.5rem",
    },
    backLink: {
      color: "var(--primary-blue)",
      textDecoration: "none",
      fontWeight: 500,
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      transition: "color 0.2s ease",
    },
    // --- NEW STYLES for the confirmation view ---
    confirmationContainer: {
      padding: "2.5rem",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    confirmationIcon: {
      fontSize: "4rem",
      color: "var(--accent-lime)",
      marginBottom: "1.5rem",
      animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
    },
    confirmationText: {
      color: "var(--neutral-dark-gray)",
      fontSize: "1rem",
      lineHeight: 1.6,
      marginBottom: "0.5rem",
    },
    emailHighlight: {
      fontWeight: "700",
      color: "var(--primary-blue-dark)",
    },
    spamNotice: {
      fontSize: "0.85rem",
      color: "#888",
      marginTop: "1.5rem",
      marginBottom: "2rem",
    },
  };

  return (
    <>
      <style>{`
          @keyframes popIn {
              0% { transform: scale(0.5); opacity: 0; }
              80% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
          }
      `}</style>
      <section
        id={id}
        style={styles.section}
        className={`password-reset-section ${
          activeSection === id ? "active-section" : ""
        }`}
      >
        <div style={styles.container}>
          {isSubmitted ? (
            // ====================================================== //
            // ============== NEW CONFIRMATION VIEW ================= //
            // ====================================================== //
            <div style={styles.confirmationContainer}>
              <FaCheckCircle style={styles.confirmationIcon} />
              <h3 style={styles.h3}>Check Your Inbox!</h3>
              <p style={styles.confirmationText}>
                A secure link to reset your password has been sent to
                <br />
                <strong style={styles.emailHighlight}>{email}</strong>.
              </p>
              <p style={styles.confirmationText}>
                Click the link in the email to set a new password. You will be
                able to log in immediately after.
              </p>
              <p style={styles.spamNotice}>
                Can't find it? Please check your spam or junk folder.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setView("login")}
                style={{ width: "100%" }}
              >
                <FaArrowLeft /> Back to Login
              </button>
            </div>
          ) : (
            <>
              <div style={styles.header}>
                <h3 style={styles.h3}>Reset Password</h3>
                <p style={styles.p}>
                  I need you to enter your email address. Confirm you account
                  via you'll be logged right back in. Reset your password from
                  within the Account Details section.
                </p>
              </div>

              <form onSubmit={handlePasswordReset} style={styles.formContainer}>
                <div style={styles.formGroup}>
                  <label htmlFor="reset-email" style={styles.label}>
                    Email address
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="e.g., your.email@example.com"
                    style={styles.input}
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: "100%" }}
                >
                  {loading ? (
                    <FaSpinner className="fa-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              <div style={styles.backLinkContainer}>
                <a
                  href="#login"
                  onClick={(e) => {
                    e.preventDefault();
                    setView("login");
                  }}
                  style={styles.backLink}
                >
                  <FaArrowLeft /> Back to Login
                </a>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

const UpdatePasswordSection = ({
  id,
  activeSection,
  supabaseClient,
  setView,
  addToast,
}) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- NEW: Password strength validation ---
  const isPasswordStrong = useMemo(() => {
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    return checks.every(Boolean);
  }, [password]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!isPasswordStrong) {
      addToast(
        "Please create a stronger password that meets all criteria.",
        "error"
      );
      return;
    }
    setLoading(true);
    const { error } = await supabaseClient.auth.updateUser({ password });
    if (error) {
      addToast(error.message, "error");
    } else {
      addToast(
        "Password updated successfully! You can now sign in.",
        "success"
      );
      setView("login");
    }
    setLoading(false);
  };

  // --- STYLES (Self-Contained) ---
  const styles = {
    section: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 100px)",
      padding: "2rem 1rem",
      backgroundColor: "var(--neutral-light-gray)",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "480px",
      width: "100%",
      backgroundColor: "var(--text-light)",
      borderRadius: "var(--border-radius-lg)",
      boxShadow: "var(--box-shadow-large)",
      border: "1px solid var(--neutral-light-gray)",
      overflow: "hidden",
    },
    header: {
      padding: "2.5rem 2.5rem 1.5rem",
      textAlign: "center",
      borderBottom: "1px solid var(--neutral-light-gray)",
    },
    h3: {
      fontFamily: "var(--font-headings)",
      color: "var(--primary-blue-dark)",
      fontSize: "2rem",
      fontWeight: 700,
      margin: "0 0 0.5rem 0",
    },
    formContainer: { padding: "2.5rem" },
    formGroup: { marginBottom: "1.5rem" },
    label: {
      display: "block",
      marginBottom: "0.6rem",
      fontWeight: 600,
      color: "var(--primary-blue-dark)",
      fontSize: "0.95rem",
    },
    input: {
      width: "100%",
      padding: "0.8em 1em",
      border: "1px solid var(--neutral-medium-gray)",
      borderRadius: "var(--border-radius-sm)",
      fontSize: "1rem",
      boxSizing: "border-box",
    },
    passwordInputWrapper: { position: "relative", width: "100%" },
    passwordToggleBtn: {
      position: "absolute",
      right: "1px",
      top: "1px",
      bottom: "1px",
      width: "44px",
      background: "transparent",
      border: "none",
      padding: 0,
      margin: 0,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--neutral-dark-gray)",
      fontSize: "1.2rem",
      borderRadius: "0 var(--border-radius-sm) var(--border-radius-sm) 0",
    },
  };

  return (
    <section
      id={id}
      style={styles.section}
      className={`update-password-section ${
        activeSection === id ? "active-section" : ""
      }`}
    >
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.h3}>Create New Password</h3>
        </div>
        <form onSubmit={handleUpdatePassword} style={styles.formContainer}>
          <div style={styles.formGroup}>
            <label htmlFor="new-password" style={styles.label}>
              New Password
            </label>
            <div style={styles.passwordInputWrapper}>
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={styles.passwordToggleBtn}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <PasswordStrengthMeter password={password} />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !isPasswordStrong}
            style={{ width: "100%" }}
          >
            {loading ? <FaSpinner className="fa-spin" /> : "Save New Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

const AccountSection = ({
  id,
  activeSection,
  session,
  supabaseClient,
  addToast,
}) => {
  // --- STATE ---
  const [initialDetails, setInitialDetails] = useState(null);
  const [isDetailsPopoverOpen, setIsDetailsPopoverOpen] = useState(false);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- NEW STATE & REFS for Delete Account Popover ---
  const [isDeletePopoverOpen, setIsDeletePopoverOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const deletePopoverRef = useRef(null);
  const deleteButtonRef = useRef(null);

  const detailsPopoverRef = useRef(null);

  const isPasswordStrong = useMemo(() => {
    if (!password) return false;
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    const score = checks.filter(Boolean).length;
    return score >= 4;
  }, [password]);

  const formatSAPhoneNumber = (phone) => {
    if (!phone) return "+27 ";
    let digits = phone.toString().replace(/\D/g, "");
    if (digits.startsWith("0")) {
      digits = "27" + digits.substring(1);
    }
    if (!digits.startsWith("27")) {
      digits = digits.length > 0 ? "27" + digits : "27";
    }
    if (digits.length > 11) {
      digits = digits.slice(0, 11);
    }
    if (digits.length <= 2) return "+27 ";
    if (digits.length <= 4) return `+27 ${digits.slice(2)}`;
    if (digits.length <= 7)
      return `+27 ${digits.slice(2, 4)} ${digits.slice(4)}`;
    return `+27 ${digits.slice(2, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  };

  const unformatPhoneNumber = (value) => {
    if (!value) return "";
    return value.replace(/\D/g, "");
  };

  const handlePhoneInputChange = (e) => {
    const input = e.target;
    const value = e.target.value;
    const cursorPosition = input.selectionStart;
    if (value.length < 4 || !value.startsWith("+27")) {
      const formatted = formatSAPhoneNumber(value);
      setDetails({ ...details, phone: formatted });
      setTimeout(() => {
        if (input) {
          const newPosition = Math.max(4, cursorPosition);
          input.setSelectionRange(newPosition, newPosition);
        }
      }, 0);
      return;
    }
    const formatted = formatSAPhoneNumber(value);
    setDetails({ ...details, phone: formatted });
    setTimeout(() => {
      if (input) {
        let newPosition = cursorPosition;
        if (formatted.length > value.length) {
          newPosition = cursorPosition + (formatted.length - value.length);
        }
        input.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };

  const handlePhoneKeyDown = (e) => {
    const input = e.target;
    const cursorPosition = input.selectionStart;
    if ((e.key === "Backspace" || e.key === "Delete") && cursorPosition <= 4) {
      e.preventDefault();
      return;
    }
    if (e.key === "Home" || (e.ctrlKey && e.key === "a")) {
      e.preventDefault();
      input.setSelectionRange(4, input.value.length);
    }
  };

  useEffect(() => {
    if (session?.user?.user_metadata) {
      const userData = {
        firstName: session.user.user_metadata.first_name || "",
        lastName: session.user.user_metadata.last_name || "",
        phone: session.user.user_metadata.phone
          ? formatSAPhoneNumber(session.user.user_metadata.phone)
          : "+27 ",
      };
      setDetails(userData);
      setInitialDetails(userData);
    }
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        detailsPopoverRef.current &&
        !detailsPopoverRef.current.contains(event.target)
      ) {
        setIsDetailsPopoverOpen(false);
      }
      if (
        deletePopoverRef.current &&
        !deletePopoverRef.current.contains(event.target) &&
        !deleteButtonRef.current.contains(event.target)
      ) {
        setIsDeletePopoverOpen(false);
      }
    };
    if (isDetailsPopoverOpen || isDeletePopoverOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDetailsPopoverOpen, isDeletePopoverOpen]);

  useEffect(() => {
    if (activeSection === id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeSection, id]);

  const hasChanges = useMemo(() => {
    if (!initialDetails) return false;
    return (
      details.firstName.trim() !== initialDetails.firstName.trim() ||
      details.lastName.trim() !== initialDetails.lastName.trim() ||
      unformatPhoneNumber(details.phone) !==
        unformatPhoneNumber(initialDetails.phone)
    );
  }, [details, initialDetails]);

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const requestDetailsUpdate = (e) => {
    e.preventDefault();
    if (hasChanges) setIsDetailsPopoverOpen(true);
  };

  const confirmDetailsUpdate = async () => {
    setIsDetailsPopoverOpen(false);
    setDetailsLoading(true);
    const { error } = await supabaseClient.auth.updateUser({
      data: {
        first_name: details.firstName.trim(),
        last_name: details.lastName.trim(),
        phone: unformatPhoneNumber(details.phone),
      },
    });
    if (error) {
      addToast(`Failed to update details: ${error.message}`, "error");
    } else {
      addToast("Account details updated successfully!", "success");
      setInitialDetails({
        ...details,
        firstName: details.firstName.trim(),
        lastName: details.lastName.trim(),
      });
    }
    setDetailsLoading(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast("Passwords do not match.", "error");
      return;
    }
    if (!isPasswordStrong) {
      addToast(
        "Password is not strong enough. Please meet all criteria.",
        "error"
      );
      return;
    }
    setPasswordLoading(true);
    const { error } = await supabaseClient.auth.updateUser({ password });

    if (error) {
      addToast(error.message, "error");
      setPasswordLoading(false);
    } else {
      addToast(
        "Password updated! For security, you will be signed out.",
        "success"
      );
      setTimeout(async () => {
        await supabaseClient.auth.signOut();
      }, 2000);
    }
  };

  // =================================================================
  // =========== UPDATED ACCOUNT DELETION LOGIC ==========
  // =================================================================
  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    if (!deletePassword) {
      addToast("Please enter your password to confirm.", "error");
      return;
    }
    setIsDeleting(true);

    // Step 1: Re-authenticate the user to confirm their identity.
    // This is a crucial security step before a destructive action.
    const { error: signInError } = await supabaseClient.auth.signInWithPassword(
      {
        email: session.user.email,
        password: deletePassword,
      }
    );

    if (signInError) {
      addToast("Incorrect password. Account not deleted.", "error");
      setIsDeleting(false);
      return;
    }

    // Step 2: If re-authentication is successful, call the RPC function.
    // This function will now be found by the API.
    const { error: deleteError } = await supabaseClient.rpc(
      "delete_user_account"
    );

    if (deleteError) {
      addToast(`Error deleting account data: ${deleteError.message}`, "error");
      setIsDeleting(false);
    } else {
      // Step 3: If the database cleanup is successful, sign the user out.
      // The `onAuthStateChange` listener in App.js will handle the UI redirect.
      addToast(
        "Your account and data have been successfully deleted.",
        "success"
      );
      await supabaseClient.auth.signOut();
      // No need to set more state here as the component will unmount.
    }
  };
  // ======================= END OF MODIFIED BLOCK =======================

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "4rem auto",
      padding: "3rem",
      backgroundColor: "#ffffff",
      borderRadius: "18px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      borderTop: "5px solid #005A9C",
    },
    sectionHeader: { marginBottom: "2rem", textAlign: "left" },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "clamp(2rem, 4.5vw, 2.5rem)",
      marginBottom: "0.5em",
      color: "#004273",
    },
    p: {
      fontFamily: "'Open Sans', sans-serif",
      maxWidth: "none",
      marginBottom: 0,
      color: "#5a6470",
    },
    detailsFormHeader: {
      fontFamily: "'Montserrat', sans-serif",
      marginTop: 0,
      marginBottom: "1.5rem",
      paddingBottom: "0.75rem",
      borderBottom: "1px solid #f0f2f5",
      fontSize: "1.8rem",
      color: "#004273",
    },
    form: { width: "100%" },
    formRow: { display: "flex", gap: "1.5rem", flexWrap: "wrap" },
    formGroup: { marginBottom: "1.5rem", flex: "1 1 300px" },
    label: {
      display: "block",
      marginBottom: "0.6rem",
      fontWeight: 600,
      color: "#004273",
      fontSize: "0.95rem",
      fontFamily: "'Open Sans', sans-serif",
    },
    input: {
      boxSizing: "border-box",
      width: "100%",
      padding: "0.8em 1em",
      border: "1px solid #d9dde2",
      borderRadius: "6px",
      fontSize: "1rem",
      fontFamily: "'Open Sans', sans-serif",
      backgroundColor: "#fdfdff",
    },
    inputWithIcon: { paddingRight: "40px" },
    inputDisabled: {
      backgroundColor: "#f0f2f5",
      cursor: "not-allowed",
      color: "#5a6470",
    },
    phoneInput: {
      boxSizing: "border-box",
      width: "100%",
      padding: "0.8em 1em",
      border: "1px solid #d9dde2",
      borderRadius: "6px",
      fontSize: "1rem",
      fontFamily: "'Open Sans', sans-serif",
      backgroundColor: "#fdfdff",
      letterSpacing: "0.5px",
    },
    passwordInputWrapper: { position: "relative", width: "100%" },
    passwordToggleBtn: {
      position: "absolute",
      top: "50%",
      right: "10px",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "0.25rem",
      color: "#5a6470",
      fontSize: "1.2rem",
      display: "flex",
      alignItems: "center",
    },
    btn: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.6em",
      padding: "0.8em 1.8em",
      borderRadius: "50px",
      fontWeight: 500,
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "15px",
      cursor: "pointer",
      border: "2px solid transparent",
      backgroundColor: "#A2D729",
      color: "#212529",
    },
    btnDisabled: { opacity: 0.6, cursor: "not-allowed", transform: "none" },
    passwordChangeContainer: {
      marginTop: "2.5rem",
      borderTop: "1px solid #d9dde2",
      paddingTop: "2.5rem",
    },
    passwordChangeSection: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    passwordChangeHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      paddingBottom: "1rem",
      borderBottom: "1px solid #f0f2f5",
    },
    passwordIconWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      backgroundColor: "#f0f2f5",
      borderRadius: "50%",
      color: "#005A9C",
      fontSize: "1.2rem",
    },
    passwordHeaderH4: {
      margin: 0,
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "1.2rem",
      fontWeight: 600,
      color: "#004273",
    },
    passwordChangeInstructions: {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: "0.95rem",
      color: "#5a6470",
      margin: 0,
      lineHeight: 1.6,
    },
    passwordFieldsGrid: { display: "flex", gap: "1.5rem", flexWrap: "wrap" },
    passwordChangeActions: {
      marginTop: "1rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid #f0f2f5",
      textAlign: "right",
    },
    popoverContainer: { position: "relative", display: "inline-block" },
    popover: {
      position: "absolute",
      bottom: "calc(100% + 10px)",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "var(--text-light, #ffffff)",
      borderRadius: "var(--border-radius-md, 12px)",
      boxShadow: "var(--box-shadow-large)",
      padding: "1.5rem",
      width: "300px",
      textAlign: "center",
      zIndex: 10,
      border: "1px solid var(--neutral-light-gray)",
      animation: "fadeInPopover 0.2s ease-out",
    },
    popoverArrow: {
      content: '""',
      position: "absolute",
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      borderWidth: "8px",
      borderStyle: "solid",
      borderColor:
        "var(--text-light, #ffffff) transparent transparent transparent",
    },
    popoverMessage: {
      fontSize: "1rem",
      color: "var(--neutral-dark-gray)",
      marginBottom: "1.5rem",
      fontWeight: 500,
    },
    popoverActions: {
      display: "flex",
      gap: "0.75rem",
      justifyContent: "center",
    },
    popoverButton: {
      padding: "0.6rem 1.2rem",
      borderRadius: "var(--border-radius-pill)",
      fontWeight: 600,
      fontFamily: "var(--font-headings)",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    popoverCancel: {
      backgroundColor: "var(--neutral-light-gray)",
      color: "var(--neutral-dark-gray)",
    },
    popoverConfirm: { backgroundColor: "#A2D729", color: "#212529" },
  };

  if (!session || !initialDetails) return null;

  return (
    <section
      id={id}
      className={`account-section ${
        activeSection === id ? "active-section" : ""
      }`}
    >
      <style>{`
        @keyframes fadeInPopover { from { opacity: 0; transform: translate(-50%, 5px); } to { opacity: 1; transform: translate(-50%, 0); } }
        
        .account-section {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
        }
        
        .account-section.active-section {
          opacity: 1;
          visibility: visible;
        }

        .delete-account-container {
          margin-top: 3rem;
          border-top: 2px solid #dc3545;
          padding-top: 2.5rem;
          text-align: left;
        }
        .delete-account-header {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
        }
        .delete-account-icon {
          font-size: 1.5rem;
          color: #dc3545;
        }
        .delete-account-container h3 {
          font-family: 'Montserrat', sans-serif;
          color: #dc3545;
          margin: 0;
          font-size: 1.5rem;
        }
        .delete-account-container p {
          color: var(--neutral-dark-gray);
          line-height: 1.6;
          max-width: 65ch;
          margin-bottom: 1.5rem;
        }
        .btn-danger {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.6em;
          padding: 0.8em 1.8em; border-radius: 50px; font-weight: 500;
          font-family: 'Montserrat', sans-serif; font-size: 15px; cursor: pointer;
          background-color: #dc3545; color: #ffffff; border: 2px solid #dc3545;
          transition: all 0.2s ease;
        }
        .btn-danger:hover:not(:disabled) {
          background-color: #c82333;
          border-color: #c82333;
          transform: translateY(-2px);
        }
        .btn-danger:disabled {
          background-color: #f8d7da;
          border-color: #f8d7da;
          cursor: not-allowed;
        }
        
        /* Delete Popover Specific Styles */
        .delete-popover {
          padding: 1.5rem;
          width: 350px;
          text-align: left;
        }
        .delete-popover p {
          font-size: 0.95rem;
          line-height: 1.5;
        }
        .delete-popover strong {
          color: #dc3545;
        }
      `}</style>
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.h2}>Account Details</h2>
          <p style={styles.p}>
            Manage your personal information, update your password, and view
            account settings.
          </p>
        </div>

        {/* --- Account Details Form --- */}
        <form style={styles.form} onSubmit={requestDetailsUpdate}>
          <h3 style={styles.detailsFormHeader}>Personal Information</h3>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label htmlFor="firstName" style={styles.label}>
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                style={styles.input}
                type="text"
                value={details.firstName}
                onChange={handleDetailsChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="lastName" style={styles.label}>
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                style={styles.input}
                type="text"
                value={details.lastName}
                onChange={handleDetailsChange}
                required
              />
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label htmlFor="phone" style={styles.label}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                style={styles.phoneInput}
                type="tel"
                value={details.phone}
                onChange={handlePhoneInputChange}
                onKeyDown={handlePhoneKeyDown}
                onClick={(e) =>
                  e.target.setSelectionRange(
                    e.target.value.length,
                    e.target.value.length
                  )
                }
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                style={{ ...styles.input, ...styles.inputDisabled }}
                type="email"
                value={session.user.email}
                readOnly
                disabled
              />
            </div>
          </div>
          <div style={{ textAlign: "right", position: "relative" }}>
            <div ref={detailsPopoverRef} style={styles.popoverContainer}>
              <button
                type="submit"
                style={{
                  ...styles.btn,
                  ...(detailsLoading || !hasChanges ? styles.btnDisabled : {}),
                }}
                disabled={detailsLoading || !hasChanges}
              >
                {detailsLoading ? (
                  <FaSpinner className="fa-spin" />
                ) : (
                  <FaUserEdit />
                )}
                Save Changes
              </button>
              {isDetailsPopoverOpen && (
                <div style={styles.popover}>
                  <div style={styles.popoverArrow}></div>
                  <p style={styles.popoverMessage}>
                    Are you sure you want to update your details?
                  </p>
                  <div style={styles.popoverActions}>
                    <button
                      type="button"
                      style={{
                        ...styles.popoverButton,
                        ...styles.popoverCancel,
                      }}
                      onClick={() => setIsDetailsPopoverOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      style={{
                        ...styles.popoverButton,
                        ...styles.popoverConfirm,
                      }}
                      onClick={confirmDetailsUpdate}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* --- Password Change Form --- */}
        <div style={styles.passwordChangeContainer}>
          <form style={styles.form} onSubmit={handlePasswordUpdate}>
            <div style={styles.passwordChangeSection}>
              <div style={styles.passwordChangeHeader}>
                <div style={styles.passwordIconWrapper}>
                  <FaKey />
                </div>
                <div>
                  <h4 style={styles.passwordHeaderH4}>Change Password</h4>
                  <p style={styles.passwordChangeInstructions}>
                    For security, you will be signed out after a successful
                    password update.
                  </p>
                </div>
              </div>
              <div style={styles.passwordFieldsGrid}>
                <div style={styles.formGroup}>
                  <label htmlFor="new-password" style={styles.label}>
                    New Password
                  </label>
                  <div style={styles.passwordInputWrapper}>
                    <input
                      id="new-password"
                      style={{ ...styles.input, ...styles.inputWithIcon }}
                      type={showNewPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      style={styles.passwordToggleBtn}
                      onClick={() => setShowNewPassword((v) => !v)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label htmlFor="confirm-password" style={styles.label}>
                    Confirm New Password
                  </label>
                  <div style={styles.passwordInputWrapper}>
                    <input
                      id="confirm-password"
                      style={{ ...styles.input, ...styles.inputWithIcon }}
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      style={styles.passwordToggleBtn}
                      onClick={() => setShowConfirmPassword((v) => !v)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              <PasswordStrengthMeter password={password} />
            </div>
            <div style={styles.passwordChangeActions}>
              <button
                type="submit"
                style={{
                  ...styles.btn,
                  ...(passwordLoading ||
                  !isPasswordStrong ||
                  password !== confirmPassword
                    ? styles.btnDisabled
                    : {}),
                }}
                disabled={
                  passwordLoading ||
                  !isPasswordStrong ||
                  password !== confirmPassword
                }
              >
                {passwordLoading ? (
                  <FaSpinner className="fa-spin" />
                ) : (
                  <FaKey />
                )}
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* --- Delete Account Section --- */}
        <div className="delete-account-container">
          <div className="delete-account-header">
            <FaTrashAlt className="delete-account-icon" />
            <h3>Delete Account</h3>
          </div>
          <p>
            Permanently delete your account and all of your content. This action
            is irreversible and cannot be undone.
          </p>
          <div
            ref={deletePopoverRef}
            style={{ position: "relative", display: "inline-block" }}
          >
            <button
              ref={deleteButtonRef}
              className="btn-danger"
              onClick={() => setIsDeletePopoverOpen((v) => !v)}
              disabled={isDeleting}
            >
              Delete My Account
            </button>

            {isDeletePopoverOpen && (
              <div
                style={{
                  ...styles.popover,
                  ...{ animation: "fadeInPopover 0.2s ease-out" },
                }}
                className="delete-popover"
              >
                <div style={styles.popoverArrow}></div>
                <p>
                  This action is <strong>permanent</strong>. To confirm, please
                  enter your password.
                </p>
                <form id="deleteAccountForm" onSubmit={handleConfirmDelete}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="delete-password">
                      Your Password
                    </label>
                    <div style={styles.passwordInputWrapper}>
                      <input
                        id="delete-password"
                        style={styles.input}
                        type={showDeletePassword ? "text" : "password"}
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        aria-label={
                          showDeletePassword ? "Hide password" : "Show password"
                        }
                        style={styles.passwordToggleBtn}
                        onClick={() => setShowDeletePassword((v) => !v)}
                      >
                        {showDeletePassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </form>
                <div style={styles.popoverActions}>
                  <button
                    type="button"
                    style={{ ...styles.popoverButton, ...styles.popoverCancel }}
                    onClick={() => setIsDeletePopoverOpen(false)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="deleteAccountForm"
                    className="btn-danger"
                    style={{
                      ...styles.popoverButton,
                      padding: "0.6rem 1.2rem",
                      borderRadius: "50px",
                    }}
                    disabled={isDeleting || !deletePassword}
                  >
                    {isDeleting ? (
                      <FaSpinner className="fa-spin" />
                    ) : (
                      <FaTrashAlt />
                    )}
                    {isDeleting ? "Deleting..." : "Confirm"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple PasswordStrengthMeter component
const PasswordStrengthMeter = ({ password }) => {
  // --- Simplified Password Analysis ---
  const analysis = useMemo(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;

    let strength = { label: "Very Weak", color: "#dc3545", width: "20%" };

    if (score === 5) {
      strength = { label: "Very Strong", color: "#28a745", width: "100%" };
    } else if (score === 4) {
      strength = { label: "Strong", color: "#A2D729", width: "80%" };
    } else if (score === 3) {
      strength = { label: "Medium", color: "#fd7e14", width: "60%" };
    } else if (score === 2) {
      strength = { label: "Weak", color: "#ea580c", width: "40%" };
    }

    return { strength, checks };
  }, [password]);

  // --- Style Definitions ---
  const styles = {
    container: { marginTop: "0.75rem", transition: "all 0.3s ease" },
    track: {
      height: "8px",
      backgroundColor: "#f0f2f5",
      borderRadius: "50px",
      overflow: "hidden",
      marginBottom: "0.5rem",
    },
    bar: {
      height: "100%",
      borderRadius: "50px",
      transition: "width 0.3s ease, background-color 0.3s ease",
      width: analysis.strength.width,
      backgroundColor: analysis.strength.color,
    },
    strengthText: {
      fontSize: "0.85rem",
      fontWeight: 500,
      color: analysis.strength.color,
      minHeight: "1.2em",
    },
    requirementsList: {
      listStyle: "none",
      padding: 0,
      margin: "0.75rem 0 0 0",
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "0.5rem",
      fontSize: "0.85rem",
      fontFamily: "'Open Sans', sans-serif",
    },
    requirementItem: (met) => ({
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: met ? "#28a745" : "#5a6470", // Green for met, gray for unmet
      transition: "color 0.3s ease",
    }),
    requirementIcon: (met) => ({
      color: met ? "#28a745" : "#dc3545", // Green check, Red cross
    }),
  };

  const requirements = [
    {
      key: "length",
      label: "At least 8 characters",
      met: analysis.checks.length,
    },
    {
      key: "uppercase",
      label: "Contains an uppercase letter",
      met: analysis.checks.uppercase,
    },
    {
      key: "lowercase",
      label: "Contains a lowercase letter",
      met: analysis.checks.lowercase,
    },
    { key: "number", label: "Contains a number", met: analysis.checks.number },
    { key: "symbol", label: "Contains a symbol", met: analysis.checks.symbol },
  ];

  // Don't render anything if there is no password
  if (!password) return null;

  return (
    <div style={styles.container}>
      {/* Strength Bar */}
      <div style={styles.track}>
        <div style={styles.bar}></div>
      </div>

      {/* Strength Label */}
      <p style={styles.strengthText}>
        Strength: <strong>{analysis.strength.label}</strong>
      </p>

      {/* Checklist of Requirements */}
      <ul style={styles.requirementsList}>
        {requirements.map((req) => (
          <li key={req.key} style={styles.requirementItem(req.met)}>
            <span style={styles.requirementIcon(req.met)}>
              {req.met ? <FaCheckCircle /> : <FaTimes />}
            </span>
            <span>{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
// Demo component to showcase the password strength meter
const PasswordDemo = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
          color: "#1f2937",
        }}
      >
        Password Strength Meter
      </h2>

      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151",
            marginBottom: "0.5rem",
          }}
        >
          Enter your password
        </label>

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password here..."
            style={{
              width: "100%",
              padding: "12px 40px 12px 12px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.2s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "#6b7280",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>

      <PasswordStrengthMeter password={password} />

      {password && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "#475569",
            }}
          >
            Tips for a stronger password:
          </h3>
          <ul
            style={{
              fontSize: "0.8rem",
              color: "#64748b",
              margin: "0",
              paddingLeft: "1rem",
            }}
          >
            <li>Use a passphrase with multiple words</li>
            <li>Include numbers and special characters</li>
            <li>Avoid personal information</li>
            <li>Consider using a password manager</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const PaymentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "stretch",
      justifyContent: "stretch",
      zIndex: 10000,
      padding: "24px",
      animation: "fadeIn 0.2s ease-out",
    },
    modal: {
      backgroundColor: "#ffffff",
      borderRadius: "28px",
      padding: "0",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      border: "1px solid rgba(0, 0, 0, 0.06)",
      animation: "slideIn 0.3s ease-out",
      overflow: "hidden",
    },
    modalHeader: {
      background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
      padding: "32px 28px",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    },
    decorativeCircle1: {
      position: "absolute",
      top: "-40px",
      right: "-40px",
      width: "160px",
      height: "160px",
      background: "rgba(255, 255, 255, 0.08)",
      borderRadius: "50%",
    },
    decorativeCircle2: {
      position: "absolute",
      bottom: "-30px",
      left: "-30px",
      width: "120px",
      height: "120px",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "50%",
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      fontSize: "1.1rem",
      cursor: "pointer",
      color: "#ffffff",
      padding: "0.5rem",
      borderRadius: "10px",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "36px",
      height: "36px",
      zIndex: 2,
    },
    headerContent: {
      position: "relative",
      zIndex: 1,
    },
    iconWrapper: {
      width: "56px",
      height: "56px",
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "16px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    header: {
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "8px",
      lineHeight: "1.2",
      textAlign: "left",
    },
    subtitle: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.9)",
      fontWeight: "400",
      margin: 0,
      lineHeight: "1.5",
      textAlign: "left",
      maxWidth: "90%",
    },
    modalBody: {
      padding: "28px",
      flex: 1,
      overflowY: "auto",
    },
    infoHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "24px",
      paddingBottom: "20px",
      borderBottom: "1px solid #e5e7eb",
    },
    infoTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "6px",
    },
    infoSubtext: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "0.875rem",
      color: "#64748b",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      background: "#d1fae5",
      color: "#065f46",
      borderRadius: "8px",
      fontSize: "0.8rem",
      fontWeight: "600",
    },
    priceSection: {
      textAlign: "right",
    },
    priceLabel: {
      fontSize: "0.8rem",
      color: "#64748b",
      marginBottom: "4px",
      fontWeight: "500",
    },
    priceAmount: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#0d9488",
      lineHeight: "1",
    },
    securityBadges: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      marginTop: "24px",
      paddingTop: "20px",
      borderTop: "1px solid #e5e7eb",
    },
    securityBadge: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "0.75rem",
      color: "#64748b",
      fontWeight: "500",
    },
    footer: {
      padding: "20px 28px",
      background: "#f8fafc",
      borderTop: "1px solid #e5e7eb",
      display: "flex",
      justifyContent: "flex-end",
      flexShrink: 0,
    },
    confirmButton: {
      padding: "14px 32px",
      background: "#84cc16",
      color: "#ffffff",
      border: "none",
      borderRadius: "12px",
      fontSize: "0.9rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: "0 4px 12px rgba(132, 204, 22, 0.3)",
    },
  };

  // Add CSS animations and media queries to document head if not already present
  React.useEffect(() => {
    const styleId = "payment-modal-animations";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .payment-modal-overlay {
            padding: 16px !important;
          }
          .payment-modal {
            border-radius: 24px !important;
          }
          .payment-modal-header {
            padding: 24px 20px !important;
          }
          .payment-modal-header h2 {
            font-size: 1.5rem !important;
          }
          .payment-modal-header p {
            font-size: 0.85rem !important;
          }
          .payment-modal-body {
            padding: 20px !important;
          }
          .payment-modal-info-header {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .payment-modal-price-section {
            text-align: left !important;
          }
          .payment-modal-footer {
            padding: 16px 20px !important;
          }
          .payment-modal-confirm-button {
            width: 100%;
            padding: 12px 24px !important;
          }
        }

        @media (max-width: 480px) {
          .payment-modal-overlay {
            padding: 12px !important;
          }
          .payment-modal {
            border-radius: 20px !important;
          }
          .payment-modal-header {
            padding: 20px 16px !important;
          }
          .payment-modal-header h2 {
            font-size: 1.35rem !important;
          }
          .payment-modal-header p {
            font-size: 0.8rem !important;
            max-width: 100% !important;
          }
          .payment-modal-icon-wrapper {
            width: 48px !important;
            height: 48px !important;
            margin-bottom: 12px !important;
          }
          .payment-modal-icon-wrapper svg {
            width: 24px !important;
            height: 24px !important;
          }
          .payment-modal-close-button {
            top: 16px !important;
            right: 16px !important;
            width: 32px !important;
            height: 32px !important;
          }
          .payment-modal-body {
            padding: 16px !important;
          }
          .payment-modal-info-title {
            font-size: 1rem !important;
          }
          .payment-modal-price-amount {
            font-size: 1.75rem !important;
          }
          .payment-modal-security-badges {
            gap: 8px !important;
          }
          .payment-modal-security-badge {
            font-size: 0.7rem !important;
          }
          .payment-modal-footer {
            padding: 14px 16px !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      className="payment-modal-overlay"
      style={modalStyles.overlay}
      onClick={onClose}
    >
      <div
        className="payment-modal"
        style={modalStyles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="payment-modal-header" style={modalStyles.modalHeader}>
          <div style={modalStyles.decorativeCircle1}></div>
          <div style={modalStyles.decorativeCircle2}></div>

          <button
            className="payment-modal-close-button"
            style={modalStyles.closeButton}
            onClick={onClose}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            }}
            aria-label="Close modal"
          >
            ✕
          </button>

          <div style={modalStyles.headerContent}>
            <div
              className="payment-modal-icon-wrapper"
              style={modalStyles.iconWrapper}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "#ffffff" }}
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <h2 style={modalStyles.header}>Payment Information</h2>
            <p style={modalStyles.subtitle}>
              Provides foundational knowledge and practical skills to respond to
              common workplace injuries and medical emergencies until
              professional help arrives.
            </p>
          </div>
        </div>

        <div className="payment-modal-body" style={modalStyles.modalBody}>
          <div
            className="payment-modal-info-header"
            style={modalStyles.infoHeader}
          >
            <div>
              <div
                className="payment-modal-info-title"
                style={modalStyles.infoTitle}
              >
                Banking Information
              </div>
              <div style={modalStyles.infoSubtext}>
                <div style={modalStyles.badge}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  2 Days Processing
                </div>
              </div>
            </div>
            <div
              className="payment-modal-price-section"
              style={modalStyles.priceSection}
            >
              <div style={modalStyles.priceLabel}>Total Amount</div>
              <div
                className="payment-modal-price-amount"
                style={modalStyles.priceAmount}
              >
                R 850.00
              </div>
            </div>
          </div>

          <BankingDetails />

          <div
            className="payment-modal-security-badges"
            style={modalStyles.securityBadges}
          >
            <div
              className="payment-modal-security-badge"
              style={modalStyles.securityBadge}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              256-bit Encryption
            </div>
            <div
              className="payment-modal-security-badge"
              style={modalStyles.securityBadge}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              PCI Compliant
            </div>
            <div
              className="payment-modal-security-badge"
              style={modalStyles.securityBadge}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Verified Account
            </div>
          </div>
        </div>

        <div className="payment-modal-footer" style={modalStyles.footer}>
          <button
            className="payment-modal-confirm-button"
            style={modalStyles.confirmButton}
            onClick={onClose}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#65a30d";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(132, 204, 22, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#84cc16";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(132, 204, 22, 0.3)";
            }}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

// Copy to clipboard utility function with better error handling
const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(textArea);
        return true;
      } catch (error) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  } catch (error) {
    console.error("Failed to copy:", error);
    return false;
  }
};

// Enhanced CopyButton component with better visual feedback
const CopyButton = ({ text, size = "sm", label = "Copy" }) => {
  const [copied, setCopied] = React.useState(false);
  const [copying, setCopying] = React.useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (copying) return;

    setCopying(true);
    const success = await copyToClipboard(text);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    setCopying(false);
  };

  const buttonStyle = {
    background: copied ? "#10b981" : copying ? "#f59e0b" : "#f8fafc",
    border:
      "1px solid " + (copied ? "#10b981" : copying ? "#f59e0b" : "#e2e8f0"),
    color: copied || copying ? "#ffffff" : "#64748b",
    padding: size === "sm" ? "4px 8px" : "6px 10px",
    borderRadius: "6px",
    fontSize: size === "sm" ? "0.75rem" : "0.875rem",
    cursor: copying ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    marginLeft: "8px",
    verticalAlign: "middle",
    minWidth: size === "sm" ? "60px" : "70px",
    justifyContent: "center",
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleCopy}
      disabled={copying}
      onMouseOver={(e) => {
        if (!copied && !copying) {
          e.target.style.backgroundColor = "#e2e8f0";
          e.target.style.borderColor = "#cbd5e1";
        }
      }}
      onMouseOut={(e) => {
        if (!copied && !copying) {
          e.target.style.backgroundColor = "#f8fafc";
          e.target.style.borderColor = "#e2e8f0";
        }
      }}
      title={`Copy ${label}: ${text}`}
    >
      {copying ? "..." : copied ? "✓" : "📋"}
      {copying ? "Copying" : copied ? "Copied!" : "Copy"}
    </button>
  );
};

const OrderRow = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const addToast = useToast();

  const formatSAPhoneNumber = (phone) => {
    if (!phone) return "N/A";
    let digits = phone.toString().replace(/\D/g, "");
    if (digits.length === 10 && digits.startsWith("0")) {
      digits = "27" + digits.substring(1);
    }
    if (digits.length === 11 && digits.startsWith("27")) {
      return `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(
        4,
        7
      )} ${digits.slice(7, 11)}`;
    }
    return phone;
  };

  /**
   * Downloads all associated study materials as a single zip file.
   * This function now correctly handles the text[] array from the database.
   */
  const handleDownloadAll = async () => {
    // 1. Normalize the file path data into a consistent array.
    const pathsToDownload = Array.isArray(order.study_material_path)
      ? order.study_material_path
      : [];

    if (pathsToDownload.length === 0 || isDownloadingAll) {
      if (pathsToDownload.length === 0) {
        addToast("No study materials found for this order.", "error");
      }
      return;
    }

    setIsDownloadingAll(true);
    addToast("Preparing your download... This may take a moment.", "info");

    try {
      // 2. Loop through the array and get a signed URL for EACH path individually.
      // This is the critical part that fixes the "Invalid key" error.
      const urlPromises = pathsToDownload.map(
        (path) =>
          supabase.storage.from("study_materials").createSignedUrl(path, 60) // 60-second valid link
      );
      const urlResults = await Promise.all(urlPromises);

      const successfulUrls = urlResults.map((result) => {
        if (result.error) {
          console.error("Signed URL Error:", result.error);
          throw new Error(`Could not get a secure link for a file.`);
        }
        return { path: result.data.path, url: result.data.signedUrl };
      });

      addToast(`Downloading ${successfulUrls.length} file(s)...`, "info");
      const blobPromises = successfulUrls.map((item) =>
        fetch(item.url).then((res) => res.blob())
      );
      const blobs = await Promise.all(blobPromises);

      addToast("Compressing files into a zip archive...", "info");
      const zip = new JSZip();
      blobs.forEach((blob, index) => {
        const fileName =
          pathsToDownload[index].split("/").pop() || `file_${index + 1}.zip`;
        zip.file(fileName, blob);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = `GMT_Order_${order.id.substring(0, 8)}_Materials.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      addToast("Download started successfully!", "success");
      setIsMaterialModalOpen(false);
    } catch (error) {
      console.error("Download all error:", error);
      addToast(`Download failed: ${error.message}`, "error");
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const getStatusStyles = (status) => {
    const statusColors = {
      "Pending Payment": {
        borderLeft: "6px solid #fd7e14",
        badgeBg: "#fff8e1",
        badgeColor: "#f57f17",
      },
      Processing: {
        borderLeft: "6px solid #005A9C",
        badgeBg: "#e3f2fd",
        badgeColor: "#1565c0",
      },
      Completed: {
        borderLeft: "6px solid #28a745",
        badgeBg: "#e8f5e9",
        badgeColor: "#2e7d32",
      },
      Cancelled: {
        borderLeft: "6px solid #dc3545",
        badgeBg: "#ffebee",
        badgeColor: "#c62828",
      },
      default: {
        borderLeft: "6px solid #d9dde2",
        badgeBg: "#f0f2f5",
        badgeColor: "#5a6470",
      },
    };
    return statusColors[status] || statusColors.default;
  };

  const statusStyle = getStatusStyles(order.status);

  const styles = {
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
      marginBottom: "1.5rem",
      overflow: "hidden",
      transition: "box-shadow 0.3s ease",
      ...statusStyle,
    },
    headerButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem 1rem",
      width: "100%",
      textAlign: "left",
      background: "none",
      border: "none",
      cursor: "pointer",
      flexWrap: "wrap",
      minWidth: 0,
    },
    mainInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      flexWrap: "wrap",
      minWidth: 0,
      flex: "1 1 auto",
    },
    orderId: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
      fontWeight: 700,
      color: "#004273",
      wordBreak: "break-all",
    },
    orderMeta: {
      display: "flex",
      alignItems: "center",
      gap: "0.5em",
      fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
      color: "#5a6470",
      flexShrink: 0,
    },
    statusInfo: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      minWidth: 0,
      flex: "0 1 auto",
    },
    orderTotal: {
      fontWeight: 700,
      fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
      color: "#212529",
      whiteSpace: "nowrap",
      minWidth: "80px",
    },
    statusBadge: {
      padding: "0.4em 0.8em",
      borderRadius: "50px",
      fontWeight: 600,
      fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
      whiteSpace: "nowrap",
      backgroundColor: statusStyle.badgeBg,
      color: statusStyle.badgeColor,
      minWidth: "90px",
      textAlign: "center",
    },
    expandIcon: {
      fontSize: "1rem",
      color: "#5a6470",
      transition: "transform 0.3s ease",
      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
      flexShrink: 0,
    },
    detailsWrapper: {
      maxHeight: isExpanded ? "1000px" : "0",
      overflow: "hidden",
      transition: "max-height 0.5s ease-in-out",
      backgroundColor: "#ffffff",
      borderTop: isExpanded ? "1px solid #d9dde2" : "none",
    },
    scrollContainer: {
      overflowX: "auto",
      paddingBottom: "0.1rem",
      WebkitOverflowScrolling: "touch",
    },
    detailsGrid: {
      display: "flex",
      gap: "0px",
      padding: "0px",
      minWidth: "100%",
      boxSizing: "border-box",
      transform: `translateX(-${activeSlide * 100}%)`,
      transition: "transform 0.3s ease-in-out",
    },
    carouselContainer: {
      overflow: "hidden",
      width: "100%",
      position: "relative",
    },
    carouselControls: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem",
      backgroundColor: "#f8f9fa",
      borderTop: "1px solid #dee2e6",
    },
    carouselButton: {
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "24px",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "500",
      transition: "all 0.2s ease",
      minWidth: "wrap",
    },
    carouselButtonActive: { backgroundColor: "#005A9C", color: "#ffffff" },
    carouselButtonInactive: {
      backgroundColor: "#ffffff",
      color: "#005A9C",
      border: "1px solid #005A9C",
    },
    carouselIndicator: { display: "flex", gap: "0.5rem", alignItems: "center" },
    indicator: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      transition: "all 0.2s ease",
      cursor: "pointer",
    },
    indicatorActive: { backgroundColor: "#005A9C" },
    indicatorInactive: { backgroundColor: "#dee2e6" },
    detailsSection: {
      fontFamily: "'Open Sans', sans-serif",
      wordWrap: "break-word",
      flex: "0 0 100%",
      minWidth: "100%",
      padding: "16px",
    },
    tableContainer: {
      overflowX: "auto",
      marginBottom: "16px",
      WebkitOverflowScrolling: "touch",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      fontSize: "clamp(0.85rem, 2vw, 0.9rem)",
      minWidth: "600px",
      tableLayout: "fixed",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      fontWeight: 600,
      padding: "0.75rem",
      textAlign: "center",
      borderBottom: "2px solid #dee2e6",
      borderRight: "1px solid #dee2e6",
      color: "#495057",
      whiteSpace: "nowrap",
      width: "25%",
    },
    tableCell: {
      padding: "0.75rem",
      borderBottom: "1px solid #dee2e6",
      borderRight: "1px solid #dee2e6",
      verticalAlign: "top",
      textAlign: "center",
      width: "25%",
    },
    itemCell: {
      padding: "0.75rem",
      borderBottom: "1px solid #dee2e6",
      borderRight: "1px solid #dee2e6",
      verticalAlign: "top",
      textAlign: "left",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    addressTableContainer: {
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    addressTable: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      fontSize: "clamp(0.85rem, 2vw, 0.9rem)",
      minWidth: "500px",
    },
    addressCell: {
      padding: "0.5rem 0.75rem",
      borderBottom: "1px solid #dee2e6",
      verticalAlign: "top",
      whiteSpace: "nowrap",
    },
    addressLabel: {
      fontWeight: 600,
      color: "#495057",
      minWidth: "100px",
      display: "inline-block",
    },
    addressValue: { color: "#212529", minWidth: "200px" },
    headerContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1rem",
      paddingBottom: "0.5rem",
      borderBottom: "2px solid #d9dde2",
      width: "100%",
    },
    detailsHeader: {
      fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
      color: "#005A9C",
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontFamily: "'Montserrat', sans-serif",
      margin: "0",
      flex: "1",
    },
    paymentInfoButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "0.5rem 0.75rem",
      borderRadius: "6px",
      transition: "all 0.2s ease",
      fontSize: "0.85rem",
      fontWeight: "500",
      color: "#005A9C",
      backgroundColor: "#e3f2fd",
      boxShadow: "0 2px 4px rgba(0, 90, 156, 0.15)",
    },
    paymentInfoIcon: { fontSize: "1rem", color: "#005A9C" },
    paymentInfoText: {
      color: "#005A9C",
      fontSize: "0.85rem",
      fontWeight: "500",
    },
    studyButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.6rem 1rem",
      backgroundColor: "#28a745",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "600",
      boxShadow: "0 3px 8px rgba(40, 167, 69, 0.3)",
      transition: "all 0.3s ease",
      position: "relative",
      animation: "pulse 2s infinite",
    },
  };

  const pulseAnimation = `
    @keyframes pulse {
      0% { transform: scale(1); box-shadow: 0 3px 8px rgba(40, 167, 69, 0.3); }
      50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(40, 167, 69, 0.5); }
      100% { transform: scale(1); box-shadow: 0 3px 8px rgba(40, 167, 69, 0.3); }
    }
  `;

  const formattedDate = new Date(order.created_at).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // This logic now robustly checks for a non-empty string (old data) OR a non-empty array (new data).
  const hasStudyMaterials =
    order.status === "Completed" &&
    ((typeof order.study_material_path === "string" &&
      order.study_material_path.length > 0) ||
      (Array.isArray(order.study_material_path) &&
        order.study_material_path.length > 0));

  return (
    <>
      <style>{pulseAnimation}</style>
      <div style={styles.card}>
        <button
          style={styles.headerButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div style={styles.mainInfo}>
            <span style={styles.orderId}>
              Order #{order.id.substring(0, 8)}
            </span>
            <div style={styles.orderMeta}>
              <FaClock />
              <span>{formattedDate}</span>
            </div>
          </div>
          <div style={styles.statusInfo}>
            <span style={styles.orderTotal}>
              {formatCurrency(order.order_total)}
            </span>
            <span style={styles.statusBadge}>{order.status}</span>
            <FaChevronDown style={styles.expandIcon} />
          </div>
        </button>

        <div style={styles.detailsWrapper}>
          <div style={styles.scrollContainer}>
            <div style={styles.carouselContainer}>
              <div style={styles.detailsGrid}>
                <div style={styles.detailsSection}>
                  <div style={styles.headerContainer}>
                    <h4 style={styles.detailsHeader}>Order Items</h4>
                    {hasStudyMaterials && (
                      <button
                        style={styles.studyButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMaterialModalOpen(true);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.animation = "none";
                          e.currentTarget.style.transform = "scale(1.08)";
                          e.currentTarget.style.backgroundColor = "#218838";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.animation = "pulse 2s infinite";
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.backgroundColor = "#28a745";
                        }}
                      >
                        <FaBookOpen />
                        Study Material
                      </button>
                    )}
                    {order.status === "Pending Payment" && (
                      <button
                        style={styles.paymentInfoButton}
                        onClick={() => setShowPaymentModal(true)}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#bbdefb";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#e3f2fd";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <FaInfoCircle style={styles.paymentInfoIcon} />
                        <span style={styles.paymentInfoText}>Payment info</span>
                      </button>
                    )}
                  </div>
                  <div style={styles.tableContainer}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.tableHeader}>Item</th>
                          <th style={styles.tableHeader}>Qty</th>
                          <th style={styles.tableHeader}>Price</th>
                          <th
                            style={{
                              ...styles.tableHeader,
                              borderRight: "none",
                            }}
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.order_items.map((item, index) => (
                          <tr key={item.id || index}>
                            <td style={styles.itemCell} title={item.title}>
                              {item.title}
                            </td>
                            <td
                              style={{
                                ...styles.tableCell,
                                textAlign: "center",
                              }}
                            >
                              {item.quantity}
                            </td>
                            <td
                              style={{
                                ...styles.tableCell,
                                textAlign: "center",
                              }}
                            >
                              {formatCurrency(Number(item.price))}
                            </td>
                            <td
                              style={{
                                ...styles.tableCell,
                                textAlign: "center",
                                borderRight: "none",
                              }}
                            >
                              {formatCurrency(
                                Number(item.price) * item.quantity
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                          <td
                            colSpan="3"
                            style={{
                              ...styles.itemCell,
                              fontWeight: "bold",
                              borderBottom: "none",
                              textAlign: "right",
                              paddingRight: "2rem",
                            }}
                          >
                            Order Total
                          </td>
                          <td
                            style={{
                              ...styles.tableCell,
                              fontWeight: "bold",
                              borderBottom: "none",
                              textAlign: "center",
                              borderRight: "none",
                            }}
                          >
                            {formatCurrency(order.order_total)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={styles.detailsSection}>
                  <div style={styles.headerContainer}>
                    <h4 style={styles.detailsHeader}>Billing Address</h4>
                  </div>
                  <div style={styles.addressTableContainer}>
                    <table style={styles.addressTable}>
                      <tbody>
                        <tr>
                          <td style={styles.addressCell}>
                            <span style={styles.addressLabel}>Name:</span>
                          </td>
                          <td
                            style={{
                              ...styles.addressCell,
                              ...styles.addressValue,
                            }}
                          >
                            {order.billing_details.firstName}{" "}
                            {order.billing_details.lastName}
                          </td>
                        </tr>
                        {order.billing_details.companyName && (
                          <tr>
                            <td style={styles.addressCell}>
                              <span style={styles.addressLabel}>Company:</span>
                            </td>
                            <td
                              style={{
                                ...styles.addressCell,
                                ...styles.addressValue,
                              }}
                            >
                              {order.billing_details.companyName}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td style={styles.addressCell}>
                            <span style={styles.addressLabel}>Address:</span>
                          </td>
                          <td
                            style={{
                              ...styles.addressCell,
                              ...styles.addressValue,
                            }}
                          >
                            {order.billing_details.streetAddress}
                          </td>
                        </tr>
                        <tr>
                          <td style={styles.addressCell}>
                            <span style={styles.addressLabel}>City:</span>
                          </td>
                          <td
                            style={{
                              ...styles.addressCell,
                              ...styles.addressValue,
                            }}
                          >
                            {order.billing_details.city}
                          </td>
                        </tr>
                        <tr>
                          <td style={styles.addressCell}>
                            <span style={styles.addressLabel}>Province:</span>
                          </td>
                          <td
                            style={{
                              ...styles.addressCell,
                              ...styles.addressValue,
                            }}
                          >
                            {order.billing_details.province}
                          </td>
                        </tr>
                        <tr>
                          <td style={styles.addressCell}>
                            <span style={styles.addressLabel}>Zip Code:</span>
                          </td>
                          <td
                            style={{
                              ...styles.addressCell,
                              ...styles.addressValue,
                            }}
                          >
                            {order.billing_details.zipCode}
                          </td>
                        </tr>
                        <tr>
                          <td style={styles.addressCell}>
                            <span style={styles.addressLabel}>Phone:</span>
                          </td>
                          <td
                            style={{
                              ...styles.addressCell,
                              ...styles.addressValue,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <FaPhoneAlt size={12} color="#008080" />
                              {formatSAPhoneNumber(order.billing_details.phone)}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style={styles.addressCell}>
                            <span style={styles.addressLabel}>Email:</span>
                          </td>
                          <td
                            style={{
                              ...styles.addressCell,
                              ...styles.addressValue,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <FaEnvelope size={12} color="#008080" />
                              {order.billing_details.email}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.carouselControls}>
              <button
                style={{
                  ...styles.carouselButton,
                  ...(activeSlide === 0
                    ? styles.carouselButtonActive
                    : styles.carouselButtonInactive),
                }}
                onClick={() => setActiveSlide(0)}
              >
                Order
              </button>
              <div style={styles.carouselIndicator}>
                <div
                  style={{
                    ...styles.indicator,
                    ...(activeSlide === 0
                      ? styles.indicatorActive
                      : styles.indicatorInactive),
                  }}
                  onClick={() => setActiveSlide(0)}
                />
                <div
                  style={{
                    ...styles.indicator,
                    ...(activeSlide === 1
                      ? styles.indicatorActive
                      : styles.indicatorInactive),
                  }}
                  onClick={() => setActiveSlide(1)}
                />
              </div>
              <button
                style={{
                  ...styles.carouselButton,
                  ...(activeSlide === 1
                    ? styles.carouselButtonActive
                    : styles.carouselButtonInactive),
                }}
                onClick={() => setActiveSlide(1)}
              >
                Billing
              </button>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderTotal={order.order_total}
      />

      <StudyMaterialModal
        isOpen={isMaterialModalOpen}
        onClose={() => setIsMaterialModalOpen(false)}
        order={order}
        onDownload={handleDownloadAll}
        isDownloading={isDownloadingAll}
      />
    </>
  );
};

const StudyMaterialModal = ({ isOpen, onClose, order, onDownload, isDownloading }) => {
  if (!isOpen) return null;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getFileName = (filePath) => {
    if (typeof filePath !== 'string' || !filePath) {
      return 'Invalid File Path';
    }
    const fileName = filePath.split('/').pop();
    // Removes a UUID-like prefix if it exists
    return fileName.replace(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}_/, '');
  };

  const handleDownloadClick = () => {
    onDownload();
  };

  const materials = Array.isArray(order.study_material_path)
    ? order.study_material_path
    : (typeof order.study_material_path === 'string' && order.study_material_path)
      ? [order.study_material_path]
      : [];

  const validMaterials = materials.filter(Boolean);

  // A subtle, performant SVG background pattern
  const svgBgPattern = `url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="2" cy="2" r="1" fill="%23cbd5e1" fill-opacity="0.4"/%3E%3C/svg%3E')`;

  const styles = {
    overlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 10000, padding: 0,
      animation: 'fadeIn 0.3s ease',
    },
    modal: {
      backgroundColor: '#f8fafc',
      backgroundImage: svgBgPattern,
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', position: 'relative',
      boxShadow: '0 15px 50px -10px rgba(0, 0, 0, 0.3)',
      animation: 'slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      overflow: 'hidden',
    },
    header: {
      background: isMobile ? '#004999' : 'linear-gradient(135deg, #0066CC 0%, #004999 50%, #003366 100%)',
      padding: isMobile ? '24px 20px' : '32px 28px',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    },
    decorativePattern: {
      position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', opacity: 0.06,
      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
    },
    closeButton: {
      position: 'absolute', top: isMobile ? '12px' : '20px', right: isMobile ? '12px' : '20px',
      background: 'rgba(255, 255, 255, 0.12)',
      border: '1px solid rgba(255, 255, 255, 0.25)', fontSize: '1.1rem',
      cursor: 'pointer', color: '#ffffff', padding: '0.5rem',
      borderRadius: '12px', transition: 'transform 0.3s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '40px', height: '40px', zIndex: 2,
    },
    headerContent: { position: 'relative', zIndex: 1 },
    iconWrapper: {
      width: isMobile ? '52px' : '64px', height: isMobile ? '52px' : '64px',
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: isMobile ? '12px' : '16px', border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      animation: 'float 3s ease-in-out infinite',
    },
    title: {
      fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '800', color: '#ffffff',
      marginBottom: '8px', lineHeight: '1.2', textAlign: 'left',
      fontFamily: "'Montserrat', 'Inter', sans-serif", letterSpacing: '-0.02em',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    },
    subtitle: {
      fontSize: isMobile ? '0.85rem' : '0.95rem', color: 'rgba(255, 255, 255, 0.92)',
      fontWeight: '500', margin: 0, lineHeight: '1.5', textAlign: 'left', maxWidth: '90%',
    },
    body: {
      padding: isMobile ? '20px 16px' : '28px', flex: 1, overflowY: 'auto',
      display: 'flex', flexDirection: 'column', gap: isMobile ? '20px' : '24px',
    },
    orderInfoCard: {
      background: isMobile ? '#e0f2fe' : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      padding: isMobile ? '18px' : '22px', borderRadius: '16px',
      border: '1px solid #bae6fd', position: 'relative', overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(14, 165, 233, 0.08)',
    },
    orderInfoContent: { position: 'relative', zIndex: 1 },
    orderInfoTitle: {
      fontSize: '0.7rem', fontWeight: '700', color: '#0369a1',
      marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em',
      display: 'flex', alignItems: 'center', gap: '8px',
    },
    orderInfoGrid: {
      display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '12px',
    },
    orderInfoItem: { display: 'flex', flexDirection: 'column', gap: '5px' },
    orderInfoLabel: {
      fontSize: '0.7rem', color: '#0369a1', fontWeight: '600',
      textTransform: 'uppercase', letterSpacing: '0.05em',
    },
    orderInfoValue: { fontSize: '0.95rem', color: '#075985', fontWeight: '600' },
    journeyContainer: {
      background: isMobile ? '#fafafa' : 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
      borderRadius: '20px', padding: isMobile ? '28px 20px' : '40px 32px',
      border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
      flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', minHeight: isMobile ? '450px' : '350px',
    },
    journeyBg: {
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04,
      backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)`,
      pointerEvents: 'none',
    },
    journeyTitle: {
      textAlign: 'center', fontSize: isMobile ? '1.15rem' : '1.3rem',
      fontWeight: '700', color: '#1e293b', marginBottom: isMobile ? '32px' : '48px',
      fontFamily: "'Montserrat', 'Inter', sans-serif", position: 'relative',
      zIndex: 1, letterSpacing: '-0.01em',
    },
    journeyVisuals: {
      position: 'relative', minHeight: isMobile ? '380px' : '240px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
    },
    svgContainer: {
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)', width: '100%', height: '100%',
      pointerEvents: 'none',
    },
    journeyPath: {
      stroke: 'url(#pathGradient)', strokeWidth: isMobile ? '2.5' : '3',
      fill: 'none', strokeDasharray: 1500, strokeDashoffset: 1500,
      animation: 'drawPath 2.5s ease-out 0.5s forwards',
    },
    journeyStages: {
      position: 'relative', display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: isMobile ? 'center' : 'space-between',
      alignItems: 'center', zIndex: 2, padding: isMobile ? '0' : '0 20px',
      gap: isMobile ? '48px' : '0',
    },
    journeyStage: {
      display: 'flex', flexDirection: isMobile ? 'row' : 'column',
      alignItems: 'center', gap: isMobile ? '20px' : '16px',
      textAlign: isMobile ? 'left' : 'center',
      opacity: 0, transform: 'translateY(20px)',
      cursor: 'pointer', transition: 'transform 0.3s ease',
      position: 'relative', width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '280px' : 'none',
    },
    journeyIcon: {
      width: isMobile ? '168px' : '172px', height: isMobile ? '168px' : '172px',
      borderRadius: '50%', flexShrink: 0,
      border: '3px solid #e2e8f0', display: 'flex', alignItems: 'center',
      justifyContent: 'center', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1), inset 0 -2px 8px rgba(0, 0, 0, 0.05)',
      position: 'relative', zIndex: 2,
    },
    journeyIconInner: {
      width: '100%', height: '100%', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent)',
    },
    journeyTextWrapper: {
      display: 'flex', flexDirection: 'column',
      alignItems: isMobile ? 'flex-start' : 'center',
      flex: isMobile ? 1 : 'none',
    },
    journeyLabel: {
      fontSize: isMobile ? '0.95rem' : '0.85rem', fontWeight: '700', color: '#475569',
      transition: 'color 0.3s ease', maxWidth: isMobile ? 'none' : '110px',
      lineHeight: '1.3', textTransform: 'uppercase', letterSpacing: '0.03em',
    },
    journeySubtext: {
      fontSize: isMobile ? '0.75rem' : '0.7rem', color: '#94a3b8',
      fontWeight: '500', marginTop: '4px',
    },
    downloadSection: {
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: isMobile ? '12px' : '16px', padding: isMobile ? '20px 16px' : '24px',
      background: isMobile ? '#fef3c7' : 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
      borderRadius: '16px', border: '1px solid #fde047', marginTop: 'auto',
      boxShadow: '0 4px 12px rgba(250, 204, 21, 0.15)', position: 'relative',
      overflow: 'hidden',
    },
    downloadSectionGlow: {
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      background: 'radial-gradient(ellipse at center, rgba(250, 204, 21, 0.1) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    readyBadge: {
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: isMobile ? '6px 14px' : '8px 16px',
      background: '#dcfce7', color: '#166534', borderRadius: '12px',
      fontSize: isMobile ? '0.75rem' : '0.8rem', fontWeight: '600',
      border: '1px solid #86efac', boxShadow: '0 2px 6px rgba(22, 101, 52, 0.1)',
      position: 'relative', zIndex: 1, animation: 'pulse 2.5s ease-in-out infinite',
    },
    downloadButton: {
      display: 'inline-flex', alignItems: 'center', gap: isMobile ? '10px' : '12px',
      padding: isMobile ? '14px 32px' : '16px 40px',
      background: isMobile ? '#004999' : 'linear-gradient(135deg, #0066CC 0%, #004999 100%)',
      color: '#ffffff', border: 'none', borderRadius: '14px',
      fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: '700',
      cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 20px rgba(0, 102, 204, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      minWidth: isMobile ? '200px' : '220px', justifyContent: 'center',
      fontFamily: "'Montserrat', 'Inter', sans-serif", textTransform: 'uppercase',
      letterSpacing: '0.05em', position: 'relative', zIndex: 1, overflow: 'hidden',
    },
    downloadButtonDisabled: {
      background: isMobile ? '#64748b' : 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
      cursor: 'not-allowed', boxShadow: '0 4px 12px rgba(148, 163, 184, 0.25)',
    },
    spinner: { animation: 'spin 1s linear infinite', display: 'inline-block' },
  };

  const styleSheet = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
    @keyframes drawPath { to { stroke-dashoffset: 0; } }
    @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
    
    .journey-stage { animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .journey-stage:nth-child(1) { animation-delay: 0.8s; }
    .journey-stage:nth-child(2) { animation-delay: 1.1s; }
    .journey-stage:nth-child(3) { animation-delay: 1.4s; }
    
    .journey-stage:hover .journey-icon { 
      transform: scale(1.1) translateY(-4px); 
      box-shadow: 0 10px 30px rgba(0, 102, 204, 0.2);
    }
    .journey-stage:hover .journey-label { color: #0f172a; }
    
    @media (max-width: 768px) {
      .journey-stage:hover .journey-icon { 
        transform: scale(1.05); 
      }
    }
  `;

  // Mobile path is shifted left. Desktop path is unchanged.
  const pathData = isMobile ? "M 180 50 Q 200 150, 180 250 T 180 450" : "M 100 100 Q 250 60, 400 100 T 700 100";
  // Mobile circle positions are also shifted left to match the path.
  const circlePositions = isMobile ? [{ cx: 180, cy: 50 }, { cx: 180, cy: 250 }, { cx: 180, cy: 450 }] : [{ cx: 100, cy: 100 }, { cx: 400, cy: 100 }, { cx: 700, cy: 100 }];
  
  const journeyIconStyles = [
    { ...styles.journeyIcon, borderColor: '#10b981', background: isMobile ? '#d1fae5' : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' },
    { ...styles.journeyIcon, borderColor: '#3b82f6', background: isMobile ? '#dbeafe' : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' },
    { ...styles.journeyIcon, borderColor: '#f59e0b', background: isMobile ? '#fef3c7' : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' },
  ];

  return (
    <>
      <style>{styleSheet}</style>
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={styles.header}>
            <div style={styles.decorativePattern}></div>
            <button
              style={styles.closeButton}
              onClick={onClose}
              onMouseOver={(e) => { e.currentTarget.style.transform = "rotate(90deg)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "rotate(0deg)"; }}
              aria-label="Close modal"
            >✕</button>
            <div style={styles.headerContent}>
              <div style={styles.iconWrapper}><FaBookOpen size={isMobile ? 26 : 32} color="#ffffff" /></div>
              <h2 style={styles.title}>Study Material</h2>
              <p style={styles.subtitle}>Your comprehensive learning resources are ready for download.</p>
            </div>
          </div>

          <div style={styles.body}>
            <div style={styles.orderInfoCard}>
              <div style={styles.orderInfoContent}>
                <div style={styles.orderInfoTitle}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                  Order Information
                </div>
                <div style={styles.orderInfoGrid}>
                  <div style={styles.orderInfoItem}><span style={styles.orderInfoLabel}>Order ID</span><span style={styles.orderInfoValue}>#{order.id.substring(0, 8)}</span></div>
                  <div style={styles.orderInfoItem}><span style={styles.orderInfoLabel}>Date</span><span style={styles.orderInfoValue}>{new Date(order.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}</span></div>
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: isMobile ? '10px' : '12px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
              <h4 style={{ margin: '8px 12px 4px', fontSize: isMobile ? '0.85rem' : '0.9rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>Available Files ({validMaterials.length})</h4>
              {validMaterials.length > 0 ? (
                validMaterials.map((path, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px', padding: isMobile ? '8px 10px' : '10px 12px', borderRadius: '12px', background: '#f8fafc' }}>
                    <FaFileArchive size={isMobile ? 18 : 20} color="#0ea5e9" />
                    <span style={{ flex: 1, minWidth: 0, fontWeight: '500', color: '#1e293b', fontSize: isMobile ? '0.85rem' : '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={getFileName(path)}>{getFileName(path)}</span>
                  </div>
                ))
              ) : (<p style={{ textAlign: 'center', color: '#64748b', padding: '1rem', fontSize: isMobile ? '0.85rem' : '0.95rem' }}>No study materials are available for this order yet.</p>)}
            </div>

            <div style={styles.journeyContainer}>
              <div style={styles.journeyBg}></div>
              <h3 style={styles.journeyTitle}>Your Learning Journey</h3>
              <div style={styles.journeyVisuals}>
                <svg style={styles.svgContainer} viewBox={isMobile ? "0 0 400 500" : "0 0 800 200"} preserveAspectRatio="xMidYMid meet">
                  <defs><linearGradient id="pathGradient" x1="0%" y1={isMobile ? "0%" : "0%"} x2={isMobile ? "0%" : "100%"} y2={isMobile ? "100%" : "0%"}><stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} /><stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} /><stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} /></linearGradient></defs>
                  <path d={pathData} style={styles.journeyPath}/>
                  {circlePositions.map((pos, idx) => (<circle key={idx} cx={pos.cx} cy={pos.cy} r="8" fill={idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : '#f59e0b'} opacity="0"><animate attributeName="opacity" values="0;1;1" dur="2s" begin={`${0.8 + idx * 0.3}s`} fill="freeze" /></circle>))}
                </svg>
                <div style={styles.journeyStages}>
                  <div className="journey-stage" style={styles.journeyStage}>
                    <div className="journey-icon" style={journeyIconStyles[0]}><div style={styles.journeyIconInner}><FaBookOpen size={isMobile ? 100 : 60} color="#10b981" /></div></div>
                    <div style={styles.journeyTextWrapper}><div className="journey-label" style={styles.journeyLabel}>Access</div><div style={styles.journeySubtext}>Download Materials</div></div>
                  </div>
                  <div className="journey-stage" style={styles.journeyStage}>
                    <div className="journey-icon" style={journeyIconStyles[1]}><div style={styles.journeyIconInner}><FaGraduationCap size={isMobile ? 100 : 60} color="#3b82f6" /></div></div>
                    <div style={styles.journeyTextWrapper}><div className="journey-label" style={styles.journeyLabel}>Study</div><div style={styles.journeySubtext}>Master Concepts</div></div>
                  </div>
                  <div className="journey-stage" style={styles.journeyStage}>
                    <div className="journey-icon" style={journeyIconStyles[2]}><div style={styles.journeyIconInner}><FaTrophy size={isMobile ? 100 : 60} color="#f59e0b" /></div></div>
                    <div style={styles.journeyTextWrapper}><div className="journey-label" style={styles.journeyLabel}>Excel</div><div style={styles.journeySubtext}>Achieve Success</div></div>
                  </div>
                </div>
              </div>
            </div>
            {/* dd */}

            <div style={styles.downloadSection}>
              <div style={styles.downloadSectionGlow}></div>
              <div style={styles.readyBadge}><FaCheckCircle /><span>Ready for Download</span></div>
              <button style={{ ...styles.downloadButton, ...(isDownloading ? styles.downloadButtonDisabled : {}) }} onClick={handleDownloadClick} disabled={isDownloading || validMaterials.length === 0}>
                {isDownloading ? (<><FaSpinner style={styles.spinner} /><span>Zipping Files...</span></>) : (<><FaDownload /><span>Download All (.zip)</span></>)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardSection = ({ id, activeSection, orders, loading, setView }) => {
  const styles = {
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem",
      gap: "1rem",
      color: "#5a6470",
      fontFamily: "'Open Sans', sans-serif",
    },
    loadingSpinner: {
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #005A9C",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: "spin 1s linear infinite",
    },
    loadingText: {
      fontSize: "1rem",
      fontWeight: "500",
    },
    // ====================================================== //
    // =========== NEW SUBTLE "EMPTY STATE" STYLES ============ //
    // ====================================================== //
    noOrdersContainer: {
      backgroundColor: "transparent", // No bright background
      borderRadius: "var(--border-radius-lg)",
      padding: "clamp(2.5rem, 8vw, 4rem)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // Dashed border to indicate a placeholder
      border: "2px dashed var(--neutral-medium-gray)",
      margin: "2rem 0",
      transition: "border-color 0.3s ease",
    },
    noOrdersIcon: {
      fontSize: "clamp(3.5rem, 10vw, 5rem)",
      color: "var(--neutral-medium-gray)", // Softer icon color
      marginBottom: "1.5rem",
    },
    noOrdersTitle: {
      fontFamily: "var(--font-headings)",
      fontSize: "clamp(1.5rem, 4vw, 2rem)",
      color: "var(--primary-blue-dark)",
      marginBottom: "0.75rem",
    },
    noOrdersText: {
      fontFamily: "var(--font-primary)",
      color: "var(--neutral-dark-gray)",
      fontSize: "1.1rem",
      maxWidth: "50ch",
      lineHeight: 1.6,
      marginBottom: "2.5rem",
    },
  };

  // Inject the keyframes animation into the document's head
  useEffect(() => {
    const styleId = "dashboard-spin-animation";
    if (document.getElementById(styleId)) return;

    const styleSheet = document.createElement("style");
    styleSheet.id = styleId;
    styleSheet.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <section
      id={id}
      className={`dashboard-section ${
        activeSection === id ? "active-section" : ""
      }`}
    >
      <div className="container dashboard-container">
        <div
          className="section-header"
          style={{ textAlign: "left", marginBottom: "2rem" }}
        >
          <h2 style={{ textAlign: "left" }}>My Dashboard</h2>
          <p style={{ textAlign: "left", margin: 0, maxWidth: "none" }}>
            View your recent orders and manage your payment status. Click on an
            order to see details.
          </p>
        </div>

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <span style={styles.loadingText}>Fetching your orders...</span>
          </div>
        ) : orders.length > 0 ? (
          <div style={{ width: "100%", overflowX: "visible" }}>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        ) : (
          // ====================================================== //
          // ======== UPDATED "EMPTY" VIEW WITH NEW STYLES ======== //
          // ====================================================== //
          <div style={styles.noOrdersContainer}>
            <FaShoppingCart style={styles.noOrdersIcon} />
            <h3 style={styles.noOrdersTitle}>Your Order History is Empty</h3>
            {/* Using a less "bright" secondary button for the call to action */}
            <NavigateLink
              href="#courses"
              className="btn btn-secondary btn-lg"
              setView={setView}
            >
              <FaGraduationCap /> Explore Courses
            </NavigateLink>
          </div>
        )}
      </div>
    </section>
  );
};

const CheckoutSection = ({
  id,
  activeSection,
  cart,
  setCart,
  setView,
  supabaseClient,
  addToast,
  session,
  refreshOrders,
}) => {
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "South Africa",
    streetAddress: "",
    city: "",
    province: "",
    zipCode: "",
    phone: "+27 ", // Initialize with the prefix
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- NEW: Phone Number Formatting Utilities ---
  const formatSAPhoneNumber = (value) => {
    if (!value) return "+27 ";
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return "+27 ";

    const localNumber = digits.substring(2);
    const parts = [];
    if (localNumber.length > 0) parts.push(localNumber.substring(0, 2));
    if (localNumber.length > 2) parts.push(localNumber.substring(2, 5));
    if (localNumber.length > 5) parts.push(localNumber.substring(5, 9));

    return `+27 ${parts.join(" ")}`;
  };

  const unformatPhoneNumber = (value) => {
    return value.replace(/\D/g, "");
  };

  useEffect(() => {
    if (session?.user) {
      setBillingDetails((prev) => ({
        ...prev,
        email: session.user.email || "",
        firstName: session.user.user_metadata?.first_name || "",
        lastName: session.user.user_metadata?.last_name || "",
        // Format the phone number from metadata when the component loads
        phone: session.user.user_metadata?.phone
          ? formatSAPhoneNumber(
              `27${session.user.user_metadata.phone.slice(-9)}`
            )
          : "+27 ",
      }));
    }
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  // --- NEW: Phone Input Handlers ---
  const handlePhoneInputChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.startsWith("27") && rawValue.length <= 11) {
      setBillingDetails((prev) => ({
        ...prev,
        phone: formatSAPhoneNumber(rawValue),
      }));
    } else if (!rawValue.startsWith("27")) {
      setBillingDetails((prev) => ({ ...prev, phone: "+27 " }));
    }
  };

  const handlePhoneKeyDown = (e) => {
    const input = e.target;
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      input.selectionStart <= 4
    ) {
      e.preventDefault();
    }
  };

  const totalAmount = useMemo(
    () =>
      cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [cart]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supabaseClient || !session?.user?.id) {
      addToast("You must be logged in to place an order.", "error");
      setView("login");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        user_id: session.user.id,
        // UPDATE: Send the clean, unformatted phone number
        billing_details: {
          ...billingDetails,
          phone: unformatPhoneNumber(billingDetails.phone),
        },
        order_items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        order_total: totalAmount,
      };

      const { error } = await supabaseClient
        .from("orders")
        .insert([orderPayload]);
      if (error) throw error;

      addToast("Order placed successfully!", "success");
      setCart([]);
      await refreshOrders();
      setView("dashboard");
    } catch (error) {
      console.error("Supabase order submission error:", error.message);
      addToast(`Could not place order: ${error.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Northern Cape",
    "Western Cape",
  ];

  return (
    <section
      id={id}
      className={`checkout-section ${
        activeSection === id ? "active-section" : ""
      }`}
    >
      <style>{`
        /* Styles remain the same, no changes needed here */
        .checkout-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }
        .billing-details-form h3, .order-summary h3 {
          font-family: var(--font-headings);
          color: var(--primary-blue-dark);
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--accent-lime);
          padding-bottom: 0.75rem;
          display: inline-block;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .form-group {
          position: relative;
          margin-bottom: 2rem;
        }
        .form-group input, .form-group select {
          width: 100%;
          border: 0;
          border-bottom: 2px solid var(--neutral-medium-gray, #d9dde2);
          outline: 0;
          font-size: 1rem;
          color: var(--text-dark);
          padding: 10px 0;
          background: transparent;
          transition: border-color 0.2s;
        }
        .form-group input::placeholder { color: transparent; }
        .form-group label {
          position: absolute;
          top: 10px;
          left: 0;
          display: block;
          transition: 0.2s;
          font-size: 1rem;
          color: var(--neutral-dark-gray);
          pointer-events: none;
        }
        .form-group input:focus ~ label,
        .form-group input:not(:placeholder-shown) ~ label,
        .form-group select:focus ~ label,
        .form-group select:valid ~ label {
          top: -18px;
          font-size: 0.85rem;
          color: var(--primary-blue);
          font-weight: 600;
        }
        .form-group input:focus, .form-group select:focus {
          border-bottom-color: var(--primary-blue);
        }
        .form-group select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%235a6470'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0 center;
          background-size: 1.5em;
        }
        .form-group input:disabled {
          background-color: var(--neutral-light-gray);
          border-bottom-style: dashed;
          cursor: not-allowed;
        }
        .order-summary {
          background-color: var(--surface-color, #fff);
          padding: 2rem;
          border-radius: var(--border-radius-lg, 18px);
          border: 1px solid var(--neutral-light-gray, #f0f2f5);
          box-shadow: var(--box-shadow-large);
        }
        .order-summary-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 2rem;
        }
        .order-summary-table th {
          padding: 1rem 0 1.5rem 0;
          border-bottom: 2px solid var(--neutral-medium-gray, #d9dde2);
          font-family: var(--font-headings);
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--neutral-dark-gray);
        }
        .order-summary-table th:first-child {
          text-align: left;
        }
        .order-summary-table th:last-child {
          text-align: right;
        }
        .order-summary-table tbody td {
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--neutral-light-gray, #f0f2f5);
          vertical-align: top;
        }
        .order-summary-table .product-name {
          color: var(--text-dark);
          font-weight: 500;
          line-height: 1.4;
        }
        .order-summary-table .product-quantity {
          color: var(--neutral-dark-gray);
          font-weight: 400;
          font-size: 0.9rem;
        }
        .order-summary-table .product-total {
          text-align: right;
          font-weight: 600;
          color: var(--text-dark);
          font-size: 1rem;
        }
        .order-summary-table tfoot td {
          padding: 1rem 0;
          border-bottom: 1px solid var(--neutral-medium-gray, #d9dde2);
          font-weight: 600;
          font-size: 1rem;
        }
        .order-summary-table tfoot .subtotal td {
          color: var(--neutral-dark-gray);
          padding-top: 1.5rem;
          border-top: 1px solid var(--neutral-medium-gray, #d9dde2);
        }
        .order-summary-table tfoot .subtotal td:first-child,
        .order-summary-table tfoot .total td:first-child {
          text-align: left;
          padding-right: 2rem;
        }
        .order-summary-table tfoot .subtotal td:last-child,
        .order-summary-table tfoot .total td:last-child {
          text-align: right;
        }
        .order-summary-table tfoot .total td {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-blue-dark);
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
          border-top: 2px solid var(--primary-blue-dark);
          border-bottom: none;
        }
        .payment-section {
          border-top: 2px solid var(--accent-lime);
          padding-top: 2rem;
        }
        .btn-primary-branded {
          width: 100%;
          display: inline-flex; align-items: center; justify-content: center; gap: 0.75rem;
          padding: 1rem; font-size: 1.1rem; font-weight: 600;
          letter-spacing: 0.5px; text-transform: uppercase;
          font-family: var(--font-headings);
          background-color: var(--accent-lime); color: var(--text-dark);
          border-radius: var(--border-radius-pill); border: 2px solid var(--accent-lime);
          box-shadow: 0 4px 15px -5px rgba(162, 215, 41, 0.6);
        }
        .btn-primary-branded:hover:not(:disabled) {
          background-color: var(--accent-lime-dark); border-color: var(--accent-lime-dark);
          color: var(--text-light); transform: translateY(-3px);
        }
        .btn-primary-branded:disabled {
          background-color: #ccc; border-color: #ccc; box-shadow: none;
          cursor: not-allowed;
        }
        @media (max-width: 992px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
          .order-summary {
            margin-top: 2rem;
          }
        }
        @media (max-width: 767px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .order-summary, .billing-details-form {
            padding: 1.5rem;
          }
        }
      `}</style>
      <div className="container">
        <div className="section-header">
          <h2>Checkout</h2>
        </div>
        <form id="billingForm" onSubmit={handleSubmit}>
          <div className="checkout-grid">
            <div className="billing-details-form">
              <h3>Billing details</h3>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={billingDetails.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    required
                  />
                  <label htmlFor="firstName">First name *</label>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={billingDetails.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    required
                  />
                  <label htmlFor="lastName">Last name *</label>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={billingDetails.companyName}
                  onChange={handleInputChange}
                  placeholder="Company name"
                />
                <label htmlFor="companyName">Company name (optional)</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  placeholder="House number and street name"
                  value={billingDetails.streetAddress}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="streetAddress">Street address *</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={billingDetails.city}
                  onChange={handleInputChange}
                  placeholder="Town / City"
                  required
                />
                <label htmlFor="city">Town / City *</label>
              </div>
              <div className="form-group">
                <select
                  name="province"
                  id="province"
                  value={billingDetails.province}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select a province...
                  </option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <label htmlFor="province">Province *</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  value={billingDetails.zipCode}
                  onChange={handleInputChange}
                  placeholder="Postcode / ZIP"
                  required
                />
                <label htmlFor="zipCode">Postcode / ZIP *</label>
              </div>
              {/* ====================================================== */}
              {/* =========== UPDATED PHONE INPUT FIELD ================ */}
              {/* ====================================================== */}
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={billingDetails.phone}
                  onChange={handlePhoneInputChange}
                  onKeyDown={handlePhoneKeyDown}
                  placeholder="Phone"
                  required
                />
                <label htmlFor="phone">Phone *</label>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={billingDetails.email}
                  readOnly
                  disabled
                  placeholder="Email address"
                />
                <label htmlFor="email">Email address</label>
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
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="product-name">
                        <div>{item.title}</div>
                        <div className="product-quantity">
                          Qty: {item.quantity}
                        </div>
                      </td>
                      <td className="product-total">
                        {formatCurrency(Number(item.price) * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="subtotal">
                    <td>Subtotal</td>
                    <td>{formatCurrency(totalAmount)}</td>
                  </tr>
                  <tr className="total">
                    <td>Total</td>
                    <td>{formatCurrency(totalAmount)}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="payment-section">
                <button
                  type="submit"
                  form="billingForm"
                  className="btn-primary-branded"
                  disabled={isSubmitting || cart.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="fa-spin" />
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <FaCreditCard />
                      <span>Place order</span>
                    </>
                  )}
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
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [isMapMaximized, setIsMapMaximized] = useState(false);

  const mapInstanceRef = useRef(null);
  const markerInstanceRef = useRef(null);
  const mapContainerRef = useRef(null);
  const inlinePlaceholderRef = useRef(null);
  const modalPlaceholderRef = useRef(null);

  useEffect(() => {
    if (locations && locations.length > 0 && !selectedLocationId) {
      setSelectedLocationId(locations[0].id);
    }
  }, [locations, selectedLocationId]);

  const selectedLocation = useMemo(() => {
    if (!selectedLocationId || !locations || !locations.length) {
      return null;
    }
    return locations.find((loc) => loc.id === selectedLocationId) || null;
  }, [selectedLocationId, locations]);

  useEffect(() => {
    if (googleMapsLoaded && window.google && !mapInstanceRef.current) {
      mapContainerRef.current = document.createElement("div");
      mapContainerRef.current.style.width = "100%";
      mapContainerRef.current.style.height = "100%";
      if (inlinePlaceholderRef.current) {
        inlinePlaceholderRef.current.appendChild(mapContainerRef.current);
      }
      try {
        const map = new window.google.maps.Map(mapContainerRef.current, {
          zoom: 14,
          disableDefaultUI: true,
          zoomControl: true,
        });
        const marker = new window.google.maps.Marker({ map });
        mapInstanceRef.current = map;
        markerInstanceRef.current = marker;
      } catch (error) {
        console.error("Error initializing Google Map:", error);
      }
    }
  }, [googleMapsLoaded]);

  useEffect(() => {
    if (
      mapInstanceRef.current &&
      markerInstanceRef.current &&
      selectedLocation
    ) {
      const lat = parseFloat(selectedLocation.latitude);
      const lng = parseFloat(selectedLocation.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        const position = { lat, lng };
        mapInstanceRef.current.setCenter(position);
        markerInstanceRef.current.setPosition(position);
        markerInstanceRef.current.setTitle(selectedLocation.office_name);
      }
    }
  }, [selectedLocation]);

  useEffect(() => {
    const mapDiv = mapContainerRef.current;
    if (!mapDiv) return;

    if (isMapMaximized) {
      document.body.style.overflow = "hidden";
      if (modalPlaceholderRef.current)
        modalPlaceholderRef.current.appendChild(mapDiv);
      window.history.pushState(
        { mapMaximized: true },
        "",
        window.location.href
      );
    } else {
      document.body.style.overflow = "auto";
      if (inlinePlaceholderRef.current)
        inlinePlaceholderRef.current.appendChild(mapDiv);
    }

    if (mapInstanceRef.current) {
      setTimeout(() => {
        window.google.maps.event.trigger(mapInstanceRef.current, "resize");
        if (selectedLocation) {
          const lat = parseFloat(selectedLocation.latitude);
          const lng = parseFloat(selectedLocation.longitude);
          if (!isNaN(lat) && !isNaN(lng)) {
            mapInstanceRef.current.setCenter({ lat, lng });
          }
        }
      }, 100);
    }

    const handleEsc = (event) => {
      if (event.key === "Escape") setIsMapMaximized(false);
    };
    const handlePopState = () => {
      if (isMapMaximized) setIsMapMaximized(false);
    };

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isMapMaximized, selectedLocation]);

  const handleLocationChange = (e) => setSelectedLocationId(e.target.value);
  const toggleMapMaximize = () => {
    if (isMapMaximized) window.history.back();
    setIsMapMaximized(!isMapMaximized);
  };

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      href: companyInfo?.social_links?.Facebook,
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: companyInfo?.social_links?.Instagram,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      href: companyInfo?.social_links?.WhatsApp,
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      href: companyInfo?.social_links?.YouTube,
    },
    {
      name: "TikTok",
      icon: <FaTiktok />,
      href: companyInfo?.social_links?.TikTok,
    },
    { name: "X", icon: <FaTwitter />, href: companyInfo?.social_links?.X },
  ];
  const activeSocialLinks = socialPlatforms.filter((platform) => platform.href);

  return (
    <>
      <style>{`
        footer {
          background: linear-gradient(135deg, #0a1a2e 0%, #16213e 50%, #0a1a2e 100%);
          position: relative;
          border-top: 2px solid var(--accent-lime);
          isolation: isolate;
          overflow: hidden;
        }
        footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 30%, rgba(46, 204, 113, 0.03) 0%, transparent 60%);
          pointer-events: none;
        }
        .footer-wrapper { 
          position: relative; 
          z-index: 1; 
          padding: 4rem 0 2rem 0; 
        }
        .footer-content { 
          display: grid; 
          gap: 2.5rem; 
          margin-bottom: 3rem; 
          grid-template-columns: 2fr 1fr 1.5fr; 
        }
        .footer-column {
          background: #1a2b47; 
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.2s ease, background-color 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .footer-column:hover {
          background: #203459;
          transform: translateY(-2px);
        }
        .footer-column h4 {
          color: var(--accent-lime);
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          position: relative;
          padding-bottom: 0.75rem;
        }
        .footer-column h4::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          background: var(--accent-lime);
          opacity: 0.7;
        }
        .company-description {
          color: var(--neutral-light-gray);
          line-height: 1.6;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }
        .footer-column ul { list-style: none; padding: 0; margin: 0; }
        .footer-column ul li { margin-bottom: 0.75rem; }
        .footer-column ul li a {
          color: var(--neutral-medium-gray);
          text-decoration: none;
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: inline-flex; /* Use inline-flex for icon alignment */
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0;
          position: relative;
        }
        .footer-column ul li a::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          background: var(--accent-lime);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .footer-column ul li a:hover {
          color: var(--accent-lime);
          padding-left: 12px;
        }
        .footer-column ul li a:hover::before { opacity: 1; }
        .footer-socials { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
        .footer-socials a {
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 50%;
          color: var(--neutral-medium-gray);
          font-size: 1.2rem;
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-decoration: none;
        }
        .footer-socials a:hover {
          background: var(--accent-lime);
          color: var(--text-dark);
          transform: translateY(-2px);
        }
        .footer-column select {
          width: 100%; padding: 0.875rem 1rem; margin-bottom: 1.5rem;
          background: #1a2b47; color: var(--text-light);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px; font-size: 0.95rem;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          margin-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer-bottom p {
          color: var(--neutral-medium-gray);
          margin: 0;
          opacity: 0.8;
          font-size: 0.95rem;
        }
        .inline-map-placeholder { height: 260px; border-radius: 12px; overflow: hidden; margin-top: 1.5rem; position: relative; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.02); }
        .map-controls-inline { position: absolute; top: 10px; right: 10px; z-index: 5; }
        .map-expand-btn { background: rgba(255, 255, 255, 0.9); border: none; border-radius: 8px; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: var(--primary-blue-dark); transition: all 0.2s ease; }
        .map-expand-btn:hover { background: var(--accent-lime); color: var(--text-dark); transform: scale(1.05); }
        .map-fullscreen-overlay { position: fixed; inset: 0; background: #000; z-index: 10000; display: flex; align-items: center; justify-content: center; }
        .map-fullscreen-container { width: 100vw; height: 100vh; position: relative; overflow: hidden; }
        .fullscreen-map-placeholder { width: 100%; height: 100%; position: absolute; inset: 0; }
        .map-floating-close-btn { position: absolute; top: 20px; right: 20px; z-index: 10001; background: rgba(255, 255, 255, 0.9); border: none; border-radius: 50%; width: 48px; height: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; color: var(--primary-blue-dark); transition: all 0.2s ease; }
        .map-floating-close-btn:hover { background: var(--accent-lime); color: var(--text-dark); transform: scale(1.1); }
        .map-location-info { position: absolute; bottom: 20px; left: 20px; z-index: 10001; background: rgba(255, 255, 255, 0.95); padding: 1rem 1.25rem; border-radius: 10px; max-width: 280px; }
        @media (max-width: 1024px) {
          .footer-content { grid-template-columns: 1fr 1fr; }
          .footer-column:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 768px) {
          .footer-content { grid-template-columns: 1fr; gap: 2rem; }
          .footer-wrapper { padding: 3rem 0 2rem 0; }
          .footer-column { padding: 1.5rem; }
          .inline-map-placeholder { height: 220px; }
        }
      `}</style>
      <footer>
        <div className="footer-wrapper">
          <div className="container">
            <div className="footer-content">
              <div className="footer-column">
                <h4>{companyInfo?.name || "GMT Safety Solutions"}</h4>
                <p className="company-description">
                  {companyInfo?.footer_description ||
                    "Leading provider of safety solutions with comprehensive training programs and expert consultation services."}
                </p>
                {activeSocialLinks.length > 0 && (
                  <div className="footer-socials">
                    {activeSocialLinks.map((platform) => (
                      <a
                        href={platform.href}
                        key={platform.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit our ${platform.name} page`}
                      >
                        {platform.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="footer-column">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <NavigateLink href="#home" setView={setView}>
                      Home
                    </NavigateLink>
                  </li>
                  <li>
                    <NavigateLink href="#courses" setView={setView}>
                      Courses
                    </NavigateLink>
                  </li>
                  <li>
                    <NavigateLink href="#services" setView={setView}>
                      Services
                    </NavigateLink>
                  </li>
                  <li>
                    <NavigateLink href="#about" setView={setView}>
                      About Us
                    </NavigateLink>
                  </li>
                  <li>
                    <NavigateLink href="#contact" setView={setView}>
                      Contact
                    </NavigateLink>
                  </li>
                  {/* ====================================================== */}
                  {/* ============== THIS IS THE NEW LINK ================== */}
                  {/* ====================================================== */}
                  <li>
                    <a
                      href="https://linktr.ee/sigmateknologies"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaCode /> Dev
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Branch Locator</h4>
                {locations && locations.length > 0 ? (
                  <>
                    <select
                      onChange={handleLocationChange}
                      value={selectedLocationId}
                      aria-label="Select a branch location"
                    >
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.office_name}
                        </option>
                      ))}
                    </select>
                    <div
                      ref={inlinePlaceholderRef}
                      className="inline-map-placeholder"
                    >
                      <div className="map-controls-inline">
                        <button
                          className="map-expand-btn"
                          onClick={toggleMapMaximize}
                          aria-label="Expand map to fullscreen"
                        >
                          <FaExpand />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="company-description">
                    Branch information is currently unavailable.
                  </p>
                )}
              </div>
            </div>
            <div className="footer-bottom">
              <p>
                © {new Date().getFullYear()}{" "}
                {companyInfo?.name || "GMT Safety Solutions"}. All Rights
                Reserved.
              </p>
            </div>
            {/* The dev-tag div has been completely removed from here */}
          </div>
        </div>
      </footer>
      {isMapMaximized && (
        <div className="map-fullscreen-overlay">
          <div className="map-fullscreen-container">
            <div
              ref={modalPlaceholderRef}
              className="fullscreen-map-placeholder"
            />
            <button
              className="map-floating-close-btn"
              onClick={toggleMapMaximize}
              aria-label="Close fullscreen map"
            >
              <FaTimes />
            </button>
            {selectedLocation && (
              <div className="map-location-info">
                <h4>{selectedLocation.office_name}</h4>
                <p>{selectedLocation.display_details}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const CourseDetailsModal = ({ course, onClose, onAddToCart }) => {
  if (!course) return null;

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const imagePath = course.image_url || "/assets/images/course-default.jpg";

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          backdrop-filter: blur(3px);
        }

        .modal-dialog {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: fadeInModal 0.3s ease-out forwards;
        }

        @keyframes fadeInModal {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #d9dde2;
          background-color: #fdfdff;
          flex-shrink: 0;
        }

        .modal-header h3 {
          font-family: var(--font-headings, 'Montserrat', sans-serif);
          color: #004273;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          flex: 1;
          margin-right: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: calc(100% - 3rem);
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          color: #5a6470;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .modal-close-btn:hover {
          background-color: #f0f2f5;
          color: #005A9C;
          transform: scale(1.1);
        }

        .modal-body {
          padding: 2rem;
          overflow-y: auto;
          flex-grow: 1;
        }

        .course-image {
          width: 100%;
          max-height: 250px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 8px -2px rgba(0,0,0,0.1);
        }

        .course-meta-details {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .course-meta-details span {
          color: #5a6470;
          font-size: 0.95rem;
        }

        .course-meta-details strong {
          color: #004273;
          font-weight: 600;
        }

        .course-price-modal {
          font-size: 1.75rem;
          font-weight: 700;
          color: #004273;
          margin-bottom: 1.5rem;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .modal-body p {
          color: #5a6470;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          overflow-wrap: break-word;
        }

        .modal-body h4 {
          color: #004273;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem 0;
        }

        .modal-body ul {
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }

        .modal-body li {
          color: #5a6470;
          line-height: 1.5;
          margin-bottom: 0.5rem;
          overflow-wrap: break-word;
        }
        
        .learning-outcomes-list {
          list-style: none;
          padding-left: 0 !important;
        }
        
        .learning-outcomes-list li {
          padding-left: 2em;
          position: relative;
        }
        
        .learning-outcomes-list li::before {
          content: '✓';
          color: var(--accent-lime);
          position: absolute;
          left: 0;
          top: 2px;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .modal-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid #d9dde2;
          background-color: #fdfdff;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .modal-footer .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .modal-footer .btn-secondary {
          background-color: #f0f2f5;
          color: #5a6470;
          border: 2px solid #d9dde2;
        }

        .modal-footer .btn-secondary:hover {
          background-color: #d9dde2;
          color: #004273;
        }

        .modal-footer .btn-primary {
          background-color: #A2D729;
          color: #212529;
          border: 2px solid #A2D729;
          box-shadow: 0 4px 15px -5px rgba(162, 215, 41, 0.6);
        }

        .modal-footer .btn-primary:hover {
          background-color: #82b01e;
          border-color: #82b01e;
          color: #fff;
          box-shadow: 0 6px 20px -3px rgba(162, 215, 41, 0.8);
        }

        @media (max-width: 1024px) {
          .modal-overlay {
            align-items: flex-start;
            padding: 8vh 1rem;
          }
          
          .modal-dialog {
            max-width: 550px;
            max-height: 84vh;
            margin: 0 auto;
          }
          
          .modal-header {
            padding: 1.25rem 1.5rem;
          }
          
          .modal-body {
            padding: 1.5rem;
          }
          
          .modal-footer {
            padding: 1.25rem 1.5rem;
          }
        }

        @media (max-width: 767px) {
          .modal-overlay {
            padding: 4vh 0.5rem 8vh;
            backdrop-filter: none;
          }
          
          .modal-dialog {
            max-width: 100%;
            max-height: 88vh;
            border-radius: 16px;
          }
          
          .modal-header {
            padding: 1rem 1.25rem;
          }
          
          .modal-header h3 {
            font-size: 1.2rem;
            max-width: calc(100% - 2.5rem);
          }
          
          .modal-close-btn {
            font-size: 1.3rem;
            padding: 0.4rem;
          }
          
          .modal-body {
            padding: 1.25rem;
          }
          
          .course-image {
            max-height: 180px;
            margin-bottom: 1.25rem;
          }
          
          .course-meta-details {
            gap: 1rem;
          }
          
          .course-meta-details span {
            font-size: 0.9rem;
          }
          
          .course-price-modal {
            font-size: 1.5rem;
            margin-bottom: 1.25rem;
          }
          
          .modal-body p {
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 1.25rem;
          }
          
          .modal-body h4 {
            font-size: 1rem;
            margin: 1.25rem 0 0.6rem 0;
          }
          
          .modal-body li {
            font-size: 0.9rem;
            line-height: 1.4;
            margin-bottom: 0.4rem;
          }
          
          .learning-outcomes-list li {
            padding-left: 1.75em;
          }
          
          .learning-outcomes-list li::before {
            font-size: 1.1rem;
          }
          
          .modal-footer {
            padding: 1rem 1.25rem;
            flex-direction: column-reverse;
            gap: 0.75rem;
          }
          
          .modal-footer .btn {
            width: 100%;
            justify-content: center;
            padding: 0.7rem 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .modal-dialog {
            border-radius: 14px;
          }
          
          .modal-header h3 {
            font-size: 1.1rem;
          }
          
          .modal-body {
            padding: 1rem;
          }
          
          .course-image {
            max-height: 160px;
            border-radius: 5px;
          }
          
          .course-price-modal {
            font-size: 1.35rem;
          }
          
          .modal-body p {
            font-size: 0.9rem;
          }
          
          .modal-body li {
            font-size: 0.85rem;
          }
          
          .modal-footer {
            padding: 0.9rem 1rem;
          }
        }
      `}</style>
      <div className="modal-overlay active" onClick={onClose}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 title={course.title}>{course.title}</h3>
            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">
            <img src={imagePath} alt={course.title} className="course-image" />
            <div className="course-meta-details">
              <span>
                Duration: <strong>{course.duration || "N/A"}</strong>
              </span>
              <span>
                Type: <strong>{course.type || "N/A"}</strong>
              </span>
            </div>
            <div className="course-price-modal">
              {formatCurrency(course.price)}
            </div>
            <p>
              {course.short_description ||
                "Detailed description not available."}
            </p>
            {course.learning_outcomes &&
              course.learning_outcomes.length > 0 && (
                <>
                  <h4>Learning Outcomes:</h4>
                  <ul className="learning-outcomes-list">
                    {course.learning_outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </>
              )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => onAddToCart(course)}
            >
              <FaCartPlus /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const CartPanel = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onCheckout,
}) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 0),
    0
  );

  const formatCurrencyTotal = (amount) => {
    return `R ${amount.toLocaleString("en-ZA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <>
      {/* ================================================================== */}
      {/* ============== 1. ADD NEW STYLES FOR QUANTITY DISPLAY ============ */}
      {/* ================================================================== */}
      <style>{`
        .cart-item-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 0.25rem;
        }

        .cart-item-price {
          font-weight: 600;
          color: var(--primary-blue);
          font-size: 1rem;
        }

        .cart-item-quantity {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--neutral-dark-gray);
          background-color: var(--neutral-light-gray);
          padding: 0.2rem 0.6rem;
          border-radius: var(--border-radius-sm);
        }
      `}</style>

      <div
        className={`nav-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
        style={{ zIndex: 2000 }}
      ></div>
      <div className={`cart-panel ${isOpen ? "active" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <FaTimes />
          </button>
        </div>
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="cart-empty-message" style={{ padding: "2rem" }}>
              Your cart is currently empty.
            </p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image_url || "/assets/images/course-default.jpg"}
                  alt={item.title}
                />
                <div className="cart-item-details">
                  <h5>{item.title}</h5>
                  <div className="cart-item-meta">
                    <div className="cart-item-price">
                      {formatCurrency(item.price)}
                    </div>
                    <span className="cart-item-quantity">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemoveItem(item.id)}
                  aria-label={`Remove ${item.title}`}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>{formatCurrencyTotal(totalAmount)}</span>
            </div>
            <button
              className="btn btn-primary"
              onClick={onCheckout}
              style={{ width: "100%" }}
            >
              <FaCreditCard /> Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const AppWrapper = () => (
  <ToastProvider>
    <App />
  </ToastProvider>
);

export default AppWrapper;
