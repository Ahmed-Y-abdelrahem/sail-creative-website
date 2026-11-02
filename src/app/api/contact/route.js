
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;

function clean(value, maxLength = 200) {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\+?[0-9\s()\-]{7,25}$/.test(phone);
}

function errorResponse(message, status) {
  return NextResponse.json(
    { success: false, message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    }
  );
}

export async function POST(request) {
  try {
    const scriptUrl = process.env.GOOGLE_SCRIPT_WEB_APP_URL;
    const secret = process.env.SAIL_API_SECRET;

    if (!scriptUrl || !secret) {
      console.error("Contact API environment variables missing.");

      return errorResponse(
        "Contact service is temporarily unavailable.",
        503
      );
    }

    const contentType = request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("application/json")) {
      return errorResponse("JSON request required.", 415);
    }

    const contentLength = Number(
      request.headers.get("content-length") || 0
    );

    if (contentLength > MAX_BODY_BYTES) {
      return errorResponse("Request is too large.", 413);
    }

    const rawBody = await request.text();

    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return errorResponse("Request is too large.", 413);
    }

    let data;

    try {
      data = JSON.parse(rawBody);
    } catch {
      return errorResponse("Invalid JSON.", 400);
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return errorResponse("Invalid request.", 400);
    }

    // Honeypot field: legitimate visitors leave it empty.
    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const name = clean(data.name, 150);
    const phone = clean(data.phone, 50);
    const email = clean(data.email, 200);
    const company = clean(data.company, 200);
    const service = clean(data.service, 500);
    const budget = clean(data.budget, 100);
    const timeline = clean(data.timeline, 100);
    const details = clean(data.details, 5000);
    const locale = data.locale === "ar" ? "ar" : "en";

    if (!name || !phone || !email || !details) {
      return errorResponse(
        locale === "ar"
          ? "من فضلك أكمل الاسم ورقم الهاتف والإيميل وتفاصيل المشروع."
          : "Please complete your name, phone, email and project details.",
        400
      );
    }

    if (!isValidEmail(email)) {
      return errorResponse(
        locale === "ar"
          ? "من فضلك أدخل بريدًا إلكترونيًا صحيحًا."
          : "Please enter a valid email address.",
        400
      );
    }

    if (!isValidPhone(phone)) {
      return errorResponse(
        locale === "ar"
          ? "من فضلك أدخل رقم هاتف صحيحًا."
          : "Please enter a valid phone number.",
        400
      );
    }

    const payload = {
      secret,
      name,
      phone,
      email,
      company,
      service,
      budget,
      timeline,
      details,
      source: "SAIL Website - Contact",
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let response;

    try {
      response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
        cache: "no-store",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      console.error(
        "Google Apps Script HTTP error:",
        response.status
      );

      return errorResponse(
        locale === "ar"
          ? "تعذر إرسال الطلب حاليًا. حاول مرة أخرى."
          : "Unable to submit your request. Please try again.",
        502
      );
    }

    let result;

    try {
      result = await response.json();
    } catch {
      console.error("Invalid response from Google Apps Script.");

      return errorResponse(
        locale === "ar"
          ? "تعذر تأكيد إرسال الطلب. تواصل معنا للمساعدة."
          : "Unable to confirm submission. Please contact us for assistance.",
        502
      );
    }

    if (result?.success !== true) {
      console.error("Google Apps Script rejected contact request.");

      return errorResponse(
        locale === "ar"
          ? "تعذر إرسال الطلب حاليًا. حاول مرة أخرى."
          : "Unable to submit your request. Please try again.",
        502
      );
    }

    return NextResponse.json(
      {
        success: true,
        emailSent: result.emailSent === true,
        message:
          locale === "ar"
            ? "تم استلام طلبك بنجاح. هنتواصل معاك قريبًا."
            : "Your request was received successfully. We'll be in touch soon.",
      },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error(
      "Contact API failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return errorResponse(
      "Something went wrong. Please try again later.",
      500
    );
  }
}

export function GET() {
  return errorResponse("Method not allowed.", 405);
}
