import { NextRequest, NextResponse } from "next/server";
import type { FormData, ApiResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const data: FormData = await req.json();

    // ── 1. Save to Google Sheets ──────────────────────────────
    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK;
    if (sheetWebhook) {
      await fetch(sheetWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    // ── 2. Send Telegram alert to YOU ─────────────────────────
    const token  = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      const msg =
`🚀 *New Website Enquiry!*

👤 *Name:* ${data.yourName}
📱 *Phone:* ${data.phone}
📧 *Email:* ${data.email}
🏙 *City:* ${data.city}
🏢 *Business:* ${data.businessName}
📝 *What they do:* ${data.businessDesc}
🎯 *Goal:* ${data.goal}
🎨 *Feel:* ${data.websiteFeel}
📄 *Pages:* ${data.pages}
⚙️ *Features:* ${data.features}
✏️ *Tagline:* ${data.tagline}
📌 *Extra:* ${data.extra || "None"}
📅 *Submitted:* ${data.submittedAt}`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id:    chatId,
          text:       msg,
          parse_mode: "Markdown",
        }),
      });
    }

    return NextResponse.json(
      { success: true, message: "Submitted!" } satisfies ApiResponse,
      { status: 200 }
    );

  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." } satisfies ApiResponse,
      { status: 500 }
    );
  }
}