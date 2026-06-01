import type { ReactNode } from "react";
import { GraduationCap, Briefcase, FolderGit2, Heart, User } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const ACCENT  = "#c4846a";
const MONO    = "'DM Mono', monospace";
const PLAYFAIR = "'Playfair Display', serif";

const tag = (name: string, ip?: boolean) => (
  <span key={name} style={{
    border: `1px solid ${ip ? "#e8d0c8" : "#ddd"}`,
    color: ip ? ACCENT : "#333232",
    fontFamily: MONO,
    fontSize: "11px",
    padding: "5px 12px",
    letterSpacing: "0.04em",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap" as const,
  }}>
    {name}
    {ip && (
      <span style={{
        fontFamily: MONO,
        fontSize: "8px",
        color: ACCENT,
        border: "1px solid #e8d0c8",
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
            border: `1px solid ${active ? ACCENT : "#ddd"}`,
            color: active ? ACCENT : "#bbb",
            fontFamily: MONO, fontSize: "10px", letterSpacing: "0.18em",
            padding: "3px 12px", borderRadius: "999px",
          }}>{status}</span>
          <span style={{ fontFamily: MONO, color: "#bbb", fontSize: "11px", letterSpacing: "0.08em" }}>{dateRange}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: MONO, color: active ? ACCENT : "rgba(196,132,106,0.5)", fontSize: "11px", letterSpacing: "0.14em" }}>◇ {institution}</span>
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
            <div style={{ fontFamily: MONO, color: "#bbb", fontSize: "10px", letterSpacing: "0.22em", marginBottom: 10 }}>{sec.heading}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{sec.tags}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
          tag("Proofs"), tag("ODE"), tag("Abstract Algebra", true),
        ]},
      ]}
    />
    <div style={{ margin: "8px 1% 8px 11%", width: "88%", borderTop: "1px solid #e8e4de" }} />
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

const timelineData = [
    { id: 1, title: "Education",  date: "", content: "", category: "Education",  icon: GraduationCap, relatedIds: [2, 5], status: "completed" as const, energy: 90, color: "#f9a8d4", customContent: educationContent },
    { id: 2, title: "Experience", date: "", content: "", category: "Experience", icon: Briefcase,     relatedIds: [1, 3], status: "completed" as const, energy: 80, color: "#f9a8d4" },
    { id: 3, title: "Projects",   date: "", content: "", category: "Projects",   icon: FolderGit2,    relatedIds: [2, 4], status: "in-progress" as const, energy: 70, color: "#f9a8d4" },
    { id: 4, title: "Hobbies",    date: "", content: "", category: "Hobbies",    icon: Heart,         relatedIds: [3, 5], status: "completed" as const, energy: 60, color: "#f9a8d4" },
    { id: 5, title: "About Me",   date: "", content: "", category: "About",      icon: User,          relatedIds: [4, 1], status: "completed" as const, energy: 100, color: "#f9a8d4" },
];

export function RadialOrbitalTimelineDemo() {
    return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export default RadialOrbitalTimelineDemo;
