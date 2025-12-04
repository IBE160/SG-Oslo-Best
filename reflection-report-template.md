# Refleksjonsrapport - Programmering med KI

## 1. Gruppeinformasjon

**Gruppenavn:** SG - Oslo Best

**Gruppemedlemmer:**
- Marita Nilsen - marita.nilsen@himolde.no
- Abdullah Michael Moulay - abdullah.m.moulay@himolde.no
- Fernando Miguel Valle Prado - fernando.m.prado@himolde.no
- Jenny Løvik Brøyn - jenny.l.broyn@himolde.no

**Dato:** [DD.MM.2025]

---

## 2. Utviklingsprosessen

### (JENNY) 2.1 Oversikt over prosjektet
Dette prosjektet handler om å utvikle en applikasjon som skal bistå studenter ved Høgskoler og Universiteter. Applikasjonen tar inn CV, stillingsannonse og eventuelle instruksjoner som input, og genererer deretter et tilpasset søknadsbrev basert på denne informasjonen.

### (JENNY) 2.2 Arbeidsmetodikk
- Hvordan fordelte dere oppgaver?
Arbeidet i prosjektet ble organisert gjennom ansvarsområder og faste rutiner. Gruppen på fire personer, med to medlemmer i Molde og to i Oslo, bestemte tidlig at det å holde jevnlige ukentlige møter ville sikre tett samarbeid til tross for geografisk avstand. Siden gruppen har en erfaren utvikler, fikk vedkommende hovedansvaret for utviklings-delen av prosjektet, mens øvrige oppgaver ble fordelt slik at alle kunne bidra der de hadde mest kompetanse og engasjement.
- Hvilke verktøy brukte dere for samarbeid og hvordan det fungerte?
For samarbeid og kommunikasjon i de ukentlige møtene benyttet vi oss av Teams som primær kommunikasjonsplattform. Discord ble vurdert, men Teams ble valgt fordi flere hadde kjennskap til det. Gjennom Teams kunne vi enkelt dele dataskjerm, noe som gjorde det mulig for alle å følge arbeidet i sanntid og komme med innspill underveis. I tillegg ble Git brukt til versjonskontroll og koordinert utvikling, noe som sikret god oversikt og kontroll på endringer gjennom hele prosjektet.
- Hvordan brukte dere KI-verktøy i prosessen?
KI-verktøy hadde en viktig funksjon i prosessen, blant annet gjennom bruk av Gemini integrert i VS Code og Chat GPT som støtte til idéutvikling, feilsøking og gjennomføring av utviklingsoppgaver gjennom hele prosjektet.

### (JENNY) 2.3 Teknologi og verktøy
- Frontend: Next.js, React, Tailwind CSS
- Backend: Python, FastAPI
- Database: Supabase (PostgreSQL)
- KI-verktøy: Gemini CLI, GPT-5 Codex
- Andre verktøy: VS Code, BMAD, Teams


### (JENNY) 2.4 Utviklingsfaser

**Fase 1: Analyse**
I fase 1, analysefasen, begynte arbeidet med å utforme prosjektets proposal, der rammene og målene for prosjektet ble definert. Etter å ha lastet ned VS Code og integrert Gemini CLI og fått tilgang til BMAD-rammeverket, benyttet vi KI-agenten «analyse» ved brainstorming-øktene. Da resultatene fra disse øktene var gode nok, ble ideene kombinert med proposal-dokumentet, og analyse-agenten genererte deretter dokumentet product-brief.md. KI-verktøyet Gemini CLI, ble brukt til å identifisere aspekter ved proposalen som ellers kunne ha blitt oversett, og vi erfarte raskt at det var veldig enkelt å diskutere og utvide prosjektet til noe langt større enn opprinnelig planlagt. Brainstorming-delen ble strukturert ved hjelp av metodene «five whys», «six hats» og «what if». Alle promptene som ble brukt i disse sesjonene, er lagret i mappen `SG-Oslo-Best\prompt\project-brief\brainstorming`.

**Fase 2: Planlegging**
I fase 2, planleggingsfasen, utviklet vi PRD.md (Product Requirement Document), som deretter fungerte som grunnlag for arbeidet med UX-design. I denne delen av prosessen ble struktur, visuell stil og ønsket brukeropplevelse definert, og det ble laget mockups for å konkretisere konseptet og teste hvordan applikasjonen skulle se ut i praksis. Arbeidet ble gjennomført ved bruk av Gemini og med agentene «product master» og «ux-designer». Alle tilhørende prompter og KI-dialoger ble loggført i mappen `SG-Oslo-Best\.logging\requests`.

