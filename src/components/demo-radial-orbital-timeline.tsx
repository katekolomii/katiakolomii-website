import { GraduationCap, Briefcase, FolderGit2, Heart, User, BookOpen } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
    { id: 1, title: "Education",   date: "", content: "Coming soon.", category: "Education",   icon: GraduationCap, relatedIds: [2, 6], status: "completed" as const, energy: 90, color: "#f9a8d4" },
    { id: 2, title: "Experience",  date: "", content: "Coming soon.", category: "Experience",  icon: Briefcase,     relatedIds: [1, 3], status: "completed" as const, energy: 80, color: "#f9a8d4" },
    { id: 3, title: "Projects",    date: "", content: "Coming soon.", category: "Projects",    icon: FolderGit2,    relatedIds: [2, 4], status: "in-progress" as const, energy: 70, color: "#f9a8d4" },
    { id: 4, title: "Hobbies",     date: "", content: "Coming soon.", category: "Hobbies",     icon: Heart,         relatedIds: [3, 5], status: "completed" as const, energy: 60, color: "#f9a8d4" },
    { id: 5, title: "About Me",    date: "", content: "Coming soon.", category: "About",       icon: User,          relatedIds: [4, 6], status: "completed" as const, energy: 100, color: "#f9a8d4" },
    { id: 6, title: "Coursework",  date: "", content: "Coming soon.", category: "Coursework",  icon: BookOpen,      relatedIds: [5, 1], status: "completed" as const, energy: 75, color: "#f9a8d4" },
];

export function RadialOrbitalTimelineDemo() {
    return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export default RadialOrbitalTimelineDemo;
