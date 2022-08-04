export function Goal() {
  return (
    <div id="goal" className="flex justify-between">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h2 className="text-3xl font-inter font-bold text-on-surface-p0">
            Our goal
          </h2>
          <span className="bg-main h-1 inline-block -translate-y-1 w-16"></span>
        </div>
        {/* Content */}
        <p className="max-w-lg body">
          Your anonymity should not come at the price of your safety.
          <br />
          Our crowdsourced data is shared with a vetted collection of
          investigative journalists working in the space.
        </p>
      </div>
    </div>
  );
}
