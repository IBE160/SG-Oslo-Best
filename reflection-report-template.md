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
[Kort beskrivelse av hva dere har utviklet. Hva var hovedmålet med applikasjonen? ]
Se proposal

### (JENNY) 2.2 Arbeidsmetodikk
[Beskriv hvordan dere organiserte arbeidet]
- Hvordan fordelte dere oppgaver?
  - Ukentlig møter 
  - Vi i gruppa på 4 personer tok en tidlig vurdering på å holde tett samarbeid, selv om vi er plassert ulike steder i Norge. 2 personer i Molde og 2 personer i Oslo. Vi to hensyn til hva gruppemedlemmer er god og glad i å jobbbe med, og siden vi har vært så heldige å ha en utvikler i gruppa, fikk han som ønsket ansvar for backend-delen. 
  - Hvilke verktøy brukte dere for samarbeid og hvordan det fungerte? (f.eks. Git, og Teams)
- Vi bestemte oss tidlig i prosjektet for å ha ukentlige møter og benyttet oss av kommunikasjonskanalen Teams. Vi var innom Discord også, men Teams hadde flere kjennskap til, så derfor gikk vi for det.
- Hvordan brukte dere KI-verktøy i prosessen?
- Gemini integrert i VS Code
- ChatGPT

### (JENNY) 2.3 Teknologi og verktøy
[Liste over de viktigste teknologiene og verktøyene dere brukte]
- Frontend: [f.eks. NextJS, HTML/CSS]
- Backend: [f.eks. Python/FastAPI]
- Database: [f.eks. Supabase, MongoDB, PostgreSQL]
- KI-verktøy: [f.eks. Claude Code, Gemini CLI, GPT-5 Codex]
- Andre verktøy: [f.eks. VS Code, BMAD etc]

### 2.4 Utviklingsfaser
[Beskriv de ulike fasene i utviklingen]

**(JENNY) Fase 1: Planlegging**
- [Hva gjorde dere i denne fasen?]
    - I denne fasen startet vi med å bruke agenten «analyse» til å brainstorming, og gjennomførte tre separate brainstorming-sesjoner. Da vi var fornøyde med resultatene, brukte vi både idéene fra brainstormingen og proposal-dokumentet for å få analyse-agenten til å produsere product-brief.md dokumentet. Deretter, i planleggingsfasen, tok vi i bruk agenten «product master» for å utvikle et Product Requirement Document (PRD.md).
    - UX-design, bestemme utseende på applikasjonen, bestemme hvordan frontenden skal kodes (estetikk)
    - Arcitecture, vi bestemte hvilke (core) teknologier vi skal bruke i applikasjonen vår.
      - valideringen gikk overraskende bra, med 95% pass på første forsøk. Vi lot det bli på 95% pga. vi mener det holder med en version av applikasjonen, selv om feilmelingen viste det motsatte. Dette fordi det er skole projekt.
- [Hvordan brukte dere KI her? Husk å lagre promptene deres! Inkluder ALLE stegene dere gjorde.]
    - Til å brainstorming brukte vi KI for å avdekke om det var aspekter ved proposalen vår vi hadde oversett, og erfarte raskt at det var veldig enkelt å diskutere og utvide prosjektet til noe langt større enn opprinnelig planlagt. I brainstroming-prosessen benyttet vi de tekniske og strategiske metodene «five whys», «six hats» og «what if». Alle promptene som ble brukt i sesjonene her, er lagret i mappen `SG-Oslo-Best\prompt\project-brief\brainstorming`.
    - UX-design og arkitektur sesjonene ble logget under mappen .logging

**(MICHEAL) Fase 2: Utvikling**
- [Hva gjorde dere i denne fasen?]
  - 
- [Hvordan brukte dere KI her? Husk å lagre promptene deres! Inkluder ALLE stegene dere gjorde.]
  - 

---

## 3. Utfordringer og løsninger

### 3.1 Tekniske utfordringer
[Beskriv 2-3 konkrete tekniske problemer dere møtte]

**[v] Utfordring 1: Gratis version av Gemini**
- Problem:
    - I prosjektarbeidet vårt oppstod det utfordringer ved å bruke gratisversjon av Gemini CLI. Spesielt knyttet til det å navigere i dialogen og manglende evne for Gemini å huske tidligere samtaler, prompt-strukturer og spørsmål. Dette førte til at kommunikasjonen med KI til tider ble tungvint og tidkrevende. Det ble også tydelig at gratisversjonen av Gemini CLI ikke alltid klarte å håndtere den nødvendige kompleksiteten og mengden forespørsler. 
