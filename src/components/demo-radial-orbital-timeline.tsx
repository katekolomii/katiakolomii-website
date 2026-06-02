import { useState, type ReactNode } from "react";
import { GraduationCap, Briefcase, FolderGit2, User, Code2 } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const MONO     = "'DM Mono', monospace";
const PLAYFAIR = "'Playfair Display', serif";
const GARAMOND = "'EB Garamond', serif";

const PINK_TAG = {
  color: "#c4687e",
  border: "0.5px solid #e8c0cc",
  background: "#fdf5f7",
};

const tag = (name: string, ip?: boolean) => (
  <span key={name} style={{
    ...PINK_TAG,
    fontFamily: MONO,
    fontSize: "11px",
    padding: "5px 12px",
    letterSpacing: "0.04em",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap" as const,
    borderRadius: "20px",
  }}>
    {name}
    {ip && (
      <span style={{
        fontFamily: MONO,
        fontSize: "8px",
        color: "#c4687e",
        border: "0.5px solid #e8c0cc",
        padding: "1px 4px",
        letterSpacing: "0.08em",
        lineHeight: 1.4,
      }}>IP</span>
    )}
  </span>
);

const corners = (
  <>
    <div style={{ position: "absolute", top: -1, left: -1, width: 8, height: 8, borderTop: "1px solid rgba(0,0,0,0.2)", borderLeft: "1px solid rgba(0,0,0,0.2)" }} />
    <div style={{ position: "absolute", top: -1, right: -1, width: 8, height: 8, borderTop: "1px solid rgba(0,0,0,0.2)", borderRight: "1px solid rgba(0,0,0,0.2)" }} />
    <div style={{ position: "absolute", bottom: -1, left: -1, width: 8, height: 8, borderBottom: "1px solid rgba(0,0,0,0.2)", borderLeft: "1px solid rgba(0,0,0,0.2)" }} />
    <div style={{ position: "absolute", bottom: -1, right: -1, width: 8, height: 8, borderBottom: "1px solid rgba(0,0,0,0.2)", borderRight: "1px solid rgba(0,0,0,0.2)" }} />
  </>
);

