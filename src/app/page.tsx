import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="py-8 px-8">
        <div className="text-left text-yellow-200 flex flex-col gap-4 max-w-lg">
          <div>
            <h1 className="text-4xl font-normal">창업가들의 집 &lsquo;대장간&rsquo;</h1>
            <p className="text-sm opacity-80">서울시 광진구, 대한민국</p>
          </div>
          <div>
            <p className="text-sm">대장간은 1조 이상의 기업 가치를 만들 청년 창업가들이 모여 사는 공간이자 커뮤니티 플랫폼입니다. 2020년경 서울 홍대에 만들어진 <Link href="https://youtu.be/BuDeHThrcvY" target="_blank" className="underline"> 5AM Club House</Link>의 멤버들이 2023년 2월 시작했으며, 주로 IT 분야의 창업자 혹은 공동 창업자가 모여 있습니다.</p>
          </div>
          <div>
            <p className="text-sm">현재 6명이 거주하며 매주 인사이트 세미나를 열고, 매달 액티비티를 진행하고 있습니다. 최신 소식은 <Link href="https://daejangang.substack.com/" target="_blank" className="underline">뉴스레터</Link>와 <Link href="https://www.instagram.com/daejangang_/" target="_blank" className="underline">인스타그램</Link>에서 확인하실 수 있습니다.</p>
          </div>
        </div>
      </div>

      {/* Footer with Logo */}
      <footer className="mt-auto py-8 flex justify-center">
        <Image 
          src="/image/logo-600-600.png"
          alt="대장간 로고"
          width={60}
          height={60}
          className="opacity-50"
        />
      </footer>
    </main>
  );
}
