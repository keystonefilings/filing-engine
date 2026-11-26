"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Draw a signature with a mouse, finger or pen. Writes a PNG data URL (trimmed to the ink,
 * transparent background) into a hidden input named `name`, or "" while empty.
 */
export function SignaturePad({ name, disabled, label = "Sign here" }: { name: string; disabled?: boolean; label?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [value, setValue] = useState("");
  const [inked, setInked] = useState(0);

  useEffect(() => {
    const c = canvas.current!;
    const ratio = Math.max(1, window.devicePixelRatio || 1);
    c.width = c.offsetWidth * ratio;
    c.height = c.offsetHeight * ratio;
    const g = c.getContext("2d")!;
    g.scale(ratio, ratio);
    g.lineWidth = 2.4;
    g.lineCap = "round";
    g.lineJoin = "round";
    g.strokeStyle = "#0b1f4d";
  }, []);

  const point = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const export_ = () => {
    const c = canvas.current!;
    const g = c.getContext("2d")!;
    const { width, height } = c;
    const data = g.getImageData(0, 0, width, height).data;
    let minX = width, minY = height, maxX = -1, maxY = -1;
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3]! > 0) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    }
    if (maxX < 0) { setValue(""); return; }
    const pad = 8;
    minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad); maxX = Math.min(width - 1, maxX + pad); maxY = Math.min(height - 1, maxY + pad);
    const out = document.createElement("canvas");
    out.width = maxX - minX + 1; out.height = maxY - minY + 1;
    out.getContext("2d")!.drawImage(c, minX, minY, out.width, out.height, 0, 0, out.width, out.height);
    setValue(out.toDataURL("image/png"));
  };

  const down = (e: React.PointerEvent) => {
    if (disabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = point(e);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current || !last.current) return;
    const p = point(e);
    const g = canvas.current!.getContext("2d")!;
    g.beginPath(); g.moveTo(last.current.x, last.current.y); g.lineTo(p.x, p.y); g.stroke();
    last.current = p;
    setInked((n) => n + 1);
  };
  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    export_();
  };
  const clear = () => {
    const c = canvas.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    setValue(""); setInked(0);
  };

  return (
    <div className="sigpad">
      <canvas ref={canvas} aria-label={label} role="img" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up}
        style={{ touchAction: "none", opacity: disabled ? 0.5 : 1 }} />
      <div className="row small">
        <span className="muted">{inked ? "Signed above." : label}</span>
        <button type="button" className="btn small" onClick={clear} disabled={disabled || !inked}>Clear signature</button>
      </div>
      <input type="hidden" name={name} value={value} disabled={disabled} />
    </div>
  );
}
