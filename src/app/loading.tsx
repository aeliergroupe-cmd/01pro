export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-accent/30 border-t-accent rounded-full animate-spin" />
        <span className="text-label-luxury text-muted-foreground">Loading</span>
      </div>
    </div>
  );
}
