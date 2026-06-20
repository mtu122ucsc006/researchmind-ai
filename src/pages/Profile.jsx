import { useState, useEffect } from "react";
import { getToken } from "../utils/storage.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Profile() {
  const [form, setForm] = useState({
    name: "", email: "", institution: "", department: "",
    bio: "", phone: "", location: "", academicYear: "",
    researchInterests: "", linkedin: "", github: "", avatar: ""
  });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = getToken();
    fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async (r) => {
        const data = await r.json();
        console.log("GET /profile response:", data); // 👈 check this in console
        if (!r.ok) {
          setMsg("❌ Could not load profile: " + (data.message || r.status));
          return;
        }
        const user = data.user || data;
        setForm(prev => ({ ...prev, ...user }));
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setMsg("❌ Could not load profile (network error)");
      });
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, avatar: reader.result })); // ✅ fixed
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    const token = getToken();
    console.log("PUT /profile payload:", form); // 👈 check this in console
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      console.log("PUT /profile response:", data); // 👈 check this in console
      const user = data.user || data;
      if (res.ok && user && user.name) {
        setForm(prev => ({ ...prev, ...user }));
        setMsg("✅ Profile saved successfully!");
      } else {
        setMsg("❌ Save failed: " + (data.message || "unknown error"));
      }
    } catch (err) {
      console.error("Save error:", err);
      setMsg("❌ Save failed: network error");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ color: "#2563eb" }}>Profile</h2>
      <p style={{ color: "#64748b", marginBottom: 24 }}>Manage your academic profile details.</p>

      {/* Avatar */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        {form.avatar ? (
          <img src={form.avatar} alt="avatar"
            style={{ width: 90, height: 90, borderRadius: "50%",
              objectFit: "cover", marginBottom: 8, border: "3px solid #2563eb" }} />
        ) : (
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#e2e8f0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32, margin: "0 auto 8px" }}>👤</div>
        )}
        <br />
        <label style={{ cursor: "pointer", color: "#2563eb", fontWeight: 500 }}>
          📷 Upload Photo
          <input type="file" accept="image/*" onChange={handleAvatar} style={{ display: "none" }} />
        </label>
      </div>

      {/* Text Fields */}
      {[
        { label: "Name", name: "name" },
        { label: "Email", name: "email" },
        { label: "Institution", name: "institution" },
        { label: "Department", name: "department" },
        { label: "Phone", name: "phone" },
        { label: "Location", name: "location" },
        { label: "LinkedIn", name: "linkedin" },
        { label: "GitHub", name: "github" },
      ].map(f => (
        <div key={f.name} style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontWeight: 500, marginBottom: 4,
            color: "#374151" }}>{f.label}</label>
          <input
            name={f.name}
            value={form[f.name] || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px 14px", borderRadius: 8,
              border: "1px solid #d1d5db", fontSize: 15,
              boxSizing: "border-box", outline: "none" }}
          />
        </div>
      ))}

      {/* Bio */}
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontWeight: 500, marginBottom: 4,
          color: "#374151" }}>Bio</label>
        <textarea
          name="bio"
          value={form.bio || ""}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us about yourself..."
          style={{ width: "100%", padding: "10px 14px", borderRadius: 8,
            border: "1px solid #d1d5db", fontSize: 15,
            boxSizing: "border-box", resize: "vertical" }}
        />
      </div>

      {/* Academic Year */}
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontWeight: 500, marginBottom: 4,
          color: "#374151" }}>Academic Year</label>
        <select
          name="academicYear"
          value={form.academicYear || ""}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 8,
            border: "1px solid #d1d5db", fontSize: 15,
            boxSizing: "border-box", background: "#fff" }}
        >
          <option value="">Select year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
          <option>PG - 1st Year</option>
          <option>PG - 2nd Year</option>
          <option>PhD</option>
        </select>
      </div>

      {/* Research Interests */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontWeight: 500, marginBottom: 4,
          color: "#374151" }}>Research Interests</label>
        <input
          name="researchInterests"
          value={form.researchInterests || ""}
          onChange={handleChange}
          placeholder="e.g. Machine Learning, NLP, Computer Vision"
          style={{ width: "100%", padding: "10px 14px", borderRadius: 8,
            border: "1px solid #d1d5db", fontSize: 15,
            boxSizing: "border-box" }}
        />
      </div>

      {/* Message */}
      {msg && (
        <p style={{ color: msg.startsWith("✅") ? "#16a34a" : "#dc2626",
          fontWeight: 500, marginBottom: 12, textAlign: "center" }}>
          {msg}
        </p>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        style={{ width: "100%", padding: "13px", backgroundColor: saving ? "#94a3b8" : "#2563eb",
          color: "#fff", border: "none", borderRadius: 8, fontSize: 16,
          cursor: saving ? "not-allowed" : "pointer", fontWeight: 600 }}
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}