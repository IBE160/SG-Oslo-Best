# Refleksjonsrapport - Programmering med KI

## 1. Gruppeinformasjon

**Gruppenavn:** SG - Oslo Best

**Gruppemedlemmer:**
- Marita Nilsen - marita.nilsen@himolde.no
- Abdullah Michael Moulay - abdullah.m.moulay@himolde.no
- Fernando Miguel Valle Prado - fernando.m.prado@himolde.no
- Jenny Løvik Brøyn - jenny.l.broyn@himolde.no

**Dato:** [DD.MM.ÅÅÅÅ]

---

## 2. Utviklingsprosessen

### 2.1 Oversikt over prosjektet
[Kort beskrivelse av hva dere har utviklet. Hva var hovedmålet med applikasjonen? ]

### 2.2 Arbeidsmetodikk
[Beskriv hvordan dere organiserte arbeidet]
- Hvordan fordelte dere oppgaver?
  - Ukentlig møter 
  - Vi i gruppa på 4 personer tok en tidlig vurdering på å holde tett samarbeid, selv om vi er plassert ulike steder i Norge. 2 personer i Molde og 2 personer i Oslo. Vi to hensyn til hva gruppemedlemmer er god og glad i å jobbbe med, og siden vi har vært så heldige å ha en utvikler i gruppa, fikk han som ønsket ansvar for backend-delen. 
  - Hvilke verktøy brukte dere for samarbeid og hvordan det fungerte? (f.eks. Git, og Teams)
- Vi bestemte oss tidlig i prosjektet for å ha ukentlige møter og benyttet oss av kommunikasjonskanalen Teams. Vi var innom Discord også, men Teams hadde flere kjennskap til, så derfor gikk vi for det.
- Hvordan brukte dere KI-verktøy i prosessen?
- Gemini integrert i VS Code
- ChatGPT

### 2.3 Teknologi og verktøy
[Liste over de viktigste teknologiene og verktøyene dere brukte]
- Frontend: [f.eks. NextJS, HTML/CSS]
- Backend: [f.eks. Python/FastAPI]
- Database: [f.eks. Supabase, MongoDB, PostgreSQL]
- KI-verktøy: [f.eks. Claude Code, Gemini CLI, GPT-5 Codex]
- Andre verktøy: [f.eks. VS Code, BMAD etc]

### 2.4 Utviklingsfaser
[Beskriv de ulike fasene i utviklingen]

**Fase 1: Planlegging**
- [Hva gjorde dere i denne fasen?]
    - I denne fasen startet vi med å bruke agenten «analyse» til å brainstorming, og gjennomførte tre separate brainstorming-sesjoner. Da vi var fornøyde med resultatene, brukte vi både idéene fra brainstormingen og proposal-dokumentet for å få analyse-agenten til å produsere product-brief.md dokumentet. Deretter, i planleggingsfasen, tok vi i bruk agenten «product master» for å utvikle et Product Requirement Document (PRD.md).
    - UX-design her eller ved utvikling nedenfor?
- [Hvordan brukte dere KI her? Husk å lagre promptene deres! Inkluder ALLE stegene dere gjorde.]
    - Til å brainstorming brukte vi KI for å avdekke om det var aspekter ved proposalen vår vi hadde oversett, og erfarte raskt at det var veldig enkelt å diskutere og utvide prosjektet til noe langt større enn opprinnelig planlagt. I brainstroming-prosessen benyttet vi de tekniske og strategiske metodene «five whys», «six hats» og «what if». Alle promptene som ble brukt i sesjonene her, er lagret i mappen `SG-Oslo-Best\prompt\project-brief\brainstorming`.

**Fase 2: Utvikling**
- [Hva gjorde dere i denne fasen?]
- [Hvordan brukte dere KI her? Husk å lagre promptene deres! Inkluder ALLE stegene dere gjorde.]

---

## 3. Utfordringer og løsninger

