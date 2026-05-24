const tickerItems = [
  'Exclusive deals',
  'Save up to 15-60% on business and first class',
  'Personal service',
  'Book with Derek',
  'Same-day quotes',
];

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar" aria-label="Current offer">
      <div className="announcement-bar__track">
        {[0, 1].map((groupIndex) => (
          <div className="announcement-bar__group" key={groupIndex} aria-hidden={groupIndex === 1}>
            {tickerItems.map((item, index) => (
              <span className="announcement-bar__item" key={`${groupIndex}-${item}`}>
                {item}
                <i aria-hidden="true">{index === tickerItems.length - 1 ? '·' : '/'}</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