function EduEntry({ active, status, dateRange, institution, location, titles, stats, sections }: {
  active: boolean;
  status: string;
  dateRange: string;
  institution: string;
  location: string;
  titles: string[];
  stats: { value: string; label: string; sub: string }[];
  sections: { heading: string; tags: ReactNode[] }[];
}) {
  return (
    <div style={{ position: "relative", margin: "16px 4% 16px 4%", width: "92%", border: "1px solid #e8e4de" }}>
      {corners}
      <div style={{ padding: "18px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{
            border: `1px solid ${active ? "#e8c0cc" : "#ddd"}`,
            color: active ? "#c4687e" : "#bbb",
            fontFamily: MONO, fontSize: "10px", letterSpacing: "0.18em",
            padding: "3px 12px", borderRadius: "999px",
          }}>{status}</span>
          <span style={{ fontFamily: MONO, color: "#bbb", fontSize: "11px", letterSpacing: "0.08em" }}>{dateRange}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: MONO, color: active ? "#c4687e" : "rgba(196,104,126,0.45)", fontSize: "11px", letterSpacing: "0.14em" }}>◇ {institution}</span>
          <span style={{ fontFamily: MONO, color: "#bbb", fontSize: "11px" }}>{location}</span>
        </div>
        <div style={{ marginBottom: 18 }}>
          {titles.map(t => <div key={t} style={{ fontFamily: MONO, fontSize: "13px", color: "#0d0d0d", lineHeight: 1.5 }}>{t}</div>)}
        </div>
        <div style={{ display: "flex", gap: 44, marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: PLAYFAIR, color: "#0d0d0d", fontSize: "40px", fontWeight: 700, lineHeight: 1, marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontFamily: MONO, color: "#bbb", fontSize: "10px", letterSpacing: "0.15em", lineHeight: 1.1 }}>{s.label}</div>
              <div style={{ fontFamily: MONO, color: "#bbb", fontSize: "9px", lineHeight: 1.1 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        {sections.map((sec, i) => (
          <div key={sec.heading} style={{ marginTop: i > 0 ? 16 : 0 }}>
            <div style={{ fontFamily: MONO, color: active ? "#c4687e" : "#bbb", fontSize: "10px", letterSpacing: "0.22em", marginBottom: 10 }}>{sec.heading}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{sec.tags}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Experience tag helpers ──────────────────────────────────────────────────
const xtag = (name: string, _variant: "dark" | "skill" | "current" = "dark", href?: string) => {
  const shared = {
    ...PINK_TAG,
    fontFamily: MONO, fontSize: "11px", letterSpacing: "0.04em",
    padding: "3px 10px", borderRadius: "20px",
    display: "inline-flex" as const, alignItems: "center",
    whiteSpace: "nowrap" as const,
  };
  if (href) return (
    <a key={name} href={href} target="_blank" rel="noopener noreferrer"
      style={{ ...shared, textDecoration: "none", cursor: "pointer" }}>{name} ↗</a>
  );
  return <span key={name} style={shared}>{name}</span>;
};

interface ExpEntryProps {
  org: string;
  role: string;
  date: string;
  detail: string;
  tags: ReactNode[];
}

function ExpEntry({ org, role, date, detail, tags }: ExpEntryProps) {
  return (
    <div style={{ padding: "16px 28px", borderBottom: "0.5px solid #e8e4de", fontFamily: MONO }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
        <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "18px", letterSpacing: "0", color: "#0d0d0d" }}>{org}</span>
        <span style={{ fontFamily: MONO, fontSize: "11px", color: "#bbb", letterSpacing: "0.06em", whiteSpace: "nowrap" as const, marginLeft: 12, paddingTop: 2 }}>{date}</span>
      </div>
      <div style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontSize: "15px", color: "#444", marginBottom: 2 }}>{role}</div>
      <div style={{ fontFamily: MONO, fontSize: "11px", color: "#aaa", letterSpacing: "0.04em", marginBottom: 6 }}>{detail}</div>
      <div style={{ display: "flex", flexWrap: "wrap", columnGap: 5, rowGap: 4 }}>{tags}</div>
    </div>
  );
}

const experienceContent = (
  <div style={{ width: "100%", fontFamily: MONO, paddingBottom: 8 }}>
    {/* Inner bordered box — same treatment as EduEntry */}
    <div style={{ position: "relative", margin: "16px 4% 16px 4%", width: "92%", border: "1px solid #e8e4de" }}>
      {corners}

      <ExpEntry
        org="Ministry of Digital Transformation" role="AI Engineer Intern" date="Jun 2026 — present"
        detail="Ukraine · Kyiv"
        tags={[xtag("Data.gov.ua", "dark", "https://data.gov.ua/")]}
      />
      <ExpEntry
        org="EY Future Bridge" role="Fellow" date="May 2026 — present"
        detail="San Francisco, CA · Hybrid"
        tags={[xtag("Case Studies", "skill"), xtag("Consulting", "skill"), xtag("Client Presentations", "skill")]}
      />
      <ExpEntry
        org="Georgetown University" role="Teaching Assistant" date="Aug 2025 — present"
        detail="Data Structures · CS I & II"
        tags={[xtag("COSC 1020/1030"), xtag("COSC 2010")]}
      />
      <ExpEntry
        org="Ministry of Digital Transformation" role="Software Engineer Intern" date="Jul — Aug 2025"
        detail="Ukraine · Kyiv"
        tags={[xtag("Diia", "dark", "https://diia.gov.ua/en"), xtag("Google Maps API"), xtag("Python", "skill"), xtag("Selenium", "skill"), xtag("OpenStreetMap", "skill"), xtag("NLP", "skill")]}
      />
      <ExpEntry
        org="Pulse" role="Data Scientist" date="Jan — Apr 2026"
        detail="Washington, DC"
        tags={[xtag("Python", "skill"), xtag("scikit-learn", "skill"), xtag("Pandas", "skill")]}
      />
      <ExpEntry
        org="Ministry of Digital Transformation" role="AI Research Intern" date="Jun — Aug 2024"
        detail="Ukraine · Kyiv"
        tags={[xtag("Trembita", "dark", "https://trembita.gov.ua/en"), xtag("Tableau", "skill"), xtag("LSTM", "skill"), xtag("Time Series", "skill"), xtag("Python", "skill")]}
      />
      <ExpEntry
        org="Stanford Summer Session" role="Machine Learning Fellow" date="Jun — Jul 2023"
        detail="Stanford, CA"
        tags={[xtag("NASA NEO Dataset"), xtag("scikit-learn", "skill"), xtag("SMOTE", "skill"), xtag("Streamlit", "skill"), xtag("NumPy", "skill")]}
      />

    </div>
  </div>
);

const educationContent = (
  <div style={{ width: "100%", fontFamily: MONO, paddingBottom: 8 }}>
    <EduEntry
      active status="ACTIVE" dateRange="2024 – 2028"
      institution="GEORGETOWN UNIVERSITY" location="Washington, DC"
      titles={["B.S. Computer Science", "A.B. Mathematics"]}
      stats={[
        { value: "3.965", label: "GPA",  sub: "cumulative" },
        { value: "03",    label: "YEAR", sub: "junior"     },
      ]}
      sections={[
        { heading: "COMPUTER SCIENCE", tags: [
          tag("Data Structures"), tag("Advanced Programming"), tag("Computer Organization"),
          tag("Deep RL"), tag("Algorithms", true), tag("Programming Languages", true),
        ]},
        { heading: "MATHEMATICS", tags: [
          tag("Multivariable Calculus"), tag("Math Statistics"), tag("Linear Algebra"),
          tag("Proofs"), tag("Ordinary Differential Equations"), tag("Abstract Algebra", true),
        ]},
      ]}
    />
    <div style={{ margin: "0 4%", borderTop: "1px solid #e8e4de" }} />
    <EduEntry
      active={false} status="COMPLETED" dateRange="2022 – 2024"
      institution="TABOR ACADEMY" location="Marion, MA"
      titles={["High School Diploma"]}
      stats={[
        { value: "4.33", label: "GPA",   sub: "out of 4.0" },
        { value: "'24",  label: "CLASS", sub: "prep school" },
      ]}
      sections={[
        { heading: "HONORS & RECOGNITION", tags: [
          tag("Cum Laude Society"), tag("High Honors Dean's List"), tag("AP Scholar with Distinction"),
        ]},
        { heading: "ADVANCED COURSEWORK", tags: [
          tag("Calculus BC"), tag("Physics (Calculus-Based)"), tag("Diff. Equations & Lin. Algebra"),
          tag("Computer Science on Java"), tag("Macroeconomics"), tag("Statistics"),
        ]},
      ]}
    />
  </div>
);

const aboutContent = (
  <div style={{ width: "100%", fontFamily: MONO, paddingBottom: 8 }}>
    <div style={{ position: "relative", margin: "16px 4% 16px 4%", width: "92%", border: "1px solid #e8e4de" }}>
      {corners}
      <div style={{ padding: "18px 28px" }}>

        {/* Background */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.22em", color: "#bbb", textTransform: "uppercase" as const, marginBottom: 10 }}>BACKGROUND</div>
          <div style={{ fontFamily: GARAMOND, fontSize: "15px", color: "#444", lineHeight: 1.75 }}>
            Born and raised in Nizhyn, Ukraine. Moved to the US for prep school at Tabor Academy in Massachusetts, then Georgetown in DC. Somewhere between Kyiv, Marion, and Washington I figured out I wanted to work on technology that actually matters — defense, civic infrastructure, AI for real problems. Fluent in Ukrainian, Russian, and English.
          </div>
        </div>

        {/* Beyond the Resume */}
        <div style={{ borderTop: "0.5px solid #e8e4de", paddingTop: 16 }}>
          <div style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.22em", color: "#bbb", textTransform: "uppercase" as const, marginBottom: 10 }}>OUTSIDE WORK</div>
          <div style={{ fontFamily: GARAMOND, fontSize: "15px", color: "#444", lineHeight: 1.75 }}>
            I've won 45+ national and international dance competitions as part of the Ukrainian Dance Team Harmoniia and Tabor's dance company. Graduated from Nizhyn Choreographic School with high honors in 2019. I once ran an eco education program in my hometown that got recognized by Ukraine's Ministry of Youth and Sports and funded by the British Council.
          </div>
        </div>

      </div>
    </div>
  </div>
);

// ── Projects helpers ────────────────────────────────────────────────────────

function ProjLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ fontFamily: MONO, fontSize: "8px", color: hovered ? "#0d0d0d" : "#aaa", borderBottom: "0.5px solid #ddd", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.15s" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >{label}</a>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
      <div style={{ fontFamily: PLAYFAIR, fontStyle: "italic", fontSize: "28px", color: "#0d0d0d", whiteSpace: "nowrap" as const, lineHeight: 1 }}>{title}</div>
      <div style={{ flex: 1, borderTop: "0.5px solid #e8e4de" }} />
    </div>
  );
}

interface ProjEntryProps {
  title: string;
  links?: { href: string; label: string }[];
  description: ReactNode;
  tags: string[];
  last?: boolean;
}

function ProjEntry({ title, links, description, tags, last }: ProjEntryProps) {
  return (
    <div style={{ paddingBottom: last ? 0 : 16, borderBottom: last ? "none" : "0.5px solid #e8e4de", marginBottom: last ? 0 : 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "15px", color: "#0d0d0d", letterSpacing: "0" }}>{title}</span>
        {links && links.length > 0 && (
          <div style={{ display: "flex", gap: 10, flexShrink: 0, marginLeft: 12 }}>
            {links.map(l => <ProjLink key={l.label} href={l.href} label={l.label} />)}
          </div>
        )}
      </div>
      <div style={{ fontFamily: GARAMOND, fontSize: "14px", color: "#555", lineHeight: 1.7, marginBottom: 8 }}>{description}</div>
      <div style={{ display: "flex", flexWrap: "wrap", columnGap: 5, rowGap: 4 }}>
        {tags.map(t => xtag(t, "skill"))}
      </div>
    </div>
  );
}

const projectsContent = (
  <div style={{ width: "100%", fontFamily: MONO, paddingBottom: 8 }}>
    <div style={{ position: "relative", margin: "16px 4% 16px 4%", width: "92%", border: "1px solid #e8e4de" }}>
      {corners}
      <div style={{ padding: "18px 28px" }}>

        <SectionHeader title="models." />

        <ProjEntry
          title="Policy Gradient Methods"
          links={[{ href: "https://github.com/katekolomii/deep-rl-policy-gradients", label: "github →" }]}
          description="REINFORCE, PG+Baseline, and PPO from scratch on MuJoCo Ant-v5. PPO reached 1565 return by episode 2000 while REINFORCE plateaued at 350."
          tags={["PyTorch", "MuJoCo", "GAE"]}
        />
        <ProjEntry
          title="NASA NEO Risk Classifier"
          links={[
            { href: "https://github.com/katekolomii/neo-asteroid-classifier", label: "github →" },
            { href: "https://asteroid-classifier.streamlit.app/", label: "live →" },
          ]}
          description="Asteroid hazard detection on NASA's NEO dataset. Recall-first approach — in planetary defense, missing a real threat is worse than a false alarm. 97% recall on hazardous class. Deployed as a live Streamlit app."
          tags={["scikit-learn", "SMOTE", "Streamlit"]}
        />
        <ProjEntry
          title="Multi-Factor Portfolio Model"
          description={<>Fama-French 5-factor regression model for a GU long-short equity fund. Decomposes portfolio risk into market, size, value, profitability, and investment buckets. R<sup>2</sup> = 0.845, AUC = 0.937. Streamlit app for portfolio upload and real-time factor analysis.</>}
          tags={["Python", "Pandas", "Regression", "Streamlit"]}
        />

        {/* Section divider */}
        <div style={{ borderTop: "0.5px solid #ddd", margin: "24px 0" }} />

        <SectionHeader title="engineering." />

        <ProjEntry
          title="Google Maps Review Scraper"
          links={[{ href: "https://github.com/katekolomii/google-maps-review-scraper", label: "github →" }]}
          description="Built for Ukraine's national LLM training pipeline at Mintsyfra. Extracted 100K+ real-user reviews across 25 regions, handling infinite scroll, lazy loading, and rate limiting. Output fed directly into NLP modeling for Diia."
          tags={["Python", "Selenium", "ChromeDriver"]}
        />
        <ProjEntry
          last
          title="LangSpace"
          links={[{ href: "javascript:void(0)", label: "soon" }]}
          description="Language learning platform with AI-powered feedback across four skill modules — listening, reading, writing, and speaking. Weekly planner with streak tracking. AI quizzes by proficiency level, grades written submissions, and explains vocabulary with generated images."
          tags={["Next.js", "TypeScript", "Groq", "GPT-4o-mini", "DALL-E 3"]}
        />

      </div>
    </div>
  </div>
);

const skillSection = (heading: string, skills: string[]) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.22em", color: "#c4687e", textTransform: "uppercase" as const, marginBottom: 10 }}>{heading}</div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {skills.map(s => xtag(s, "skill"))}
    </div>
  </div>
);

