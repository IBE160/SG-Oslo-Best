# Refleksjonsrapport - Programmering med KI

## 1. Gruppeinformasjon

**Gruppenavn:** SG - Oslo Best

**Gruppemedlemmer:**
- Marita Nilsen - marita.nilsen@himolde.no
- Abdullah Michael Moulay - abdullah.m.moulay@himolde.no
- Fernando Miguel Valle Prado - fernando.m.prado@himolde.no
- Jenny Løvik Brøyn - jenny.l.broyn@himolde.no

**Dato:** 05.12.2025

---

## 2. Utviklingsprosessen

### 2.1 Oversikt over prosjektet
Dette prosjektet, kalt "CVAI Turbo", handler om å utvikle en applikasjon som skal bistå studenter ved Høgskoler og Universiteter. Applikasjonen tar inn CV, stillingsannonse og eventuelle instruksjoner som input, og genererer deretter et tilpasset søknadsbrev basert på denne informasjonen.

### 2.2 Arbeidsmetodikk
Arbeidet i prosjektet ble organisert gjennom ansvarsområder og faste rutiner. Gruppen på fire personer, med to medlemmer i Molde og to i Oslo, bestemte tidlig at det å holde jevnlige ukentlige møter ville sikre tett samarbeid til tross for geografisk avstand. Siden gruppen har en erfaren utvikler, fikk vedkommende hovedansvaret for utviklings-delen av prosjektet, mens øvrige oppgaver ble fordelt slik at alle kunne bidra der de hadde mest kompetanse og engasjement.

For samarbeid og kommunikasjon i de ukentlige møtene benyttet vi oss av Teams som primær kommunikasjonsplattform. Discord ble vurdert, men Teams ble valgt fordi flere hadde kjennskap til det. Gjennom Teams kunne vi enkelt dele dataskjerm, noe som gjorde det mulig for alle å følge arbeidet i sanntid og komme med innspill underveis. I tillegg ble Git brukt til versjonskontroll og koordinert utvikling, noe som sikret god oversikt og kontroll på endringer gjennom hele prosjektet.

KI-verktøy hadde en viktig funksjon i prosessen, blant annet gjennom bruk av Gemini integrert i VS Code og Chat GPT som støtte til idéutvikling, feilsøking og gjennomføring av utviklingsoppgaver gjennom hele prosjektet.

### 2.3 Teknologi og verktøy
De viktigste teknologiene og verktøyene vi brukte i prosjektet:
- Frontend: Next.js, React, Tailwind CSS
- Backend: Python, FastAPI
- Database: Supabase (PostgreSQL)
- KI-verktøy: Gemini CLI, GPT-5 Codex, Chat GPT
- Andre verktøy: VS Code, BMAD, Teams

### 2.4 Utviklingsfaser

**Fase 1: Analyse**
I fase 1, analysefasen, begynte arbeidet med å utforme prosjektets proposal, der rammene og målene for prosjektet ble definert. Etter å ha lastet ned VS Code, integrert Gemini CLI og fått tilgang til BMAD-rammeverket, benyttet vi KI-agenten «analyse» ved brainstorming-øktene. Da resultatene fra disse øktene var gode nok, ble ideene kombinert med proposal-dokumentet, og deretter genererte vi dokumentet product-brief.md. KI-verktøyet Gemini CLI, ble brukt til å identifisere aspekter ved proposalen som ellers kunne ha blitt oversett, og vi erfarte raskt at det var veldig enkelt å diskutere og utvide prosjektet til noe langt større enn opprinnelig planlagt. Brainstorming-delen ble strukturert ved hjelp av metodene "five whys", "six hats" og "what if". Alle promptene som ble brukt i disse sesjonene, er lagret i mappen `SG-Oslo-Best\prompt\project-brief\brainstorming`.

**Fase 2: Planlegging**
I fase 2, planleggingsfasen, utviklet vi PRD.md (Product Requirement Document), som deretter fungerte som grunnlag for arbeidet med UX-design. I denne delen av prosessen ble struktur, visuell stil og ønsket brukeropplevelse definert, og det ble laget mockups for å konkretisere konseptet og teste hvordan applikasjonen skulle se ut i praksis. Arbeidet ble gjennomført ved bruk av Gemini og med agentene "product master" og "ux-designer". Alle tilhørende prompter og KI-dialoger ble loggført i mappen `SG-Oslo-Best\.logging\requests`.

