export default function App() {
  const name = "사랑하는\n정인영\n여사님";
  const title = "93세 \n생신 파티\n초대장";

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
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-6 py-10">
      {/* Card : 전체 폭 키움 */}
      <div
        className="w-[620px] max-w-full bg-white"
        style={{
          fontFamily:
            'ui-serif, "Noto Serif KR", "Nanum Myeongjo", Georgia, serif',
        }}
      >
        {/* Grid : 오른쪽 칸을 더 넓게 */}
        <div className="grid grid-cols-[1fr_1.15fr] gap-x-12 gap-y-10">
          {/* Name (top-left) */}
          <div className="flex items-start justify-start pt-1">
            <h1 className="text-[#7A5A49] font-medium tracking-[0.16em]">
              {nameLines.map((line, idx) => (
                <div
                  key={idx}
                  className="text-[48px] leading-[1.22] font-semibold"
                >
                  {line}
                </div>
              ))}
            </h1>
          </div>

          {/* ✅ Top-right: 칸도 넓고, 사진도 큰 가로형 */}
          <PhotoWide src={images.topRight} alt="top-right" />

          {/* Left middle photo : 더 크게 */}
          <PhotoSquare src={images.topLeft} alt="top-left" />

          {/* Title (3줄) : 줄 겹침 방지 + 약간 큼 */}
          <div className="flex items-center justify-center">
            <div className="text-[#7A5A49] font-extrabold text-center tracking-[-0.02em]">
              <div className="text-[70px] leading-[1.05]">{titleLines[0]}</div>
              <div className="text-[70px] leading-[1.05] mt-4">
                {titleLines[1]}
              </div>
              <div className="text-[70px] leading-[1.05] mt-4">
                {titleLines[2]}
              </div>
            </div>
          </div>

          {/* Bottom-left photo : 더 크게 */}
          <PhotoSquare src={images.bottomLeft} alt="bottom-left" />

          {/* Spacer */}
          <div />
        </div>

        {/* Footer : 살짝 키움 */}
        <div className="mt-14 text-center">
          <div className="text-[20px] text-[#2C2C2C] tracking-[0.02em] leading-relaxed font-sans text-semibold">
            {dateLine1}
          </div>
          <div className="text-[20px] text-[#2C2C2C] mt-2 font-sans text-semibold">
            {venue}
          </div>
          <div className="text-[18px] text-[#2C2C2C] mt-2 font-sans">
            오셔서 함께 축하해 주세요!
          </div>

          <div
            className="mt-4 text-[16px] text-[#555] tracking-[0.08em] leading-relaxed"
            style={{ fontFamily: 'ui-monospace, "Courier New", monospace' }}
          >
            <div>{address}</div>
            <div className="mt-1 font-sans text-semibold">{phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== */
/* 사진 컴포넌트 */
/* ===================== */

// ✅ topRight: 프레임 자체 확대 + 위로 살짝 뜸
function PhotoWide({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="w-full">
      <div
        className="
          relative z-0
          transition-transform duration-300 ease-out
          hover:scale-[1.05] hover:-translate-y-1 hover:z-10
          active:scale-[1.04]
        "
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div
          className="
            aspect-[16/10] w-full bg-[#F3EFEA] overflow-hidden rounded-[22px]
            shadow-[0_14px_34px_rgba(0,0,0,0.12)]
            hover:shadow-[0_18px_40px_rgba(0,0,0,0.16)]
            cursor-pointer
          "
        >
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

// ✅ 좌측 사진: 프레임 자체 확대 + 위로 살짝 뜸
function PhotoSquare({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="w-full">
      <div
        className="
          relative z-0
          transition-transform duration-300 ease-out
          hover:scale-[1.05] hover:-translate-y-1 hover:z-10
          active:scale-[1.04]
        "
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div
          className="
            aspect-square w-full bg-[#F3EFEA] overflow-hidden rounded-[20px]
            shadow-[0_12px_30px_rgba(0,0,0,0.10)]
            hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)]
            cursor-pointer
          "
        >
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
