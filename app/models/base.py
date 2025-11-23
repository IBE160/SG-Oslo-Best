# SQLAlchemy Base placeholder (to be added when Supabase/PG is enabled)from sqlalchemy.ext.declarative import declarative_base

# Dette definerer "Base"-klassen som alle dine ORM-modeller
# (som Resumes, Users, etc.) skal arve fra. 
# SQLAlchemy bruker denne for å knytte Python-klasser til tabeller.
Base = declarative_base()