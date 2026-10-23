const tickerItems = ['Exclusive deals', 'Business & first class', 'Personal service', 'Book with Derek', 'Your journey, personally arranged'];

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar" aria-label="Service scope">
      <div className="announcement-bar__track">{[0, 1].map(group => <div className="announcement-bar__group" key={group} aria-hidden={group === 1}>{tickerItems.map(item => <span className="announcement-bar__item" key={item}>{item}<i aria-hidden="true">/</i></span>)}</div>)}</div>
    </div>
  );
}