**Fase 3: Solutioning**
I fase 3, solutioningfasen, ble prosjektets arkitektur utarbeidet ved å definere hvilke kjerneteknologier applikasjonen skulle bygges på. I denne fasen utviklet vi epics og user stories og etablerte et oppsett for tesing ved hjelp av Playwright-rammeverket, GitHub Actions og et tilhørende CI-oppsett. Arbeidet inkluderte også utforming av testscenarier, dokumentert i `SG-Oslo-Best\docs\test-design-high-value-stories.md`. Til slutt gjennomførte vi en "implementation readiness"-vurdering, der dokumentene PRD, UX-design, arkitektur og epics ble validert som klare for neste fase. Hele solutioningfasen ble gjennomført med aktiv bruk av Gemini CLI og agentene "architect", "product master" og "tea", og alle tilhørende KI-dialoger og prompter ble loggført i mappen `SG-Oslo-Best\.logging\requests`. 

Etter tilbakemelding fra faglærer, om at "tea"-agenten ikke var nødvendig, valgte vi å deaktivere alle testene før selve utviklingen startet. 

**Fase 4: Implementation, utvikling**
I fase 4, implementasjonsfasen, brukte vi agenten "scrum master" (sm) for å utarbeide sprint-planen. Illustrasjonen fra BMAD-rammeverket var spesielt nyttig i denne prosesssen. Den illustrerer hvert enkelt steg i utviklingen fra "epics cycle" til sluttresultat. I hver epics var det flere stories som kjørte gjennom "story loop" der vi blant annet definerte konteksten i hver enkelt story. Deretter brukte vi agenten "dev" for å generere koden til story etterfulgt av en "code-review". Om "code-review" var bra nok, gikk vi videre til "epic-retrospective", og deretter til neste "epic". Om "code-review" ikke var bra nok, måtte vi kjøre en ny "story-loop". Alle tilhørende KI-dialoger og prompter ble loggført i mappen `SG-Oslo-Best\.logging\requests`. 

**Illustrasjonen fra BMAD-rammeverket**
<img src="docs/images/bmad-workflow.svg" alt="BMAD workflow">

---

## 3. Utfordringer og løsninger

### 3.1 Tekniske utfordringer

**Utfordring 1: Gratis version av Gemini**
I prosjektarbeidet vårt oppstod det utfordringer ved å bruke gratisversjon av Gemini CLI. Spesielt knyttet til det å navigere i dialogen og manglende evne for Gemini å huske tidligere samtaler, prompt-strukturer og spørsmål. Dette førte til at kommunikasjonen med KI til tider ble tungvint og tidkrevende. Det ble også tydelig at gratisversjonen av Gemini CLI ikke alltid klarte å håndtere den nødvendige kompleksiteten og mengden forespørsler. 

Løsningen ble en kombinasjon av å "smøre seg" med god tålmodighet og at enkelte i gruppen valgte å oppgradere til den betalte versjonen av Gemini CLI, som tilbyr bedre kapasitet. Denne oppgraderingen ble en sentral teknisk beslutning for å sikre en stabil og funksjonell dataflyt, særlig i utviklingsfasen av prosjektet. 

KI spilte både en problemløsende og en utfordrende rolle. Den kunne skape rot i prosjektet ved å generere kode som ikke samsvarte med øvrige filer, noe som resulterte i feil. Samtidig gjorde den omfattende dialogen det mulig å identifisere årsaken til problemene, og ved å sende detaljerte feilmeldinger tilbake til KI, kunne den rette feilene på en effektiv måte.

**Utfordring 2: Loop med Gemini**
I arbeidet med prosjektet oppstod det flere situasjoner der Gemini CLI havnet i såkalt "loops", der KI gjentok de samme tilbakemeldingene og feilene uten å føre prosessen videre. Dette skjedde oftest i lengre dialoger der kontekstvinduet allerede var tungt belastet og førte til at KI mistet oversikt og begynte å repetere fremfor å bygge videre.

