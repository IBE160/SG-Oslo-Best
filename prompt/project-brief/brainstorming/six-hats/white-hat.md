Many students find it challenging to adapt their CVs and cover letters to specific job applications. Doing so requires strong writing skills and the ability to emphasize the most relevant experiences. They usually have to have a job to finance their studies or have an internship in a company to get graduated.

## Technical Specifitaion

### Frontend Specification
**Framework**: Next.js 14+ with App Router for server-side rendering and optimal performance
- **Language**: TypeScript for type safety and better AI-assisted development
- **Styling**: Tailwind CSS for rapid, responsive UI development
- **State Management**: Zustand for lightweight, scalable global state management
- **Shadcn UI**: Shadcn UI for rapid, responsive UI development
- **Authentication UI**: Supabase Auth UI components + custom styling
- **API Communication**: Axios with interceptors for authenticated requests
- **Deployment**: Vercel for frontend hosting with automatic CI/CD

**Architecture Pattern**: Component-based architecture with clear separation between presentation components, container components, and business logic hooks.

### Backend Specification
- **Framework**: FastAPI (Python) for high-performance RESTful API development
- **Language**: Python for AI integration compatibility and rapid development
- **Database**: Supabase (PostgreSQL) for managed database and real-time capabilities
- **Authentication**: Supabase Auth for built-in user management, JWT tokens, and email verification
- **Authorization**: Row Level Security (RLS) policies in Supabase + role-based middleware (student)
- **ORM**: SQLAlchemy for database operations and type safety
- **Database Migrations**: Alembic for version-controlled schema changes
- **AI Integration**:
  - GEMINI 2.5 Pro/Flash for AI player decisions and question generation
  - Custom prompt engineering for consistent AI behavior
  - Fallback logic for API failures
- **Email Service**: Supabase Auth for authentication emails + SendGrid for custom transactional emails
- **API Documentation**: FastAPI automatic OpenAPI/Swagger documentation
- **Testing**: Pytest for unit and integration tests
- **Build Tool**: UV for fast Python package management
- **Deployment**: Vercel (FastAPI supports Vercel deployment)

**API Architecture**: RESTful API design with versioning (/api/v1/) and clear resource-oriented endpoints.


### Database Specification
- **Database Type**: Supabase (PostgreSQL-based relational database)
- **ORM**: SQLAlchemy for Python-based type-safe database access
- **Migrations**: Alembic for database schema version control
- **Hosting**: Supabase managed cloud (includes automatic backups, scaling, and monitoring)

**Schema Design**:
- **Normalized relational schema** with proper foreign key constraints
- **Row Level Security (RLS)**: Supabase RLS policies to ensure users only access their own data
- **Indexes** on frequently queried fields (user_id, user_job)
- **JSON/JSONB columns** for flexible configuration storage (instructions)
- **Soft deletes** for user data (GDPR compliance)
- **Supabase Auth integration**: Users table managed by Supabase Auth with extended profile data

**Supabase-Specific Features**:
- **RLS Policies**: Students can only view their own cover letters


### Platform Type
**Primary Platform**: Web application (browser-based)

**Target Devices**:
- Desktop computers (primary): Windows, macOS, Linux
- Laptops (primary): All operating systems

**Browser Compatibility**:
- Chrome 90+ (primary testing target)
- Firefox 88+
- Safari 14+
- Edge 90+

**Responsive Breakpoints**:
- Desktop: 1280px+ (optimal experience)
- Laptop: 1024px-1279px (full features)


### User Authentication Specification
**Authentication Method**: Supabase Auth with JWT-based authentication

**Features**:
- Email/password registration with built-in validation
- Automatic email verification via Supabase Auth email templates
- Secure password reset flow with magic links
- Session management with automatic refresh token rotation
- "Remember me" functionality via Supabase persistent sessions
- Account lockout and rate limiting built into Supabase Auth
- User metadata storage for roles (student)

**Implementation Details**:
- Passwords automatically hashed by Supabase (bcrypt)
- JWT access tokens managed by Supabase (automatic expiry and refresh)
- Refresh tokens securely stored by Supabase (httpOnly cookies)
- Role-based access control via Supabase user metadata + RLS policies
- OAuth 2.0 support built-in (Google, Microsoft, GitHub) - can enable with configuration

**Supabase Auth Benefits**:
- Built-in security best practices (password hashing, token management)
- Automatic rate limiting on authentication endpoints
- CAPTCHA support for bot prevention
- Multi-factor authentication (MFA) support available
- Email templates customizable for branding
- User management dashboard in Supabase console

**Security Measures**:
- HTTPS enforced by Supabase and Vercel
- CSRF protection on authentication forms
- Email verification required before full account access
- Password strength requirements configurable in Supabase
- Row Level Security (RLS) policies enforce data access control
- Supabase API keys separated (public anon key vs. service role key)