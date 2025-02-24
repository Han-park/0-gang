import fs from 'fs';
import path from 'path';

// Define member type
export interface Member {
  name: string;
  koreanName: string;
  role: string;
  company: string;
  koreanCompany: string;  // Add Korean company name
  imageUrl: string;
  snsUrl?: string;
  description: string;  // Korean description
  englishDescription: string;  // English description
  detailContent?: string;  // Korean version
  englishDetailContent?: string;  // English version
  isAlumni: boolean;  // Add this field to distinguish current and alumni members
  companyWebsiteUrl?: string;
}

// Static member data
const memberData: Member[] = [
  {
    name: "Evan Gil",
    koreanName: "길상현",
    role: "CTO/Co-Founder",
    company: "Munice Inc.",
    koreanCompany: "무니스",
    imageUrl: "/image/member/evan.jpg",
    description: "세상에 온전한 쉼을 주고 싶은 창업가. 국내에서 가장 빠르게 성장한 수면 서비스를 운영하고 있으며, 글로벌 진출을 준비하고 있습니다.",
    englishDescription: "An entrepreneur who wants to give complete rest to the world. Running Korea's fastest-growing sleep service and preparing for global expansion.",
    detailContent: `안녕! 

나는 "세상에 온전한 쉼을 주고 싶은" 길상현이야 :)

지금은 무니스라는 스타트업에서 "좋은 수면이 당연한 세상"을 만들고 있어.

국내에서 가장 빠르게 성장한 수면 서비스를 운영하고 있고, 이제는 글로벌 진출을 준비하고 있어!  

나는 재즈같은 사람이야.

재즈는 어디에서 틀어도 자연스럽고, 원하는 바이브에 따라 환경을 조화롭게 만들어주는데, 나는 그런 역할을 잘하는 사람이야. 새로운 환경에 잘 스며들고, 사람들에게 친근하게 다가가는걸 잘하는것 같아. 

내가 추구하는 삶도 재즈와 비슷한 점이 많아. 평범함, 똑같음, 지루함과는 거리가먼 유쾌하고, 독특함을 추구하는 삶을 살고자 해!  

실제로 재즈도 많이 좋아해 :)

내가 대장간에 들어온 이유는 성장하고 싶기 때문이야. 

대장간은 나를 계속 새로운 환경에 노출시키고, 새로운 관점으로 문제를 접근하도록 도와주고, 내가 계속 성장하고 싶도록 다른 형제들이 나를 푸쉬하고 응원해줘.

너는 어떤 이유로 대장간에 들어오고 싶어?

내가 어떤 도움을 줄 수 있을지 궁금하다!`,
    englishDetailContent: `Hi there!

I'm Evan Gil, who wants to "give complete rest to the world" :)

Currently, I'm building "a world where good sleep is the norm" at a startup called Munice.

We're running Korea's fastest-growing sleep service, and now we're preparing for global expansion!

I'm like jazz.

Just as jazz naturally fits anywhere and harmonizes with the environment according to the desired vibe, I'm good at that role. I blend well into new environments and am good at approaching people in a friendly way.

My life pursuits are similar to jazz in many ways. I aim to live a cheerful and unique life, far from ordinary, sameness, and boredom!

I actually love jazz too :)

I joined Daejangang because I want to grow.

Daejangang continuously exposes me to new environments, helps me approach problems from new perspectives, and my fellow members push and encourage me to keep growing.

Why do you want to join Daejangang?

I'm curious about how I can help you!`,
    isAlumni: false
  },
  {
    name: "Han Park",
    koreanName: "박종한",
    role: "Founder",
    company: "CFP & Co.",
    koreanCompany: "CFP & Co.",
    companyWebsiteUrl: "https://cfp.han-park.info/",
    snsUrl: "https://www.instagram.com/jonghan_grida/",
    imageUrl: "/image/member/han.jpg",
    description: "커뮤니티를 중심으로 하는 라이프스타일 테크 스튜디오 CFP & Co.의 설립자. 아티스트와 기업가를 지지하는 비전을 가지고 있다.",
    englishDescription: "Recently founded a Community-First lifestyle tech studio, CFP & Co. Has a vision to support artists and entrepreneurs.",
    detailContent:
    
    `AI의 힘을 빌려 Community-First Projects 를 하고 있다. 어릴 때부터 학생회, 스터디 등의 커뮤니티를 만들고 키워왔다.

디자이너, 개발자, 콘텐츠 제작자로 일하는 등 제네럴리스트에 가까운 성향을 가지고 있다.

2030년 전에 캘빈클라인 모델이 되는 것이 목표이다.

Evan과 함께 대장간 2호실 멤버로서 비주얼을 담당하고 있다.

대장간에서 가장 새로운 사람에 대한 낯가림이 적은 친구이다.

New Aesthetica 라는 이름의 에세이 블로그를 쓰고 있다.`,
    englishDetailContent: `I am working on Community-First Projects with the power of AI. Since childhood, I have created and nurtured communities such as student councils and study groups.

I have a generalist tendency, working as a designer, developer, and content creator.

My goal is to become a Calvin Klein model by 2030.

I am responsible for visuals as a member of Room 2 at Daejangang alongside Evan.

I am a friend who has the least hesitation towards the newest member of Daejangang.

I write an essay blog called New Aesthetica.`,
    isAlumni: false
  },
  {
    name: "Seokbeom Hong",
    koreanName: "홍석범",
    role: "Co-founder",
    company: "Naeyruri Inc.",
    koreanCompany: "내이루리",
    imageUrl: "/image/member/seokbeom.jpg",
    description: "소셜벤쳐 내이루리 공동창업자. 시니어 일자리 사업을 통해 연 10~15억의 시니어 일자리 소득을 창출하고 있습니다.",
    englishDescription: "Co-founder of social venture Naeyruri. Creating annual senior employment income of 1-1.5 billion won through senior job creation business.",
    detailContent: `**이 글을 보는 사람 안녕!**

대장간에서 나는 요리사이자 PR담당이자 행동파를 담당하고 있어 ^^

**'행동하지 않으면 변하지 않는다.'**

고등학교 때 16억명을 위협하는 기아가, 자연재해보다 인재에 가까움을 깨닫고, 인재로부터 발생한 사회 문제를 해결하고 싶다고 생각하게 되었다. 

국제기구를 한동안 꿈으로 가지고 있었지만, UN마저 거대 자금 없이는 돌아갈 수 없는 구조임을 깨닫고 '소셜밴쳐'루트로 눈을 돌리게 되었다.대학교에 오자마자 소셜 비즈니스를 바로 시작하고자 했지만, 즐겁게 노느라 약 2년을 학교생활에 올인하며 잠시 꿈과 멀어졌었다. 

그러던 도중 조선 양반들이 공부만하고 행동하지 못하는 혐오스러운 양태가 계속 머리에 아른거려, 뭐라도 해야겠다 싶어 한국 노인 고령화 문제에 집중 연구를 시작하였다.

1달 정도 자료를 수집하고, 독거노인 분들을 뵈러 다니던 도중, 
280만명을 위한 시니어 일자리를 만들겠다는 소셜벤쳐 실버라이닝을 알게 되었고,

**"급여 하나도 필요 없으니까, 군대가기 전 날까지 일 할테니까, 함께 일하고 싶습니다."**
라는 문장으로 내 뜻을 전달했고

3달 일하고 입대할 계획이 현재는 군대, 학교를 모두 미루고

**3년째 소셜벤쳐 내이루리(주) 공동창업자로서 시니어 일자리 사업을 해 나가고 있다.**

덕에 현재는 연에 약 10~15억에 달하는 시니어 일자리 소득을 만들고 있다.`,
    englishDetailContent: `**Hello to whoever is reading this!**

At Daejangang, I serve as the chef, PR manager, and action-taker! ^^

**'Without action, there is no change.'**

In high school, I realized that hunger, which threatens 1.6 billion people, is more of a human-made disaster than a natural one. This made me want to solve social problems arising from human causes.

While I dreamed of working for international organizations for a while, I realized that even the UN couldn't operate without massive funding. This led me to turn towards the 'social venture' route. Although I wanted to start a social business right after entering university, I spent about two years fully immersed in school life, temporarily distancing myself from my dream.

Then, constantly reminded of how Joseon scholars' tendency to study without taking action was repulsive, I decided to do something and began focusing on Korea's elderly aging problem.

After about a month of collecting data and visiting elderly people living alone, I discovered Silverlining, a social venture aiming to create jobs for 2.8 million seniors.

I expressed my intention with the message: **"I don't need any salary, I'll work until the day before military service, I want to work together."**

What started as a plan to work for 3 months before military service has now turned into postponing both military service and school.

**Now I'm in my third year as a co-founder of Naeyruri Inc., continuing our senior employment business.**

Thanks to this, we're currently generating annual senior employment income of about 1-1.5 billion won.`,
    isAlumni: false
  },
  {
    name: "Taehoon Kim",
    koreanName: "김태훈",
    role: "CEO",
    company: "Dotio Inc.",
    koreanCompany: "도티오",
    imageUrl: "/image/member/taehoon.jpg",
    description: "연쇄 창업가. 외주 에이전시와 카페 창업 경험을 거쳐 현재 세 번째 스타트업을 운영하고 있습니다.",
    englishDescription: "Serial entrepreneur. Has experience in subcontracting and cafe entrepreneurship. Currently running his third startup.",
    detailContent: `### 나는 미지의 바다와도 같은 인생을 최고로 항해하고 싶은 김태훈이다.

중학생 때 처음 코딩을 접했다. 신세계였고, 그 이후로 공부는 때려치우고 코딩만 했다. 교양은 책으로 쌓았다. 나는 학교가 주는 과제와 내 인생에서 필요한 공부 중에 항상 후자를 택했다. 

대학교 2학년 2학기 때는 외주 에이전시를 창업했다. 남는 공간에는 카페를 창업했다. (구글이나 네이버에 더도티오 라운지 검색 ㄱㄱㄱ) 

장사를 배웠고 사람을 배웠다. 유튜브에 나오지 않는 지식을 쌓았다. 

외주 에이전시를 하면서 스타트업에 대해 더 자세히 알게 됐다. 그들의 숭고한 정신을 동경했다. 그래서 모든 것을 때려치우고 스타트업을 시작했다.

첫판은 무참히 깨졌다. 두 번째 판도 깨졌다. 지금은 세 번째 판을 하고 있다. 확신했던 것은 깨질수록 이길 확률이 높아진다는 것이다. 그래서 난 포기할 생각이 없다.

길이 보이지 않는 미지의 바다에 나를 무참히 내던질 거다. 지금은 종이배지만 언젠간 찬란한 범선이 될 거다.

### 대장장이들이 너와 함께한다 🔨

시지프스는 그리스 신화 속 인물 중 하나로, 산 정상으로 바위를 올리는 벌을 받았다는 이야기로 유명하다. 시지프스는 올리면 굴러 내려오는 의미 없는 일들의 영원한 굴레에도 절망하지 않고, 힘차게 밀어올렸다. 영겁의 벌을 내린 신들에 대한 반항이었다.

우리의 삶도 결국 실패와 고통의 연속으로 점철되어 있다. 누군가는 이 삶의 부조리를 목격하고 바위를 굴리는 것을 포기하는 반면, 누군가는 시지프스처럼 허무함에 능동적으로 대항하며 바위를 신나게 굴린다.

이들은 하루 하루 챌린지하는 삶이 고난하다고 해서 늘어지지 않는다. 일이 너무 늦게 끝나 새벽에 들어오더라도 하루의 마침표로 글을 쓴다. 어떤 이들은 열띤 토론을 한다. 누군가는 빡세게 운동을 한다. 절대 고통에 굴복하지 않는다.

안락한 삶을 경멸하고, 성실하게 최고의 하루를 살아가는 아름다운 사람들이다. 고난을 사랑하며 이에 맞서는 것을 좋아하는 사람들이다. 온 열정을 바쳐서 하고 싶은 것을 하는 사람들이다.

우리와 함께 미지의 바다로 항해를 떠나길 원한다면 대장간에 승선했으면 좋겠다. 네가 바다에서 허우적대지 않도록 우리가 함께할 거라고 약속한다.`,
    englishDetailContent: `### I'm Taehoon Kim, who dreams of sailing the vast ocean of life.

I first learned to code in middle school. I was in a new world, and after that, I only focused on coding. I accumulated knowledge in liberal arts through books. I always chose the latter among the tasks given by school and the studies I needed for my life.

In my second year of college, I started a subcontracting agency. I also opened a cafe in the remaining space. (Search for "Daejangang" on Google or Naver)

I learned business and people. I accumulated knowledge that doesn't appear on YouTube.

I learned more about startups while doing subcontracting. I admired their noble spirit. That's why I started a startup without hesitation.

I lost the first game. I lost the second game. Now I'm playing the third game. I believe that the chance of winning increases as the games get lost. So I have no intention to give up.

I'll be mercilessly thrown into the vast ocean of life that I can't see. Now I'm just a piece of paper, but I'll become a shining star someday.

### The Daejangang craftsmen are with you 🔨

Zeus is one of the gods in Greek mythology. He is famous for lifting a rock to the top of the mountain. Zeus didn't despair even when the rock rolled down, and he pushed it up. It was a rebellion against the gods who sent the storm.

Our life is ultimately filled with failure and pain. While some people give up rolling the rock, others actively rebel against the emptiness and roll the rock vigorously.

These people don't get tired even if they face challenges every day. They write at the end of the day even if they come in the morning. Some people have heated discussions. Some people exercise vigorously. They never give up even in pain.

They are people who live happily and live a beautiful life, enjoying the challenges and fighting against them. They are people who devote all their passion to doing what they want to do.

If you want to sail with us to the vast ocean, we promise to be with you.`,
    isAlumni: false
  },
  {
    name: "Tony Kim",
    koreanName: "김태영",
    role: "Co-founder",
    company: "Athler",
    koreanCompany: "애슬러",
    imageUrl: "/image/member/tony.jpg",
    description: "4050 패션 커머스 애슬러의 Co-founder. 패스트벤처스 포트폴리오사인 바인드를 이끌고 있습니다.",
    englishDescription: "Co-founder of Athler, a fashion commerce platform for people in their 40s and 50s. Leading Bind, a Fast Ventures portfolio company.",
    detailContent: `4050 패션 커머스 [애슬러](https://athler.kr/home)를 만들고 있다. 그리고 키가 엄청 크다. 인스타그램 bio가 '키 큰 사람'일 정도로..

애슬러를 만드는 팀 바인드는 패스트벤처스 포폴사이다. 정말 Fast 하다.

엔지니어의 피가 흐른다. 테크와 전자기기를 좋아한다. 코딩 이야기하는 것도 좋아한다.

대학 시절 연극동아리 부장을 맡아 3년간 활동했다. 말할 때 온 몸을 사용해서 메시지를 전달한다.`,
    englishDetailContent: `4050 Fashion Commerce [Athler](https://athler.kr/home) is being created. And I'm really tall. Instagram bio is 'tall person' level..

The team bind for Athler is Fast Ventures Portfolio. Really Fast.

Engineer's blood flows. I like tech and electronic devices. I also like talking about coding.

I was the president of the theater club at the university for three years. I use my whole body to convey messages when I talk.`,
    isAlumni: false
  },
  {
    name: "Hyun-mo Yu",
    koreanName: "유현모",
    role: "Founder",
    company: "Wishes Inc.",
    koreanCompany: "위시즈",
    imageUrl: "/image/member/tyron.jpg",
    description: "선물 서비스 만드는 사람. ASML, 삼성전자 출신",
    englishDescription: "Founder of a gift service. Formerly at ASML and Samsung Electronics.",
    companyWebsiteUrl: "https://wishes.kr",
    detailContent: `대장간의 가장 막내이자 가장 형을 맡고 있다. 

24년 12월 쉽지 않은 과정을 거치고 대장간에 합류하게 됐다. 

25살부터 2년 반 ASML EUV 팀에서 외노자로, 

이후 2년 반은 삼성전자 반도체연구소 3nm 팀에서 노예 경험,

마지막으로 서울대 MBA를 졸업한 후,

반도체와 전혀 상관없는 선물하기 관련 스타트업 ‘위시즈’를 창업했다.

23년 7월에 시작해서, 24년엔 정말 힘들었지만,

5월 5일 생일인 나는, 5x5 = 25년은 다를 것이라 자기 최면 걸고 한걸음 한걸음 나아가는 중이다!

3월에는 새로운 프로덕트를 출시할 예정이다! 많은 관심과,, 결제,, 부탁한다.`,
    englishDetailContent: `I am the youngest and the oldest in Daejangang.

After going through a difficult process, I joined Daejangang in December 2024.

From the age of 25, I worked as a foreign worker in the ASML EUV team for two and a half years,

and then spent another two and a half years as a slave in the Samsung Electronics Semiconductor Research Institute's 3nm team.

Finally, after graduating with an MBA from Seoul National University,

I founded a startup called 'Wishes', which is completely unrelated to semiconductors.

I started in July 2023, and it was really tough in 2024,

but since my birthday is May 5th, I am convincing myself that 5x5 = 25 will be different, and I am taking one step at a time!

I plan to launch a new product in March! I would appreciate your interest and support.`,
    isAlumni: false
  },
  {
    name: "Eubin Kim",
    koreanName: "김유빈",
    role: "Co-founder",
    company: "Cylinder",
    koreanCompany: "실린더",
    imageUrl: "/image/member/eubin.jpg",
    description: "스토리에 글 올리는 혁신 호소인 (@eubinecto)",
    englishDescription: "An innovator to-be. I post random thounghts on instagram prolifically. Find me at @eubinecto.",
    detailContent: `유빈이의 인스타그램 스토리를 확인하세요.`,
    englishDetailContent: `Check out Eubin's instagram story.`,
    snsUrl: "https://www.instagram.com/eubinecto/",
    isAlumni: true
  },
  {
    name: "Gain Shin",
    koreanName: "신가인",
    role: "Founder",
    company: "Musa's Habit",
    koreanCompany: "무사의습관",
    imageUrl: "/image/member/gain.jpg",
    description: "단체 바디프로필 챌린지 '무사의습관' 창업자. 대장간의 전신인 5AM House와 AV의 파운더이자 현재 대장간의 PM.",
    englishDescription: "Founder of 'Musa's Habit', a group body profile challenge. He is also the founder of '5AM House' and 'AV', which are predecessors of Daejangang, and currently serves as the PM of Daejangang, designing its cultural elements.",
    detailContent: `타잔, 원시인, 빵쟁이

단체 바디프로필 챌린지 '무사의습관' 을 운영하고 있다.

대장간의 전신인 '5AM House'와 'AV(안암 빌런즈)'라는 이름을 가진 하우스의 파운더이며 나이에 관계없이 반말을 쓰는 문화라던가 파이팅 넘치는 분위기 등 대장간의 문화적 요소를 설계했다. 현재 대장간의 PM으로서 매주 진행하는 '대장간 위클리'를 담당하고 있다.

전설의 비즈니스맨 Alex Horomozi 의 추종자이다. 자유를 인생의 제1가치로 삼고 살고 있다.

반갑다! 내가 가장 소중히하는 가치들로 나를 소개해볼게

1. **자유** - 그 어떤 것에도 구애받지 않고 내가 하고 싶은 대로 하는 것. 나의 온전한 모습을 표출할 수 있는 것. 이런 순간에 가장 큰 행복을 느껴. 그래서 내가 최종적으로 추구하는 건 자유야. 이렇게 자유로우려면...

[... rest of Gain's detailed content ...]`,
    englishDetailContent: `Tarzan, primitive man, bread maker

I'm running a group body profile challenge called 'Musa's Habit'.

I'm the founder of '5AM House' and 'AV(Anam Villains)', which are the predecessors of Daejangang. I designed the cultural elements of Daejangang, such as using informal speech regardless of age and maintaining a high-energy atmosphere. Currently, I'm in charge of 'Daejangang Weekly' as the PM.

I'm a follower of the legendary businessman Alex Hormozi. I live with freedom as my primary value in life.

Nice to meet you! Let me introduce myself through the values I cherish most:

1. **Freedom** - Doing whatever I want without constraints. Being able to express my true self completely. I feel the greatest happiness in such moments. That's why my ultimate pursuit is freedom. To be this free...

2. **Confidence** - I believe you need confidence. Fully accepting and believing in yourself. The best way to gain confidence is to achieve your goals. My foolproof method for achieving goals is...

3. **Consistency** - I believe you can't fail if you create a system to move forward even a little bit by breaking down goals and keep doing it. I've always achieved my goals this way. That's why I'm extremely interested in 'routines' and 'habits' at a nerdy level, and I find people who put in consistent effort really cool. The best way to maintain consistency is...

4. **Relationships** - When you inevitably fall into slumps where your motivation drops and you doubt yourself, it's very hard to get out alone. Nothing motivates you more surely than when people around you hold you accountable, cheer you on, and lead by example. Fear of being rejected by the group is said to be one of the greatest fears humans can feel, and the desire to be with the people I love and respect most makes me never want to give up. For this to work properly, you need strong relationships, and for such relationships...

5. **Authenticity** is most important, I think. What do I want? What do I like and dislike? I believe deep relationships begin when you can share what you want and think just as they are, when your true self emerges.

My Life Journey:

1. Was praised a lot for mental math when young. Deeply believed I was a genius and would live an extraordinary life.
2. Followed the typical elite course: Mokdong kid - Daewon Foreign Language High School - Korea University
3. Next step was supposed to be joining a big company, but suddenly felt my life wouldn't be extraordinary that way
4. Left for a working holiday in Australia
5. Decided to start a business and returned to Korea
6. Won a startup competition, got excited and took a leave of absence, convinced two friends to do the same
7. **First attempt** - Smart mask vending machine. Got good at pitching and received tens of millions of won from competitions and government. Thought I was great at business then.
8. Gave up - Concluded this wasn't extraordinary either. Wasn't something I loved. Steve Jobs said you need to do what you love to do something great. Lesson: Need 10 years to do something great. To do something for 10 years, do what you love.
9. **Second attempt** - Party business since I love having fun. COVID was getting worse. 20+ people gatherings banned? No problem. 8+ people gatherings banned? We'll do it with 7. Pushed through somehow.
10. Gave up - COVID banned 4+ people gatherings. 3 people isn't a party. Lesson: Don't go against the times.
11. **Third attempt** - Share house business. Living together doesn't count as a gathering during COVID? Okay, let's make the most fun share house in the world.
12. Gave up - Wasn't profitable. Lesson: Do what you love + what makes money.
13. **Fourth attempt** - Fitness community. Love exercise and people spend a lot on health. First benchmark existing businesses to get the business basics right.
14. Progress - Achieved 10M won monthly revenue in 6 months. Currently aiming for 30M won monthly revenue. Got the business basics down. Excited about making it more fun and cool.
15. After 2 years - Felt limited by solo entrepreneurship.
16. Redefined freedom - True freedom isn't doing whatever I want through solo entrepreneurship, but gaining the confidence that I can do anything. And realized I actually prefer winning as a team.
17. Joined a winning team - Joined fitness startup 'BuffetSeoul'. Now planning to have fun growing while creating winning experiences with awesome people in a field I love.`,
    isAlumni: true
  },
  {
    name: "Hyeongang Jung",
    koreanName: "정현강",
    role: "CEO",
    company: "Naeyruri Inc.",
    koreanCompany: "내이루리",
    imageUrl: "/image/member/hyeongang.jpg",
    description: "소셜벤쳐 내이루리 공동창업자. 시니어 일자리 플랫폼 '옹고잉'과 시니어 커뮤니티 '부라보'를 운영하고 있습니다.",
    englishDescription: "Co-founder of social venture Naeyruri. Running 'Onggoing', a senior job platform, and 'BoraBo', a senior community.",

    detailContent: `모두들 반갑다! 🤛 🔥

대장간의 석범이와 함께 내이루리라는 회사를 창업한 정현강이라고 한다! 

나는 우리나라 시니어분들 자살율이 심각하다는 지표를 보고, 그 원인에 죽고 싶을 만큼 '돈' 없거나, '외롭다'는 문제를 풀 수 있는 솔루션 '일자리' 쪽에 집중을 하고 있다. 

첫 번째 서비스로 '[옹고잉](https://onggoing.co.kr/naeyil)'이라는 일자리가 필요한 시니어분들과 구인난이 심각한 정기배송 시장을 매칭한 '시니어 인력 기반 정기배송 대행 솔루션'을 운영하고 있다. 약 100명 가까이 되는 시니어분들을 고용하고 있다. 그리고 조금 더 나가 검증된 시니어분들을 공급하는 시니어 인력 공급 쪽으로도 확장하고 있다. 

두 번째로, 시니어분들이 '살아있음'이라는 감정 가지고 살았으면 해서, '부라보'라는 운동 인증 기반 시니어 커뮤니티를 운영하고 있다. 석범이가 매우 잘 운영을 해주고 있지! 

200명 규모의 파티를 열기도, 사막 250km를 7일 간 달리는 사막레이스를 달려보기도, 해발 3000미터 지대에 사는 파키스탄 고산지대에 컴퓨터 교실을 만들기도, 5,000미터급 히말라야를 두 번 오르기도.  

그리고 창업 하기로 결심한 지 5년 차다. 어제 열심히 살고, 오늘도 열심히 살고, 내일도 열심히 사는, 그런 목표 가지고 살고 있다. 

나는 대장간에서 오랫동안 거주하다가, 현재는 개인 사정으로 비거주 멤버로 활동하고 있다! 

IF 네가 대장간에 온다면, 같이 여러 이야기 나누어보자! 환영한다! 

> 회사 웹사이트 링크: https://onggoing.co.kr/
> 
> Insta: https://www.instagram.com/jhyeongang/`,
    englishDetailContent: `All, welcome! 🤛 🔥

This is Jae-gang Jung, who co-founded Naeyruri with Seokbeom Hong!

I'm focusing on the solution 'job' that can solve the problem that the suicide rate of our seniors in Korea is serious, which is either 'no money' or 'lonely' as a symptom.

The first service, '[Onggoing](https://onggoing.co.kr/naeyil)', which matches the needs of seniors and the severe job recruitment market for regular shipments, is operating. I'm employing about 100 seniors and also supplying slightly more verified seniors to the job supply side.

Second, I'm operating a senior community 'BoraBo' based on the feeling of 'alive' for seniors, who want to live with Seokbeom!

Seokbeom is doing a great job!

200 people party, 250km desert run, 3000m high altitude computer classroom in Pakistan's high altitude region, 5,000m Himalayas twice.

And I've been running this business for 5 years, living and working hard yesterday, today, and tomorrow, with the goal of living with this.

Now I'm living as a non-resident member because of personal circumstances!

If you come to Daejangang, let's talk about many things! Welcome!

> Company website link: https://onggoing.co.kr/
>
> Insta: https://www.instagram.com/jhyeongang/`,
    snsUrl: "https://www.instagram.com/jhyeongang/",
    isAlumni: true
  },
  {
    name: "Ong",
    koreanName: "송홍기",
    role: "CEO",
    company: "Cybernetics",
    koreanCompany: "사이버네틱스",
    imageUrl: "/image/member/ong.jpg",
    description: "노코드 전문가. 의공학을 전공하고 다양한 스타트업을 거치며 제품 개발과 성장에 기여하고 있습니다.",
    englishDescription: "No-code expert with a background in biomedical engineering. Contributing to product development and growth across various startups.",
    detailContent: `안녕 나는 여행가야
특히 비즈니스 게임에 관심이 많은!
다양한 분야에 관심이 많아서 연결짓고 배우고 새로운 걸 만들어내며 도전하는 것을 좋아해

의공학전공이고 전자약, 센서 쪽 연구를 하다가 가슴을 따라 스타트업씬에 들어오게 됐어! 
블루포인트, 히로인스, 보이노시스, 그로윙업, 하울링, 닥터솔크 등의 회사를 거쳤어! 

특히, 노코드라는 스킬셋을 강점으로 잘 활용 중이야. 
학회도 운영하고 외주도 하고 전자책도 쓰면서 노코드의 재미와 파워를 세상에 전달하고 있어`,
    englishDetailContent: `Hi, I'm a traveler.
I'm particularly interested in business games!
I like connecting and learning from various fields, creating new things, and challenging myself.

I'm studying mechanical engineering and researching electronic pills and sensors, but I ended up in the startup scene! I've worked at companies like Bluepoint, Hirons, Voyno, Groving, Houl, Doctor Solk, etc.

I'm particularly good at using the skill set called No Code. I'm also running a club and doing external projects and writing e-books to spread the fun and power of No Code to the world.`,
    isAlumni: true
  },
  {
    name: "Yonguk Kwon",
    koreanName: "권용욱",
    role: "Alumni",
    company: "Daejangang",
    koreanCompany: "대장간",
    imageUrl: "/image/member/yonguk.jpg",
    description: "2024년까지 대장간의 멤버로 활동했던 알럼나이입니다.",
    englishDescription: "Alumni of Daejangang who lived in Daejangang until the end of 2024.",
    detailContent: `*대장간은 나이 상관없이 평어를 쓰는 문화를 지향하고 있어! 그래서 조금 편하게 작성해봤어☺️

대장간에서 24년까지 살다가 24년 말 즈음에 졸업하게 된 권용욱이라고 해

편하게 말 걸어줘 :)`,
    englishDetailContent: `*Daejangang is a culture that values any age to write freely! So I wrote a little bit casually.

This is Yonguk Kwon, who lived in Daejangang until the end of 2024.

Please talk to me casually.`,
    isAlumni: true
  }
];

// Get member data with translations
export const getMemberContent = () => {
  return {
    ko: {
      currentMembersTitle: "멤버: 거주 중",
      alumniMembersTitle: "멤버: 알럼나이",
      members: memberData.map(member => ({
        ...member,
        company: member.koreanCompany,  // Use Korean company name
      })),
    },
    en: {
      currentMembersTitle: "Current House Members",
      alumniMembersTitle: "Alumni Members",
      members: memberData.map(member => ({
        ...member,
        description: member.englishDescription,
        detailContent: member.englishDetailContent || member.detailContent,
      })),
    },
  };
}; 