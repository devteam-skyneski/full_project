"use client";
import { cn } from "@/lib/utils";
import { IconDownload, IconChevronDown } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Results() {
  const [selectedSemester, setSelectedSemester] = useState<"Semester 1" | "Semester 2">("Semester 1");

  const reportData = useMemo(() => ({
    "Semester 1": {
      overallGrade: "A-",
      overallRemark: "Great start! Keep up the consistency and practice time management.",
      subjects: [
        { subject: "Mathematics", code: "MATH301", grade: "A", marks: 92 },
        { subject: "English", code: "ENG401", grade: "A-", marks: 88 },
        { subject: "Social Studies", code: "SOC201", grade: "B+", marks: 84 },
        { subject: "Physics", code: "PHY302", grade: "A", marks: 91 },
        { subject: "Chemistry", code: "CHEM302", grade: "B+", marks: 85 },
        { subject: "Biology", code: "BIO201", grade: "A", marks: 93 },
      ],
    },
    "Semester 2": {
      overallGrade: "A",
      overallRemark: "Outstanding progress. Excellent mastery across core subjects.",
      subjects: [
        { subject: "Mathematics", code: "MATH302", grade: "A", marks: 95 },
        { subject: "English", code: "ENG402", grade: "A", marks: 92 },
        { subject: "Social Studies", code: "SOC202", grade: "A-", marks: 90 },
        { subject: "Physics", code: "PHY303", grade: "A", marks: 94 },
        { subject: "Chemistry", code: "CHEM303", grade: "A-", marks: 90 },
        { subject: "Biology", code: "BIO202", grade: "A", marks: 96 },
      ],
    },
  }), []);

  const active = reportData[selectedSemester];

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // simple entrance animation trigger
    const el = cardRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.classList.remove("opacity-0", "translate-y-6");
      el.classList.add("opacity-100", "translate-y-0");
    });
  }, [selectedSemester]);

  const handleDownload = () => {
    // Generate printable HTML and trigger browser print (save as PDF)
    const now = new Date();
    const html = `<!doctype html>
    <html>
      <head>
        <meta charset=\"utf-8\" />
        <title>${selectedSemester} Report</title>
        <style>
          body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; margin: 40px; }
          .header { display: flex; align-items: center; justify-content: space-between; }
          .badge { padding: 6px 10px; border-radius: 9999px; color: #fff; background: linear-gradient(135deg,#3b82f6, #1d4ed8); font-weight: 600; }
          h1 { margin: 8px 0 0; font-size: 24px; }
          h2 { margin: 24px 0 8px; font-size: 18px; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e5e7eb; }
          th { background: #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="badge">${selectedSemester}</div>
            <h1>Academic Performance • Overall Grade: ${active.overallGrade}</h1>
            <div>Generated on ${now.toLocaleString()}</div>
          </div>
        </div>
        <h2>Subject-wise Performance</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Subject Code</th>
              <th>Grade</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            ${active.subjects
              .map(
                (s) => `<tr>
                  <td>${s.subject}</td>
                  <td>${s.code}</td>
                  <td>${s.grade}</td>
                  <td>${s.marks}</td>
                </tr>`
              )
              .join("")}
          </tbody>
        </table>
        <h2>Overall Remark</h2>
        <p>${active.overallRemark}</p>
        <script>window.onload = () => setTimeout(() => window.print(), 150);</script>
      </body>
    </html>`;

    const win = window.open("", "_blank");
    if (win) {
      win.document.open();
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <section id="results" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Results</h2>

        <div className="backdrop-blur-xl bg-white/10 rounded-xl shadow-lg border border-white/30 overflow-hidden">
          {/* Header bar with gradient, congrats and download */}
          <div
            className="relative px-6 py-8 sm:px-8 sm:py-10 border-b border-white/20"
            style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.6) 0%, rgba(29,78,216,0.6) 100%)" }}
          >
            <div className="flex items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 border border-white/30 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                  Congratulations!
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">Academic Performance</p>
                <p className="text-white/90 text-sm">
                  A snapshot of your progress this term with highlights and subject-level details.
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white text-sm font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition"
              >
                <IconDownload className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download Report
              </button>
            </div>
          </div>

          {/* Body */}
          <div ref={cardRef} className="opacity-0 translate-y-6 transition-all duration-500">
            {/* Semester switch + Overall grade */}
            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="inline-flex p-1 rounded-xl bg-white/10 border border-white/20 w-full sm:w-auto">
                  {(["Semester 1", "Semester 2"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSemester(s)}
                      className={cn(
                        "flex-1 sm:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition",
                        s === selectedSemester
                          ? "text-white bg-gradient-to-r from-blue-600 to-blue-700"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="text-white text-sm font-semibold inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20">
                  Overall Grade: <span className="text-white rounded-md px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-700">{active.overallGrade}</span>
                </div>
              </div>
            </div>

            {/* Subject-wise table */}
            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
              <div className="overflow-hidden rounded-xl border border-white/20 bg-white/5">
                <div className="bg-gradient-to-r from-blue-600/30 to-blue-700/30 text-white text-sm font-semibold py-3 px-4 border-b border-white/10">
                  Subject-wise Performance
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-left text-white/90">
                      <tr className="border-b border-white/10">
                        <th className="px-4 py-3 font-semibold">Subject</th>
                        <th className="px-4 py-3 font-semibold">Subject Code</th>
                        <th className="px-4 py-3 font-semibold">Grade</th>
                        <th className="px-4 py-3 font-semibold">Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {active.subjects.map((row, idx) => (
                        <tr
                          key={row.code}
                          className={cn(
                            "text-white/95",
                            idx % 2 === 0 ? "bg-white/0" : "bg-white/5",
                            "hover:bg-white/10 transition-colors"
                          )}
                        >
                          <td className="px-4 py-3">{row.subject}</td>
                          <td className="px-4 py-3">{row.code}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold">
                              {row.grade}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold">{row.marks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Overall Remark */}
            <div className="px-6 pb-8 sm:px-8 sm:pb-10">
              <div className="rounded-xl border border-white/20 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold">Overall Remark</p>
                  <IconChevronDown className="h-4 w-4 text-white/70" />
                </div>
                <p className="text-white/90 mt-2 text-sm">
                  {active.overallRemark}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
