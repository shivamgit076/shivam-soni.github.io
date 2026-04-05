import { useState, useEffect, useRef } from "react";

/* ── Tailwind is loaded via CDN in index.html ── */
/* ── Google Fonts: Outfit (display) + Literata (body) ── */

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

const STATS = [
  { num: "5.8+", label: "Years Experience" },
  { num: "v8–v19", label: "Odoo Versions" },
  { num: "3+", label: "Team Size Led" },
];

const HIGHLIGHTS = [
  { icon: "✦", title: "Agentic AI & MCP", desc: "Building intelligent agents with MCP servers, Telegram bots & GenAI for ERP automation" },
  { icon: "◈", title: "Cloud & DevOps", desc: "Docker, Kubernetes, Nginx and CI/CD pipelines for scalable multi-tenant deployments" },
  { icon: "⟡", title: "Deep Integrations", desc: "Payment gateways, SMS, Magento, external CRMs and networking modules" },
  { icon: "△", title: "Team Leadership", desc: "Leading and mentoring developers, client management and Agile delivery" },
];

const SKILLS = [
  { icon: "⚡", label: "Languages", tags: ["Python", "JavaScript", "SQL", "Bash/Shell"], featured: ["Python"] },
  { icon: "◻", label: "Frameworks", tags: ["Odoo v8–v19", "Django", "Flask", "FastAPI"], featured: ["Odoo v8–v19"] },
  { icon: "◉", label: "Databases", tags: ["PostgreSQL", "MySQL"], featured: ["PostgreSQL"] },
  { icon: "☁", label: "DevOps & Cloud", tags: ["Docker", "Kubernetes", "Nginx", "Terraform", "Tekton"], featured: ["Docker", "Kubernetes"] },
  { icon: "✦", label: "AI & Emerging", tags: ["Agentic AI", "MCP Servers", "Generative AI", "LLM Integration"], featured: ["Agentic AI", "MCP Servers"] },
  { icon: "⟳", label: "Integrations", tags: ["Payment Gateways", "SMS Systems", "Magento", "Git/GitHub", "PostgreSQL Optimization"], featured: [] },
];

const EXPERIENCES = [
  {
    date: "Nov 2025 – Present",
    company: "Brainvire Infotech Pvt. Ltd.",
    role: "Senior Software Engineer",
    ai: true,
    points: [
      "Integrated Odoo with MCP servers & Telegram bot — admins fetch live project, task and financial data without opening Odoo",
      "Built an intelligent agent to automate monitoring and reporting, reducing manual effort significantly",
      "Developing case management solutions via Helpdesk tickets and customer feedback surveys",
      "Integrated external CRM into Odoo using mini iframe architecture",
      "Connected Magento website with Odoo for customer complaint registration workflows",
    ],
  },
  {
    date: "Dec 2024 – Sept 2025",
    company: "Ksolves India Limited",
    role: "Senior Software Engineer",
    ai: false,
    points: [
      "Managed and developed a SaaS tool focused on faster deployments and scalability",
      "Led and mentored a development team ensuring smooth project execution",
      "Integrated networking concepts including IPv4 and IPv6 within Odoo environments",
      "Resolved complex technical challenges ensuring timely project delivery",
    ],
  },
  {
    date: "Oct 2023 – Dec 2024",
    company: "Surekha Technology",
    role: "Senior Software Developer · Ahmedabad",
    ai: false,
    points: [
      "Managed a team of developers, providing guidance and support for project success",
      "Oversaw end-to-end client management from requirement gathering to final delivery",
      "Learned and integrated Docker and Nginx into project workflows",
      "Improved delivery timelines by optimising team workflows and resource allocation",
    ],
  },
  {
    date: "Aug 2020 – Sept 2023",
    company: "Serpent Consulting Services Pvt. Ltd.",
    role: "Software Developer · Gandhinagar",
    ai: false,
    points: [
      "Developed custom Odoo modules and performed system integrations across v8–v17",
      "Managed end-to-end project delivery ensuring client satisfaction",
      "Collaborated with cross-functional teams to meet project deadlines",
      "Implemented best practices improving system performance and reliability",
    ],
  },
];