Løsningen bestod i å starte Gemini på nytt, formulere promptene mer presist og være tålmodige for å bryte "loops". I tillegg viste det seg effektivt å bytte på hvem som jobbet med Gemini, ettersom et mindre belastet kontekstvindu og mindre bruk av "free tier" ga bedre resultater. 

KI hadde både en positiv og negativ innvirkning når denne utfordringen oppsto. Den skapte tidvis utfordringer ved å gå inn i "loops", men på den andre siden sparte den gruppen for betydelig tid ved å foreslå ulike løsninger. Uten KI ville vi vært nødt til å hente tilsvarende informasjon gjennom omfattende research på plattformer som eksempelvis Reddit, GitHub og Stack Overflow.

### 3.2 Samarbeidsutfordringer
Prosjektgruppen har hatt et utfordrende tidskjema hvorav noen har fulltidsjobb mens andre er fulltidsstudenter med deltidsjobb. Derfor har det til tider vært vanskelig å få finne tidspunkt for møte som passet for alle. Måten vi har løst det på, er at vi har satt opp tidspunkter langt fram i tid, og de som har hatt mulighet til å stille har vært med på møtet. Vi har som gruppe lagt til rette for hverandres tilnærminger til hverdagen og tatt hensyn til hverandres jobb og studie. Jo nærmere tidsfristen, jo flere møter har vi planlagt. Alle på gruppen hadde ulike bakgrunn og erfaringer fra før, så noen har hatt mer behov for stegvis prosess, mens andre har ønsket en raskere vei mot mål.
 
### 3.3 KI-spesifikke utfordringer
I prosjektet oppstod flere KI-spesifikke utfordringer, knyttet til feil kodegenerering, misforståelser i dialogen og varierende kvalitet på svarene. Mange av disse problemene var de samme som tidligere beskrevet i utfordring 1 og 2, der både gratisversjonen av Gemini og "loops" i dialogen skapte hindringer for en effektiv arbeidsflyt. Disse utfordringene ble håndtert på samme måte som beskrevet under "Løsningen..." over.

---

## 4. Kritisk vurdering av KI sin påvirkning

### 4.1 Fordeler med KI-assistanse

**Effektivitet og produktivitet:**
KI hadde en tydelig, men todelt påvirkning på arbeidshastigheten i prosjektet. På den ene siden førte utfordringene beskrevet i "3.1 Tekniske utfordringer" til at enkelte oppgaver tok lengre tid enn om de hadde blitt løst manuelt. På den andre siden gav KI en betydelig fordel, spesielt for gruppemedlemmer med mindre erfaring innen prosjektarbeid og utvikling. KI bidro med veiledning, forslag til løsninger og tydelig fremgangsmåte som gjorde det enklere å komme videre i prosjektet. Den økte også effektiviteten ved å håndtere validering av dokumenter, genererte alternativer og løste oppgaver som vanligvis krever mer tid og teknisk innsikt. I tillegg førte samarbeidet med KI til økt læring rundt bruken av GitHub, noe som igjen ga en bedre forståelse i en ryddig og effektiv arbeidsflyt gjennom prosjektet.

Flere oppgaver ble betydelig mer effektive med KI, som for eksempel utarbeidelsen av UX-design. Her kom KI med forslag til farger, layout og alternative visuelle løsninger, som gjorde det langt enklere for gruppen å ta beslutninger uten lange diskusjoner. 

**Læring og forståelse:**
Gjennom prosjektet lærte vi hvordan man integrerer Gemini i Visual Studio Code lokalt på egen pc, og erfarte hvor viktig det er å formulere tydelige og presise prompter for å få KI til å levere ønskede resultater. En arbeidsform som ofte omtales som "vibe coding". Vi fikk også god innsikt i hvordan ulike KI-agenter innenfor rammeverket BMAD-metoden fungerer, hvordan de kan brukes i ulike deler og faser av prosjektet, hvilke oppgaver de behersker, og når de er mest hensiktsmessige å bruke. Samlet ga dette oss en praktisk erfaring med BMAD-metoden og bedre forståelse av hvordan den kan brukes i fremtidige prosjekter.

