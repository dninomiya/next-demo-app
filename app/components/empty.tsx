export default function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 py-3 border rounded-md text-sm text-center bg-muted text-muted-foreground">
      {children}
    </p>
  );
}