const PROJECTS = [
  {
    tags: [{ label: "AI", color: "emerald" }, { label: "MCP", color: "teal" }],
    title: "Odoo AI Assistant",
    desc: "Intelligent agent integrating Odoo with MCP servers and Telegram bot for real-time data access. Admins fetch project status, tasks and financial data without logging in. Automated monitoring reduces manual effort across the board.",
    tech: ["Python", "MCP Servers", "Telegram Bot", "Odoo", "Agentic AI"],
  },
  {
    tags: [{ label: "Cloud", color: "blue" }, { label: "SaaS", color: "indigo" }],
    title: "SaaS & Cloud Deployments",
    desc: "Designed a SaaS tool optimising deployments and scalability for multi-tenant Odoo environments. Automated CI/CD pipelines significantly cut deployment time. Improved stability via Docker, Kubernetes and Nginx.",
    tech: ["Docker", "Kubernetes", "Nginx", "CI/CD", "Multi-tenant"],
  },
  {
    tags: [{ label: "Integration", color: "amber" }],
    title: "Networking Integration in Odoo",
    desc: "Integrated IPv4, IPv6, dual/single stack support, IP distribution and subnet calculations within Odoo. Delivered networking modules improving ERP infrastructure readiness with hybrid IP stack compatibility.",
    tech: ["Python", "Odoo", "IPv4/IPv6", "Networking"],
  },
  {
    tags: [{ label: "ERP", color: "violet" }, { label: "DevOps", color: "blue" }],
    title: "Client Management Systems",
    desc: "Streamlined client interactions and project tracking. Improved communication efficiency by 30% and reduced deployment time by 40% through optimised workflows and resource allocation strategies.",
    tech: ["Python", "Odoo", "Docker", "Nginx"],
  },
  {
    tags: [{ label: "Migration", color: "rose" }],
    title: "ERP Migrations & Upgrades",
    desc: "Migrated modules across Odoo v9–v17, resolving complex technical challenges and improving system performance. Ensured seamless continuity for enterprise clients upgrading their ERP infrastructure.",
    tech: ["Odoo v9–v17", "Python", "PostgreSQL"],
  },
  {
    tags: [{ label: "Integration", color: "amber" }],
    title: "Technical Integrations",
    desc: "Integrated payment gateways, SMS systems, Magento and external CRM systems with Odoo. Delivered seamless data flow between enterprise systems via robust API integration architecture.",
    tech: ["Payment APIs", "SMS Gateway", "Magento", "REST APIs"],
  },
];

const TAG_COLORS = {
  emerald: "bg-emerald-50 text-emerald-700",
  teal:    "bg-teal-50 text-teal-700",
  blue:    "bg-blue-50 text-blue-700",
  indigo:  "bg-indigo-50 text-indigo-700",
  amber:   "bg-amber-50 text-amber-700",
  violet:  "bg-violet-50 text-violet-700",
  rose:    "bg-rose-50 text-rose-700",
};