KI bidro til økt forståelse av sentrale konsepter gjennom prosjektet. Valideringen av de ulike filene gjorde at vi måtte reflektere grundigere over egne valg og tenke flere steg frem i utviklingen. Innen UX-design ble dette veldig tydelig, der KI kom med visuelle forslag og strukturelle løsninger, noe som gjorde at vi måtte klargjøre hvordan applikasjonen faktisk skulle se ut og hvilke funksjonelle elementer den skulle inneholde. Ved å presentere ulike design hjalp KI oss med å se for oss applikasjonen i praksis, noe som både motiverte gruppen og gav en klarere forståelse av hvordan sluttproduktet burde utformes.

**Kvalitet på koden:**
KI hadde en innflytelse på kodekvaliteten i prosjektet. Gemini leverte gjennomgående detaljerte forklaringer og velskrevne skript, noe som bidro til ryddigere og mer forståelig kode. Av og til oppsto det problemer når KI skulle utvikle, som vi måtte fikse manuelt, for eksempel at Gemnini prøvde å prompte oss gjennom Shell og ikke i Gemini-terminalen. For å unngå det, måtte vi innstallere komponenter manuelt for å fortsette.   

### 4.2 Begrensninger og ulemper

**Kvalitet og pålitelighet:**
Det er vanskelig å vurdere hva som er en dårlig løsning siden 3 av 4 på gruppen ikke har så mye kunnskap om utvikling fra før. Vi synes det har vært vanskelig å avgjøre hva som er en dårlig eller mindre dårlig kode og løsning siden erfaringen ikke strekker til. Dermed har flesteparten av oss stolt på KIen for hva som er best for prosjektet. Vanligvis ville kanskje lærdommen vært å funnet kode ut ifra hva som finnes i ulike kanaler, kommentarer og erfaring knyttet koden som er tilgjengelig. Gjentattte ganger fortalte vi KIen at vi kun skal implementere "CVAI Turbo" som en nettside designet for pc. KIen spurte derimot ofte om applikasjonen også skal utvikles til mobil og tablet.

Vi hadde en utvikler på gruppen som kvalitetssikret koden. Når koden ikke gikk i "riktig retning" var det en på gruppen som har tidligere kunnskap om utvikling og kunne se feil med koden. I tillegg har vi også validert alle de etablerte dokumentene for å kvalitetssikre filene i prosjektet, eksempelvis valideringen av PRD, epics, UX-design og arkitetur.

**Avhengighet og forståelse:**
Hele emnet er lagt opp til å skulle bruke KI for å generere applikasjonen. Vi har derfor vært avhengig av KIen fordi det er det som blir forespeilet av faglærer, samtidig at det har vært et tidsperspektiv for utvikling av prosjektet. I tillegg har KI vært viktig når det har manglet tidligere faglig kompetanse. 

Vi har ikke lært å kode manuelt, noe vi mener KIen har hindret oss i å lære, "learning by doing". Prosjektgruppen har som regel fulgt KIens anbefalinger i dialogene, samtidig faglæreren sine anbefalinger fra forelesningene. Som nevnt har vi benyttet oss av BMAD-metoden, slik at læringen har hatt større fokus på å bruke BMAD-rammeverket. 

**Kreativitet og problemløsning:**
KIen påvirket egen kreativitet, fordi den gav oss valg og muligheter som vi ikke hadde tenkt på. KIen stimulerer til kreativitet ved at den gir forslag og ser muligheter, som kan åpne dørene for funksjoner. KI forespeilet en stor applikasjon med mange muligheter og funksjoner, men vi så oss nødt til å holde oss til "scopet" for at prosjektet ikke skulle bli for stort og omfattende. 

Prosjektgruppen hadde en visjon om hvordan applikasjonen skulle se ut. Et konkret eksempel er UX-design-fasen, der designet ble annerledes fordi KIen anbefalte sine egne forslag, og dermed ble prosjektgruppen enig om å gå for ett av de fire forslagene KIen kom med. Vi har i tilfeller hatt en mer aggresiv dialog med KI for å få den til å gjøre det vi har hatt ønske om.

