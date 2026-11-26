/** A picture's size in pixels, read from its header (PNG, JPEG, WebP), or null when it can't be told. */
export function imageSize(b: Buffer): { width: number; height: number } | null {
  try {
    // PNG: the IHDR chunk follows the 8-byte signature.
    if (b.length >= 24 && b.readUInt32BE(0) === 0x89504e47 && b.subarray(12, 16).toString("latin1") === "IHDR") {
      return ok(b.readUInt32BE(16), b.readUInt32BE(20));
    }
    // JPEG: walk the markers to the first start-of-frame.
    if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i + 9 < b.length) {
        if (b[i] !== 0xff) { i++; continue; }
        const m = b[i + 1]!;
        if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
        const len = b.readUInt16BE(i + 2);
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return ok(b.readUInt16BE(i + 7), b.readUInt16BE(i + 5));
        i += 2 + len;
      }
      return null;
    }
    // WebP: a RIFF container with a VP8, VP8L or VP8X chunk first.
    if (b.length >= 30 && b.subarray(0, 4).toString("latin1") === "RIFF" && b.subarray(8, 12).toString("latin1") === "WEBP") {
      const chunk = b.subarray(12, 16).toString("latin1");
      if (chunk === "VP8X") return ok(1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3));
      if (chunk === "VP8L") { const v = b.readUInt32LE(21); return ok((v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1); }
      if (chunk === "VP8 ") return ok(b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff);
    }
  } catch { /* a truncated header */ }
  return null;
}

const ok = (width: number, height: number) => (width > 0 && height > 0 ? { width, height } : null);
