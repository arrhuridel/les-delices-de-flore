export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-berry-light border-t-berry rounded-full animate-spin" />
        <p className="text-warm-gray text-sm font-medium">Chargement...</p>
      </div>
    </div>
  );
}
