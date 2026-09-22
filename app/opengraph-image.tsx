import { ImageResponse } from "next/og";

export const alt = "머니머니 - 생활비·비용 계산기";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3f4f6",
          color: "#111827",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            display: "flex",
          }}
        >
          💰 머니머니
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            color: "#4b5563",
            display: "flex",
          }}
        >
          생활비 · 비용 계산기
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 24,
            color: "#9ca3af",
            display: "flex",
          }}
        >
          생활에 필요한 다양한 비용을 쉽고 빠르게 계산해보세요.
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}