export function Overlay({
  hide,
  showOverlay,
  opacity = 'opacity-70',
  responsiveClasses: responsiveClasses,
  zIndex = 'z-40',
}: {
  opacity?:
    | 'opacity-10'
    | 'opacity-20'
    | 'opacity-30'
    | 'opacity-40'
    | 'opacity-50'
    | 'opacity-60'
    | 'opacity-70';
  hide: () => void;
  showOverlay: boolean;
  responsiveClasses?: string;
  zIndex?: 'z-0' | 'z-10' | 'z-20' | 'z-30' | 'z-40' | 'z-50' | 'z-[60]';
}) {
  return (
    <button
      onClick={hide}
      className={`${
        showOverlay || 'hidden'
      } ${responsiveClasses} ${zIndex} fixed inset-0 bg-black ${opacity}`}
    />
  );
}