- Løsning:
    - Løsningen ble en kombinasjon av å «smøre seg» med god tålmodighet og at enkelte i gruppen valgte å oppgradere til den betalte versjonen av Gemini CLI, som tilbyr bedre kapasitet. Denne oppgraderingen ble en sentral teknisk beslutning for å sikre en stabil og funksjonell dataflyt, særlig i fullstack- og utviklingsfasen av prosjektet. 
- KI sin rolle:
    - KI spilte både en problemløsende og en utfordrende rolle. Den kunne skape rot i prosjektet ved å genere kode som ikke samsvarte med øvrige filer, noe som resulterte i feil. Samtidig gjorde den omfattende dialogen det mulig å identifisere årsaken til problemene, og ved å sende detaljerte feilmeldinger tilbake til KI, kunne den rette feilene på en effektiv måte.

**(JENNY) Utfordring 2: Loop med Gemini**
- Problem: [Beskriv problemet]
  - Samtaler/sesjoner kunne føre til looping, der vi fikk gjentakende tilbakemeldinger, og en dialog som ikke fikk oss videre. Vi opplevde ofte da konteskt vinduet var en del brukt. 
- Løsning: [Hvordan løste dere det?]
  - Starte Gemini på nytt. Igjen tålmodighet og refinering av promptene for å bryte loopen.
  - Kontekst vinduet: hjalp å bytte på hvem som jobbet med Gemini. Byttet på å jobbe på den som promptet. Eks. da vi jobbet med validering av Ux-design, fikk vi med det først ikke gode resultater. Her gikk Gemini i loop og med de samme feilene, selv om vi hadde rettet på feilene, men problemet var at Gemini laget helt ny valideringsprosess hver gang. Men da vi fikk byttet fra Fernando sin Gemini til Jenny sin Gemini gikk det nesten uten problemer, siden konteskt vinduet til Jenny var mindre brukt.
- KI sin rolle: [Hvordan hjalp eller hindret KI dere?]
  - Som i fleste tilfeller var KI til både hinder og til hjelp gjennom hele prosjektet. Det vi benyttet KI mest til var å komme med forslag til hvordan vi skulle utføre deler av prosjektet, eks. react. Der KI kom med mange gode forslag, og dermed sparte oss masse tid. Vi ser for at om vi ikke hadde hatt KI, måtte vi selv ha gjort research i kanaler som reddit, github og stack overflow.

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
[Problemer spesifikt knyttet til bruk av KI]
- [f.eks. Feil kode fra KI, misforståelser, inkonsistent kvalitet]
  - Med fare for å gjenta oss selv, ref. utfordring 1 og 2 over.
- [Hvordan håndterte dere disse?]
  - Se løsning ved utfordring 1 og 2.

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
  - Har lært hvordan integerer gemini i visual studio code lokalt på pc'en og bruke dette til ulike prosjekter fremover.
  - Viktig å være tydlig med promptene til KI for å få den til å gjøre det vi vil. 
  - Har lært å bruke agenter til ulike deler/faser av prosjektet og hvilke kapasitet hver agent har og hvilke faser under utvilking vi bruker de til. Generell kunnskap om BMAD-metode gjennom praksis gjennomføring.
- [Bidro KI til bedre forståelse av konsepter?]
  - Ja, valideringen av de ulike filene. Hjalp oss å tenke lengre
  - generell prosessen, eks. UX-design kom KI med forslag til utseende der vi måtte se for oss selve applikasjonen i ulike design og spesielt når vi referer til funksjonalitet og hvilke elementer vi velger å bruke/representerer.
  - ved å forslag til design, motiverte det oss og ga oss en forståelse av hvordan applikasjonen vår faktisk skal se ut.

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
  - Blir KI-avhengig. Avhengig av at KI ikke endrer seg siden KI ble laget.
  - KI-avhengig fordi KI har konteksten til hvordan koden ble laget, vanskeligere å finne seksjoner som et. er feil. Enklere å få KI til å gå inn i koden for å rette på feilen.
- Er KI-kode like forståelig som menneskeskrevet kode?
  - Ja, det kan det være.
- Utfordringer med å debugge KI-generert kode
  - Vanskligere å finne feilen om det oppstår feil, fordi en ikke har generet koden selv.
  - KI har ikke alltid kapasitet til å se hva som er feil, for den mener at alt den gjør er rett. Mangler kritisk tenking. Opp til personen å påpeke at noe er feil og rette koden.

