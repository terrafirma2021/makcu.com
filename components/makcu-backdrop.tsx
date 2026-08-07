export function MakcuBackdrop() {
  return (
    <div className="makcu-backdrop" aria-hidden="true">
      <div className="makcu-backdrop-grid" />
      <div className="makcu-backdrop-glow makcu-backdrop-glow-primary" />
      <div className="makcu-backdrop-glow makcu-backdrop-glow-secondary" />
      <div className="makcu-backdrop-noise" />
    </div>
  );
}
