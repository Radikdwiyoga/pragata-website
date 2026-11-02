import * as React from "react";
import { siteContent, type SiteContent } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck } from "lucide-react";

interface CredentialsProps {
  content?: SiteContent["credentials"];
}

export function Credentials({ content }: CredentialsProps = {}) {
  const credentials = content || siteContent.credentials;

  return (
    <section
      id="kualifikasi"
      className="bg-surface border-y border-line py-8 sm:py-10"
      aria-label="Kualifikasi dan Keanggotaan SBU"
    >
      <div className="container-site">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left: Label and SBU Chips */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-body shrink-0">
              {credentials.label}
            </span>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
              {credentials.chips.map((chip) => (
                <div
                  key={chip.code}
                  className="group relative"
                  title={`${chip.code}: ${chip.name} (Grade ${chip.grade})`}
                >
                  <Badge variant="chip" size="sm" className="w-full sm:w-auto justify-center">
                    {chip.display}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Association badge */}
          <div className="flex items-center gap-2 text-xs font-semibold text-navy shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-line/60">
            <ShieldCheck className="w-4 h-4 text-cyan" aria-hidden="true" />
            <span>{credentials.association}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
