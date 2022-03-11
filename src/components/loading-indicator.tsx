export const LoadingIndicator = () => (
  <div className="text-center p-5">
    <div
      className="radial-progress text-secondary"
      style={
        {
          "animation-name": "spin",
          "animation-duration": "1500ms",
          "animation-iteration-count": "infinite",
          "animation-timing-function": "linear",
          "--value": "65",
        } as any
      }
    />
    <div className="text-lg text-gray-400">Tolkar handstil</div>
  </div>
);

export default LoadingIndicator;
