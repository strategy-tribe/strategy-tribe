export function DarkOverlay({
  setShowOverlay,
  showOverlay,
  opacity = 'opacity-75',
  responsiveClasses: responsiveClasses,
}: {
  opacity?: string;
  setShowOverlay: (n: boolean) => void;
  showOverlay: boolean;
  responsiveClasses?: string;
}) {
  return (
    <button
      onClick={() => setShowOverlay(false)}
      className={`${
        showOverlay || 'hidden'
      } ${responsiveClasses} z-40 fixed inset-0 bg-black ${opacity}`}
    />
  );
}
