export const LoadingIndicator = ({ className }: { className?: string }) => (
  <div className="text-center p-5 ">
    <div
      className={`radial-progress text-secondary ${className}`}
      style={
        {
          "animation-name": "spin",
          "animation-duration": "2000ms",
          "animation-iteration-count": "infinite",
          "animation-timing-function": "linear",
          "--value": "70",
        } as any
      }
    />
    <div className="text-lg text-gray-400">Sparar uppgifter</div>
  </div>
);

export default LoadingIndicator;