### 4.3 Sammenligning: Med og uten KI
Uten KI ville planleggingen gått saktere, fordi vi måtte da har gjort mer arbeid på forhånd før vi i det hele tatt kunne begynne å utvikle. Applikasjonen ville sannsynligvis blitt enklere og mer begrenset i funksjonalitet, ettersom vi måtte ha forstått hver enkelt del av teknologien før vi kunne anvende den. Dette innebærer alt fra database oppsett til frontend-struktur og backend-logikk. Uten KI som støtte ville vi som gruppe kjent mye sterkere på tidspresset. Prosjektet foregikk gjennom en periode på 6 uker, og med vår erfaring ville det ha vært utfordrende å få på plass en funksjonell løsning uten å bli mer stresset i prosessen.

Mange deler av prosjektet hadde vært vanskeligere for oss uten hjelp av KI. Backend-utvikling, arkitekturforståelse, feilsøking og dokumentasjonsarbeid ville krevd mer tid og opplæring før vi kunne i det hele tatt implementere noe funksjonelt. KI hjalp oss med å få et overblikk over strukturen, generere store deler av koden og ga oss forklaringer som gjorde utviklingsprosessen raskere. Samtidig må vi anerkjenne at enkelte ting kunne har vært lettere uten KI, til tross for at vi har en utvikler med i gruppen. 

Sluttresultatet uten KI hadde sannsynligvis blitt mindre omfattende og funksjonelt enn det vi har endt opp med. Det er også lite realistisk at vi hadde klart å ferdigstille en komplett applikasjon innen 6 uker, gitt vår erfaring og prosjektets kompleksitet. Selv om resultatet kanskje kunne fått en mer "ren" kvalitet gjennom manuelt arbeid, ville det ha gått på bekostning av funksjonalitet og fremdrift. Siden manuell koding hadde økt i arbeidsmengde, som igjen kunne ha påvirket prosjektgruppens læringsutbytte og samarbeid.

### 4.4 Samlet vurdering
Sluttresultatet med KI var en netto positiv faktor knyttet tidsperspektivet og manglende tidligere erfaring og kunnskap. Den viktigste lærdommen i utviklingsprosessen har vært å forstå hvordan man leder og samordner team av KI-agenter og hvordan hele prosessen fungerer fra utvikling av dokumenter til ferdig applikasjon. 

---

## 5. Etiske implikasjoner

### 5.1 Ansvar og eierskap
KI er et verktøy og hjelpemiddel som kan brukes, men ansvaret og eierskapet til koden ligger hos personene som sitter bak prompting av prosjektet. I dette tilfellet så har vi brukt BMAD-rammeverket som har stilt spørsmål til oss og vi har diskurtet og kommet fram til et svar, som KI igjen har brukt til å generere de nødvendige dokumentene.

Når KI generer kode sikrer man kvalitet ved god research av hva som har blitt gjort tidligere. Det vi har gjort er å sende dokumentene gjennom en validering og en form for sjekkliste for å sikre at dokumentene har med det som trengs for at det skal være minst mulig misforståelser når KI skal generere koden.

Når det gjelder opphavsrett og intellektuell eiendom er det vanskelig å vite hvor KIen har hentet informasjonen fra. Det er derfor vanskelig å referere til eller gi kreditt til den eller de det gjelder.

### 5.2 Transparens
Prosjektet vårt har gått ut på å bruke KI til å produsere applikasjonen. I denne sammenheng kunne det vært en ide å referere til at det er benyttet KI, eventuelt merke med "KI er brukt i produksjonen" ved dashboardet. Vi synes det er viktig at det kommer fram at det er brukt KI i produksjonen, men siden dette er et prosjekt i regi av Høgskolen i Molde har vi valgt å ikke merke applikasjonen med Gemini.

Å dokumentere KI sitt bidrag kan være ved bruk av kildehenvisning og loggføring av promptingen, samt dialogene vi har hatt med KI. En av konsekvensene om ikke å være åpen om at KI er benyttet kan være at brukerne hos "CVAI Turbo" blir feilinformert, noe som i utgangspunktet bør opplyses om.

### 5.3 Påvirkning på læring og kompetanse
KI-avhengighet trosser mulighet til å lære og forstå kodens oppbygging. Det er veldig lett å stole blindt på KI, uten å gjøre egen research. Det kan derfor være lurt å alltid ha et kritisk blikk til svarene KIen gir. Det er også lett å miste kontekst til koden ved å bruke KI, samt at det er større sannsynlighet for å få feil i koden. Eksempelvis ved en feil så er man usikker på hvordan feilen skal løses eller hvor den finnes. I tillegg risikerer brukeren å utvikle dårlig logisk tenkning, fordi man blir vant med at KIen tenker for deg. Brukeren blir bortskjemt med å få koden ferdig generert og servert. Det kan også føre til dårlig kodekvalitet.

