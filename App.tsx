import React, { useState, useRef } from "react";

// ── Mock Data ────────────────────────────────────────────────────────────────

const mockResume = {
  name: "Alex Chen",
  title: "Software Engineer",
  email: "alex.chen@email.com",
  phone: "(415) 555-0192",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/alexchen",
  github: "github.com/alexchen",
  summary:
    "Full-stack software engineer with 3+ years of experience building scalable web applications. Passionate about developer tooling, distributed systems, and creating seamless user experiences. Proven track record of delivering high-impact features at fast-paced startups and tech companies.",
  skills: {
    Languages: ["Python", "TypeScript", "JavaScript", "Go", "SQL"],
    Frameworks: ["React", "Next.js", "Node.js", "FastAPI", "Django"],
    Infrastructure: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
    Tools: ["Git", "GitHub Actions", "Figma", "Linear", "Notion"],
  },
  experience: [
    {
      title: "Software Engineer",
      company: "Stripe",
      period: "Jun 2023 – Present",
      location: "San Francisco, CA",
      bullets: [
        "Architected and shipped a real-time payment analytics dashboard serving 10,000+ merchants, reducing support tickets by 34%",
        "Led migration of legacy Ruby monolith to microservices, cutting p99 latency from 800ms to 120ms",
        "Mentored 2 junior engineers and led bi-weekly technical design reviews",
        "Built an internal CLI tool adopted by 80% of the engineering org to streamline local dev environments",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "Figma",
      period: "May 2022 – Aug 2022",
      location: "San Francisco, CA",
      bullets: [
        "Implemented a new comment threading system used by 4M+ daily active users",
        "Reduced canvas rendering time by 22% via WebGL draw call batching",
        "Shipped 3 A/B experiments improving user retention metrics",
      ],
    },
  ],
  projects: [
    {
      name: "Heron – Open Source API Gateway",
      stack: "Go, PostgreSQL, React",
      period: "2023",
      bullets: [
        "Built a lightweight API gateway with JWT auth, rate limiting, and observability — 1.2k GitHub stars",
        "Integrated OpenTelemetry tracing with Grafana dashboards for real-time request monitoring",
      ],
    },
    {
      name: "SnapDeploy",
      stack: "Next.js, Vercel, Supabase",
      period: "2022",
      bullets: [
        "One-click deployment platform for side projects; 300+ users within first month of launch",
        "Automated preview environments via GitHub webhooks and serverless functions",
      ],
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "UC Berkeley",
      period: "2019 – 2023",
      gpa: "3.9 / 4.0",
      honors: "Magna Cum Laude, Dean's List (6 semesters)",
    },
  ],
};

const pinnedJobs = [
  {
    id: "google-swe",
    label: "Google SWE Internship",
    title: "Software Engineer Intern",
    company: "Google",
    platform: "LinkedIn",
    platformColor: "#0A66C2",
    logo: "G",
    logoColor: "#4285F4",
    description:
      "Join Google's core engineering team to build products used by billions. You'll work alongside world-class engineers on large-scale distributed systems, collaborate cross-functionally, and ship features to global production. Ideal candidates have strong CS fundamentals, proficiency in Java/C++/Python, and experience with data structures and algorithms.",
    score: 94,
    tags: ["Distributed Systems", "Java", "C++", "Algorithms", "Scale"],
    tailoredResume: {
      summary:
        "Full-stack software engineer with expertise in distributed systems and large-scale infrastructure. Strong CS fundamentals with experience shipping features to millions of users at Stripe. Passionate about solving hard engineering challenges at global scale.",
      highlights: ["Distributed Systems", "Large-scale infrastructure", "Java/C++/Python", "Algorithm optimization"],
    },
  },
  {
    id: "goldman-analyst",
    label: "Goldman Sachs Analyst",
    title: "Summer Analyst – Technology",
    company: "Goldman Sachs",
    platform: "Handshake",
    platformColor: "#E91680",
    logo: "GS",
    logoColor: "#0033A0",
    description:
      "Goldman Sachs Technology Division is seeking Summer Analysts to build next-generation financial technology. You'll work on trading systems, risk platforms, and client-facing applications. We value quantitative thinking, strong programming skills (Java, Python), and the ability to work in a fast-paced, high-stakes environment.",
    score: 88,
    tags: ["FinTech", "Java", "Python", "Risk Systems", "Finance"],
    tailoredResume: {
      summary:
        "Software engineer with strong quantitative background and experience building high-performance, low-latency systems. Track record of reducing system latency by 85% at Stripe. Combines technical rigor with business impact focus.",
      highlights: ["Low-latency systems", "Python/Java", "Quantitative thinking", "High-stakes engineering"],
    },
  },
  {
    id: "deloitte-consulting",
    label: "Deloitte Consulting",
    title: "Consulting Intern – Technology",
    company: "Deloitte",
    platform: "Indeed",
    platformColor: "#2164F3",
    logo: "D",
    logoColor: "#86BC25",
    description:
      "Deloitte's Technology Consulting practice helps Fortune 500 clients navigate digital transformation. As an intern, you'll contribute to cloud migration projects, data strategy engagements, and enterprise software implementations. We value strong communication, problem-solving, and the ability to translate technical concepts to business stakeholders.",
    score: 74,
    tags: ["Cloud", "Digital Transformation", "Stakeholder Management", "AWS"],
    tailoredResume: {
      summary:
        "Software engineer and technical communicator with experience bridging engineering and product teams. Led cross-functional initiatives at Stripe impacting thousands of merchants. Skilled at translating complex systems into business value.",
      highlights: ["Cloud architecture", "Stakeholder communication", "Digital transformation", "AWS"],
    },
  },
  {
    id: "meta-product",
    label: "Meta Product Intern",
    title: "Product Management Intern",
    company: "Meta",
    platform: "LinkedIn",
    platformColor: "#0A66C2",
    logo: "M",
    logoColor: "#0081FB",
    description:
      "Meta's PM internship is for technical candidates who want to sit at the intersection of product and engineering. You'll define product strategy, run A/B experiments, and work closely with engineers and designers. Strong analytical skills, user empathy, and technical literacy are essential.",
    score: 91,
    tags: ["Product Strategy", "A/B Testing", "Analytics", "User Research"],
    tailoredResume: {
      summary:
        "Technical engineer with product instincts and experience running A/B experiments at scale. Shipped user-facing features at Figma used by 4M+ daily active users. Data-driven approach to product decisions with strong user empathy.",
      highlights: ["A/B experimentation", "User-facing features", "Data-driven decisions", "Cross-functional collaboration"],
    },
  },
];

const libraryResumes = [
  { id: "live", name: "ReadyMe", type: "Master", date: "Updated just now", score: 98 },
  { id: "google-swe", name: "Google SWE Internship", type: "Job-Specific", date: "2 hours ago", score: 94 },
  { id: "goldman-analyst", name: "Goldman Sachs Analyst", type: "Job-Specific", date: "Yesterday", score: 91 },
  { id: "deloitte-consulting", name: "Deloitte Consulting", type: "Job-Specific", date: "3 days ago", score: 89 },
  { id: "meta-product", name: "Meta Product Intern", type: "Job-Specific", date: "1 week ago", score: 92 },
];

const activityFeed = [
  { id: 1, type: "linkedin_post", icon: "📝", title: "New LinkedIn post detected", detail: "\"Excited to share my experience with distributed systems at Stripe...\"", time: "2 hours ago", impact: "Resume summary updated", color: "#0A66C2" },
  { id: 2, type: "skill_added", icon: "⚡", title: "New skill endorsed", detail: "Kubernetes — 12 endorsements", time: "Yesterday", impact: "Skills section refreshed", color: "#F59E0B" },
  { id: 3, type: "job_application", icon: "📨", title: "Job application submitted", detail: "Google Software Engineer Intern via LinkedIn", time: "2 days ago", impact: "Job resume created", color: "#10B981" },
  { id: 4, type: "profile_update", icon: "✏️", title: "LinkedIn profile updated", detail: "New experience entry: Stripe — Software Engineer", time: "3 days ago", impact: "Experience section synced", color: "#6366F1" },
  { id: 5, type: "comment", icon: "💬", title: "Comment on technical post", detail: "Commented on \"Scaling PostgreSQL to 100M rows\" — 47 likes", time: "4 days ago", impact: "Technical expertise reinforced", color: "#EC4899" },
  { id: 6, type: "skill_added", icon: "⚡", title: "New certification added", detail: "AWS Solutions Architect – Associate", time: "1 week ago", impact: "Skills & certifications updated", color: "#F59E0B" },
  { id: 7, type: "job_application", icon: "📨", title: "Job application submitted", detail: "Meta Product Management Intern via LinkedIn", time: "1 week ago", impact: "Job resume created", color: "#10B981" },
  { id: 8, type: "linkedin_post", icon: "📝", title: "Article published", detail: "\"Why I switched from REST to gRPC for internal microservices\"", time: "2 weeks ago", impact: "Thought leadership signal added", color: "#0A66C2" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const platformBadge = (platform, color) => (
  <span style={{ background: color + "18", color: color }} className="text-xs font-semibold px-2 py-0.5 rounded-full border" style={{ background: color + "18", color: color, borderColor: color + "40" }}>
    {platform}
  </span>
);

// ── Resume Preview ───────────────────────────────────────────────────────────

function ResumePreview({ resume, tailored }) {
  const r = resume;
  const summary = tailored?.summary || r.summary;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6" style={{ fontFamily: "'Georgia', serif" }}>
        {/* Header */}
        <div className="border-b-2 border-gray-900 pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>{r.name}</h1>
          <p className="text-sm text-gray-600 mt-1">{r.title}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
            <span>{r.email}</span>
            <span>·</span>
            <span>{r.phone}</span>
            <span>·</span>
            <span>{r.location}</span>
            <span>·</span>
            <span>{r.linkedin}</span>
            <span>·</span>
            <span>{r.github}</span>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-2">Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
          {tailored && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tailored.highlights.map(h => (
                <span key={h} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#EEF2FF", color: "#4F46E5" }}>{h}</span>
              ))}
            </div>
          )}
        </section>

        {/* Skills */}
        <section className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-2">Technical Skills</h2>
          <div className="space-y-1">
            {Object.entries(r.skills).map(([cat, items]) => (
              <div key={cat} className="text-sm">
                <span className="font-semibold text-gray-800">{cat}:</span>{" "}
                <span className="text-gray-600">{items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-2">Experience</h2>
          <div className="space-y-4">
            {r.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-bold text-gray-900">{exp.title}</span>
                    <span className="text-sm text-gray-600"> — {exp.company}</span>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{exp.period}</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">{exp.location}</p>
                <ul className="space-y-1">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-4">
          <h2 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-2">Projects</h2>
          <div className="space-y-3">
            {r.projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-bold text-gray-900">{proj.name}</span>
                  <span className="text-xs text-gray-400">{proj.period}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">Stack: {proj.stack}</p>
                <ul className="space-y-1">
                  {proj.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-2">Education</h2>
          {r.education.map((edu, i) => (
            <div key={i} className="flex justify-between items-start">
              <div>
                <span className="text-sm font-bold text-gray-900">{edu.degree}</span>
                <span className="text-sm text-gray-600"> — {edu.school}</span>
                <p className="text-xs text-gray-500">{edu.honors} · GPA: {edu.gpa}</p>
              </div>
              <span className="text-xs text-gray-400">{edu.period}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

// ── Pages ────────────────────────────────────────────────────────────────────

// (Legacy page components kept for library/activity/settings routing)
function _LiveResumePage_UNUSED() { return null; }
function _JobResumePage_UNUSED() { return null; }

function ResumeLibraryPage({ onNavigate }) {
  const [selected, setSelected] = useState(null);

  const selectedJob = selected && selected !== "live" ? pinnedJobs.find(j => j.id === selected) : null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resume Library</h1>
        <p className="text-sm text-gray-500 mt-0.5">{libraryResumes.length} resumes · All versions stored automatically</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="space-y-2">
          {libraryResumes.map(r => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selected === r.id ? "border-indigo-300 bg-indigo-50 shadow-sm" : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-sm text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.date}</div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.type === "Master" ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"}`}>
                    {r.type}
                  </span>
                  <div className="text-xs text-gray-400 mt-1">ATS: {r.score}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">{libraryResumes.find(r => r.id === selected)?.name}</h2>
                <button className="px-3 py-1.5 text-xs font-semibold text-white rounded-lg" style={{ background: "#4F46E5" }}>
                  ↓ Export PDF
                </button>
              </div>
              <ResumePreview resume={mockResume} tailored={selectedJob?.tailoredResume} />
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
              Select a resume to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityTrackerPage() {
  const stats = [
    { label: "Posts Published", value: 8, icon: "📝", color: "#0A66C2", bg: "#EFF6FF" },
    { label: "Skills Endorsed", value: 24, icon: "⚡", color: "#F59E0B", bg: "#FFFBEB" },
    { label: "Applications", value: 7, icon: "📨", color: "#10B981", bg: "#F0FDF4" },
    { label: "Profile Updates", value: 12, icon: "✏️", color: "#6366F1", bg: "#EEF2FF" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Monitoring Active</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Tracker</h1>
        <p className="text-sm text-gray-500 mt-0.5">Professional signals powering your live resume</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3" style={{ background: s.bg }}>
              {s.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div>
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {activityFeed.map((item, i) => (
            <div key={item.id} className="flex gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: item.color + "15" }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{item.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#EEF2FF", color: "#4F46E5" }}>
                    ✦ {item.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const [connected, setConnected] = useState({ linkedin: true, indeed: false, handshake: true });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your integrations and preferences</p>
      </div>

      {/* Connected Accounts */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Connected Accounts</h2>
          <p className="text-xs text-gray-500 mt-0.5">Sync your profiles to keep your live resume updated</p>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { key: "linkedin", name: "LinkedIn", icon: "in", color: "#0A66C2", desc: "Posts, skills, experience" },
            { key: "indeed", name: "Indeed", icon: "in", color: "#2164F3", desc: "Job applications, saved jobs" },
            { key: "handshake", name: "Handshake", icon: "🤝", color: "#E91680", desc: "Campus recruiting, applications" },
          ].map(acc => (
            <div key={acc.key} className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: acc.color }}>
                  {acc.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{acc.name}</div>
                  <div className="text-xs text-gray-400">{acc.desc}</div>
                </div>
              </div>
              <button
                onClick={() => setConnected(c => ({ ...c, [acc.key]: !c[acc.key] }))}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${connected[acc.key] ? "bg-emerald-100 text-emerald-700 hover:bg-red-100 hover:text-red-600" : "text-white"}`}
                style={!connected[acc.key] ? { background: acc.color } : {}}
              >
                {connected[acc.key] ? "Connected ✓" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Resume Preferences</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { label: "Auto-sync live resume", desc: "Update automatically when activity is detected", on: true },
            { label: "ATS optimization", desc: "Always optimize keywords for applicant tracking systems", on: true },
            { label: "Email notifications", desc: "Notify me when my resume is updated", on: false },
          ].map((pref, i) => (
            <div key={i} className="px-5 py-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 text-sm">{pref.label}</div>
                <div className="text-xs text-gray-400">{pref.desc}</div>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${pref.on ? "bg-indigo-500" : "bg-gray-200"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow mt-0.5 transition-all ${pref.on ? "ml-5" : "ml-0.5"}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Score Color Helper ───────────────────────────────────────────────────────

function scoreColor(score) {
  if (score >= 90) return { text: "#059669", bg: "#D1FAE5" };
  if (score >= 75) return { text: "#D97706", bg: "#FEF3C7" };
  return { text: "#DC2626", bg: "#FEE2E2" };
}

// ── Diff Helpers ─────────────────────────────────────────────────────────────

function computeSimpleDiff(oldLines, newLines) {
  const diff = [];
  const maxLen = Math.max(oldLines.length, newLines.length);
  let oi = 0, ni = 0;
  while (oi < oldLines.length || ni < newLines.length) {
    if (oi < oldLines.length && ni < newLines.length) {
      if (oldLines[oi] === newLines[ni]) {
        diff.push({ type: "same", text: oldLines[oi] });
        oi++; ni++;
      } else {
        diff.push({ type: "removed", text: oldLines[oi] });
        diff.push({ type: "added", text: newLines[ni] });
        oi++; ni++;
      }
    } else if (oi < oldLines.length) {
      diff.push({ type: "removed", text: oldLines[oi] });
      oi++;
    } else {
      diff.push({ type: "added", text: newLines[ni] });
      ni++;
    }
  }
  return diff;
}

function resumeToText(resume) {
  let lines = [];
  lines.push(resume.name);
  lines.push(resume.title);
  lines.push(`${resume.email} | ${resume.phone} | ${resume.location}`);
  lines.push("");
  lines.push("SUMMARY");
  lines.push(resume.summary);
  lines.push("");
  lines.push("SKILLS");
  Object.entries(resume.skills).forEach(([cat, items]) => {
    lines.push(`${cat}: ${items.join(", ")}`);
  });
  lines.push("");
  lines.push("EXPERIENCE");
  resume.experience.forEach(exp => {
    lines.push(`${exp.title} — ${exp.company} (${exp.period})`);
    lines.push(exp.location);
    exp.bullets.forEach(b => lines.push(`• ${b}`));
    lines.push("");
  });
  lines.push("PROJECTS");
  resume.projects.forEach(proj => {
    lines.push(`${proj.name} — ${proj.stack} (${proj.period})`);
    proj.bullets.forEach(b => lines.push(`• ${b}`));
    lines.push("");
  });
  lines.push("EDUCATION");
  resume.education.forEach(edu => {
    lines.push(`${edu.degree} — ${edu.school} (${edu.period})`);
    lines.push(`${edu.honors} · GPA: ${edu.gpa}`);
  });
  return lines;
}

// Mock AI resume generator – simulates changes based on prompt
function generateMockChanges(resume, prompt) {
  const lowerPrompt = prompt.toLowerCase();
  const updated = JSON.parse(JSON.stringify(resume));

  if (lowerPrompt.includes("leadership") || lowerPrompt.includes("lead")) {
    updated.title = "Senior Software Engineer & Technical Lead";
    updated.summary = "Seasoned technical leader and full-stack engineer with 3+ years spearheading high-impact projects. Expert at mentoring teams, driving cross-functional alignment, and delivering scalable systems. Proven ability to lead from ideation through production at elite tech companies.";
    updated.experience[0].bullets[2] = "Mentored 4 junior engineers, led weekly architecture reviews, and drove team OKR attainment of 115%";
    updated.experience[0].bullets[0] = "Led a 5-person squad to architect and ship a real-time payment analytics dashboard serving 10,000+ merchants, reducing support tickets by 34%";
  } else if (lowerPrompt.includes("concise") || lowerPrompt.includes("shorter") || lowerPrompt.includes("shorten")) {
    updated.summary = "Full-stack engineer with 3+ years building scalable web apps at Stripe and Figma. Strong CS fundamentals with expertise in distributed systems and developer tooling.";
    updated.experience[0].bullets = updated.experience[0].bullets.slice(0, 3);
    updated.experience[1].bullets = updated.experience[1].bullets.slice(0, 2);
    updated.projects = [updated.projects[0]];
  } else if (lowerPrompt.includes("keyword") || lowerPrompt.includes("technical") || lowerPrompt.includes("ats")) {
    updated.skills.Languages = ["Python", "TypeScript", "JavaScript", "Go", "SQL", "Java", "C++"];
    updated.skills.Infrastructure = ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Terraform", "CI/CD"];
    updated.summary = "Full-stack software engineer with 3+ years of experience in Python, TypeScript, Go, and cloud-native architectures (AWS, Kubernetes, Docker). Specialized in building scalable distributed systems, real-time data pipelines, and developer tooling. Proven track record delivering high-impact features at Stripe and Figma.";
  } else if (lowerPrompt.includes("quantif") || lowerPrompt.includes("metric") || lowerPrompt.includes("number")) {
    updated.experience[0].bullets[0] = "Architected and shipped a real-time payment analytics dashboard serving 10,000+ merchants, reducing support tickets by 34% and saving $2.1M annually";
    updated.experience[0].bullets[1] = "Led migration of legacy Ruby monolith to 12 microservices, cutting p99 latency from 800ms to 120ms (85% improvement)";
    updated.experience[0].bullets[3] = "Built an internal CLI tool adopted by 80% of the 200-person engineering org, reducing dev environment setup time from 45min to 3min";
    updated.experience[1].bullets[0] = "Implemented a new comment threading system used by 4M+ daily active users, increasing engagement by 18%";
  } else {
    updated.summary = "Versatile full-stack software engineer with 3+ years building scalable, production-grade web applications. Passionate about developer tooling, distributed systems, and creating seamless user experiences. Strong communicator who thrives in fast-paced, collaborative environments.";
    updated.experience[0].bullets[0] = "Architected and shipped a real-time payment analytics dashboard serving 10,000+ merchants globally, reducing support tickets by 34%";
    updated.title = "Full-Stack Software Engineer";
  }
  return updated;
}

// ── DiffViewer Component ─────────────────────────────────────────────────────

function DiffViewer({ oldResume, newResume, onAccept, onReject }) {
  const oldLines = resumeToText(oldResume);
  const newLines = resumeToText(newResume);
  const diff = computeSimpleDiff(oldLines, newLines);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden" style={{ maxHeight: "60vh" }}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          <span className="text-sm font-bold text-gray-800">AI Changes — Review Diff</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
            +{diff.filter(d => d.type === "added").length} added
          </span>
          <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
            -{diff.filter(d => d.type === "removed").length} removed
          </span>
        </div>
      </div>

      {/* Diff body */}
      <div className="overflow-y-auto font-mono text-xs" style={{ maxHeight: "calc(60vh - 100px)" }}>
        {diff.map((line, i) => (
          <div
            key={i}
            className="flex"
            style={{
              background: line.type === "added" ? "#dcfce7" : line.type === "removed" ? "#fee2e2" : "transparent",
              borderLeft: line.type === "added" ? "3px solid #22c55e" : line.type === "removed" ? "3px solid #ef4444" : "3px solid transparent",
            }}
          >
            <span
              className="px-2 py-0.5 text-gray-400 select-none flex-shrink-0 text-right"
              style={{ width: "36px", background: line.type === "added" ? "#bbf7d0" : line.type === "removed" ? "#fecaca" : "#f9fafb" }}
            >
              {line.type === "added" ? "+" : line.type === "removed" ? "-" : i + 1}
            </span>
            <span
              className={`px-3 py-0.5 flex-1 whitespace-pre-wrap break-all ${
                line.type === "added" ? "text-green-800" : line.type === "removed" ? "text-red-800 line-through" : "text-gray-700"
              }`}
            >
              {line.text || "\u00A0"}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-2">
        <button
          onClick={onReject}
          className="px-4 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
        >
          ✕ Reject Changes
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 text-xs font-semibold text-white rounded-lg transition-all hover:opacity-90"
          style={{ background: "#22c55e" }}
        >
          ✓ Accept Changes
        </button>
      </div>
    </div>
  );
}

// ── ChatPanel Component ──────────────────────────────────────────────────────

function ChatPanel({ isOpen, onClose, onSendMessage, messages, isProcessing }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "Emphasize leadership experience",
    "Add more technical keywords for ATS",
    "Make the summary more concise",
    "Quantify achievements with metrics",
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-0 right-0 z-40 flex flex-col bg-white border border-gray-200 rounded-t-2xl shadow-2xl"
      style={{
        width: "420px",
        maxWidth: "100vw",
        height: "520px",
        maxHeight: "80vh",
        animation: "slideUp 0.3s ease-out",
      }}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ background: "linear-gradient(135deg,#6366F1,#4338CA)" }}
          >
            ✦
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">AI Resume Assistant</p>
            <p className="text-xs text-gray-400">Describe changes you want to make</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 text-lg leading-none transition-colors"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl" style={{ background: "#EEF2FF" }}>
              ✦
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">How would you like to improve your resume?</p>
            <p className="text-xs text-gray-400 mb-4">Choose a suggestion or type your own</p>
            <div className="space-y-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); }}
                  className="w-full text-left text-xs px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl rounded-bl-sm text-sm flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
              Analyzing your resume...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe resume changes..."
            rows={1}
            className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-none text-gray-700 placeholder-gray-400 transition-all"
            style={{ maxHeight: "80px" }}
          />
          <button
            onClick={handleSend}
            disabled={isProcessing || !input.trim()}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-white transition-all disabled:opacity-40 flex-shrink-0 hover:opacity-90 active:scale-95"
            style={{ background: "#4F46E5" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}

// ── Modals ───────────────────────────────────────────────────────────────────

function Modal({ title, subtitle, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 text-lg leading-none">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function AIPromptModal({ onClose, activeLabel }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const suggestions = [
    "Emphasize leadership experience",
    "Match this resume more closely to the job description",
    "Add more technical keywords",
    "Make the summary more concise",
    "Quantify achievements with metrics",
    "Shorten to one page",
  ];
  const run = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1800);
  };
  return (
    <Modal title="AI Resume Editor" subtitle={`Editing: ${activeLabel}`} onClose={onClose}>
      <div className="space-y-3">
        {!done ? (
          <>
            <p className="text-xs text-gray-500">Choose a suggestion or write your own instruction</p>
            <div className="grid grid-cols-2 gap-1.5">
              {suggestions.map(s => (
                <button key={s} onClick={() => setPrompt(s)}
                  className={`text-left text-xs px-3 py-2 rounded-xl border transition-all leading-snug ${prompt === s ? "border-indigo-300 bg-indigo-50 text-indigo-700 font-medium" : "border-gray-100 bg-gray-50 text-gray-500 hover:border-indigo-200 hover:text-indigo-600"}`}>
                  {s}
                </button>
              ))}
            </div>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Or type a custom instruction…" rows={3}
              className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 resize-none text-gray-700 placeholder-gray-400" style={{ "--tw-ring-color": "#A5B4FC" }} />
            <button onClick={run} disabled={loading || !prompt.trim()}
              className="w-full py-3 text-sm font-semibold text-white rounded-xl disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: "#4F46E5" }}>
              {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Generating…</> : <>✦ Apply to Resume</>}
            </button>
          </>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-2xl" style={{ background: "#EEF2FF" }}>✦</div>
            <p className="font-semibold text-gray-900">Resume Updated</p>
            <p className="text-xs text-gray-400">Your changes have been applied successfully.</p>
            <button onClick={onClose} className="px-6 py-2 text-sm font-semibold text-white rounded-xl" style={{ background: "#4F46E5" }}>Done</button>
          </div>
        )}
      </div>
    </Modal>
  );
}

function AddJobModal({ onClose }) {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const run = () => {
    if (!jd.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1800);
  };
  return (
    <Modal title="Add Job Description" subtitle="Paste a job posting to generate a tailored resume variant" onClose={onClose}>
      {!done ? (
        <div className="space-y-4">
          <textarea value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste the full job description here…" rows={9}
            className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 resize-none text-gray-700 placeholder-gray-400" />
          <button onClick={run} disabled={loading || !jd.trim()}
            className="w-full py-3 text-sm font-semibold text-white rounded-xl disabled:opacity-40 flex items-center justify-center gap-2"
            style={{ background: "#4F46E5" }}>
            {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Generating resume variant…</> : <>✦ Generate Resume Variant</>}
          </button>
        </div>
      ) : (
        <div className="text-center py-6 space-y-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-2xl" style={{ background: "#F0FDF4" }}>✓</div>
          <p className="font-semibold text-gray-900">Resume Variant Created</p>
          <p className="text-xs text-gray-400">A tailored resume has been added to your sidebar.</p>
          <button onClick={onClose} className="px-6 py-2 text-sm font-semibold text-white rounded-xl" style={{ background: "#4F46E5" }}>Done</button>
        </div>
      )}
    </Modal>
  );
}

function ConnectModal({ onClose }) {
  const [platforms, setPlatforms] = useState({ LinkedIn: true, Indeed: false, Handshake: true, GitHub: false });
  const colors = { LinkedIn: "#0A66C2", Indeed: "#2164F3", Handshake: "#E91680", GitHub: "#24292E" };
  const icons = { LinkedIn: "in", Indeed: "In", Handshake: "🤝", GitHub: "⌥" };
  const toggle = k => setPlatforms(p => ({ ...p, [k]: !p[k] }));
  return (
    <Modal title="Connect Platforms" subtitle="Toggle platforms to sync activity with your ReadyMe resume" onClose={onClose}>
      <div className="space-y-3">
        {Object.entries(platforms).map(([name, on]) => (
          <div key={name} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: colors[name] }}>{icons[name]}</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{name}</p>
                <p className="text-xs text-gray-400">{on ? "Connected · syncing activity" : "Not connected"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {on && <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>}
              <button onClick={() => toggle(name)}
                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0`}
                style={{ background: on ? "#4F46E5" : "#D1D5DB" }}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all`}
                  style={{ left: on ? "calc(100% - 20px)" : "4px" }} />
              </button>
            </div>
          </div>
        ))}
        <p className="text-xs text-gray-400 pt-1">Connected platforms automatically update your ReadyMe resume based on posts, skills, and job applications.</p>
      </div>
    </Modal>
  );
}

function APIModal({ onClose }) {
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <Modal title="Custom AI API" subtitle="Use your own AI key to power resume critiques and customization" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1.5">AI Model</label>
          <select value={model} onChange={e => setModel(e.target.value)}
            className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 text-gray-700">
            <option value="gpt-4o">OpenAI — GPT-4o</option>
            <option value="gpt-4-turbo">OpenAI — GPT-4 Turbo</option>
            <option value="claude-3-5-sonnet">Anthropic — Claude 3.5 Sonnet</option>
            <option value="claude-3-opus">Anthropic — Claude 3 Opus</option>
            <option value="gemini-1.5-pro">Google — Gemini 1.5 Pro</option>
            <option value="custom">Custom endpoint</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1.5">API Key</label>
          <input value={apiKey} onChange={e => setApiKey(e.target.value)} type="password" placeholder="sk-••••••••••••••••••••"
            className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-700 placeholder-gray-400 font-mono" />
        </div>
        {model === "custom" && (
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Endpoint URL</label>
            <input value={endpoint} onChange={e => setEndpoint(e.target.value)} placeholder="https://api.yourmodel.com/v1/chat"
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-700 placeholder-gray-400 font-mono" />
          </div>
        )}
        <div className="p-3 rounded-xl text-xs text-amber-700 bg-amber-50 border border-amber-100">
          Your API key is stored locally and never sent to ReadyMe servers.
        </div>
        <button onClick={save} className="w-full py-2.5 text-sm font-semibold text-white rounded-xl flex items-center justify-center gap-2" style={{ background: "#4F46E5" }}>
          {saved ? "✓ Saved!" : "Save API Configuration"}
        </button>
      </div>
    </Modal>
  );
}

function SettingsModal({ onClose }) {
  const [prefs, setPrefs] = useState({ autoSync: true, atsOptimize: true, emailNotifs: false, darkMode: false });
  const toggle = k => setPrefs(p => ({ ...p, [k]: !p[k] }));
  const items = [
    { key: "autoSync", label: "Auto-sync ReadyMe", desc: "Update when activity is detected" },
    { key: "atsOptimize", label: "ATS Optimization", desc: "Always optimize keywords for ATS scanners" },
    { key: "emailNotifs", label: "Email Notifications", desc: "Notify me when my resume is updated" },
    { key: "darkMode", label: "Dark Mode", desc: "Switch to dark interface theme" },
  ];
  return (
    <Modal title="Settings" subtitle="Manage preferences and account" onClose={onClose}>
      <div className="space-y-1">
        {items.map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div>
              <p className="text-sm font-medium text-gray-900">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            <button onClick={() => toggle(key)}
              className="w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ml-4"
              style={{ background: prefs[key] ? "#4F46E5" : "#D1D5DB" }}>
              <div className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
                style={{ left: prefs[key] ? "calc(100% - 20px)" : "4px" }} />
            </button>
          </div>
        ))}
        <div className="pt-4 space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "#4F46E5" }}>AC</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Alex Chen</p>
              <p className="text-xs text-gray-400">alex.chen@email.com</p>
            </div>
            <button className="ml-auto text-xs text-red-400 hover:text-red-600 transition-colors">Sign out</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function ExportModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const copyLink = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <Modal title="Export Resume" subtitle="Download or share your resume" onClose={onClose}>
      <div className="space-y-3">
        {[
          { icon: "📄", label: "Download PDF", desc: "ATS-optimized, print-ready PDF", color: "#EEF2FF", text: "#4F46E5" },
          { icon: "📝", label: "Download DOCX", desc: "Editable Microsoft Word document", color: "#EFF6FF", text: "#2563EB" },
        ].map(opt => (
          <button key={opt.label} className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-left">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: opt.color }}>{opt.icon}</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
              <p className="text-xs text-gray-400">{opt.desc}</p>
            </div>
            <span className="ml-auto text-xs font-medium px-2 py-1 rounded-lg" style={{ background: opt.color, color: opt.text }}>Export</span>
          </button>
        ))}
        <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
          <p className="text-xs font-semibold text-gray-700 mb-2">Share Link</p>
          <div className="flex gap-2">
            <input readOnly value="https://readyme.app/r/alex-chen-live" className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-500 font-mono" />
            <button onClick={copyLink} className="px-3 py-2 text-xs font-semibold rounded-lg text-white transition-all" style={{ background: copied ? "#059669" : "#4F46E5" }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ── App Shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("live");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [jobs, setJobs] = useState(pinnedJobs);
  // Modal state
  const [modal, setModal] = useState(null); // "ai" | "addjob" | "connect" | "api" | "settings" | "export"
  const [aiDone, setAiDone] = useState(false);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Diff state
  const [showDiff, setShowDiff] = useState(false);
  const [currentResume, setCurrentResume] = useState(mockResume);
  const [pendingResume, setPendingResume] = useState(null);

  const handleChatMessage = (text) => {
    setChatMessages(prev => [...prev, { role: "user", text }]);
    setIsProcessing(true);

    setTimeout(() => {
      const newResume = generateMockChanges(currentResume, text);
      setPendingResume(newResume);
      setShowDiff(true);
      setIsProcessing(false);
      setChatMessages(prev => [
        ...prev,
        {
          role: "assistant",
          text: `I've prepared changes based on your request: "${text}". Please review the diff above the resume to accept or reject the changes.`,
        },
      ]);
    }, 2000);
  };

  const handleAcceptDiff = () => {
    if (pendingResume) {
      setCurrentResume(pendingResume);
      setPendingResume(null);
      setShowDiff(false);
      setAiDone(true);
      setChatMessages(prev => [
        ...prev,
        { role: "assistant", text: "✓ Changes have been applied to your resume!" },
      ]);
      setTimeout(() => setAiDone(false), 3000);
    }
  };

  const handleRejectDiff = () => {
    setPendingResume(null);
    setShowDiff(false);
    setChatMessages(prev => [
      ...prev,
      { role: "assistant", text: "Changes have been discarded. Let me know if you'd like to try something different." },
    ]);
  };

  const openModal = (m) => setModal(m);
  const closeModal = () => setModal(null);

  const navigate = (id) => { setActive(id); setMobileOpen(false); };

  const activeJob = jobs.find(j => j.id === active);
  const activeLabel = active === "live" ? "ReadyMe" : activeJob?.label || "Resume";
  const isLegacyPage = ["library", "activity", "settings-page"].includes(active);

  // ── Sidebar Job Card ────────────────────────────────────────────────────────
  const JobCard = ({ job }) => {
    const isActive = active === job.id;
    const sc = scoreColor(job.score);
    const platformColors = { LinkedIn: "#0A66C2", Indeed: "#2164F3", Handshake: "#E91680" };
    const pColor = platformColors[job.platform] || "#6366F1";
    return (
      <button onClick={() => navigate(job.id)}
        className={`w-full text-left rounded-xl border p-3 transition-all mb-2 ${isActive ? "shadow-md" : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"}`}
        style={isActive ? { background: "#EEF2FF", borderColor: "#A5B4FC" } : {}}>
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0 flex-1">
            <p className={`text-xs font-semibold truncate ${isActive ? "text-indigo-800" : "text-gray-800"}`}>{job.title}</p>
            <p className={`text-xs truncate mt-0.5 ${isActive ? "text-indigo-500" : "text-gray-400"}`}>{job.company}</p>
          </div>
          <span className="text-xs font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ml-1"
            style={{ background: sc.bg, color: sc.text }}>{job.score}%</span>
        </div>
        <span className="mt-2 inline-block text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: pColor + "15", color: pColor }}>{job.platform}</span>
      </button>
    );
  };

  // ── Sidebar ─────────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <nav className="h-full flex flex-col border-r border-gray-100 py-5 px-3 overflow-y-auto" style={{ background: "#FAFAFA" }}>
      {/* Brand */}
      <div className="px-1 mb-5">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#6366F1,#4338CA)" }}>R</div>
          <span className="font-extrabold text-gray-900 tracking-tight">ReadyMe</span>
        </div>
        <p className="text-xs text-gray-400 pl-10 leading-tight">The On-Demand Resume</p>
      </div>

      {/* Live Resume card */}
      <div className="mb-5">
        <button onClick={() => navigate("live")}
          className={`w-full text-left px-3 py-3 rounded-xl border transition-all ${active === "live" ? "shadow-md" : "bg-white border-gray-200 hover:border-indigo-200 hover:shadow-sm"}`}
          style={active === "live" ? { background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)", borderColor: "#A5B4FC" } : {}}>
          <div className="flex items-center gap-2.5">
            <span className="text-base">⚡</span>
            <div className="min-w-0 flex-1">
              <p className={`text-xs font-bold truncate ${active === "live" ? "text-indigo-800" : "text-gray-800"}`}>ReadyMe</p>
              <p className={`text-xs ${active === "live" ? "text-indigo-500" : "text-gray-400"}`}>ReadyMe · Master ATS</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" style={{ boxShadow: "0 0 0 3px #D1FAE5" }} />
          </div>
        </button>
      </div>

      {/* Pinned Jobs */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between px-1 mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pinned Jobs</p>
          <span className="text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full font-medium">{jobs.length}</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {jobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      </div>

      {/* Add Job */}
      <div className="pt-3">
        <button onClick={() => openModal("addjob")}
          className="w-full py-2.5 rounded-xl text-xs font-semibold border-2 border-dashed border-indigo-200 text-indigo-500 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-all flex items-center justify-center gap-1.5">
          <span className="text-sm font-bold">+</span> Add Job
        </button>
      </div>

      {/* Bottom utility links */}
      <div className="space-y-0.5 pt-3 mt-2 border-t border-gray-100">
        {[{ id: "library", icon: "🗂️", label: "Resume Library" }, { id: "activity", icon: "📊", label: "Activity" }].map(({ id, icon, label }) => (
          <button key={id} onClick={() => navigate(id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${active === id ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}`}>
            <span>{icon}</span><span>{label}</span>
          </button>
        ))}
      </div>

      {/* User */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 px-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0" style={{ background: "#4F46E5" }}>AC</div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate">Alex Chen</p>
            <p className="text-xs text-gray-400 truncate">alex.chen@email.com</p>
          </div>
        </div>
      </div>
    </nav>
  );

  // ── Resume Workspace ────────────────────────────────────────────────────────
  const ResumeWorkspace = () => {
    const pColors = { LinkedIn: "#0A66C2", Indeed: "#2164F3", Handshake: "#E91680" };
    const pColor = activeJob ? (pColors[activeJob.platform] || "#6366F1") : null;
    const sc = activeJob ? scoreColor(activeJob.score) : null;

    return (
      <div className="flex flex-col h-full min-h-0">
        {/* Workspace top bar */}
        <div className="px-6 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="min-w-0">
            {active === "live" ? (
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Live</span>
                </span>
                <h1 className="text-base font-extrabold text-gray-900">ReadyMe — The On-Demand Resume</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#D1FAE5", color: "#059669" }}>ATS 98</span>
              </div>
            ) : activeJob ? (
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base font-extrabold text-gray-900">{activeJob.title}</h1>
                <span className="text-gray-300 text-sm">·</span>
                <span className="text-sm font-semibold text-gray-600">{activeJob.company}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                  style={{ background: pColor + "12", color: pColor, borderColor: pColor + "30" }}>{activeJob.platform}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
                  style={{ background: sc.bg, color: sc.text }}>{activeJob.score}% match</span>
              </div>
            ) : null}
          </div>
          <button onClick={() => openModal("export")}
            className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex-shrink-0 ml-3">
            ↓ Export
          </button>
        </div>

        {/* ATS banner (live) */}
        {active === "live" && (
          <div className="mx-5 mt-3 mb-1 p-3 rounded-xl border flex items-center gap-3 flex-shrink-0" style={{ background: "#F0FDF4", borderColor: "#BBF7D0" }}>
            <div className="text-center flex-shrink-0">
              <div className="text-xl font-extrabold text-emerald-600">98</div>
              <div className="text-xs text-emerald-600">ATS</div>
            </div>
            <div className="h-6 w-px bg-emerald-200 flex-shrink-0" />
            <div className="grid grid-cols-3 gap-2 text-xs flex-1">
              {[["Keywords", "✓ Excellent"], ["Formatting", "✓ ATS-Ready"], ["Completeness", "✓ 100%"]].map(([k, v]) => (
                <div key={k}><span className="font-semibold text-gray-700">{k}</span><div className="text-emerald-600 font-medium">{v}</div></div>
              ))}
            </div>
          </div>
        )}

        {/* Job description strip */}
        {activeJob && (
          <div className="mx-5 mt-3 mb-1 p-3 rounded-xl border bg-white flex-shrink-0 border-gray-100">
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{activeJob.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {activeJob.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{t}</span>)}
            </div>
          </div>
        )}

        {/* Resume scroll */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {aiDone && (
            <div className="mb-3 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2" style={{ background: "#EEF2FF", color: "#4F46E5" }}>
              ✦ Resume updated successfully
            </div>
          )}

          {/* GitHub-style Diff Viewer */}
          {showDiff && pendingResume && (
            <div className="mb-4">
              <DiffViewer
                oldResume={currentResume}
                newResume={pendingResume}
                onAccept={handleAcceptDiff}
                onReject={handleRejectDiff}
              />
            </div>
          )}

          <ResumePreview resume={currentResume} tailored={activeJob?.tailoredResume} />
        </div>
      </div>
    );
  };

  // ── Right Panel ──────────────────────────────────────────────────────────────
  const RightPanel = () => (
    <div className="hidden xl:flex flex-col flex-shrink-0 overflow-y-auto py-5 px-4 border-l border-gray-100" style={{ width: "210px", background: "#FAFAFA" }}>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Version History</p>
      <div className="space-y-2 mb-6">
        {[["Initial generation", "2h ago"], ["Leadership keywords", "1h ago"], ["ATS optimized", "30m ago"]].map(([l, t], i, arr) => (
          <div key={i} className={`flex items-start gap-2 text-xs cursor-pointer hover:text-indigo-600 transition-colors ${i === arr.length - 1 ? "text-indigo-600 font-semibold" : "text-gray-400"}`}>
            <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === arr.length - 1 ? "bg-indigo-500" : "bg-gray-300"}`} />
            <div><div>{l}</div><div className="text-gray-300">{t}</div></div>
          </div>
        ))}
      </div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quick Prompts</p>
      <div className="space-y-1.5 mb-6">
        {["Emphasize leadership", "Add tech keywords", "Match job description", "One page", "Quantify results"].map(p => (
          <button key={p} onClick={() => openModal("ai")}
            className="w-full text-left text-xs px-3 py-2 rounded-lg border border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50 text-gray-500 hover:text-indigo-700 transition-all">
            {p}
          </button>
        ))}
      </div>
      <div className="p-3 rounded-xl" style={{ background: "#EEF2FF" }}>
        <p className="text-xs font-semibold text-indigo-800 mb-1">✦ Tip</p>
        <p className="text-xs text-indigo-600 leading-relaxed">Tailored resumes get 3× more callbacks than generic ones.</p>
      </div>
    </div>
  );

  // ── Bottom Action Bar ────────────────────────────────────────────────────────
  const BottomBar = () => {
    const actions = [
      { id: "chat", icon: "💬", label: "AI Chat", desc: "Edit with AI", color: "#4F46E5", bg: "#EEF2FF", isChat: true },
      { id: "addjob", icon: "＋", label: "Add Job", desc: "Generate variant", color: "#0891B2", bg: "#ECFEFF" },
      { id: "connect", icon: "⇄", label: "Connect", desc: "LinkedIn · Indeed · Handshake", color: "#0A66C2", bg: "#EFF6FF" },
      { id: "api", icon: "⌘", label: "AI API", desc: "Custom API key", color: "#7C3AED", bg: "#F5F3FF" },
      { id: "settings", icon: "⚙", label: "Settings", desc: "Preferences", color: "#374151", bg: "#F9FAFB" },
      { id: "export", icon: "↓", label: "Export", desc: "PDF · DOCX · Link", color: "#059669", bg: "#F0FDF4" },
    ];

    return (
      <div className="flex-shrink-0 border-t border-gray-200 bg-white px-4 py-2" style={{ boxShadow: "0 -1px 12px rgba(0,0,0,0.05)" }}>
        <div className="flex items-center gap-1.5 justify-between max-w-4xl mx-auto">
          {actions.map(a => (
            <button
              key={a.id}
              onClick={() => a.isChat ? setChatOpen(o => !o) : openModal(a.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-all group min-w-0 ${
                a.isChat && chatOpen ? "bg-indigo-50" : "hover:bg-gray-50"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-base font-bold transition-all group-hover:scale-110 ${
                  a.isChat && chatOpen ? "ring-2 ring-indigo-400 ring-offset-1" : ""
                }`}
                style={{ background: a.bg, color: a.color }}
              >
                {a.icon}
              </span>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 truncate w-full text-center">{a.label}</span>
              <span className="text-xs text-gray-400 hidden sm:block truncate w-full text-center leading-none">{a.desc}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'system-ui', -apple-system, sans-serif", background: "#F3F4F6" }}>
      {/* Modals */}
      {modal === "ai" && <AIPromptModal onClose={closeModal} activeLabel={activeLabel} />}
      {modal === "addjob" && <AddJobModal onClose={closeModal} />}
      {modal === "connect" && <ConnectModal onClose={closeModal} />}
      {modal === "api" && <APIModal onClose={closeModal} />}
      {modal === "settings" && <SettingsModal onClose={closeModal} />}
      {modal === "export" && <ExportModal onClose={closeModal} />}

      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* LEFT SIDEBAR */}
      <div className="hidden lg:flex flex-shrink-0 flex-col h-full" style={{ width: "256px" }}>
        <Sidebar />
      </div>
      {/* Mobile sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 flex flex-col lg:hidden transition-transform duration-200"
        style={{ width: "256px", transform: mobileOpen ? "translateX(0)" : "translateX(-100%)" }}>
        <Sidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center px-4 py-3 bg-white border-b border-gray-100 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-gray-100 mr-3">
            <div className="space-y-1">{[0, 1, 2].map(i => <div key={i} className="w-5 h-0.5 bg-gray-700" />)}</div>
          </button>
          <span className="font-extrabold text-gray-900">ReadyMe</span>
        </div>

        {/* RESUME WORKSPACE */}
        {!isLegacyPage && (
          <div className="flex-1 flex min-h-0 overflow-hidden">
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
              <ResumeWorkspace />
            </div>
            <RightPanel />
          </div>
        )}

        {/* LEGACY PAGES */}
        {isLegacyPage && (
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gray-50">
            {active === "library" && <ResumeLibraryPage />}
            {active === "activity" && <ActivityTrackerPage />}
          </main>
        )}

        {/* BOTTOM ACTION BAR — always visible */}
        <BottomBar />
      </div>

      {/* Chat Panel */}
      <ChatPanel
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onSendMessage={handleChatMessage}
        messages={chatMessages}
        isProcessing={isProcessing}
      />
    </div>
  );
}
