import type { FormData } from "@/types";

export function buildEmailHtml(data: FormData): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="font-size:12px;font-weight:700;color:#6b7280;padding:8px 12px;white-space:nowrap;vertical-align:top;width:140px">${label}</td>
      <td style="font-size:13px;color:#111827;padding:8px 12px;vertical-align:top">${value || "N/A"}</td>
    </tr>`;

  const section = (title: string, rows: string) =>
    `<tr><td colspan="2" style="padding:0">
      <div style="background:#f8fafc;padding:8px 12px;font-size:10px;font-weight:700;letter-spacing:.1em;color:#94a3b8;text-transform:uppercase;border-top:2px solid #C8FF00">${title}</div>
      <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </td></tr>`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:20px;background:#f4f4f4;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1)">

  <!-- Header -->
  <div style="background:#05080F;padding:32px 28px;text-align:center">
    <div style="font-size:11px;letter-spacing:.2em;color:#C8FF00;font-weight:700;margin-bottom:8px">NEW WEBSITE ENQUIRY</div>
    <h1 style="color:#C8FF00;font-size:28px;margin:0;letter-spacing:3px">🚀 LET'S BUILD!</h1>
    <p style="color:#64748b;margin:8px 0 0;font-size:13px">${data.submittedAt}</p>
  </div>

  <!-- Highlight card -->
  <div style="background:#fefce8;border-left:5px solid #C8FF00;padding:20px 24px;margin:0">
    <div style="font-size:22px;font-weight:700;color:#05080F">${data.yourName}</div>
    <div style="font-size:18px;font-weight:700;color:#15803d;margin-top:4px">📱 ${data.phone}</div>
    <div style="font-size:13px;color:#64748b;margin-top:6px">
      📧 ${data.email} &nbsp;|&nbsp; 🏙 ${data.city}
    </div>
  </div>

  <table width="100%" cellpadding="0" cellspacing="0">
    ${section("Business Info",
      row("Business", data.businessName) +
      row("What They Do", data.businessDesc) +
      row("Customers", data.customers) +
      row("USP", data.usp)
    )}
    ${section("Website Requirements",
      row("Goal", data.goal) +
      row("Website Feel", data.websiteFeel) +
      row("Colour Theme", data.colourTheme) +
      row("Reference Site", data.referenceSite)
    )}
    ${section("Pages & Features",
      row("Pages", data.pages) +
      row("Features", data.features) +
      row("Services", data.services)
    )}
    ${section("Content",
      row("Tagline", `"${data.tagline}"`) +
      row("Photos", data.photos) +
      row("Logo", data.logo)
    )}
    ${section("Extra Notes",
      row("Notes", data.extra || "None")
    )}
  </table>

  <!-- Footer -->
  <div style="background:#05080F;padding:20px 24px;text-align:center">
    <p style="color:#C8FF00;margin:0;font-size:13px;font-weight:700">
      Reply or WhatsApp them at ${data.phone} to follow up 👋
    </p>
    <p style="color:#64748b;margin:8px 0 0;font-size:11px">
      Submitted via your client intake form
    </p>
  </div>
</div>
</body>
</html>`;
}

export function buildWhatsAppMessage(data: FormData): string {
  return `🚀 *NEW WEBSITE ENQUIRY*

👤 *Name:* ${data.yourName}
📱 *Phone:* ${data.phone}
📧 *Email:* ${data.email}
🏙 *City:* ${data.city}

🏢 *Business:* ${data.businessName}
📝 *What they do:* ${data.businessDesc}
👥 *Customers:* ${data.customers}
💡 *USP:* ${data.usp || "N/A"}

🎯 *Goal:* ${data.goal}
🎨 *Feel:* ${data.websiteFeel}
🌗 *Theme:* ${data.colourTheme}
🔗 *Reference:* ${data.referenceSite || "N/A"}

📄 *Pages:* ${data.pages}
⚙️ *Features:* ${data.features}
🛠 *Services:* ${data.services || "N/A"}

✏️ *Tagline:* "${data.tagline}"
📸 *Photos:* ${data.photos || "N/A"}
🖼 *Logo:* ${data.logo || "N/A"}

📌 *Extra:* ${data.extra || "None"}
📅 *Submitted:* ${data.submittedAt}`;
}
