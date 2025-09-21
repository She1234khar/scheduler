// app/api/test-reminders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendScheduledReminders, cleanupOldReminders } from "@/actions/email";

export async function GET(request: NextRequest) {
  try {
    console.log("Manual test: Starting scheduled reminder processing...");

    // Send scheduled reminders
    const reminderResult = await sendScheduledReminders();

    // Cleanup old reminders
    const cleanupResult = await cleanupOldReminders();

    return NextResponse.json({
      success: true,
      message: "Test completed successfully",
      reminders: reminderResult,
      cleanup: cleanupResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Test failed:", error);
    return NextResponse.json(
      {
        error: "Test failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