**Fase 3: Solutioning**
I fase 3, solutioningfasen, ble prosjektets arkitektur utarbeidet ved å definere hvilke kjerneteknologier applikasjonen skulle bygges på. Valideringen av dette tekniske oppsettet gikk overraskende bra, med 95% godkjenning på første forsøk. Dette valgte vi å beholde, selv om enkelte feilmeldinger antydet behov for ytterligere justeringer. I denne fasen utviklet vi epics og user stories og etablerte et oppsett for tesing ved hjelp av Playwright-rammeverket, GitHub Actions og et tilhørende CI-oppsett. Målet er å sikre at kodeendringer kan integreres regelmessig og testes automatisk for å avdekke feil tidlig. Arbeidet inkluderte også utforming av testscenarier, dokumentert i `SG-Oslo-Best\docs\test-design-high-value-stories.md`. Til slutt gjennomførte vi en «implementation readiness»-vurdering, der dokumentene PRD, UX-design, arkitektur og epics ble validert som klare for neste fase. Hele solutioningfasen ble gjennomført med aktiv bruk av Gemini CLI og agentene «architect», «product master» og «tea», og alle tilhørende KI-dialoger og prompter ble loggført i mappen`SG-Oslo-Best\.logging\requests`.

**Fase 4: implementation, utvikling**
I fase 4, implementasjonsfasen, bruker vi agenten «scrum master» (sm) for å lage til sprint plan. 

**(MICHEAL) Fase 2: Utvikling**
- [Hva gjorde dere i denne fasen?]
  - 
- [Hvordan brukte dere KI her? Husk å lagre promptene deres! Inkluder ALLE stegene dere gjorde.]
  - 

---

## 3. Utfordringer og løsninger

### 3.1 Tekniske utfordringer

**[v] Utfordring 1: Gratis version av Gemini**
- Problem:
  I prosjektarbeidet vårt oppstod det utfordringer ved å bruke gratisversjon av Gemini CLI. Spesielt knyttet til det å navigere i dialogen og manglende evne for Gemini å huske tidligere samtaler, prompt-strukturer og spørsmål. Dette førte til at kommunikasjonen med KI til tider ble tungvint og tidkrevende. Det ble også tydelig at gratisversjonen av Gemini CLI ikke alltid klarte å håndtere den nødvendige kompleksiteten og mengden forespørsler. 
- Løsning:
  Løsningen ble en kombinasjon av å «smøre seg» med god tålmodighet og at enkelte i gruppen valgte å oppgradere til den betalte versjonen av Gemini CLI, som tilbyr bedre kapasitet. Denne oppgraderingen ble en sentral teknisk beslutning for å sikre en stabil og funksjonell dataflyt, særlig i fullstack- og utviklingsfasen av prosjektet. 
- KI sin rolle:
  KI spilte både en problemløsende og en utfordrende rolle. Den kunne skape rot i prosjektet ved å genere kode som ikke samsvarte med øvrige filer, noe som resulterte i feil. Samtidig gjorde den omfattende dialogen det mulig å identifisere årsaken til problemene, og ved å sende detaljerte feilmeldinger tilbake til KI, kunne den rette feilene på en effektiv måte.

**(JENNY) Utfordring 2: Loop med Gemini**
- Problem:
  I arbeidet med prosjektet oppstod det flere situasjoner der Gemini CLI havnet i såkalt «loops», der KI gjentok de samme tilbakemeldingene og feilene uten å føre prosessen videre. Dette skjedde oftest i lengre dialoger der kontekstvinduet allerede var tungt belastet og førte til at KI mistet oversikt og begynte å repetere fremfor å bygge videre.
- Løsning:
  Løsningen bestod i å starte Gemini på nytt, formulere promptene mer presist og være tålmodige for å bryte «loops». I tillegg viste det seg effektivt å bytte på hvem som jobbet med Gemini, ettersom et mindre belastet kontekstvindu og mindre bruk av «free tier» ga bedre resultater. Et eksempel, vi opplevde under valideringen av UX-design at Gemini gjentok de samme feilene, selv etter at vi hadde rettet dem og restartet systemet. Problemet viste seg å være at Gemini genererte en helt ny valideringsprosess for hver forespørsel. Da vi byttet til en annen bruker med et mindre belastet kontekstvindu, gjennomførte Gemini valideringen uten problemer. 
