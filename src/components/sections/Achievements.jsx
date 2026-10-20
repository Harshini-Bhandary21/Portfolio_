import Section from '../ui/Section.jsx';
import FlipBook from '../ui/FlipBook.jsx';
import { achievements, leadership, languages } from '../../data/highlights.js';

const Entry = ({ title, text }) => (
  <div className="fb-entry">
    <h4>{title}</h4>
    {text && <p>{text}</p>}
  </div>
);

const Page = ({ heading, children, num }) => (
  <div className="fb-content">
    {heading && <p className="fb-heading">{heading}</p>}
    {children}
    {num && <span className="fb-num">{num}</span>}
  </div>
);

export default function Achievements() {
  const [a1, a2, a3, a4] = achievements;
  const [l1, l2, l3] = leadership;
  const lead = (l) => <Entry key={l.role} title={l.role} text={l.org} />;

  const cover = (
    <div className="fb-cover">
      <p className="fb-cover-eyebrow">Harshini Bhandary</p>
      <h3>Achievements<br />&amp; Leadership</h3>
      <p className="fb-cover-hint">Click to open</p>
    </div>
  );

  const leaves = [
    {
      back: (
        <Page heading="Achievements" num="1">
          <Entry title={a1.title} text={a1.text} />
          <Entry title={a2.title} text={a2.text} />
        </Page>
      ),
    },
    {
      front: (
        <Page heading="Achievements" num="2">
          <Entry title={a3.title} text={a3.text} />
          <Entry title={a4.title} text={a4.text} />
        </Page>
      ),
      back: (
        <Page heading="Leadership & activities" num="3">
          {lead(l1)}
          {lead(l2)}
        </Page>
      ),
    },
    {
      front: (
        <Page heading="Leadership & activities" num="4">
          {lead(l3)}
        </Page>
      ),
      back: (
        <Page heading="Languages" num="5">
          <Entry title={languages.join(' · ')} />
        </Page>
      ),
    },
  ];

  return (
    <Section id="achievements">
      <FlipBook
        label="Achievements and leadership"
        cover={cover}
        leaves={leaves}
        backCover={<div className="fb-cover fb-cover-end"><p>Thanks for reading</p></div>}
      />
    </Section>
  );
}