### (FERNANDO) 6.2 Standarder og beste praksis
- Følger KI alltid beste praksis og industristandarder?
  - Nei, f.eks. KI kan ikke lage noe av kvalitet. Den kan, med det er sjelden at koden bare fungerer ved første utkast, fordi det finnes flere måter å gjøre den samme tingen på, men det ikke det som er spørsmålet, her er det om å gjøre beste praksis og standarder, kvalitet. 
- Eksempler på hvor KI foreslo utdaterte eller dårlige løsninger
  - Konkret eksempel var da vi fikk tilbakemelding på proposalen vår. Proposalen vår ble validert av en KI ved å følge en checkliste laget av Bård Inge. Der fikk vi tilbakemelding om at ChatGPT-5 ikke finnes og at vi heller ble anbefalt å bruke chatGPT-4. Dette stemmer ikke da chatGPT-5 er ute på markedet og KI ga oss derfor en utdatert og dårligere løsning.
  - Et eksemepl til i forhold til validering.
- Viktigheten av å validere KI sine forslag
  - Viktig å finne evenutelle feil som kan komme av KI-generete dokumenter eller kode.
  - En fin måte å sjekke at alt et dokument skal inneholde er med.

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
Min rolle i prosjektgruppen var å fungere som backend-arkitekt og teknisk ansvarlig for infrastrukturen. Mitt hovedmandat var å sy sammen server-side logikken (FastAPI), databasen (Supabase) og selve AI-integrasjonen (Gemini). Premisset for dette faget var å utforske grensene for Prompt-Driven Development (PDD) – en metode der vi overlater selve kodeskrivingen til kunstig intelligens for å effektivisere prosessen. Jeg gikk inn i prosjektet med en hypotese om at KI ville fjerne de tekniske barrierene, demokratisere koding og gjøre utvikling til en friksjonsfri prosess. Denne hypotesen ble ikke bare motbevist; den ble knust i møte med realiteten. Prosjektet utviklet seg raskt fra å være en øvelse i å generere kode, til å bli en brutal realitetsorientering om forskjellen på å produsere tekst som ligner på kode, og det å faktisk drifte et kjørende produksjonsmiljø på en lokal maskin.

Illusjonen om hastighet og miljøets forbannelse Den desidert største og mest kritiske lærdommen jeg tar med meg fra dette prosjektet, er at kodekvalitet er fullstendig irrelevant dersom utviklingsmiljøet ikke er under streng kontroll. Mens KI-verktøyene genererte tusenvis av linjer med syntaktisk korrekt Python-kode på sekunder, brukte jeg timer og dager på å kjempe mot mitt eget operativsystem. Jeg opplevde en dyp frustrasjon knyttet til konflikten mellom Windows, Git Bash og Python sine virtuelle miljøer. Feilmeldinger som at uvicorn ikke ble funnet, at pip ikke eksisterte, eller at moduler som app ikke kunne lastes (ModuleNotFoundError), ble dagligdagse hindringer som KI-en paradoksalt nok ikke evnet å løse for meg.

KI-en foreslo gang på gang standardløsninger som fungerer i teorien eller på rene Linux-systemer, men som feilet totalt i min spesifikke lokale konfigurasjon. Dette lærte meg at KI mangler kontekst om den fysiske maskinen koden kjører på. Den antar en perfekt verden som sjelden finnes. Jeg ble tvunget til å slutte å være en utvikler som bare skriver forretningslogikk, og måtte i stedet bli en systemadministrator som forsto hvordan operativsystemet håndterer stier (PATH), prosesser og rettigheter. Min viktigste kompetanseheving i dette prosjektet var faktisk ikke innen programmering av funksjoner, men innen feilsøking av fundamentale systemfeil som KI-en var blind for. Jeg lærte at uten denne dybdekunnskapen om miljøet, er KI-generert kode verdiløs.

Arkitektonisk opprydding som nødvendighet Midtveis i prosjektet sto vi i fare for å miste kontrollen over kildekoden. Vi hadde innledningsvis stolt blindt på at KI-en skulle strukturere filene for oss. Dette resulterte i en flat og uoversiktlig struktur der frontend-filer og backend-filer lå blandet i samme rotmappe. Dette skapte konstante konflikter, import-feil i Python, og gjorde det nesten umulig å vite hvilken server som kjørte hva. Det var her jeg måtte ta ansvar og overstyre verktøyet. Min viktigste avgjørelse i prosjektet var ikke en teknisk kodeløsning, men det ledelsesmessige grepet å stoppe opp all utvikling, slette alt av virtuelle miljøer som var korrupte, og tvinge gjennom en streng monorepo-struktur med separate mapper for backend og frontend.

