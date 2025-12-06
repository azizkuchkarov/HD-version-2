"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  IT: "IT Support",
  ADMINISTRATION: "Administration",
  TRANSPORT: "Transport",
};

const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

export default function TicketFormPage() {
  const params = useParams();
  const router = useRouter();

  const rawCategory = (params.category as string) || "";
  const categoryParam = rawCategory.toUpperCase(); // IT / ADMINISTRATION / TRANSPORT
  const categoryLabel = CATEGORY_LABELS[categoryParam] ?? "Unknown category";

  // Common fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  >("MEDIUM");

  // IT-specific
  const [itType, setItType] = useState("PC");
  const [itLocation, setItLocation] = useState("");

  // Transport-specific
  const [trFrom, setTrFrom] = useState("");
  const [trTo, setTrTo] = useState("");
  const [trDate, setTrDate] = useState("");
  const [trTime, setTrTime] = useState("");
  const [trPurpose, setTrPurpose] = useState("Office to Bank");

  // Administration-specific
  const [admItem, setAdmItem] = useState("Water");
  const [admQty, setAdmQty] = useState("");
  const [admLocation, setAdmLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusError(null);

    try {
      const storedEmail =
        typeof window !== "undefined" ? localStorage.getItem("hd_email") : null;

      let finalTitle = title;
      let finalDescription = description || "";

      if (categoryParam === "IT") {
        finalDescription =
          `Category: IT\n` +
          `Priority: ${PRIORITY_LABELS[priority]} (${priority})\n` +
          `Issue type: ${itType}\n` +
          `Location: ${itLocation || "-"}\n\n` +
          `Details:\n${description}`;
      } else if (categoryParam === "TRANSPORT") {
        finalTitle =
          title || `Driver request: ${trFrom || "From?"} → ${trTo || "To?"}`;
        finalDescription =
          `Category: Transport\n` +
          `Priority: ${PRIORITY_LABELS[priority]} (${priority})\n` +
          `From: ${trFrom}\n` +
          `To: ${trTo}\n` +
          `Date: ${trDate}\n` +
          `Time: ${trTime}\n` +
          `Purpose: ${trPurpose}\n\n` +
          `Details:\n${description}`;
      } else if (categoryParam === "ADMINISTRATION") {
        finalDescription =
          `Category: Administration\n` +
          `Priority: ${PRIORITY_LABELS[priority]} (${priority})\n` +
          `Item: ${admItem}\n` +
          `Quantity: ${admQty || "-"}\n` +
          `Location: ${admLocation || "-"}\n\n` +
          `Details:\n${description}`;
      }

      // Extra validation
      if (categoryParam === "TRANSPORT") {
        if (!trFrom || !trTo || !trDate || !trTime) {
          throw new Error(
            "Please fill From, To, Date and Time for transport requests."
          );
        }
      }

      if (categoryParam === "ADMINISTRATION") {
        if (!admQty) {
          throw new Error("Please enter quantity for administration request.");
        }
      }

      const response = await fetch("http://127.0.0.1:8000/tickets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: finalTitle,
          description: finalDescription,
          category: categoryParam, // "IT" | "ADMINISTRATION" | "TRANSPORT"
          requester_email: storedEmail,
          priority,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.detail || "Failed to create ticket");
      }

      const data = await response.json();

      // Reset fields
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setItLocation("");
      setTrFrom("");
      setTrTo("");
      setTrDate("");
      setTrTime("");
      setAdmQty("");
      setAdmLocation("");

      // Show toast + redirect to dashboard
      setToastMessage(`Ticket #${data.id} created successfully`);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        router.push("/dashboard"); // back to user dashboard
      }, 1200);
    } catch (error: any) {
      setStatusError(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <>
      {/* Toast */}
      {showToast && toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-emerald-500 text-white text-sm px-4 py-2 shadow-lg">
          {toastMessage}
        </div>
      )}

      <div className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <button
            onClick={handleBack}
            className="text-xs text-slate-500 mb-4 hover:text-slate-700"
          >
            ← Back to dashboard
          </button>

          <h1 className="text-xl font-semibold text-slate-900 mb-1">
            New {categoryLabel} request
          </h1>
          <p className="text-sm text-slate-500 mb-3">
            Please fill the form below for{" "}
            {categoryLabel === "Unknown category"
              ? "selected category"
              : categoryLabel.toLowerCase()}
            .
          </p>

          <div className="mb-4 text-xs text-slate-500 flex flex-wrap gap-3">
            <span>
              <span className="font-medium">Category:</span>{" "}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300">
                {categoryLabel}
              </span>
            </span>
            <span>
              <span className="font-medium">Priority:</span>{" "}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300">
                {PRIORITY_LABELS[priority]}
              </span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Priority */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">
                Priority
              </label>
              <select
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
                  )
                }
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder={
                  categoryParam === "TRANSPORT"
                    ? "Example: Driver from office to bank"
                    : "Short summary of your request"
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* IT-specific */}
            {categoryParam === "IT" && (
              <>
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    Problem type
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    value={itType}
                    onChange={(e) => setItType(e.target.value)}
                  >
                    <option value="PC">PC / Laptop</option>
                    <option value="PRINTER">Printer</option>
                    <option value="PROGRAM">Program / Software</option>
                    <option value="NETWORK">Network / Internet</option>
                    <option value="OTHER">Other IT problem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    Location / Room
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Building, floor, room number"
                    value={itLocation}
                    onChange={(e) => setItLocation(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Transport-specific */}
            {categoryParam === "TRANSPORT" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      From
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="Office"
                      value={trFrom}
                      onChange={(e) => setTrFrom(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      To
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="Bank"
                      value={trTo}
                      onChange={(e) => setTrTo(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      value={trDate}
                      onChange={(e) => setTrDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      value={trTime}
                      onChange={(e) => setTrTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    Purpose
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Office to bank, document delivery, etc."
                    value={trPurpose}
                    onChange={(e) => setTrPurpose(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Administration-specific */}
            {categoryParam === "ADMINISTRATION" && (
              <>
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    Item
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    value={admItem}
                    onChange={(e) => setAdmItem(e.target.value)}
                  >
                    <option value="Water">Water</option>
                    <option value="Pen">Pen</option>
                    <option value="Pencil">Pencil</option>
                    <option value="Paper">Paper</option>
                    <option value="Other">Other office supply</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="e.g. 10"
                      value={admQty}
                      onChange={(e) => setAdmQty(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-1">
                      Location / Room
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="Building, floor, room number"
                      value={admLocation}
                      onChange={(e) => setAdmLocation(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Common description */}
            <div>
              <label className="block text-sm text-slate-700 mb-1">
                Additional details
              </label>
              <textarea
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 min-h-[120px]"
                placeholder="Add any extra information for this request."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {statusError && (
              <p className="text-xs text-red-600">{statusError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {loading ? "Creating request..." : "Submit request"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
