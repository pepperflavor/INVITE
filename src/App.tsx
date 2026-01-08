export default function App() {
  const name = "93세\n생신 파티\n초대장";
  const title = "사랑하는\n정인영\n여사님의";
  const phone = "010-2681-3448";

  const base = import.meta.env.BASE_URL;

  // public/invite_mv.mp4
  const videoSrc = `${base}invite_mv.mp4`;

  const images = {
    topLeft: `${base}img/smile.jpg`,
    topRight: `${base}img/together.jpg`,
    bottomLeft: `${base}img/main.jpg`,
  };

  const nameLines = name.split("\n");
  const titleLines = title.split("\n");

  return (
    // ✅ 스냅: 세로 스크롤 섹션 단위로 딱 붙게
    <div className="w-full bg-white h-[100dvh] overflow-y-auto snap-y snap-mandatory">
      {/* ===================== */}
      {/* 1) HERO VIDEO (모바일: 화면 꽉차게 + 안 잘리게) */}
      {/* ===================== */}
      <section className="w-full snap-start">
        <div className="relative w-full h-[100dvh] min-h-[100svh] bg-black overflow-hidden">
          {/* ✅ 배경: 같은 영상 블러로 여백 자연스럽게 */}
          <video
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* ✅ 전면: 절대 안 잘리게(전체 보이기) */}
          <video
            src={videoSrc}
            className="relative z-10 w-full h-full object-contain"
            autoPlay
            loop
            muted
            playsInline
            controls
            preload="metadata"
          />

          {/* ✅ 아래로 스크롤 안내(선택) */}
          <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-20 flex justify-center">
            <div className="rounded-full bg-black/45 px-4 py-2 text-white text-sm tracking-wide">
              아래로 스크롤 ↓
            </div>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* 2) CONTENT */}
      {/* ===================== */}
      <section className="w-full snap-start bg-white">
        <div className="w-full flex justify-center px-4 py-10 sm:px-6 sm:py-12">
          <div
            className="w-full max-w-[420px] sm:max-w-[680px]"
            style={{
              fontFamily:
                'ui-serif, "Noto Serif KR", "Nanum Myeongjo", Georgia, serif',
            }}
          >
            {/* Title */}
            <div className="text-center text-[#7A5A49] font-extrabold tracking-[-0.02em]">
              {titleLines.map((line, idx) => (
                <div
                  key={idx}
                  className="text-[54px] leading-[1.05] sm:text-[72px]"
                  style={{ marginTop: idx === 0 ? 0 : 14 }}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Name */}
            <div className="mt-6 text-center">
              <h1 className="text-[#7A5A49] font-medium tracking-[0.14em]">
                {nameLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="text-[34px] leading-[1.18] sm:text-[46px] sm:leading-[1.22]"
                  >
                    {line}
                  </div>
                ))}
              </h1>
            </div>

            {/* Photos: 순서대로 */}
            <div className="mt-10 space-y-8">
              <MediaCard src={images.topLeft} alt="top-left" aspect="square" />
              <MediaCard src={images.topRight} alt="top-right" aspect="wide" />
              <MediaCard
                src={images.bottomLeft}
                alt="bottom-left"
                aspect="square"
              />
            </div>

            {/* Footer: phone only */}
            <div className="mt-12 text-center">
              <div className="text-[16px] sm:text-[18px] text-[#2C2C2C] font-sans font-semibold">
                오셔서 함께 축하해 주세요!
              </div>
              <div className="text-[16px] sm:text-[18px] text-[#2C2C2C] font-sans font-semibold">
                만약 참석이 어렵다면?
              </div>
              <div
                className="mt-4 text-[16px] sm:text-[18px] text-[#555] tracking-[0.06em]"
                style={{ fontFamily: 'ui-monospace, "Courier New", monospace' }}
              >
                안부전화 드리기♥ : {phone}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MediaCard({
  src,
  alt,
  aspect = "wide",
}: {
  src: string;
  alt: string;
  aspect?: "wide" | "square";
}) {
  const aspectClass = aspect === "square" ? "aspect-square" : "aspect-[16/10]";

  return (
    <div
      className="
        relative z-0
        transition-transform duration-300 ease-out
        hover:scale-[1.04] hover:-translate-y-1 hover:z-10
        active:scale-[1.03]
      "
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div
        className={`
          ${aspectClass} w-full bg-[#F3EFEA] overflow-hidden
          rounded-[18px] sm:rounded-[22px]
          shadow-[0_14px_34px_rgba(0,0,0,0.12)]
        `}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}
