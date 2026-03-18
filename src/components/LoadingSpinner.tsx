export function LoadingSpinner() {
  return (
    <div className="loading-spinner-overlay" aria-label="Loading portfolio" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
      <div className="loading-spinner-container">
        <div className="loading-spinner-ring" />
        <div className="loading-spinner-ring" />
        <div className="loading-spinner-ring" />
        <div className="spinner-dot" />
        <p className="spinner-text">Descending into the digital ocean...</p>
      </div>
    </div>
  )
}