Dette var et definerende øyeblikk hvor jeg innså at menneskelig overblikk er uerstattelig. KI er en utmerket taktiker som kan løse isolerte problemer (som å skrive en funksjon), men en elendig strateg som ikke ser konsekvensene av en rotete filstruktur over tid. Hadde jeg ikke grepet inn og restrukturert prosjektet manuelt, ville vi aldri ha kommet i mål med en fungerende applikasjon. Det lærte meg at ansvaret for arkitektur og struktur alltid må ligge hos mennesket, uansett hvor smart verktøyet er. Jeg måtte manuelt flytte filer, oppdatere imports og konfigurere prosjektet på nytt – en jobb KI-en ikke klarte å gjøre korrekt fordi den mistet oversikten over helheten.
Et endret syn på KI: Fra magi til risikosport Gjennom dette prosjektet har jeg utviklet en langt mer kynisk og skeptisk holdning til påstanden om at "KI demokratiserer koding" og gjør det enkelt for nybegynnere. I starten lot jeg meg blende av hastigheten; vi fikk implementert kompleks funksjonalitet som sikkerhet på radnivå (RLS) i Supabase og tvunget Gemini til å levere strukturert JSON-data på rekordtid. Dette var avanserte konsepter jeg kanskje ville brukt dager på å forstå og skrive manuelt. Men denne hastigheten kom med en høy pris: En snikende følelse av å miste eierskapet til systemet jeg selv bygde.

Det gikk opp for meg at KI gir en falsk trygghet. Den leverer kode som ser riktig ut, og som ofte kjører ved første forsøk. Men når den først feiler – og det gjør den, spesielt i samspillet mellom ulike systemer som Docker, Windows og Python – så står man igjen helt alene. Jeg opplevde at terskelen for å fikse feil ble høyere, ikke lavere, fordi jeg ikke hadde skrevet logikken selv. Jeg måtte bruke tid på å "reverse-engineere" koden KI-en hadde skrevet for å forstå hvorfor den krasjet. Det føltes ofte som å rydde opp etter en utrolig rask, men slurvete juniorutvikler som aldri leste dokumentasjonen nøye nok.

Kompetanse-paradokset: Hvorfor du må kunne mer, ikke mindre Den viktigste erkjennelsen jeg sitter igjen med, er det jeg vil kalle "kompetanse-paradokset". For å bruke KI effektivt til systemutvikling, må man faktisk ha dypere teknisk innsikt enn tidligere. Man kan ikke lenger være en passiv mottaker av kode. Når KI-en genererer 50 linjer med backend-logikk på tre sekunder, kreves det et trent øye for umiddelbart å spotte om den importerer biblioteker som er utdaterte, om den glemmer feilhåndtering, eller om den introduserer sikkerhetshull ved å eksponere API-nøkler.

Jeg gikk fra rollen som "skaper" til rollen som "sjefsredaktør" og kvalitetskontrollør. Det krever en helt annen type mental tilstedeværelse. Jeg kunne ikke lene meg tilbake; jeg måtte være konstant skeptisk. De gangene jeg slappet av og stolte blindt på forslagene, ble jeg straffet med timer med feilsøking senere. Jeg lærte at KI ikke erstatter kunnskap om hvordan operativsystemet, nettverket og databasen fungerer; den forutsetter at du allerede kan det, slik at du kan styre den unna de verste fellene. Uten denne grunnleggende forståelsen er KI bare en maskin som produserer teknisk gjeld i lysets hastighet.

Loopen av dårlige forslag og "hallusinasjoner" En annen betydelig friksjon var KI-ens tendens til å være ekstremt påståelig, selv når den tok feil. Jeg opplevde flere ganger å havne i en frustrerende loop der jeg spurte om hjelp til en miljøfeil (f.eks. med virtuelle miljøer i Windows), og KI-en svarte med stor selvsikkerhet. Når løsningen ikke virket, beklaget den, og ga meg samme løsning på nytt, bare formulert annerledes. I verste fall begynte den å "hallusinere" – den diktet opp filbaner som ikke eksisterte i prosjektet mitt, eller refererte til funksjoner i biblioteker som var fjernet for flere år siden.