- KI sin rolle:
  KI hadde både en positiv og negativ innvirkning når denne utfordringen oppsto. Den skapte tidvis utfordringer ved å gå inn i «loops», men på den andre siden sparte den gruppen for betydelig tid ved å forslå ulike løsninger. Uten KI ville vi vært nødt til å hente tilsvarende informasjon gjennom omfattende research på plattformer som Reddit, GitHub og Stack Overflow.

### (MARITA) 3.2 Samarbeidsutfordringer
[Utfordringer knyttet til teamarbeid og kommunikasjon]
- [Beskriv utfordringer og hvordan dere løste dem]
- Pro: delt skjerm på teams under ukentlig møter.
- Utfordrendende tidskjema, noen har fulltids jobb, andre fulltids student med deltids jobbe, og vanskelig å få finne tid som passet alle for å få et møte så alle får med selv fremskritene i prosjektet. Løsning: de som kunne møte møtes for å jobbe videre med prosjektet.
- Alle har ulike tilnærminger til hverdagen, men har alltid klart å legge til rette
- Jo nærmere tidfristen, jo flere møter har vi planlagt. 
- Utfordernde å skape en rutine
- Alle på gruppen hadde forskjellig erfaringer og kunnskap fra før. Noen har hatt mer behov for stegvis prosess, mens andre har ønsket å kjøre en raskere vei mot mål, da de har vært igjennom dette før.

### (JENNY) 3.3 KI-spesifikke utfordringer
I prosjektet oppstod flere KI-spesifikke utfordringer, knyttet til feil kodegenerering, misforståelser i dialogen og varierende kvalitet på svarene. Mange av disse problemene var de samme som tidligere beskrevet i utfordring 1 og 2, der både gratisversjonen av Gemini og «loops» i dialogen skapte hindringer for en effektiv arbeidsflyt. Disse utfordringene ble håndtert på samme måte som beskrevet under punktet «Løsning» over. 

- [Hvordan håndterte dere disse?]
Det innebar å starte KI-sesjoner på nytt, forbedre og presisere promptene, samt bytte bruker når kontekstvinduet var for belastet. I noen tilfeller var det også nødvendig å oppgradere til en betalt versjon av Gemini for å oppnå mer stabil ytelse. Disse tiltakene var avgjørende for å sikre fremdrift i arbeidet når KI enten låste seg i repetisjoner eller leverte inkonsistente resultater.

---

## 4. Kritisk vurdering av KI sin påvirkning

### (JENNY) 4.1 Fordeler med KI-assistanse

**Effektivitet og produktivitet:**
KI hadde en tydelig, men todelt innvirkning på arbeidshastigheten i prosjektet. På den ene siden førte utfordringene beskrevet i «3.1 Tekniske utfordringer» til at enkelte oppgaver tok lengre tid enn om de hadde blitt løst manuelt. På den andre siden ga KI en betydelig fordel, spesielt for gruppemedlemmer med mindre erfaring innen prosjektarbeid og utvikling. KI bidro med veiledning, forslag til løsninger og tydelig fremgangsmåte som gjorde det enklere å komme videre i prosjektet. Den økte også effektiviteten ved å håndtere validering av dokumenter, genererte alternativer og løste oppgaver som vanligvis krever mer tid og teknisk innsikt. I tillegg førte samarbeidet med KI til økt læring rundt bruken av GitHub, noe som igjen ga en bedre forståelse i en ryddig og effektiv arbeidsflyt gjennom prosjektet.

Flere oppgaver ble betydelig mer effektive med KI, som for eksempel utarbeidelsen av UX-design. Her kom KI med forslag til farge, layout og alternative visuelle løsninger, som gjorde det langt enklere for gruppen å ta beslutninger uten lange diskusjoner. I tillegg viste PDD-prosessen (Prompt Driven Development) seg å være svært effektiv. Ved å formulere presise og detaljerte prompter kunne KI generere avanserte komponenter som ellers ville krevd omfattende og tidkrevende manuelt arbeid. Dette inkluderte blant annet komplekse integrasjoner som SQLAlchemy ORM-tilkobling og strukturert JSON-resons (llm_service.py). Dette viste hvordan KI kunne akselerere tekniske utviklingen når promptene var tydelige og godt utformet.

