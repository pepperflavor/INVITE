export default function App() {
  const name = "사랑하는\n정인영\n여사님";
  const title = "93세\n생신 파티\n초대장";

  const dateLine1 = "2026년 1월 11일(일) 오전 11시";
  const venue = "쿠우쿠우";
  const address = "서울특별시 강동구 천호동 양재대로 1571 홈플러스 지하 1층";
  const phone = "010-2681-3448";

  const base = import.meta.env.BASE_URL;
  const images = {
    topLeft: `${base}img/smile.jpg`,
    topRight: `${base}img/together.jpg`,
    bottomLeft: `${base}img/main.jpg`,
  };

  const nameLines = name.split("\n");
  const titleLines = title.split("\n");

  return (
    <div className="min-h-screen w-full bg-white flex justify-center px-4 py-8 sm:px-6 sm:py-10">
      {/* Card */}
      <div
        className="w-full max-w-[420px] sm:max-w-[680px] bg-white"
        style={{
          fontFamily:
            'ui-serif, "Noto Serif KR", "Nanum Myeongjo", Georgia, serif',
        }}
      >
        {/* ✅ Mobile: 1col / Desktop: 2col */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_1.15fr] sm:gap-x-12 sm:gap-y-10">
          {/* Name */}
          <div className="text-center sm:text-left">
            <h1 className="text-[#7A5A49] font-medium tracking-[0.14em]">
              {nameLines.map((line, idx) => (
                <div
                  key={idx}
                  className="text-[38px] leading-[1.15] sm:text-[48px] sm:leading-[1.22]"
                >
                  {line}
                </div>
              ))}
            </h1>
          </div>

          {/* Top-right photo */}
          <PhotoWide src={images.topRight} alt="top-right" />

          {/* Left photo */}
          <PhotoSquare src={images.topLeft} alt="top-left" />

          {/* Title */}
          <div className="flex items-center justify-center">
            <div className="text-[#7A5A49] font-extrabold text-center tracking-[-0.02em]">
              {titleLines.map((line, idx) => (
                <div
                  key={idx}
                  className="text-[54px] leading-[1.05] sm:text-[70px] sm:leading-[1.05]"
                  style={{ marginTop: idx === 0 ? 0 : 14 }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom-left photo */}
          <PhotoSquare src={images.bottomLeft} alt="bottom-left" />

          {/* Spacer only on desktop */}
          <div className="hidden sm:block" />
        </div>

        {/* Footer */}
        <div className="mt-10 sm:mt-14 text-center">
          <div className="text-[18px] sm:text-[20px] text-[#2C2C2C] tracking-[0.02em] leading-relaxed">
            {dateLine1}
          </div>
          <div className="text-[18px] sm:text-[20px] text-[#2C2C2C] mt-2">
            {venue}
          </div>

          <div className="text-[16px] sm:text-[18px] text-[#2C2C2C] mt-2 font-sans">
            오셔서 함께 축하해 주세요!
          </div>

          <div
            className="mt-4 text-[14px] sm:text-[16px] text-[#555] tracking-[0.06em] leading-relaxed"
            style={{ fontFamily: 'ui-monospace, "Courier New", monospace' }}
          >
            <div className="px-2">{address}</div>
            <div className="mt-2">{phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== */
/* Photos */
/* ===================== */

function PhotoWide({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="w-full">
      <div
        className="
          relative z-0
          transition-transform duration-300 ease-out
          hover:scale-[1.03] hover:-translate-y-1 hover:z-10
          active:scale-[1.02]
        "
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* ✅ 모바일에서 더 크게 보이도록 비율/라운드 조정 */}
        <div className="aspect-[16/10] sm:aspect-[16/10] w-full bg-[#F3EFEA] overflow-hidden rounded-[18px] sm:rounded-[22px] shadow-[0_14px_34px_rgba(0,0,0,0.12)]">
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

function PhotoSquare({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="w-full">
      <div
        className="
          relative z-0
          transition-transform duration-300 ease-out
          hover:scale-[1.03] hover:-translate-y-1 hover:z-10
          active:scale-[1.02]
        "
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* ✅ 모바일에서 체감 크기 키움 */}
        <div className="aspect-square w-full bg-[#F3EFEA] overflow-hidden rounded-[18px] sm:rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
