import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export default function FaqAccordion({ items }) {
  const groupId = useId().replace(/:/g, '');
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const open = index === openIndex;
        const triggerId = `${groupId}-question-${index}`;
        const panelId = `${groupId}-answer-${index}`;

        return (
          <section className={`faq-item ${open ? 'faq-item--open' : ''}`} key={item.question} data-reveal>
            <h3>
              <button
                id={triggerId}
                type="button"
                onClick={() => setOpenIndex(open ? -1 : index)}
                aria-expanded={open}
                aria-controls={panelId}
              >
                <span>{item.question}</span>
                <Plus aria-hidden="true" size={20} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!open}>
              <p>{item.answer}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