**Læring og forståelse:**
Gjennom prosjektet lærte vi hvordan man integrerer Gemini i Visual Studio Code lokalt på egen pc, og erfarte hvor viktig det er å formulere tydelige og presise prompter for å få KI til å levere ønskede resultater. En arbeidsform som ofte omtales som «vibe coding». Vi fikk også god innsikt i hvordan ulike KI-agenter innenfor rammeverket BMAD-metoden fungerer, hvordan de kan brukes i ulike deler og faser av prosjektet, hvilke oppgaver de behersker, og når de er mest hensiktsmessige å bruke. Samlet ga dette oss en praktisk erfaring med BMAD-metoden og bedre forståelse av hvordan den kan brukes i fremtidige prosjekter.

KI bidro til økt forståelse av sentrale konsepter gjennom prosjektet. Valideringen av de ulike filene gjorde at vi måtte reflektere grundigere over egne valg og tenke flere steg frem i utviklingen. Innen UX-design ble dette veldig tydelig, der KI kom med visuelle forslag og strukturelle løsninger, noe som gjorde at vi måtte klargjøre hvordan applikasjonen faktisk skulle se ut og hvilke funksjonelle elementer den skulle inneholde. Ved å presentere ulike design hjalp KI oss med å se for oss applikasjonen i praksis, noe som både motivert gruppen og ga en klarere forståelse av hvordan sluttproduktet burde utformes.

