import os
from dotenv import load_dotenv
from supabase import create_client

# Last inn variabler fra .env-filen (dette er der nøklene dine ligger)
load_dotenv()

# Hent nøklene fra miljøvariablene
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# Sjekker at vi fant nøklene
if not url or not key:
    print("❌ FEIL: SUPABASE_URL eller SUPABASE_KEY mangler i .env-filen! Sjekk at filen er lagret riktig.")
    exit()

print(f"✅ Prøver å koble til Supabase...")

# Opprett Supabase-klienten
supabase = create_client(url, key)

# --- Test Spørringen mot Databasen ---
try:
    # Vi prøver å hente de første 5 postene fra cv_entries
    # Vi bruker en tabell som vi vet finnes
    response = supabase.table('cv_entries').select('id, user_id').limit(5).execute()
    
    # Sjekk om det kom en gyldig respons
    if response.data is not None:
        print(f"✅ Tilkobling etablert og database-spørring OK!")
        print(f"   -> Databasen svarer. Antall rader funnet: {len(response.data)}")
    
    else:
        # Dette kan skje hvis tabellen er tom, men tilkoblingen er god
        print(f"✅ Tilkobling etablert, men fikk ingen data tilbake. Tabellen er sannsynligvis tom.")

except Exception as e:
    print(f"❌ FEIL VED SPØRRING: Sjekk RLS-policy og API-nøkler. Detaljer: {e}")