### 3.1 Tekniske utfordringer
[Beskriv 2-3 konkrete tekniske problemer dere møtte]

**Utfordring 1: Gratis version av Gemini**
- Problem: [Beskriv problemet] 
    - I prosjektarbeidet vårt oppstod det utfordringer ved å bruke gratisversjon av Gemini CLI. Spesielt knyttet til det å navigere i dialogen og manglende evne for Gemini å huske tidligere samtaler, prompt-strukturer og spørsmål. Dette førte til at kommunikasjonen med KI til tider ble tungvint og tidkrevende. Det ble også tydelig at gratisversjonen av Gemini CLI ikke alltid klarte å håndtere den nødvendige kompleksiteten og mengden forespørsler. 
- Løsning: [Hvordan løste dere det?]
    - Løsningen ble en kombinasjon av å «smøre seg» med god tålmodighet og at enkelte i gruppen valgte å oppgradere til den betalte versjonen av Gemini CLI, som tilbyr bedre kapasitet. Denne oppgraderingen ble en sentral teknisk beslutning for å sikre en stabil og funksjonell dataflyt, særlig i fullstack- og utviklingsfasen av prosjektet. 
- KI sin rolle: [Hvordan hjalp eller hindret KI dere?]
    - KI spilte både en problemløsende og en utfordrende rolle. Den kunne skape rot i prosjektet ved å genere kode som ikke samsvarte med øvrige filer, noe som resulterte i feil. Samtidig gjorde den omfattende dialogen det mulig å identifisere årsaken til problemene, og ved å sende detaljerte feilmeldinger tilbake til KI, kunne den rette feilene på en effektiv måte.

**Utfordring 2: [Tittel]**
- Problem: [Beskriv problemet]
- Løsning: [Hvordan løste dere det?]
- KI sin rolle: [Hvordan hjalp eller hindret KI dere?]

### 3.2 Samarbeidsutfordringer
[Utfordringer knyttet til teamarbeid og kommunikasjon]
- [Beskriv utfordringer og hvordan dere løste dem]
- Pro: delt skjerm på teams under ukentlig møter.
- Utfordrendende tidskjema, noen har fulltids jobb, andre fulltids student med deltids jobbe, og vanskelig å få finne tid som passet alle for å få et møte så alle får med selv fremskritene i prosjektet. Løsning: de som kunne møte møtes for å jobbe videre med prosjektet.

### 3.3 KI-spesifikke utfordringer
[Problemer spesifikt knyttet til bruk av KI]
- [f.eks. Feil kode fra KI, misforståelser, inkonsistent kvalitet]
- [Hvordan håndterte dere disse?]

---

## 4. Kritisk vurdering av KI sin påvirkning

### 4.1 Fordeler med KI-assistanse
[Reflekter over de positive aspektene]

**Effektivitet og produktivitet:**
- [Hvordan påvirket KI arbeidshastigheten?]
  - Men tanke på gratis version og veldig mange forsøk på Ai riktig vei. Mer arbeid enn om man hadde kodet selv.
  - For oss som ikke er så flinke til å kode, gav AI en lettere sti/veiledning til veien videre på projektet.
  - Ikke så mye koding og viktig vektøy. Mer effektiv, veldig validering
  - God veileding.
  - Gikk god læring i github
- [Eksempler på oppgaver som gikk raskere]
  - Lagt selv UX-designet, fordi det hadde tatt mye mer tid å diskutere farge og layout
  - Den kommer med forslag og alternativer på farge og layout. Lettere for oss som gruppe å ta en avjørelse på hvilken av alternativene vi likte best.
  - Til tross for disse utfordringene, var selve PDD-prosessen (Prompt Driven Development, utviklingemetode: I stedet for å skrive kode linje for linje (som i tradisjonell utvikling), skriver utvikleren detaljerte, strukturerte instruksjoner (prompter) som gis til en stor språkmodell (LLM, som Gemini eller GPT). LLM-en genererer deretter den faktiske kodebasen basert på disse instruksjonen) utrolig effektiv: Min Rolle: Jeg fungerte som Arkitekt og Prompt Engineer. Jeg fikk KI-en til å generere de mest komplekse integrasjonene, som SQLAlchemy ORM-tilkobling og strukturert JSON-respons (llm_service.py), som er det vanskeligste for en utvikler å skrive manuelt.

