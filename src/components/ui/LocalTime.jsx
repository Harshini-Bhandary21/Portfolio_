import { useEffect, useState } from 'react';

const fmt = () =>
  new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date());

// Live clock in the owner's timezone, so visitors know when a reply is likely.
export default function LocalTime({ place }) {
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return <p className="local-time"><i aria-hidden="true" /> {place} · {time} IST</p>;
}
