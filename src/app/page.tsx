import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="absoulte w-full p-8 bg-yellow-300"> NAV BAR </div>
      <HeroVideo />
      <p>hello this is a daejangang website</p>
      <p>make shit, make happen</p>
      <p>LFG</p>
      <p>Gonna publish this site at tmr</p>
    </main>
  );
}

function HeroVideo() {
  return (
    <video width="320" height="240" controls preload="none">
      <source src="/path/to/video.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  );
}