const skillsContent = (
  <div style={{ width: "100%", fontFamily: MONO, paddingBottom: 8 }}>
    <div style={{ position: "relative", margin: "16px 4% 16px 4%", width: "92%", border: "1px solid #e8e4de" }}>
      {corners}
      <div style={{ padding: "18px 28px" }}>
        {skillSection("Languages", ["Python", "C++", "JavaScript", "TypeScript", "SQL"])}
        {skillSection("Machine Learning & AI", ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "LSTM", "GAE", "SMOTE", "MuJoCo", "Groq", "GPT-4o-mini", "DALL-E 3", "NLP"])}
        {skillSection("Web & Automation", ["Next.js", "Streamlit", "Selenium", "ChromeDriver", "OpenStreetMap", "Google Maps API"])}
        {skillSection("Data & Visualization", ["Tableau", "Regression", "Time Series"])}
        {skillSection("Tools", ["Git", "Docker", "Linux", "Bash", "REST APIs"])}
      </div>
    </div>
  </div>
);

const timelineData = [
    { id: 1, title: "Education",  date: "", content: "", category: "Education",  icon: GraduationCap, nodeLabel: "Ed.", relatedIds: [2, 5], status: "completed" as const,     energy: 90,  color: "#f9a8d4", customContent: educationContent },
    { id: 2, title: "Experience", date: "", content: "", category: "Experience", icon: Briefcase,     nodeLabel: "Ex.", relatedIds: [1, 3], status: "completed" as const,     energy: 80,  color: "#f9a8d4", customContent: experienceContent },
    { id: 3, title: "Projects",   date: "", content: "", category: "Projects",   icon: FolderGit2,    nodeLabel: "Pr.", relatedIds: [2, 4], status: "in-progress" as const,   energy: 70,  color: "#f9a8d4", customContent: projectsContent },
    { id: 4, title: "Stack",      date: "", content: "", category: "Stack",      icon: Code2,         nodeLabel: "St.", relatedIds: [3, 5], status: "completed" as const,     energy: 75,  color: "#f9a8d4", customContent: skillsContent },
    { id: 5, title: "About Me",   date: "", content: "", category: "About",      icon: User,          nodeLabel: "Ab.", relatedIds: [4, 1], status: "completed" as const,     energy: 100, color: "#f9a8d4", customContent: aboutContent },
];

export function RadialOrbitalTimelineDemo() {
    return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export default RadialOrbitalTimelineDemo;
