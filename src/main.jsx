import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Flower2, Music2, VolumeX, Volume2, Stars, MailOpen, Gift, ArrowDown, Cake, Camera, X, Play, Pause } from 'lucide-react';
import './styles.css';

const memories = [
  { image: '/images/memory-1.jpg', date: 'A little moment', caption: 'One of those memories I wish I could pause forever.' },
  { image: '/images/memory-2.jpg', date: 'My favourite smile', caption: 'Somehow, you make ordinary days feel special.' },
  { image: '/images/memory-3.jpg', date: 'Us, being us', caption: 'My kind of happiness has a lot to do with you.' },
  { image: '/images/memory-4.jpg', date: 'A memory to keep', caption: 'If I could collect moments, I would keep collecting you.' },
];
const petals = Array.from({ length: 18 }, (_, i) => ({ id: i, left: `${(i * 37 + 9) % 100}%`, delay: `${(i % 7) * -1.8}s`, duration: `${13 + (i % 8) * 2}s`, size: `${9 + (i % 4) * 4}px`, rotate: `${i * 23}deg` }));

function Petals({ count = 18 }) {
  return <div className="petal-layer" aria-hidden="true">{petals.slice(0, count).map(p => <span key={p.id} className="petal" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: `calc(${p.size} * 1.45)`, transform: `rotate(${p.rotate})` }} />)}</div>;
}
function SectionEyebrow({ children }) { return <div className="eyebrow"><span />{children}<span /></div>; }
function PhotoCard({ item, index, onOpen }) {
  const [failed, setFailed] = useState(false);
  return <motion.button className={`polaroid polaroid-${index + 1}`} onClick={() => onOpen(item)} whileHover={{ y: -9, rotate: 0, scale: 1.025 }} whileTap={{ scale: .98 }} aria-label={`Open memory: ${item.date}`}>
    <div className="photo-frame">
      {!failed ? <img src={item.image} alt={item.date} onError={() => setFailed(true)} /> : <div className="photo-placeholder"><Camera size={28}/><span>Add your photo here</span><small>{item.image.replace('/images/', '')}</small></div>}
      <span className="photo-heart"><Heart size={15} fill="currentColor" /></span>
    </div>
    <span className="polaroid-caption">{item.date}</span>
    <span className="polaroid-note">tap to open ✦</span>
  </motion.button>;
}
function App() {
  const [opened, setOpened] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [bouquetOpen, setBouquetOpen] = useState(false);
  const [cakeOpen, setCakeOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [activeMemory, setActiveMemory] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const memoryRef = useRef(null);
  const moveNo = () => {
    setNoCount(c => c + 1);
    setNoPosition({ x: (Math.random() - .5) * 180, y: (Math.random() - .5) * 110 });
  };
  const celebrate = () => { setCakeOpen(true); setShowConfetti(true); window.setTimeout(() => setShowConfetti(false), 5000); };
  const scrollToMemories = () => memoryRef.current?.scrollIntoView({ behavior: 'smooth' });

  return <main>
    <div className="ambient-glow glow-one"/><div className="ambient-glow glow-two"/>
    <Petals />
    <button className="sound-toggle" onClick={() => setMusicOn(v => !v)} aria-label={musicOn ? 'Turn sound off' : 'Turn sound on'} title="Sound is a visual toggle placeholder; add your own music file to enable audio"><span className="sound-icon">{musicOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}</span><span>{musicOn ? 'Sound on' : 'Sound off'}</span></button>

    <AnimatePresence>
      {!opened && <motion.section className="intro-screen" key="intro" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }} transition={{ duration: .8 }}>
        <div className="intro-stars"><Sparkles/><span>✦</span><Stars/></div>
        <motion.div className="envelope-wrap" initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
          <div className="envelope-glow" />
          <button className="envelope" onClick={() => setOpened(true)} aria-label="Open your birthday surprise">
            <div className="envelope-back"/><div className="letter-peek"><Heart fill="currentColor" size={22}/><span>For my favourite person</span></div><div className="envelope-flap"/><div className="envelope-front"/><div className="wax-seal"><Heart fill="currentColor" size={22}/></div>
          </button>
        </motion.div>
        <motion.p className="intro-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>A LITTLE SOMETHING, MADE WITH LOVE</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}>Hey, <em>Krituu...</em></motion.h1>
        <motion.p className="intro-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85 }}>Someone has a tiny universe waiting just for you.</motion.p>
        <motion.button className="pill-button primary" onClick={() => setOpened(true)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}><MailOpen size={16}/> Open your surprise <Heart size={15} fill="currentColor"/></motion.button>
        <p className="intro-footnote">best opened slowly, with a little smile ♡</p>
      </motion.section>}
    </AnimatePresence>

    {opened && <motion.div className="site-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8 }}>
      <section className="hero section-pad">
        <div className="hero-orbit orbit-a"/><div className="hero-orbit orbit-b"/>
        <div className="hero-flower flower-left">✿</div><div className="hero-flower flower-right">❀</div>
        <motion.div className="hero-heart" animate={{ scale: [1, 1.08, 1], y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><Heart fill="currentColor" strokeWidth={1}/><span>for you</span></motion.div>
        <SectionEyebrow>THE WORLD IS A LITTLE SOFTER WITH YOU IN IT</SectionEyebrow>
        <motion.h1 initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .15 }}>Happy Birthday,<br/><em>Krituu</em><span className="hero-period">.</span></motion.h1>
        <motion.p className="hero-subtitle" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .3 }}>To the girl who makes my favourite memories<br className="desktop-only"/> without even trying.</motion.p>
        <motion.button className="pill-button outline" onClick={scrollToMemories} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}>A little walk through us <ArrowDown size={15}/></motion.button>
        <div className="hero-bottom-note"><span>SCROLL A LITTLE</span><div className="scroll-line"/></div>
      </section>

      <section className="intro-note section-pad">
        <SectionEyebrow>BEFORE ANYTHING ELSE</SectionEyebrow>
        <motion.div className="note-card" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }}>
          <span className="note-quote">“</span><p>Today, the world gets to celebrate you.<br/>But I get to celebrate the little things that make you <em>you.</em></p><span className="note-signature">— someone who adores you ♡</span>
          <div className="note-decoration">✿</div>
        </motion.div>
      </section>

      <section className="memories section-pad" ref={memoryRef}>
        <SectionEyebrow>OUR LITTLE COLLECTION</SectionEyebrow>
        <h2>Moments I’d <em>keep forever</em></h2>
        <p className="section-lead">A few little snapshots, because some feelings deserve more than a camera roll.</p>
        <div className="memory-grid">{memories.map((item, i) => <PhotoCard key={item.image} item={item} index={i} onOpen={setActiveMemory}/>)}</div>
        <p className="memory-hint"><Sparkles size={14}/> Tap any photo to open the memory <Sparkles size={14}/></p>
      </section>

      <section className="flower-break section-pad">
        <div className="flower-art" aria-hidden="true"><span className="stem stem-one"/><span className="stem stem-two"/><span className="stem stem-three"/><span className="bloom bloom-one">✿</span><span className="bloom bloom-two">✿</span><span className="bloom bloom-three">❀</span><span className="leaf leaf-one"/><span className="leaf leaf-two"/><span className="leaf leaf-three"/></div>
        <p className="flower-quote">If I could give you one thing in this world,<br/>it would be the ability to see yourself <em>through my eyes.</em></p>
        <p className="flower-sub">Maybe then you’d understand why you’re so special to me.</p>
      </section>

      <section className="letter-section section-pad">
        <SectionEyebrow>A LETTER, JUST FOR YOU</SectionEyebrow>
        <h2>Some things are better <em>said slowly.</em></h2>
        <motion.div className={`letter-card ${letterOpen ? 'letter-open' : ''}`} layout>
          <div className="letter-top"><span>MY DEAREST KRITHIKA</span><Heart size={17} fill="currentColor"/></div>
          <div className="letter-paper">
            {!letterOpen ? <><div className="letter-seal"><Heart fill="currentColor"/></div><p className="letter-teaser">There are a few things I wanted you to know...</p><button className="pill-button primary" onClick={() => setLetterOpen(true)}>Read your letter <MailOpen size={15}/></button></> : <motion.div className="letter-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7 }}>
              <p>My Krituu,</p>
              <p>Happy birthday to the girl who makes even the simplest moments feel like something worth remembering. I don’t know if I say it enough, but having you in my life is one of those things I’m quietly, endlessly grateful for.</p>
              <p>I hope this new year brings you the kind of happiness that stays, the kind of love that feels safe, and a hundred little reasons to smile when you least expect them. I hope you never forget how wonderful you are — not just today, when everyone is celebrating you, but on the ordinary days too.</p>
              <p>If I could wrap up a feeling and give it to you, it would be the feeling I get when I see you happy. That’s the kind of magic I wish for you, today and always.</p>
              <p>Keep being your beautiful, slightly impossible-to-describe self. The world is luckier with you in it.</p>
              <p className="letter-signoff">With all my love, always <span>♥</span></p>
              <p className="letter-small-note">P.S. You deserve more than a website. But I hope this makes you smile. ♡</p>
              <button className="text-button" onClick={() => setLetterOpen(false)}>Fold the letter ↑</button>
            </motion.div>}
          </div>
          <div className="letter-bottom"><span>MADE WITH LOVE</span><span>♡</span><span>JUST FOR YOU</span></div>
        </motion.div>
      </section>

      <section className="bouquet-section section-pad">
        <div className="bouquet-copy"><SectionEyebrow>FLOWERS, WITHOUT A REASON</SectionEyebrow><h2>A little bouquet<br/>for <em>my favourite girl.</em></h2><p>Real flowers fade. These are yours to keep for as long as you want.</p><button className="pill-button primary" onClick={() => setBouquetOpen(v => !v)}>{bouquetOpen ? 'Hide the bouquet' : 'Accept your flowers'} <Flower2 size={16}/></button></div>
        <motion.div className={`bouquet-illustration ${bouquetOpen ? 'bouquet-bloomed' : ''}`} animate={bouquetOpen ? { scale: [1, 1.04, 1] } : {}} transition={{ duration: .8 }}>
          <div className="bouquet-wrap"><span className="bouquet-ribbon"/><span className="bouquet-stem bs1"/><span className="bouquet-stem bs2"/><span className="bouquet-stem bs3"/><span className="rose r1">✿</span><span className="rose r2">✿</span><span className="rose r3">✿</span><span className="rose r4">❀</span><span className="rose r5">✿</span><span className="bouquet-leaf bl1"/><span className="bouquet-leaf bl2"/><span className="bouquet-leaf bl3"/><span className="bouquet-leaf bl4"/></div>
          <AnimatePresence>{bouquetOpen && <motion.div className="bouquet-message" initial={{ opacity: 0, y: 12, scale: .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }}><Heart fill="currentColor" size={17}/> A flower for every reason you make me smile.</motion.div>}</AnimatePresence>
        </motion.div>
      </section>

      <section className="playful-section section-pad">
        <div className="playful-card"><div className="playful-spark">✧</div><SectionEyebrow>ONE VERY IMPORTANT QUESTION</SectionEyebrow><h2>Will you keep being <em>this wonderful?</em></h2><p className="section-lead">Careful. One of these buttons is a little shy. ♡</p>
          <div className="answer-buttons"><button className="pill-button primary" onClick={() => { setShowConfetti(true); window.setTimeout(() => setShowConfetti(false), 3500); }}>Of course, silly! <Heart size={15} fill="currentColor"/></button><motion.button className="pill-button runaway" animate={{ x: noPosition.x, y: noPosition.y }} transition={{ type: 'spring', stiffness: 320, damping: 16 }} onMouseEnter={moveNo} onTouchStart={(e) => { e.preventDefault(); moveNo(); }} onClick={moveNo}>No 🙈</motion.button></div>
          <p className="tiny-tease">{noCount > 0 ? ['Hehe, almost! 😌', 'That button has other plans 🌸', 'Okay, okay… you win 💗'][Math.min(noCount - 1, 2)] : 'Psst… try catching the “No” button.'}</p>
        </div>
      </section>

      <section className="birthday-finale section-pad">
        <div className="finale-stars">✦　✧　✦　✧　✦</div><SectionEyebrow>AND ONE LAST THING...</SectionEyebrow><h2>Make a wish, <em>birthday girl.</em></h2><p>Close your eyes for a second. Think of something your heart really wants.</p>
        <motion.button className={`cake-button ${cakeOpen ? 'cake-lit' : ''}`} whileHover={{ y: -5 }} whileTap={{ scale: .97 }} onClick={celebrate} aria-label="Light the birthday candles">
          <div className="cake-plate"/><div className="cake-tier tier-bottom"/><div className="cake-tier tier-top"/><div className="cake-icing"/><div className="cake-candle candle-one"><span className="flame"/></div><div className="cake-candle candle-two"><span className="flame"/></div><div className="cake-candle candle-three"><span className="flame"/></div><span className="cake-cherry">♥</span>
        </motion.button>
        <button className="pill-button primary wish-button" onClick={celebrate}><Sparkles size={16}/> {cakeOpen ? 'Make another wish' : 'Light the candles'}</button>
        <AnimatePresence>{cakeOpen && <motion.div className="wish-message" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><span>♡</span><p>May this year be gentle with your heart, generous with its joy, and full of moments that remind you how loved you are.</p><strong>Happy birthday, Krituu. You deserve the whole universe.</strong></motion.div>}</AnimatePresence>
        {showConfetti && <div className="confetti-layer" aria-hidden="true">{Array.from({ length: 70 }, (_, i) => <i key={i} style={{ left: `${(i * 47) % 100}%`, animationDelay: `${(i % 12) * .08}s`, animationDuration: `${2.1 + (i % 9) * .18}s`, rotate: `${i * 29}deg` }}/>)}</div>}
        <div className="finale-bottom"><Heart size={14} fill="currentColor"/> made with a little extra love <Heart size={14} fill="currentColor"/></div>
      </section>
      <footer className="footer"><span>FOR KRITHIKA, ALSO KNOWN AS KRITUU</span><span>one page, a thousand feelings ♡</span></footer>
    </motion.div>}

    <AnimatePresence>{activeMemory && <motion.div className="memory-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveMemory(null)}><motion.div className="memory-modal-card" initial={{ scale: .88, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .92 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setActiveMemory(null)} aria-label="Close memory"><X size={18}/></button><img src={activeMemory.image} alt={activeMemory.date} onError={e => { e.currentTarget.style.display = 'none'; }}/><div className="modal-memory-copy"><span>{activeMemory.date}</span><p>{activeMemory.caption}</p><Heart size={18} fill="currentColor"/></div></motion.div></motion.div>}</AnimatePresence>
  </main>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
