# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]: Login
      - generic [ref=e6]: Enter your credentials to access your account.
    - generic [ref=e7]:
      - paragraph [ref=e8]: Registration successful! Please check your email to verify your account and then log in.
      - generic [ref=e9]:
        - text: Email
        - textbox "Email" [ref=e10]:
          - /placeholder: student@example.com
      - generic [ref=e11]:
        - text: Password
        - textbox "Password" [ref=e12]
    - generic [ref=e13]:
      - button "Login" [active] [ref=e14]
      - paragraph [ref=e15]:
        - text: Don't have an account?
        - button "Sign Up" [ref=e16]
  - button "Open Next.js Dev Tools" [ref=e22] [cursor=pointer]:
    - img [ref=e23]
  - alert [ref=e26]
```