import { useEffect, useRef, useState } from "react";

export default function App() {
  const name = "93세\n생신 파티\n초대장";
  const title = "사랑하는\n정인영\n여사님의";
  const phone = "010-2681-3448";

  const base = import.meta.env.BASE_URL;
  const videoSrc = `${base}invite_mv.mp4`;

  const images = {
    topLeft: `${base}img/smile.jpg`,
    topRight: `${base}img/together.jpg`,
    bottomLeft: `${base}img/main.jpg`,
  };

  const nameLines = name.split("\n");
  const titleLines = title.split("\n");

  const heroRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  // ✅ 스냅은 “영상 구간에서만” 활성화했다가, 내려가면 끔
  const [snapEnabled, setSnapEnabled] = useState(true);

  // --- (1) 스냅 토글: 상단(영상 근처)에서는 ON, 내려가면 OFF
  useEffect(() => {
    const onScroll = () => {
      // hero 높이의 절반 이상 내려가면 스냅 끄기
      const y = window.scrollY || 0;
      const vh = window.innerHeight || 1;
      setSnapEnabled(y < vh * 0.5);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- (2) “다음 섹션으로 부드럽게 이동” 함수
  const goNext = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // --- (3) 모바일 스와이프 감지(영상 섹션에서 위로 스와이프하면 다음 섹션)
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);

  const onHeroTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  };

  const onHeroTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current == null) return;

    const endY = e.changedTouches[0].clientY;
    const delta = touchStartY.current - endY; // 위로 스와이프면 +
    const dt = touchStartTime.current ? Date.now() - touchStartTime.current : 9999;

    touchStartY.current = null;
    touchStartTime.current = null;

    // ✅ 너무 짧은 터치/약한 스와이프는 무시
    // 위로 70px 이상 + 700ms 이내면 다음 섹션 이동
    if (delta > 70 && dt < 700) {
      goNext();
    }
  };

  // --- (4) 데스크톱 휠(영상 섹션에서 아래로 휠 내리면 다음 섹션)
  const onHeroWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 10) {
      goNext();
    }
  };

  return (
    // ✅ 스냅은 상단에서만 ON → 내려가면 OFF (콘텐츠 끝까지 내려도 위로 안 튐)
    <div
      className={[
        "w-full bg-white",
        snapEnabled ? "snap-y snap-mandatory" : "", // 내려가면 완전히 스냅 해제
      ].join(" ")}
    >
      {/* ===================== */}
      {/* 1) HERO VIDEO */}
      {/* ===================== */}
      <section
        ref={heroRef}
        className="w-full snap-start"
        onTouchStart={onHeroTouchStart}
        onTouchEnd={onHeroTouchEnd}
        onWheel={onHeroWheel}
      >
        <div className="relative w-full h-[100dvh] min-h-[100svh] bg-black overflow-hidden">
          {/* 배경 블러 */}
          <video
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* 전면: 안 잘리게 */}
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

          {/* 안내 */}
          <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-20 flex justify-center">
            <div className="rounded-full bg-black/45 px-4 py-2 text-white text-sm tracking-wide">
              아래로 스와이프 ↓
            </div>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* 2) CONTENT */}
      {/* ===================== */}
      <section ref={contentRef} className="w-full snap-start bg-white">
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

            {/* Photos */}
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
