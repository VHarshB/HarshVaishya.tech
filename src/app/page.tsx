
'use client';
import Image from 'next/image';
import ParticleNetwork from '@/components/ParticleNetwork';
import AnnouncementBanner from '@/components/AnnouncementBanner';

export default function Home() {
  return (
    <div 
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/images/BGimage.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ParticleNetwork />
      <AnnouncementBanner oldPortfolioUrl="https://your-old-portfolio-link.com" />

      {/* Center portrait */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none translate-y-20">
        <Image
          src="/images/harshsnapshot.png"
          alt="Harsh portrait"
          width={960}
          height={960}
          sizes="(max-width: 1200px) 50vw, 960px"
          className="w-[40vw] max-w-[960px] h-auto drop-shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
          priority
        />
      </div>

      {/* Left side name with glitch effect */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <h1 className="text-7xl font-black text-white tracking-tight leading-[0.9] glitch-text">
            HARSH<br/>VAISHYA
          </h1>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-cyan-200">
            Student & Lead Developer
          </p>
        </div>
      </div>

      {/* Header navigation with circuit borders */}
      <header className="absolute top-6 right-10 z-20 flex items-center gap-10">
        <div className="text-sm font-medium tracking-[0.2em] uppercase text-cyan-100 px-3 py-1.5 border border-cyan-400/40 rounded">
          © Code by Harsh
        </div>
        <nav className="flex items-center gap-1 text-base font-medium tracking-[0.1em] text-white">
          {['Home', 'Work', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              className="px-5 py-2 relative circuit-border hover:text-cyan-300 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* Glass cards on the right with circuit borders */}
      <div className="absolute top-44 right-8 z-20 flex flex-col gap-5 w-[420px]">
        <div className="relative rounded-2xl border border-cyan-400/30 bg-black/20 backdrop-blur-md px-8 py-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] circuit-card">
          <h2 className="text-sm font-light leading-relaxed tracking-wide">
            BUILDING THE FUTURE,<br/>
            FUTURE ONE LINE OF CODE<br/>
            AN ATIME.
          </h2>
        </div>

        <div className="relative rounded-2xl border border-cyan-400/30 bg-black/20 backdrop-blur-md px-8 py-5 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] circuit-card flex items-center justify-between">
          <div>
            <p className="text-base font-semibold mb-1">ABOUT ME</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 overflow-hidden">
            <div className="w-full h-full bg-[url('/images/avatar.jpg')] bg-cover bg-center" />
          </div>
        </div>

        <div className="relative rounded-2xl border border-cyan-400/30 bg-black/20 backdrop-blur-md px-8 py-5 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] circuit-card flex items-center justify-between">
          <div>
            <p className="text-base font-semibold mb-1">MY WORK</p>
          </div>
          <div className="h-12 w-12 rounded-lg border border-cyan-400/50 bg-cyan-400/10 backdrop-blur flex items-center justify-center">
            <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* View Projects button */}
      <div className="absolute left-8 bottom-20 z-20">
        <button className="px-8 py-3 bg-cyan-500/70 hover:bg-cyan-500/90 text-white font-medium tracking-wider rounded-lg transition-all backdrop-blur-sm border border-cyan-400/50">
          VIEW PROJECTS
        </button>
      </div>

      <style jsx>{`
        .glitch-text {
          position: relative;
          text-shadow: 2px 2px 0 rgba(34, 211, 238, 0.4), -2px -2px 0 rgba(236, 72, 153, 0.4);
          animation: glitch-skew 3s infinite;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: 'HARSH VAISHYA';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          white-space: pre-line;
        }

        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 rgba(34, 211, 238, 0.7);
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 rgba(236, 72, 153, 0.7);
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 3s infinite linear alternate-reverse;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(34, 211, 238, 0.1) 2px,
            rgba(34, 211, 238, 0.1) 4px
          );
          mix-blend-mode: overlay;
        }

        @keyframes glitch-anim {
          0% { clip: rect(31px, 9999px, 94px, 0); transform: translateX(2px); }
          5% { clip: rect(70px, 9999px, 71px, 0); transform: translateX(-2px); }
          10% { clip: rect(2px, 9999px, 32px, 0); transform: translateX(3px); }
          15% { clip: rect(87px, 9999px, 14px, 0); transform: translateX(-1px); }
          20% { clip: rect(6px, 9999px, 78px, 0); transform: translateX(2px); }
          25% { clip: rect(55px, 9999px, 49px, 0); transform: translateX(-3px); }
          30% { clip: rect(91px, 9999px, 23px, 0); transform: translateX(1px); }
          35% { clip: rect(12px, 9999px, 85px, 0); transform: translateX(-2px); }
          40% { clip: rect(44px, 9999px, 3px, 0); transform: translateX(3px); }
          45% { clip: rect(77px, 9999px, 56px, 0); transform: translateX(-1px); }
          50% { clip: rect(20px, 9999px, 88px, 0); transform: translateX(2px); }
          55% { clip: rect(63px, 9999px, 41px, 0); transform: translateX(-2px); }
          60% { clip: rect(8px, 9999px, 72px, 0); transform: translateX(1px); }
          65% { clip: rect(95px, 9999px, 28px, 0); transform: translateX(-3px); }
          70% { clip: rect(37px, 9999px, 61px, 0); transform: translateX(2px); }
          75% { clip: rect(84px, 9999px, 16px, 0); transform: translateX(-1px); }
          80% { clip: rect(50px, 9999px, 74px, 0); transform: translateX(3px); }
          85% { clip: rect(25px, 9999px, 90px, 0); transform: translateX(-2px); }
          90% { clip: rect(68px, 9999px, 45px, 0); transform: translateX(1px); }
          95% { clip: rect(15px, 9999px, 82px, 0); transform: translateX(-3px); }
          100% { clip: rect(52px, 9999px, 35px, 0); transform: translateX(2px); }
        }

        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 40px, 0); transform: translateX(-2px); }
          5% { clip: rect(22px, 9999px, 83px, 0); transform: translateX(3px); }
          10% { clip: rect(58px, 9999px, 12px, 0); transform: translateX(-1px); }
          15% { clip: rect(4px, 9999px, 76px, 0); transform: translateX(2px); }
          20% { clip: rect(89px, 9999px, 29px, 0); transform: translateX(-3px); }
          25% { clip: rect(33px, 9999px, 64px, 0); transform: translateX(1px); }
          30% { clip: rect(71px, 9999px, 18px, 0); transform: translateX(-2px); }
          35% { clip: rect(46px, 9999px, 92px, 0); transform: translateX(3px); }
          40% { clip: rect(9px, 9999px, 53px, 0); transform: translateX(-1px); }
          45% { clip: rect(81px, 9999px, 36px, 0); transform: translateX(2px); }
          50% { clip: rect(27px, 9999px, 69px, 0); transform: translateX(-3px); }
          55% { clip: rect(60px, 9999px, 21px, 0); transform: translateX(1px); }
          60% { clip: rect(96px, 9999px, 47px, 0); transform: translateX(-2px); }
          65% { clip: rect(39px, 9999px, 79px, 0); transform: translateX(3px); }
          70% { clip: rect(73px, 9999px, 11px, 0); transform: translateX(-1px); }
          75% { clip: rect(16px, 9999px, 86px, 0); transform: translateX(2px); }
          80% { clip: rect(54px, 9999px, 24px, 0); transform: translateX(-3px); }
          85% { clip: rect(88px, 9999px, 62px, 0); transform: translateX(1px); }
          90% { clip: rect(30px, 9999px, 93px, 0); transform: translateX(-2px); }
          95% { clip: rect(67px, 9999px, 38px, 0); transform: translateX(3px); }
          100% { clip: rect(19px, 9999px, 75px, 0); transform: translateX(-1px); }
        }

        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          10% { transform: skew(0deg); }
          11% { transform: skew(2deg); }
          12% { transform: skew(0deg); }
          30% { transform: skew(0deg); }
          31% { transform: skew(-1deg); }
          32% { transform: skew(0deg); }
          60% { transform: skew(0deg); }
          61% { transform: skew(1.5deg); }
          62% { transform: skew(0deg); }
          100% { transform: skew(0deg); }
        }

        .circuit-border {
          position: relative;
        }
        
        .circuit-border::before,
        .circuit-border::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border: 1px solid rgba(34, 211, 238, 0.4);
        }
        
        .circuit-border::before {
          top: -1px;
          left: -1px;
          border-right: none;
          border-bottom: none;
        }
        
        .circuit-border::after {
          bottom: -1px;
          right: -1px;
          border-left: none;
          border-top: none;
        }

        .circuit-card {
          position: relative;
        }
        
        .circuit-card::before,
        .circuit-card::after {
          content: '';
          position: absolute;
          background: rgba(34, 211, 238, 0.2);
        }
        
        .circuit-card::before {
          width: 40px;
          height: 1px;
          top: 0;
          right: 20px;
        }
        
        .circuit-card::after {
          width: 1px;
          height: 40px;
          right: 0;
          top: 20px;
        }
      `}</style>
    </div>
  );
}