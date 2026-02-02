export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#021511]">
      {/* Dark Bottom Half (Base) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: 'url("/COHI.jpg")' }}
      />

      {/* Light Top Half (Overlay with Gradient Mask) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-normal"
        style={{
          backgroundImage: 'url("/COHI-1.jpg")',
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Subtle overlay to ensure text readability if needed, but keeping it minimal for visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#021511]/30 to-[#021511]/80 mix-blend-multiply" />
    </div>
  )
}
