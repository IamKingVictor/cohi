export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none select-none bg-[#0A0F1A]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{ backgroundImage: 'url("/COHI.jpg")' }}
      />
      <div className="absolute inset-0 bg-[#0A0F1A]/80" />{" "}
      {/* Darken if needed */}
    </div>
  )
}
