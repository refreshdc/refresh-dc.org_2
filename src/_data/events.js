require("dotenv").config();

module.exports = async function () {
  const token = process.env.EVENTBRITE_API_TOKEN;
  const orgId = process.env.EVENTBRITE_ORG_ID;

  if (!token || !orgId) {
    console.warn("[events] Missing EVENTBRITE_API_TOKEN or EVENTBRITE_ORG_ID — returning empty events.");
    return { items: [], isPast: false };
  }

  const baseUrl = `https://www.eventbriteapi.com/v3/organizations/${orgId}/events/`;
  const headers = { Authorization: `Bearer ${token}` };

  try {
    // Fetch upcoming/live events
    let res = await fetch(`${baseUrl}?status=live,started&order_by=start_asc&expand=venue,logo`, { headers });

    if (!res.ok) {
      console.error(`[events] Eventbrite API error: ${res.status} ${res.statusText}`);
      return { items: [], isPast: false };
    }

    let data = await res.json();
    let upcomingEvents = data.events || [];
    let isPast = false;

    // Always fetch past events to fill remaining slots
    let pastEvents = [];
    const pastRes = await fetch(`${baseUrl}?status=completed,ended&order_by=start_desc&expand=venue,logo`, { headers });
    if (pastRes.ok) {
      const pastData = await pastRes.json();
      pastEvents = pastData.events || [];
    }

    let events;
    if (upcomingEvents.length === 0) {
      // No upcoming events — show the 3 most recent past events
      events = pastEvents.slice(0, 3);
      isPast = true;
    } else {
      // Combine upcoming events with past events to fill up to 3 slots
      const needed = 3 - upcomingEvents.length;
      events = [...upcomingEvents, ...pastEvents.slice(0, Math.max(0, needed))];
    }

    return {
      isPast,
      items: events.map((event, index) => ({
        id: event.id,
        title: event.name?.text || "Untitled Event",
        description: event.description?.text?.substring(0, 200) || "",
        url: event.url,
        image: event.logo?.original?.url || event.logo?.url || null,
        date: formatEventDate(event.start?.local),
        time: formatEventTime(event.start?.local),
        venue: event.venue?.name || "",
        address: event.venue?.address?.localized_address_display || "Washington, DC",
        isLatest: index === 0,
      })),
    };
  } catch (err) {
    console.error("[events] Failed to fetch from Eventbrite:", err.message);
    return { items: [], isPast: false };
  }
};

function formatEventDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatEventTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
