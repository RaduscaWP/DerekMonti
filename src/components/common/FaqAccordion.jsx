import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const open = index === openIndex;
        return (
          <article className={`faq-item ${open ? 'open' : ''}`} key={item.question} data-reveal>
            <button type="button" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open}>
              <span>{item.question}</span>
              <Plus aria-hidden="true" size={20} />
            </button>
            <div className="faq-item__answer">
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