**Læring og forståelse:**
- [Hva lærte dere ved å bruke KI?]
  - Har lært hvordan integerer gemini og bruke dette til ulike prosjekter fremover
- [Bidro KI til bedre forståelse av konsepter?]
  - Ikke alltid, 

**Kvalitet på koden:**
- [Hvordan påvirket KI kodekvaliteten?]
  - Pros med Gemini, skrive utdypentende svar og gode scripts.
- [Eksempler på forbedringer KI foreslo]
  - Vi hadde et eksamepel fil til backende, gjorde koden mer enkelere og lettere å forslå, hvis andre utviklere skulle lest koden.
  - "Alright, let's tackle our first Important Decision: How Our Application Deals with Problems (Error Handling Strategy).
 
  No software is perfect, and things will inevitably go wrong—a user enters invalid data, the internet connection drops, the backend server is temporarily       
  unavailable. An error handling strategy defines how our application reacts to these problems, communicates them to the user, and recovers gracefully. A good   
  strategy prevents crashes, provides helpful feedback, and makes it easier for developers to fix issues.
 
  Think of it like driving a car. If a tire goes flat, a good car (system) doesn't just stop and leave you stranded. It has a warning light (communication),     
  maybe even run-flat tires (graceful degradation), and a spare tire (recovery mechanism). A poor system might just break down without warning.
 
  My suggestion is a full-stack consistent approach focusing on the user experience:
   * Backend (FastAPI): We'll use FastAPI's built-in exception handling to ensure that any errors from the server always return a predictable, standardized      
     message in JSON format.
   * Frontend (Next.js/React):
       * We'll use React Error Boundaries to gracefully catch errors that happen during UI display, preventing the entire app from crashing.
       * For errors coming from the backend (like invalid input), we'll use a global notification or "toast" system (Shadcn/UI has a great one) to show
         user-friendly messages.
       * React Query will also help us manage errors specifically from our API calls.
   * Logging: All significant errors will be recorded so developers can investigate them later (we'll pick a specific logging service soon).
 
  This consistent strategy across the entire application will ensure a smooth experience for both users and developers.
  What are your thoughts on this approach? (or 'explain more' for details)"

### 4.2 Begrensninger og ulemper
[Reflekter over de negative aspektene]

**Kvalitet og pålitelighet:**
- [Eksempler på feil eller dårlige løsninger fra KI]
  - Gitt stadig 
- [Hvordan oppdaget og håndterte dere disse?]

**Avhengighet og forståelse:**
- [Ble dere for avhengige av KI?]
- [Var det tilfeller hvor KI hindret læring?]

**Kreativitet og problemløsning:**
- [Påvirket KI deres egen kreativitet?]
  - Cons: at Gemini rote med kodene, skriver ikke en utfyllende kode. Be den gjentakende ganger fylle ut koden.
- [Eksempler på situasjoner hvor KI begrenset kreativ tenkning]
  - Ved push til github, laget ikke Backend-mappen, den sende alle filene utordnet. Mer aggresive med KI for å få den til å gjøre det vi ville.

### 4.3 Sammenligning: Med og uten KI
[Reflekter over hvordan prosjektet ville vært uten KI]
- Hva ville vært annerledes?
- Hvilke deler av prosjektet ville vært vanskeligere/lettere?
- Ville sluttresultatet vært bedre eller dårligere?

### 4.4 Samlet vurdering
[Konklusjon: Hvordan påvirket KI sluttresultatet totalt sett?]
- Var KI en netto positiv eller negativ faktor?
- Hva var den viktigste lærdommen om å bruke KI i utviklingsprosessen?
  - VELDIG tidskrevende og tidsoptimistist!

---

## 5. Etiske implikasjoner

### 5.1 Ansvar og eierskap
- Hvem er ansvarlig for koden når KI har bidratt?
  - KI er en verktøy/hjelpemiddel som kan brukes, men ansavret og eieskaper til koden er personen(e) som sitter bak KI.
- Hvordan sikrer man kvalitet når KI genererer kode?
  - Sikrer kvalitet 
- Diskuter spørsmål om opphavsrett og intellektuell eiendom

### 5.2 Transparens
- Bør det være transparent at KI er brukt?
- Hvordan dokumenterer man KI sin bidrag?
- Hva er konsekvensene av å ikke være åpen om KI-bruk?

### 5.3 Påvirkning på læring og kompetanse
- Hvordan påvirker KI-avhengighet fremtidig kompetanse?
- Hvilke ferdigheter risikerer man å ikke utvikle?
- Balanse mellom effektivitet og læring

### 5.4 Arbeidsmarkedet
- Hvordan kan utbredt KI-bruk påvirke fremtidige jobber i IT?
- Hvilke roller vil bli viktigere/mindre viktige?
- Deres refleksjoner om fremtidig karriere i en KI-drevet verden

### 5.5 Datasikkerhet og personvern
- Hvilke data delte dere med KI-verktøy?
- Potensielle risikoer ved å dele kode og data med KI
- Hvordan skal man tenke på sikkerhet når man bruker KI?

---

## 6. Teknologiske implikasjoner

### 6.1 Kodekvalitet og vedlikehold
- Hvordan påvirker KI-generert kode langsiktig vedlikehold?
- Er KI-kode like forståelig som menneskeskrevet kode?
- Utfordringer med å debugge KI-generert kode

### 6.2 Standarder og beste praksis
- Følger KI alltid beste praksis og industristandarder?
- Eksempler på hvor KI foreslo utdaterte eller dårlige løsninger
- Viktigheten av å validere KI sine forslag

### 6.3 Fremtidig utvikling
- Hvordan tror dere KI vil påvirke programvareutvikling fremover?
- Hvilke ferdigheter blir viktigere for utviklere?
- Deres anbefalinger for hvordan man bør bruke KI i utviklingsprosesser

---

## 7. Konklusjon og læring

### 7.1 Viktigste lærdommer
[Liste de 3-5 viktigste tingene dere lærte gjennom prosjektet]
1. [Lærdom 1]
2. [Lærdom 2]
3. [Lærdom 3]

### 7.2 Hva ville dere gjort annerledes?
[Reflekter over hva dere ville endret hvis dere skulle startet på nytt]
- [Tekniske valg]
- [Bruk av KI]
- [Samarbeid og organisering]

### 7.3 Anbefalinger
[Deres anbefalinger til andre studenter som skal bruke KI i utvikling]
- [Råd om effektiv bruk av KI]
- [Fallgruver å unngå]
- [Beste praksis dere oppdaget]

### 7.4 Personlig refleksjon (individuelt)

**[Navn på gruppemedlem 1]:**
[Personlig refleksjon over egen læring og utvikling]

**[Navn på gruppemedlem 2]:**
[Personlig refleksjon over egen læring og utvikling]

**[Navn på gruppemedlem 3]:**
[Personlig refleksjon over egen læring og utvikling]

---

## 8. Vedlegg (valgfritt)

- Skjermbilder av applikasjonen
- Lenke til GitHub repository
- Annen relevant dokumentasjon

---

**Ordantall:** [Ca. antall ord]

**Forventet lengde:** 3000-5000 ord (avhengig av gruppestørrelse og prosjektets kompleksitet)