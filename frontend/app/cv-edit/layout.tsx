export const metadata = {
  title: "Edit CV",
};

export default function CvEditLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
