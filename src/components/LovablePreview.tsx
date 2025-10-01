'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LovablePreviewProps {
  // Optional specific URL to preview; otherwise uses env or generated sandbox
  previewUrl?: string;
  // Optional HTML string to render in a sandboxed iframe when no URL
  html?: string;
  className?: string;
}

/**
 * LovablePreview renders an iframe preview panel similar to Lovable's UI.
 * - If previewUrl is provided, it embeds that URL.
 * - Else, it renders provided HTML into a sandboxed data URL.
 * - Shows a loading indicator until content loads.
 */
export default function LovablePreview({ previewUrl, html, className }: LovablePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  const src = useMemo(() => {
    const direct = previewUrl || process.env.NEXT_PUBLIC_PREVIEW_URL;
    if (direct) return String(direct);
    const doc = html || `<!doctype html><html><head><meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Preview</title>
      <style>html,body{margin:0;height:100%;}body{display:flex;align-items:center;justify-content:center;font:14px/1.4 system-ui;color:#111;background:#fff}</style>
      </head><body><div>Preview is ready.</div></body></html>`;
    return 'data:text/html;charset=utf-8,' + encodeURIComponent(doc);
  }, [previewUrl, html]);

  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  return (
    <Card className={cn('w-full h-[70vh] overflow-hidden', className)}>
      <div className="relative w-full h-full bg-muted/20">
        {isLoading && (
          <div className="absolute inset-0 grid place-items-center z-10 bg-background/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              <span>Spinning up preview</span>
            </div>
          </div>
        )}
        <iframe
          key={src}
          src={src}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </Card>
  );
}