/* ── useInView hook ── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── FadeUp wrapper ── */
function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ${delay}s ease, transform 0.55s ${delay}s ease`,
      }}
    >
      {children}
    </div>
  );
}

/* ── SectionLabel ── */
function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold tracking-[0.14em] uppercase text-stone-400 mb-2">
      {children}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-10 leading-tight">
      {children}
    </h2>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function Portfolio() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()));
      let cur = "";
      sections.forEach(s => { if (s && window.scrollY >= s.offsetTop - 140) cur = s.id; });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        .font-display { font-family: 'Outfit', sans-serif; }
        .font-body    { font-family: 'Lora', Georgia, serif; }
        body          { font-family: 'Outfit', sans-serif; }
        ::selection   { background: #d4c8ff; color: #2d1f8a; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="bg-stone-50 text-stone-800 min-h-screen">

        {/* ── NAV ── */}
        <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <span className="font-display text-lg font-bold text-stone-900 tracking-tight">
              S<span className="text-violet-600">.</span>Soni
            </span>
            {/* Desktop */}
            <ul className="hidden md:flex gap-8">
              {NAV_LINKS.map(n => (
                <li key={n}>
                  <button
                    onClick={() => scrollTo(n.toLowerCase())}
                    className={`text-sm font-medium transition-colors ${active === n.toLowerCase() ? "text-violet-600" : "text-stone-500 hover:text-stone-900"}`}
                  >
                    {n}
                  </button>
                </li>
              ))}
            </ul>
            {/* Mobile hamburger */}
            <button className="md:hidden p-1" onClick={() => setMenuOpen(o => !o)}>
              <div className={`w-5 h-0.5 bg-stone-700 transition-all mb-1 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <div className={`w-5 h-0.5 bg-stone-700 transition-all mb-1 ${menuOpen ? "opacity-0" : ""}`} />
              <div className={`w-5 h-0.5 bg-stone-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map(n => (
                <button key={n} onClick={() => scrollTo(n.toLowerCase())} className="text-sm font-medium text-stone-700 text-left">
                  {n}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* ── HERO ── */}
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
          {/* bg decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-100/60 blur-3xl -translate-y-1/4 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-100/50 blur-3xl translate-y-1/4 -translate-x-1/4" />
            {/* grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
                  <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#6d28d9" strokeWidth="0.8"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative max-w-6xl mx-auto px-6 w-full py-20">
            <div className="max-w-2xl">
              {/* availability pill */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-teal-700 bg-teal-50 border border-teal-200 px-4 py-2 rounded-full mb-8"
                style={{ animation: "fadeUp 0.5s ease both" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                Open to Opportunities
              </div>

              <h1 className="font-display font-extrabold leading-[1.04] tracking-[-0.03em] text-stone-900 mb-6"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)", animation: "fadeUp 0.55s 0.08s ease both" }}>
                Shivam<br />
                <span className="text-violet-600">Soni</span>
                <span className="text-teal-500">.</span>
              </h1>

              <p className="text-lg text-stone-500 font-light leading-relaxed mb-10 max-w-lg"
                style={{ animation: "fadeUp 0.55s 0.16s ease both" }}>
                Senior Software Developer specialising in{" "}
                <span className="font-medium text-stone-700">Odoo & Python</span> with 5.8+ years of end-to-end delivery. Currently building{" "}
                <span className="font-medium text-stone-700">Agentic AI & MCP-driven</span> ERP solutions.
              </p>

              <div className="flex gap-3 flex-wrap" style={{ animation: "fadeUp 0.55s 0.24s ease both" }}>
                <button onClick={() => scrollTo("projects")}
                  className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:scale-95">
                  View Projects ↓
                </button>
                <button onClick={() => scrollTo("contact")}
                  className="px-6 py-3 border border-stone-300 hover:border-violet-400 hover:bg-violet-50 text-stone-700 text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5">
                  Get In Touch
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-10 mt-16 flex-wrap" style={{ animation: "fadeUp 0.55s 0.32s ease both" }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-stone-900">{s.num}</div>
                  <div className="text-xs text-stone-400 mt-0.5 tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(22px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-24 bg-white border-y border-stone-100">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <SectionLabel>About Me</SectionLabel>
              <SectionTitle>Building the <span className="text-violet-600">future</span> of ERP</SectionTitle>
              <div className="space-y-4 text-stone-500 font-light leading-relaxed">
                <p>I'm an independent, self-motivated <span className="font-medium text-stone-700">Python/Odoo developer</span> based in Ahmedabad. With 5.8+ years of project delivery, I've worked across Odoo versions v8–v18 both functionally and technically.</p>
                <p>Passionate about <span className="font-medium text-stone-700">efficient, innovative solutions</span> — from SaaS deployments and networking integrations to custom ERP modules and client management systems.</p>
                <p>Currently exploring <span className="font-medium text-stone-700">Agentic AI, MCP servers, and Generative AI</span> to build intelligent automation-driven ERP solutions that reduce manual effort and improve decision-making.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {HIGHLIGHTS.map((h, i) => (
                  <div key={i} className="bg-stone-50 border border-stone-100 rounded-xl p-5 hover:border-violet-200 hover:bg-violet-50/30 transition-all group">
                    <span className="text-violet-500 text-base mb-3 block group-hover:scale-110 transition-transform">{h.icon}</span>
                    <h4 className="font-display font-semibold text-stone-800 text-sm mb-1">{h.title}</h4>
                    <p className="text-xs text-stone-500 leading-relaxed">{h.desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="py-24 bg-stone-50">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <SectionLabel>Technical Skills</SectionLabel>
              <SectionTitle>My <span className="text-violet-600">Toolkit</span></SectionTitle>
            </FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKILLS.map((g, i) => (
                <FadeUp key={g.label} delay={i * 0.06}>
                  <div className="bg-white border border-stone-100 rounded-xl p-5 hover:border-violet-200 hover:shadow-sm transition-all h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center text-violet-500 text-sm">{g.icon}</div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">{g.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {g.tags.map(t => (
                        <span key={t}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${g.featured.includes(t) ? "bg-violet-50 text-violet-700 border-violet-200" : "bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300"}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-24 bg-white border-y border-stone-100">
          <div className="max-w-3xl mx-auto px-6">
            <FadeUp>
              <SectionLabel>Work History</SectionLabel>
              <SectionTitle><span className="text-violet-600">Experience</span> Timeline</SectionTitle>
            </FadeUp>
            <div className="relative pl-6">
              {/* vertical line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-violet-400 via-violet-200 to-transparent" />
              <div className="flex flex-col gap-10">
                {EXPERIENCES.map((e, i) => (
                  <FadeUp key={i} delay={i * 0.08}>
                    <div className="relative pl-6">
                      {/* dot */}
                      <div className="absolute -left-[0.35rem] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-500 border-2 border-white ring-2 ring-violet-200" />
                      <div className="text-xs font-semibold text-teal-600 tracking-wide mb-1">{e.date}</div>
                      <div className="font-display text-lg font-bold text-stone-900 leading-tight">{e.company}</div>
                      <div className="text-sm text-violet-500 font-medium mb-3">{e.role}</div>
                      {e.ai && (
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-3">
                          ✦ AI Initiative
                        </div>
                      )}
                      <div className="bg-stone-50 border border-stone-100 rounded-xl p-4">
                        <ul className="flex flex-col gap-2.5">
                          {e.points.map((p, j) => (
                            <li key={j} className="flex gap-3 text-sm text-stone-500 leading-relaxed">
                              <span className="text-violet-400 mt-0.5 shrink-0">→</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="py-24 bg-stone-50">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <SectionLabel>Featured Work</SectionLabel>
              <SectionTitle>Key <span className="text-violet-600">Projects</span></SectionTitle>
            </FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECTS.map((p, i) => (
                <FadeUp key={i} delay={i * 0.06}>
                  <div className="bg-white border border-stone-100 rounded-xl p-6 flex flex-col h-full hover:border-violet-200 hover:shadow-md transition-all group">
                    {/* top accent */}
                    <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-violet-400 to-teal-400 transition-all duration-500 -mt-6 -mx-6 mb-5 rounded-t-xl" />
                    <div className="flex gap-2 flex-wrap mb-3">
                      {p.tags.map(t => (
                        <span key={t.label} className={`text-[11px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded ${TAG_COLORS[t.color]}`}>
                          {t.label}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display font-bold text-stone-900 text-base mb-2">{p.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed flex-1">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-stone-100">
                      {p.tech.map(t => (
                        <span key={t} className="text-[11px] bg-stone-50 text-stone-500 border border-stone-200 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-24 bg-white border-t border-stone-100 text-center">
          <div className="max-w-xl mx-auto px-6">
            <FadeUp>
              <SectionLabel>Get In Touch</SectionLabel>
              <SectionTitle>Let's <span className="text-violet-600">Connect</span></SectionTitle>
              <p className="text-stone-500 font-light leading-relaxed mb-8">
                Open to new opportunities, collaborations and projects — especially AI-driven ERP and automation. Feel free to reach out!
              </p>
              <a href="mailto:shivamsoni16997@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5 active:scale-95">
                ✉ shivamsoni16997@gmail.com
              </a>
              <div className="flex justify-center gap-3 flex-wrap mt-8">
                {[
                  { icon: "📞", text: "+91 63548 52904", href: "tel:+916354852904" },
                  { icon: "📍", text: "Ahmedabad, Gujarat", href: "#" },
                  { icon: "🎓", text: "B.E. Computer Engg · 2019", href: "#" },
                ].map(c => (
                  <a key={c.text} href={c.href}
                    className="inline-flex items-center gap-2 text-sm text-stone-500 border border-stone-200 px-4 py-2.5 rounded-lg hover:border-violet-300 hover:text-stone-700 hover:bg-violet-50 transition-all">
                    <span>{c.icon}</span>{c.text}
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-stone-50 border-t border-stone-100 py-6 px-6">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3">
            <p className="text-xs text-stone-400">© 2025 Shivam Soni. Built with passion for great engineering.</p>
            <p className="text-xs text-stone-400">
              Senior Software Developer ·{" "}
              <a href="mailto:shivamsoni16997@gmail.com" className="text-violet-500 hover:text-violet-700">shivamsoni16997@gmail.com</a>
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