**Kvalitet på koden:**
- [Hvordan påvirket KI kodekvaliteten?]
KI hadde en innflytelse på kodekvaliteten i prosjektet. Gemini leverte gjennomgående detaljerte forklaringer og velskrevne skript, noe som bidro til ryddigere og mer forståelig kode. Et eksempel fra backend-utviklingen viste hvordan KI kunne forenkle og forbedre eksisterende kode slik at den ble lettere å lese og vedlikeholde for andre utviklere. KI foreslo også en helhetlig strategi for feilhåndtering på tvers av backend og frontend, inkludert bruk av FastAPIs innebygde exception-system, React Error Boundaries, globale varslingssystemer og strukturert logging. Denne tilnærmingen bidro til en kraftigere applikasjon og ga gruppen bedre innsikt i god programvarepraksis.
* Backend (FastAPI): We'll use FastAPI's built-in exception handling to ensure that any errors from the server always return a predictable, standardized message in JSON format.
* Frontend (Next.js/React):
* We'll use React Error Boundaries to gracefully catch errors that happen during UI display, preventing the entire app from crashing.
* For errors coming from the backend (like invalid input), we'll use a global notification or "toast" system (Shadcn/UI has a great one) to show user-friendly messages.
* React Query will also help us manage errors specifically from our API calls.
* Logging: All significant errors will be recorded so developers can investigate them later (we'll pick a specific logging service soon).

### 4.2 Begrensninger og ulemper
[Reflekter over de negative aspektene]

**Kvalitet og pålitelighet:**
- [Eksempler på feil eller dårlige løsninger fra KI]
  - Vanskelig å vurdere hva som er en dårlig løsning siden 3 av 4 på gruppen ikke har så mye kunnskap om utviklingen fra før. 
  - Synes det har vært vanskelig å avgjøre hva som er en dårlig eller mindre dårlig kode/løsning siden erfaringen ikke strekker til. Dermed har flesteparten av oss stolt bl.a. på KIen for hva som er best for prosjektet. Vanligvis ville kanskje lærdommen vært å funnet kode ut ifra hva som finnes i  ulike kanaler, kommentarer og erfaring knyttet koden som er tilgjengelig.
- [Hvordan oppdaget og håndterte dere disse?]
  - Vi hadde en utvikler på gruppen som kvalitetssikret koden. Når koden ikke gikk i "riktig retning" var det en på gruppen som har tidligere kunnskap om utviklingen og kunne se feil med koden.
  - Og vha av valideringen av PRD, epics, UX-design og arkitetur.

**Avhengighet og forståelse:**
- [Ble dere for avhengige av KI?]
  - Ja, fordi det er det som er blir forspeilet av faglærer og faget, og pga. tidspress.
  - Mangel av kunnskap, avhengig av KI når utvikler vår ikke er tilstede.
  - Pga. hele faget er lagt opp til å bruke KI for å generere applikasjonen, så har vi vært avhengig.
- [Var det tilfeller hvor KI hindret læring?]
  - Vi vet ikke om KI har hindret læring fordi vi har som regel fulgt KI's anbefalinger i dialog, samt BIP sine anbefalinger fra forelesningene.
  - Reperer; at vi skal bruke KI til å lage dokumenter og koden, så det er ikke så mye læring fra den siden. Vi har kun spesifisert for KI hva vi vil ha.

**Kreativitet og problemløsning:**
- [Påvirket KI deres egen kreativitet?]
  - Cons: at Gemini rote med kodene, skriver ikke en utfyllende kode. Be den gjentakende ganger fylle ut koden.
  - Ja, fordi den gav oss valg og muligheter som vi ikke hadde tenkt på. Og igjen den stimulerer kreativitet, med at det gir forslag og ser at det er mulig, som igjen åpner døren for noe mer.
  - KI forespeilet en stor applikasjon med mange muligheter og funksjoner, men vi så oss nødt holdt oss til scopet for at prosjektet ikke skulle bli for stort og omfattende.
- [Eksempler på situasjoner hvor KI begrenset kreativ tenkning]
  - Ved push til github, laget ikke Backend-mappen, den sende alle filene utordnet. Mer aggresive med KI for å få den til å gjøre det vi ville.
  - Pga. lite erfaring ingen forventninger til applikasjonen og for oss når det kom KI som et nyttig verktøy og møter ikke på så mange begrensninger.

### 4.3 Sammenligning: Med og uten KI
[Reflekter over hvordan prosjektet ville vært uten KI]
- Hva ville vært annerledes?
  - Kodingen ville vært annerledes, og blitt mer manuell, ikke gått på automatikk.
  - Satsen (tiden) hadde vært større.
  - Applikasjonen hadde vært mye "enklere", flere features.
- Hvilke deler av prosjektet ville vært vanskeligere/lettere?
  - Hele prosjektet hadde vært vanskligere og mye mer tidkrevende.
  - Lettere: Fikset feilene for "hånd".
- Ville sluttresultatet vært bedre eller dårligere?
  - Uten KI ville vi kjent mer på tidspresset og med tanke på kun 6 uker til å utviklie prosjektet hadde sluttresultatet blitt dårligere. Med kun 6 uker er det ingen tvil på at KI har gjort det enklere.
  - Pga. manglende kunnskap/erfaring var det ingen garanti for at vi kunne blitt ferdig med prosjektet uten KI innen 6 uker.

### 4.4 Samlet vurdering
[Konklusjon: Hvordan påvirket KI sluttresultatet totalt sett?]
- Var KI en netto positiv eller negativ faktor?
  - KI var en netto poritiv faktor pga. tidspresset og manglende tidligere erfaring/kunnskap.
- Hva var den viktigste lærdommen om å bruke KI i utviklingsprosessen?
  - VELDIG tidskrevende og tidsoptimistist!
  - Viktigst lærdom; kunnskapen med å manager team av KI-agenter og hvordan selve prosessen fungerer når det kommer til å lage dokumenter og tilslutt selve applikasjonen. Alle forslagene KI gav ved utforming av kode og neste steg i prosjektet. 

---

## 5. Etiske implikasjoner

### (MARITA) 5.1 Ansvar og eierskap
- Hvem er ansvarlig for koden når KI har bidratt?
  - KI er en verktøy/hjelpemiddel som kan brukes, men ansavret og eieskaper til koden er personen(e) som sitter bak prompting av prosjektet. I dette tilfellet så har vi brukt BMAD-rammeverket som har stilt spørsmål til oss og vi har diskurtet og kommet fram til et svar, som KI igjen har brukt til å generere de nødvendige dokumentene.
- Hvordan sikrer man kvalitet når KI genererer kode?
  - Sikrer kvalitet ved god research av hva som har blitt gjort tidligere. Det vi har gjort er å sende dokumentene gjennom en validering/checkliste for å sikre at dokumentene har med det som trengs for at det skal være minst mulig misforståelser når KI skal generere koden.
- Diskuter spørsmål om opphavsrett og intellektuell eiendom
  - Det er vanskelig å vite hvor KI har hentet informasjonen fra. Det er derfor vansklig å referere til eller gi kreditt til den/de.
  - Er koden vår eller skolen? ref. til at KI snakker til "BIP".
  - Ideen og planleggings delen er informasjon hentet og diskuert med oss gruppen.

### (MARITA) 5.2 Transparens
- Bør det være transparent at KI er brukt?
  - Egen prosjekt: Prosjektet er å bruke KI til å produsere applikasjonen, så blir "dumt" å hele tiden refere til Gemini, men ved eventuell publiseringen hadde det gått ant å legge til et vannmerke/informasjon ("om oss") nederst i applikasjonen med beskjed om at "KI er brukt i produksjonen".
  - Generelt: ja, det skal referes til KI for å kunne kvalitetsikre hvor informasjonen er hentet fra. 
- Hvordan dokumenterer man KI sin bidrag?
  - Kilde henvisning og loggføring av promptingen og dialogen med KI.
- Hva er konsekvensene av å ikke være åpen om KI-bruk?
  - Konsekvens av å ikke være åpen om KI-bruk kan føre til plagiat. Det er mye som er lov, men det skal ikke være samme kode. En kode er som regel patent til eieren.
  - https://appitventures.com/blog/software-copyrights-vs-software-patents-protecting-the-intellectual-property-of-your-software?utm_source=chatgpt.com

### (MARITA) 5.3 Påvirkning på læring og kompetanse
- Hvordan påvirker KI-avhengighet fremtidig kompetanse?
  - Mulighet til å lære og forstå kodens oppbygging. 
  - Det er veldig lett å stole blindt KI, uten å gjøre egne research. Kan være lurt å alltid være litt kritisk til svar fra KI.
  - Ulike avhengigheter, hvordan ting (ulike programmer) henger sammen.
  - Mangler kontekst i koden med å bruke KI, eks. ved en feil så er man usikker på hvordan det sakl løses eller hvor den finnes.
  - Dårlig logisk tenking, blir vant med å KI tenker for deg. Bortskjemt med å få koden ferdig generert.
  - Større sannsynlighet for å få en feil kode.
  - Kan føre til dårlig kodekvalitet.
- Hvilke ferdigheter risikerer man å ikke utvikle?
  - Dårlig logisk tenking, lite kreavtiv tenking. kritisk tenking og mister evnen til å kvalitetssikre koden.
- Balanse mellom effektivitet og læring
  - BIP brukte mye yolo-mode ved Gemini. 
  - Vi valgte å utgå yolo-mode for å verifisere alle endringene, ved å lese igjennom, samt ha bedre oversikt over hva som skjer i de ulike prosessene. "yes, allow once"

### (MARITA) 5.4 Arbeidsmarkedet
- Hvordan kan utbredt KI-bruk påvirke fremtidige jobber i IT?
  - Primært påvikre kunnskapen til folk innen IT-feltet for at terskelen blir mindre. Jobber som går ut på automtisering og drift kan bli påvirket av KI-bruk.
  - https://www.ipsos.com/nb-no/kunstig-intelligens-hvordan-vil-det-pavirke-oss
- Hvilke roller vil bli viktigere/mindre viktige?
  - mindre viktig: språk og oversettelse, alle roller som kan automatiseres. grafisk design, filmskaping. Logistikk og transport, lager.
  - viktigere: data scientist (sitter å validerer og sikrer koder, og tester ut hvilke modeller som passer best til hvilke bruk). Generelt KI utviklere, selskaper som utvikler KI-modeller vi bruker pr dags dato openAI.
- Deres refleksjoner om fremtidig karriere i en KI-drevet verden
  - Lettere for generasjonene under oss, fordi de er vokst opp i denne verden.
  - Viktig med kritisk tenking, fordi det er blitt vanskligere å skille mellom hva som er ekte og hva som er KI-generert.
  - KI har en begrensning på å eksistere, KI lærer opp KI. Pga. hvor mye data som er allerede KI-generert pr d.d. betyr dette at KI lærer av KI-data, som gjør at KI-modeller blir dårligere slik at KI i seg sel har en begrensning. Kommer dette til å være en egen arbeidsrolle, som sitter å validerer hva som er ekte og ikke ekte data?

### (MARITA) 5.5 Datasikkerhet og personvern 
- Hvilke data delte dere med KI-verktøy?
  - Det eneste egen generert vi delt med KI (Gemini CLI) var proposal (prosjektbeskrivelsen) vår. De andre dokumentene er generet sammen med KI, etter en dialog.
- Potensielle risikoer ved å dele kode og data med KI
  - Koden og data kan bli delt videre. Det er vnasklig å vite hvor informasjon du får fra KI er hentet fra.
- Hvordan skal man tenke på sikkerhet når man bruker KI?
  - Aldri dele personlig informasjon, og heller ikke entiteter som telefonnummer, adresse, bilskilt etc.
  - Ikke del generell sensitiv informasjon, som f.eks. kan finnes i e-poster, meldinger og tilbakemeldinger fra leger. Som potensielt kan være skadelig for en person eller et selskap senere.

---

## 6. Teknologiske implikasjoner

### (FERNANDO) 6.1 Kodekvalitet og vedlikehold
- Hvordan påvirker KI-generert kode langsiktig vedlikehold?
  - Vi erfarte at KI-generert kode både kan hjelpe og komplisere vedlikehold. På den ene siden gir KI raske og ferdige løsninger som gjør det enkelt å komme i gang. På den andre siden kan det være utfordrende å forstå strukturen og tankegangen bak koden, nettopp fordi vi ikke skrev den selv. Dette svekker eierskapsfølelsen og gjør vedlikehold mer krevende over tid, spesielt for utviklere som fortsatt bygger grunnleggende kompetanse. KI genererer ofte kode som ser profesjonell og kompleks ut, men det kan være vanskelig å vurdere om den faktisk følger en god logikk eller bare virker overbevisende. Dette skaper en situasjon hvor langsiktig vedlikehold avhenger mer av vår evne til å analysere og forstå valg enn tradisjonell erfaring med å bygge koden fra bunnen av.
- Er KI-kode like forståelig som menneskeskrevet kode?
  - I noen tilfeller ja. KI kan produsere ryddig og strukturert kode med god konsistens. Men i praksis opplevde vi at forståeligheten var stekt knyttet av hvor godt vi hadde planet i tidligere faser og hvor godt vi forsto teknologiene. For oss med begrenset erfaring med større prosjekter så føltes KI-koden ofte vanskeligere å tolke.
- Utfordringer med å debugge KI-generert kode
  - Debugging var en de mest krevende delene av prosjektet. Et konkret eksempel var da vi brukte flere timer på å forstå hvorfor playwright-testene og lint-skriptet feilet i CI-pipelinen etter en merge til main, noe som skapte uro gjennom gruppen og vi trodde først at vi hadde gjort noe galt i merge-prosessen, men etter mye googling og samarbeid fant vi ut at problemet var at applikasjonen vår hadde ikke kommet til utviklingsfasen ennå. Det betyr at testene fra playwright-rammeverket hadde ingenting å teste. Dette viste oss hvor lett er det å bli forvirret når KI har satt opp verktøy, strukturer og filer som man har ikke kunnskap eller kjennskap til.

### (FERNANDO) 6.2 Standarder og beste praksis
- Følger KI alltid beste praksis og industristandarder?
  - Vi opplever at KI kan produsere løsninger som ligner beste praksis, men vi kan ikke anta at den alltid følger industristandarder. KI kan generere kode som ser ryddig og moderne ut, men uten en dyp forståelse av kontekst eller prosjektets egne begrensninger på grunn av mangel av omfattende planlegging eller god «prompt engineering». Siden KI er ofte trent ved å kombinere mønstrer fra forskjellige kilder, kan det alltid oppstå blandinger av gamle og nye praksiser som er vanskelige å oppdage, spesielt for utviklere med begrenset erfaring. 
- Eksempler på hvor KI foreslo utdaterte eller dårlige løsninger
  - Selv om vi ikke identifiserte direkte utdaterte teknologier i vårt prosjekt, har vi erfart hvordan KI kan komme med forslag som virker for komplekse, unødvendige eller passer ikke til oppgaven. Dette er en kjent svakhet ved KI siden modellen kan basere seg på utdatert treningsdata og, dermed gir råd som ikke lenger representerer dagens beste praksis. Tidligere i prosjektet så opplevde vi at Gemini ga utdaterte påstander om hvilke modeller som eksisterte på markedet. Etter dette ble gruppen klar over at forslagene fra KI måtte tas imot med en viss del skepsis.
- Viktigheten av å validere KI sine forslag
  - Gjennom den omfattende bruk av KI i dette prosjektet ble det tydelig at menneskelig skjønn og kritisk tenking er helt nødvendig. Validering handler ikke bare om å finne feil, men også om å sikre at løsninger samsvarer med prosjektets mål, nivå og rammer. KI kan foreslå avanserte og elegante løsninger som er unødvendig til prosjektet. Det gjorde at vi måtte ofte stoppe opp og diskutere internt og vurder hva som faktisk var realistisk og hensiktsmessig. Denne prosessen ble like mye en del av læringen som selve utviklingen.

### (FERNANDO) 6.3 Fremtidig utvikling
- Hvordan tror dere KI vil påvirke programvareutvikling fremover?
  - Viktig med kvlitetssikring.
  - Vil påvirke programvareutvikling med oppdateringer.
  - Terskelen for å utvikle løsninger og tjenester for hvem som helst er mye lavere om man trenger noe umiddelbart, men da vil også problemer på sikt oppstå fordi kvaliteten ikke er validert. Eksempelvis når covid utformet seg, og vaksine ble innen et halvt år utviklet - men alvorlige bivirkninger kan først finne sted i lang tid i etterkant.
  - for mye folk som vil gjerne drive med programvareutvikling, som betyr at markedet blir hardere å komme inn samtidig som det blir vanskelig å finne kandidater med den nødvendige kunnskapen.
- Hvilke ferdigheter blir viktigere for utviklere?
  - God bakgrunnskunnskap
  - Et godt øye for detaljer
  - Nøysomhet, kvalitetssikring og validering
  - oppdatert på den nyeste teknologiene.
- Deres anbefalinger for hvordan man bør bruke KI i utviklingsprosesser
  - Være kritisk, gjør også egen research.
  - Gå igjennom det KI genrerer for å vite hva som finnes og er blitt generert.
  - Komme med egne forslag til hvordan utvikle, istedenfor å hele tiden spørre KI om den kan komme med en kode.

---

## 7. Konklusjon og læring

### 7.1 Viktigste lærdommer
[Liste de 3-5 viktigste tingene dere lærte gjennom prosjektet]
1. Lærdom 1: Hvordan samarbeide om kode i Github
2. Lærdom 2: At det er mulig å snakke med Gemini i egen VS code
3. Lærdom 3: Kritisk tenking, veldig lett å gjøre/gå for alt KI sier og anbefaler
4. Lærdom 4: Hvilke verktøy som finnes som er mulig å bruke, eks. Stitch with goggle
5. Lærdom 5:

### 7.2 Hva ville dere gjort annerledes?
[Reflekter over hva dere ville endret hvis dere skulle startet på nytt]
- [Tekniske valg]
  - 
- [Bruk av KI]
  - Ville vurdert en betalt KI-løsning for å få bedre kapasitet og kvalitet.
- [Samarbeid og organisering]
  - Ingenting vi kunne gjort annerledes mtp. tidskapasitet og forskjellig tilnærming til hverdagen.

### 7.3 Anbefalinger
[Deres anbefalinger til andre studenter som skal bruke KI i utvikling]
- [Råd om effektiv bruk av KI]
  - Viktig å få KI integrert til egen pc.
- [Fallgruver å unngå]
- [Beste praksis dere oppdaget]

### 7.4 Personlig refleksjon (individuelt)

**[Marita Nilsen]:**
[Personlig refleksjon over egen læring og utvikling]

**[Abdullah Michael Moulay]:**
[Personlig refleksjon over egen læring og utvikling]

**[Fernando Miguel Valle Prado]:**
[Personlig refleksjon over egen læring og utvikling]

**[Jenny Løvik Brøyn]:**
[Personlig refleksjon over egen læring og utvikling]

---

## 8. Vedlegg (valgfritt)

- Skjermbilder av applikasjonen
- Lenke til GitHub repository
- Annen relevant dokumentasjon

---

**Ordantall:** [Ca. antall ord]

**Forventet lengde:** 3000-5000 ord (avhengig av gruppestørrelse og prosjektets kompleksitet)