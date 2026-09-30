import { useId } from 'react';
import { Plus } from 'lucide-react';
import styles from './FaqAccordion.module.scss';

export default function FaqAccordion({ items }) {
  const groupId = useId().replace(/:/g, '');

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const triggerId = `${groupId}-question-${index}`;
        const panelId = `${groupId}-answer-${index}`;

        return (
          <details className={`faq-item ${styles.item}`} key={item.question} name={`faq-${groupId}`} open={index === 0 || undefined} data-reveal>
            <summary className={styles.summary} id={triggerId} aria-controls={panelId}>
              <h3>{item.question}</h3>
              <Plus aria-hidden="true" size={20} />
            </summary>
            <div id={panelId} role="region" aria-labelledby={triggerId}>
              <p>{item.answer}</p>
            </div>
          </details>
        );
      })}
    </div>
  );
}