Faglæreren vår benyttet seg mye av "yolo-modus" i Gemini. Vi har derimot valgt under hele prosessen å unngå "yolo-modus" for å verifisere alle endringene, ved å lese igjennom, samt ha bedre oversikt over hva som skjer i de ulike prosessene. I de aller fleste tilfeller har vi valgt "yes, allow once", evt. "yes, allow always".

### 5.4 Arbeidsmarkedet
Primært kan KI påvikre kunnskapen til folk innen IT-bransjen for at terskelen blir mindre. Særlig jobber som går ut på automtisering og generell drift blir påvirket av KI-bruk artikkelen "Kunstig intelligens: hvordan vil det påvirke oss?" publisert av Ipsos (2023) viser til statistikk på hvilke bransjer og jobber som utgir seg for å være mest utsatt ved at KI kan ta over. Hentet fra: https://www.ipsos.com/nb-no/kunstig-intelligens-hvordan-vil-det-pavirke-oss.

Roller vi mener som vil bli mindre viktige innen IT-bransjen, befinner seg i jobbene innenfor språk og oversettelse, samt alle roller som kan automatiseres. I tillegg til roller innenfor grafisk design, filmskaping, logistikk, transport og lager, som også Ipsos sin artikkel referer til. Viktigere rolle som vi mener at vil fortsette å bli i IT-bransjen er data scientist. De validerer og sikrer koder, og tester ut hvilke modeller som passer best til hvilke bruk.

Vår refleksjon er at det kan bli lettere for generasjonene under oss, fordi de er vokst opp i en digitalisert verden. I den grad blir det enda viktigere med kritisk tenkning, fordi det er blitt vanskeligere å skille mellom hva som er ekte og hva som er KI-generert og falskt. Mye data som eksisterer er basert på og generert av KI, som betyr at KI lærer av egen KI-data. Det kan være med på å gjøre KI-modeller dårligere slik at KI i seg selv har en begrensning.

### 5.5 Datasikkerhet og personvern
Det eneste vi delte av data til KI-verktøyet Gemini CLI var prosjektbeskrivelsen/proposalen vår. De andre dokumentene er generert sammen med KI etter dialog med oss. Koden vår og dataen kan potensielt bli delt videre med andre som benytter seg av KI-verktøyet. Det er vanskelig å vite hvor informasjonen du får fra KI er hentet fra.

Av sikkerhetsmessige årsaker er det viktig å aldri dele personlig informasjon med KI-verktøyet, og heller ikke entiteter som telefonnummer, adresse, navn, personnummer osv. En tommelfingerregel er å aldri dele generell sensitiv informasjon, som for eksempel kan finnes i e-poster, meldinger og i andre form for dialog og meldingsutveksling. Personinformasjon blir fort potensielt skadelig for en person eller et selskap, enten i nåtid eller på et langt senere tidspunkt.

---

## 6. Teknologiske implikasjoner

### 6.1 Kodekvalitet og vedlikehold
Vi erfarte at KI-generert kode både kan hjelpe og komplisere vedlikehold. På den ene siden gir KI raske og ferdige løsninger som gjør det enkelt å komme i gang. På den andre siden kan det være utfordrende å forstå strukturen og tankegangen bak koden, nettopp fordi vi ikke skrev den selv. Dette svekker eierskapsfølelsen og gjør vedlikehold mer krevende over tid, spesielt for utviklere som fortsatt bygger grunnleggende kompetanse. KI genererer ofte kode som ser profesjonell og kompleks ut, men det kan være vanskelig å vurdere om den faktisk følger en god logikk eller bare virker overbevisende. Dette skaper en situasjon hvor langsiktig vedlikehold avhenger mer av vår evne til å analysere og forstå valg enn tradisjonell erfaring med å bygge koden fra bunnen av.