Dette var spesielt tydelig fordi vi i starten lente oss på gratisversjoner av modellene. Den begrensede "hukommelsen" (context window) gjorde at KI-en glemte koden vi skrev for to timer siden. Plutselig foreslo den endringer i main.py som brøt fullstendig med logikken vi hadde bygget i auth.js tidligere på dagen. Det tvang meg til å innse at menneskets rolle som "bæreren av kontekst" er uerstattelig. Det er kun jeg som har oversikten over hele arkitekturen; KI-en ser bare bruddstykker gjennom et nøkkelhull.

Konklusjon: Verktøy, ikke erstatning Alt i alt har prosjektet lært meg at KI er et utrolig kraftig verktøy for de som allerede vet hva de driver med. Det er en akselerator for den kompetente, men en potensiell felle for den uvitende. Jeg kommer definitivt til å fortsette å bruke KI til å generere "boilerplate"-kode og tester, men jeg kommer aldri igjen til å la den ta styringen over arkitekturen eller mappestrukturen. Den jobben tilhører meg.
Konklusjon: Den nye realiteten for en utvikler i 2025

Min reise gjennom utviklingen av CVAI Turbo har fundamentalt endret min forståelse av hva det vil si å levere programvare. Jeg gikk inn i dette prosjektet med en litt naiv forventning om at kunstig intelligens skulle fungere som en slags "super-koder" som ville fjerne alle barrierer og produsere funksjoner på løpende bånd. Jeg så for meg en prosess der jeg var en bestiller, og KI-en var utføreren. Jeg går ut av prosjektet med erkjennelsen av at KI snarere har tvunget meg ut av rollen som ren kodeskriver, og inn i en langt mer krevende rolle som teknisk leder, systemarkitekt og feilsøker.

Det usynlige isfjellet Jeg er stolt over at jeg klarte å sy sammen en kompleks fullstack-løsning som faktisk virker, men jeg har fått en nyvunnet og dyp respekt for det "usynlige arbeidet" som ligger bak koden. Jeg har lært at selve skrivingen av syntaks – altså det å faktisk skrive funksjoner og klasser – kanskje bare utgjør ti prosent av jobben i et moderne KI-drevet prosjekt. De resterende nitti prosentene handler om alt det KI-en ikke kunne gjøre for meg: Å sette opp et stabilt lokalt miljø, designe en logisk mappestruktur som tåler skalering, sikre at portene er åpne, og validere at dataflyten er sikker på tvers av frontend og backend.

Dette prosjektet beviste at en applikasjon er mer enn summen av sine filer. KI kan generere filene, men den kan ikke generere samspillet mellom dem på min maskin. Den frustrasjonen jeg følte da serveren nektet å starte på grunn av miljøfeil, lærte meg at systemforståelse er den mest verdifulle valutaen en utvikler har. Uten evnen til å forstå hvorfor en modul ikke lastes, er selv den beste KI-genererte koden verdiløs.

Kompetanse-paradokset En av de viktigste refleksjonene jeg sitter igjen med, er det jeg vil kalle "kompetanse-paradokset". Man skulle tro at KI gjør det lettere for nybegynnere å lage avanserte systemer. Min erfaring er det motsatte: KI gjør det lettere å lage rot raskt. For å bruke verktøyet forsvarlig, må man faktisk ha dypere teknisk innsikt enn før. Man må kunne se på koden som genereres i sanntid og umiddelbart vurdere: "Er dette sikkert?", "Er dette effektivt?", "Passer dette med arkitekturen jeg valgte i går?". Jeg ble tvunget til å være en senior som reviderte arbeidet til en ekstremt rask, men ofte uoppmerksom juniorutvikler.

Eierskap og Ansvar Den viktigste lærdommen er at man aldri må abdisere ansvaret til verktøyet. Evnen til å forstå hva som skjer "under panseret" – hvordan Python finner moduler, hvordan Git sporer filer, og hvordan servere snakker sammen – er den eneste ferdigheten som redder prosjektet når KI-en feiler.

Jeg ser ikke lenger på KI som en magisk løsning som skal ta over jobben min. Jeg ser på det som en kraftig motor – kanskje som en Ferrari-motor. Men en Ferrari-motor er livsfarlig hvis du setter den i et karosseri som ikke tåler farten, eller hvis sjåføren ikke vet hvordan man styrer unna grøfta. Jeg går ut av dette prosjektet som en mer kritisk teknolog, men også langt mer robust. Jeg vet nå at det er jeg som er arkitekten, jeg som er feilsøkeren, og jeg som eier systemet. KI-en er bare et verktøy i beltet mitt, ikke en erstatning for hodet mitt.

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
