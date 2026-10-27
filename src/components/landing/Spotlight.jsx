import { ArrowRight } from 'lucide-react';

function FaresTable({ rows }) {
  return (
    <table className="spotlight__table spotlight__table--fares">
      <thead>
        <tr>
          <th scope="col">Route</th>
          <th scope="col">Cabin</th>
          <th scope="col">Example airlines</th>
          <th scope="col">Published fare</th>
          <th scope="col">Derek&rsquo;s fare</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.codes}>
            <th scope="row">
              <strong>{row.codes}</strong>
              <span>{row.route}</span>
            </th>
            <td data-label="Cabin">{row.cabin}</td>
            <td data-label="Example airlines">{row.carriers}</td>
            <td data-label="Published fare">
              <del>{row.published}</del>
            </td>
            <td data-label="Derek's fare" className="spotlight__fare">
              {row.derek}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GridTable({ columns, rows, firstColumnIsHeader = true }) {
  return (
    <table className="spotlight__table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th scope="col" key={`${column}-${index}`}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, index) =>
              index === 0 && firstColumnIsHeader ? (
                <th scope="row" key={`${row[0]}-${index}`}>
                  {cell}
                </th>
              ) : (
                <td key={`${row[0]}-${index}`} data-label={columns[index]}>
                  {cell}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Timeline({ rows }) {
  return (
    <ol className="spotlight__timeline">
      {rows.map(([when, what]) => (
        <li key={when}>
          <strong>{when}</strong>
          <p>{what}</p>
        </li>
      ))}
    </ol>
  );
}

function Itinerary({ rows }) {
  return (
    <ol className="spotlight__itinerary">
      {rows.map(([leg, detail], index) => (
        <li key={leg}>
          <span className="spotlight__leg-number">Flight {index + 1}</span>
          <strong>{leg}</strong>
          <p>{detail}</p>
        </li>
      ))}
    </ol>
  );
}

export default function Spotlight({ spotlight, pageId, onQuote }) {
  if (!spotlight) return null;

  let body = null;
  if (spotlight.type === 'fares') body = <FaresTable rows={spotlight.rows} />;
  else if (spotlight.type === 'routes' || spotlight.type === 'comparison') {
    body = <GridTable columns={spotlight.columns} rows={spotlight.rows} />;
  } else if (spotlight.type === 'timeline') body = <Timeline rows={spotlight.rows} />;
  else if (spotlight.type === 'itinerary') body = <Itinerary rows={spotlight.rows} />;

  return (
    <section className={`spotlight spotlight--${spotlight.type}`} aria-labelledby={`${pageId}-spotlight-title`}>
      <div className="container">
        <header className="spotlight__header" data-reveal>
          <p className="eyebrow">{spotlight.eyebrow}</p>
          <h2 id={`${pageId}-spotlight-title`}>{spotlight.title}</h2>
          {spotlight.intro && <p className="spotlight__intro">{spotlight.intro}</p>}
        </header>
        <div className="spotlight__body" data-reveal>
          {body}
        </div>
        <div className="spotlight__footer">
          {spotlight.note && <p className="spotlight__note">{spotlight.note}</p>}
          <a className="spotlight__cta" href="#request-form" onClick={onQuote}>
            Get a quote for your dates
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