I noen tilfeller er KI-kode like forståelig som menneskeskrevet kode. KI kan produsere ryddig og strukturert kode. Men i praksis opplevde vi at forståeligheten var sterkt knyttet av hvor godt vi hadde planlagt i tidligere faser og hvor godt vi forsto teknologiene. For oss med begrenset erfaring med større prosjekter så føltes KI-koden ofte vanskeligere å tolke.

Debugging var en de mest krevende delene av prosjektet. Et konkret eksempel var da vi brukte flere timer på å forstå hvorfor playwright-testene og lint-skriptet feilet i CI-pipelinen etter en merge til main, noe som skapte uro gjennom gruppen og vi trodde først at vi hadde gjort noe galt i merge-prosessen, men etter mye googling og samarbeid fant vi ut at problemet var at applikasjonen vår hadde ikke kommet til utviklingsfasen ennå. Det betyr at testene fra playwright-rammeverket hadde ingenting å teste. Dette viste oss hvor lett er det å bli forvirret når KI har satt opp verktøy, strukturer og filer som man har ikke kunnskap eller kjennskap til.

### 6.2 Standarder og beste praksis
Vi opplever at KI kan produsere løsninger som ligner beste praksis, men vi kan ikke anta at den alltid følger industristandarder. KI kan generere kode som ser ryddig og moderne ut, men uten forståelse av kontekst eller prosjektets egne begrensninger. Dette kan være på grunn av mangel på planlegging eller god prompting. Siden KI er trent ved å kombinere mønstrer fra forskjellige kilder, kan det alltid oppstå blandinger av gamle og nye praksiser som er vanskelige å oppdage, spesielt for utviklere med begrenset erfaring. En erfart utvikler kan godt se om en kode er KI-generert eller ikke. 

Gruppen identifiserte utdaterte teknologier i prosjektet, eksempelvis foreslo KIen shadcn-ui som er avviklet. Dette er en kjent svakhet ved KI siden modellen kan basere seg på utdatert treningsdata og dermed gir råd som ikke lenger representerer dagens beste praksis. 

Gjennom den omfattende bruken av KI i dette prosjektet ble det tydelig at menneskelig skjønn og kritisk tenkning er nødvendig. Validering handler ikke bare om å finne feil, men også om å sikre at løsninger samsvarer med prosjektets mål, nivå og rammer. KI kan foreslå avanserte og elegante løsninger som er unødvendig for prosjektet. Det gjorde at vi måtte ta vurderinger av hva som var realistisk, relevant og hensiktsmessig. Denne prosessen var like lærerik som utviklingen.

### 6.3 Fremtidig utvikling
Vi tror KI kommer til å ha en større rolle i programvareutvikling. Allerede i dag ser vi hvordan KI kan generere kode raskt, foreslå løsninger og forklare komplekse konsepter som gjør utvikling mer tilgjengelig. Dette kan senke terskelen for å komme i gang, noe som er positivt for læring og innovasjon, og derfor mener vi at KI ikke nødvendigvis vil erstatte utviklere i nærmeste framtid, men det vil påvirke hvilke ferdigheter som blir viktigst i fremtiden.

Etter våre diskusjoner mener gruppen at ferdigheter som debugging, kritisk tenkning og forståelse for grunnleggende programmeringsprinsipper blir viktigere. Når KI genererer store deler av koden, blir utviklerens oppgave å vurdere om koden er riktig, trygg og hensiktsmessig. I tillegg tror vi at prompting vil bli en essensiell ferdighet. Det å kunne formulere gode, presise og målrettede forespørsler til KI kan være avgjørende for kvaliteten på resultatet. 

Gruppen mener at vi bør bruke KI som et verktøy og ikke en erstatning for faglig utvikling. Det er viktig å kombinere KI-assistanse med egen refleksjon, faglig innsats og et bevisst forhold til kvalitet. Utviklere bør være kritiske til forslagene som kommer, og ikke anta at KI har automatisk rett. Dette gjelder både valg av teknologi, kodekvalitet og arkitektur. Gruppen sin anbefaling om bruk av KI, er å bruke den som en støtte for kreativitet og læring, men sørge for at man har en stor del av kontroll og forståelse av det som blir gjort.

---

## 7. Konklusjon og læring

### 7.1 Viktigste lærdommer
1. Lærdom 1: Hvordan samarbeide om kode i Github.
2. Lærdom 2: BMAD-metoden og workflow.
3. Lærdom 3: Hvilke verktøy som finnes, og som er mulig å bruke.

