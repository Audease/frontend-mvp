import { NextRequest, NextResponse } from "next/server";
import { TokenManager } from "../utils/checkAndRefreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const accessToken = await TokenManager();

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Expect body: { learnerIds: string[] }
  let body: any;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { learnerIds } = body ?? {};
  if (!Array.isArray(learnerIds) || learnerIds.length === 0) {
    return NextResponse.json(
      { message: "learnerIds must be a non-empty array of learner IDs" },
      { status: 400 }
    );
  }

  // basic validation: each id should be a non-empty string
  const allStrings = learnerIds.every((id: any) => typeof id === "string" && id.trim() !== "");
  if (!allStrings) {
    return NextResponse.json(
      { message: "Each learnerId must be a non-empty string" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(apiUrl + `/v1/bksd/send-mail/batch`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ learnerIds }),
    });
    if (response.ok) {
      // parse backend response if any
      let backendData: any = null;
      if (response.status !== 204) {
        try {
          backendData = await response.json();
        } catch (e) {
          backendData = null;
        }
      }

      // helper to map arbitrary backend item to our result shape
      const mapItem = (item: any, fallbackId?: string) => {
        const learnerId = item?.learnerId ?? item?.id ?? item?.studentId ?? fallbackId ?? null;
        const status = (item?.status ?? item?.result ?? item?.state ?? "success") as string;
        const message = item?.message ?? item?.detail ?? item?.error ?? (status === "success" ? "Email queued" : "Failed") ;
        const learnerName = item?.learnerName ?? item?.name ?? item?.fullName ?? null;
        const learnerEmail = item?.learnerEmail ?? item?.email ?? item?.studentEmail ?? null;
        return {
          learnerId,
          status,
          message,
          learnerName,
          learnerEmail,
        };
      };

      let results: Array<any> = [];
      // backendData may be an object with results, or an array, or null
      if (backendData) {
        if (Array.isArray(backendData.results)) {
          results = backendData.results.map((it: any) => mapItem(it));
        } else if (Array.isArray(backendData)) {
          results = backendData.map((it: any, i: number) => mapItem(it, learnerIds[i]));
        } else if (backendData.result && Array.isArray(backendData.result)) {
          results = backendData.result.map((it: any) => mapItem(it));
        } else if (backendData.items && Array.isArray(backendData.items)) {
          results = backendData.items.map((it: any) => mapItem(it));
        }
      }

      // if backend gave no per-learner details, fallback to optimistic success per id
      if (!results || results.length === 0) {
        results = learnerIds.map((id: string) => ({
          learnerId: id,
          status: "success",
          message: "Email queued",
          learnerName: null,
          learnerEmail: null,
        }));
      }

      const totalRequested = learnerIds.length;
      const successful = results.filter((r) => String(r.status).toLowerCase() === "success").length;
      const skipped = results.filter((r) => String(r.status).toLowerCase() === "skipped").length;
      const failed = totalRequested - successful - skipped;

      return NextResponse.json(
        {
          message: "Batch email operation completed",
          summary: { totalRequested, successful, failed, skipped },
          results,
        },
        { status: 200 }
      );
    } else {
      const text = await response.text().catch(() => "");
      return NextResponse.json(
        { message: "Application sending failed", details: text },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Application sending failed" },
      { status: 500 }
    );
  }
}
