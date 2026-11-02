import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSiteContent, saveSiteContent, resetSiteContent } from "@/lib/server-content";

const AUTH_COOKIE = "pragata_admin_session";
const SESSION_SECRET = "pragata_auth_token_authenticated_2026";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE);
  return session?.value === SESSION_SECRET;
}

export async function GET() {
  const content = getSiteContent();
  return NextResponse.json(content);
}

export async function POST(request: NextRequest) {
  const authorized = await isAuthorized();
  if (!authorized) {
    return NextResponse.json(
      { success: false, message: "Akses ditolak. Silakan login terlebih dahulu." },
      { status: 401 }
    );
  }

  try {
    const updatedContent = await request.json();
    saveSiteContent(updatedContent);
    return NextResponse.json({
      success: true,
      message: "Konten website berhasil disimpan dan diperbarui!",
    });
  } catch (error) {
    console.error("Failed to save content:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan konten." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const authorized = await isAuthorized();
  if (!authorized) {
    return NextResponse.json(
      { success: false, message: "Akses ditolak." },
      { status: 401 }
    );
  }

  const restored = resetSiteContent();
  return NextResponse.json({
    success: true,
    message: "Konten berhasil di-reset ke nilai default pabrik.",
    content: restored,
  });
}