### 7.2 Hva ville dere gjort annerledes?
Om vi hadde startet prosjektet på nytt, ville vi ønsket bedre tid til reserach utenom å benytte Gemini og KI. Når det kommer til bruk av KI, ville vi vurdert en betalt KI-løsning tidligere i prosessen for å få bedre kapasitet og kvalitet. I forhold til samarbeid og organisering er det ingenting vi kunne gjort annerledes med tanke på tidsperspektivet på 6 uker og gruppemedlemmenes ulike tilnærming til hverdagen.

### 7.3 Anbefalinger
Vår anbefaling og råd til andre studenter som skal bruke KI i utvikling, er først og fremst å få installert alle relevante programmer på pcen. I tillegg opplevde vi en verdi av å være nøyaktig og bruke mye tid på planelgging og prompting, for å garantere god fremgang. En fallgruve det er viktig å unngå, er å stole blindt på KIen. Husk å vær kritisk selv om KIen gir gode forslag til løsninger. Den beste praksisen vi opplevde, var å samarbeide gjennom alle fasene og kommunisere godt med hverandre. 

### 7.4 Personlig refleksjon

**Marita Nilsen:**
Jeg må innrømme at arbeidsmetotikken ved samarbeid som i et teknisk utviklingsmiljø, har gitt meg en mer forståelse for hvordan man som utviklingsteam bør jobbe sammen. Dette er det emnet jeg har fått størst utbytte av når det kommer til forståelse av bruken av Github, push, pull og commit. Jeg har lært at Github kan og skal brukes til å dele kode, fortløpende, for at andre kan se, teste eller validere koden. Ikke at GitHub kun brukes til ferdigstilte hyllevarer, men heller at det er en samarbeidsplattform for kode. Jeg har fått en større forståelse for vanen ved pull og push, og selvfølgelig noe som var helt nytt for meg, bruken av BMAD-metoden. Nytt for meg var også å integrere Gemini i VS code, noe som er genialt på en måte om man ikke ønsker å kode "alene". Min refleksjon er at jo flere som kan samarbeide i et utviklingsmiljø med ulik bakgrunn og kompetanse, jo bedre er det med GitHub. 

**Abdullah Michael Moulay:**
I dette prosjektet oppdaget jeg hvor stor forskjell det er mellom å få KI til å generere kode og faktisk få systemet til å fungere. De største utfordringene handlet ikke om funksjonene, men om miljøfeil, PATH-problemer og struktur som KI ikke klarte å håndtere. Jeg måtte rydde opp manuelt, bygge en tydelig prosjektstruktur og ta full kontroll på arkitekturen. Det lærte meg at KI kan gi fart, men at kvalitet, stabilitet og forståelse fortsatt er mitt ansvar. KI er et verktøy, ikke en erstatning for oversikt og systemkunnskap.

**Fernando Miguel Valle Prado:**
Dette prosjektet har utfordret meg på mange mulige måter, samtidig som den har gitt meg et så stort læringsutbytte. Jeg har lært mye om BMAD-metode, GitHub, KI som et verktøy og alle teknologier som vi inkluderte i prosjektet. Arbeidsprosessene var krevende, da vi satt i timevis og jobbet med prosjekt. Til slutt selv om hele prosessen tok tid og veldig mye innsats så er jeg veldig fornøyd med sluttresultatet og egen læring.
 
**Jenny Løvik Brøyn:**
For min egen del var den jevnlige deltakelsen i gruppemøtene avgjørende for å få fullt utbytte i denne prosessen, der vi sammen jobbet systematisk gjennom fase 1, 2, 3 og 4. Dette gjorde det mulig å følge alle fasene og dermed få en bedre forståelse av sammenhengen mellom dem. Jeg har lært mye av BMAD-rammeverket og de ulike verktøyene vi valgte å bruke under utviklingen av applikasjonen, samtidig fått utviklet bedre ferdigheter innen "vibe coding".

---

## 8. Vedlegg

- Lenke til GitHub repository: https://github.com/IBE160/SG-Oslo-Best 

---

**Ordantall:** ca. 4740 ord

**Forventet lengde:** 3000-5000 ord