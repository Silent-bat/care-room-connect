import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";

export const ROOM_IMAGES = [room1, room2, room3];

export type Room = {
  id: string;
  img: string;
  name: string;
  city: string;
  specialty: string;
  price: number;
  sqft: number;
  available: string;
};

export const ROOMS: Room[] = [
  { id: "northshore-402", img: room1, name: "Northshore Medical Center, Suite 402", city: "Evanston", specialty: "Diagnostic", price: 140, sqft: 280, available: "Today" },
  { id: "west-loop-wellness", img: room2, name: "West Loop Wellness Plaza", city: "Chicago", specialty: "Consultation", price: 95, sqft: 180, available: "Today" },
  { id: "st-luke-hub", img: room3, name: "St. Luke Specialist Hub", city: "Wicker Park", specialty: "Imaging", price: 210, sqft: 340, available: "Tomorrow" },
  { id: "lakeside-203", img: room1, name: "Lakeside Health Tower, Suite 203", city: "Chicago", specialty: "Consultation", price: 110, sqft: 200, available: "Today" },
  { id: "north-park-clinic", img: room2, name: "North Park Family Clinic", city: "Skokie", specialty: "General", price: 85, sqft: 160, available: "Oct 28" },
  { id: "midtown-imaging", img: room3, name: "Midtown Imaging Annex", city: "Chicago", specialty: "Imaging", price: 230, sqft: 360, available: "Today" },
];

export type BookingStatus = "Confirmed" | "Completed" | "Cancelled" | "Pending";

export type Booking = {
  id: string;
  roomId: string;
  date: string; // ISO
  start: string;
  end: string;
  hours: number;
  status: BookingStatus;
  patients: number;
};

// Deterministic prototype dataset spanning recent + upcoming dates
export const BOOKINGS: Booking[] = [
  { id: "B-1051", roomId: "northshore-402", date: "2026-06-10", start: "09:00", end: "17:00", hours: 8, status: "Confirmed", patients: 7 },
  { id: "B-1050", roomId: "west-loop-wellness", date: "2026-06-11", start: "14:00", end: "18:00", hours: 4, status: "Confirmed", patients: 5 },
  { id: "B-1049", roomId: "midtown-imaging", date: "2026-06-12", start: "08:00", end: "12:00", hours: 4, status: "Pending", patients: 3 },
  { id: "B-1048", roomId: "st-luke-hub", date: "2026-06-09", start: "10:00", end: "14:00", hours: 4, status: "Completed", patients: 4 },
  { id: "B-1047", roomId: "lakeside-203", date: "2026-06-06", start: "09:00", end: "13:00", hours: 4, status: "Completed", patients: 6 },
  { id: "B-1046", roomId: "northshore-402", date: "2026-06-04", start: "09:00", end: "17:00", hours: 8, status: "Completed", patients: 8 },
  { id: "B-1045", roomId: "north-park-clinic", date: "2026-06-02", start: "13:00", end: "17:00", hours: 4, status: "Completed", patients: 5 },
  { id: "B-1044", roomId: "west-loop-wellness", date: "2026-05-30", start: "09:00", end: "12:00", hours: 3, status: "Completed", patients: 3 },
  { id: "B-1043", roomId: "st-luke-hub", date: "2026-05-28", start: "10:00", end: "16:00", hours: 6, status: "Completed", patients: 7 },
  { id: "B-1042", roomId: "midtown-imaging", date: "2026-05-26", start: "08:00", end: "12:00", hours: 4, status: "Cancelled", patients: 0 },
  { id: "B-1041", roomId: "northshore-402", date: "2026-05-24", start: "09:00", end: "17:00", hours: 8, status: "Completed", patients: 9 },
  { id: "B-1040", roomId: "lakeside-203", date: "2026-05-21", start: "11:00", end: "15:00", hours: 4, status: "Completed", patients: 4 },
];

export const PRACTITIONER = {
  name: "Dr. Elias Thorne",
  initials: "ET",
  specialty: "Dermatology",
  email: "elias@thornederm.com",
  memberSince: "March 2025",
};

export function roomById(id: string): Room | undefined {
  return ROOMS.find((r) => r.id === id);
}

export function bookingTotal(b: Booking): number {
  if (b.status === "Cancelled") return 0;
  const room = roomById(b.roomId);
  return room ? room.price * b.hours : 0;
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatShortDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const TODAY_ISO = "2026-06-09";

export function computeMetrics(today = TODAY_ISO) {
  const upcoming = BOOKINGS.filter((b) => b.date >= today && b.status !== "Cancelled");
  const past = BOOKINGS.filter((b) => b.date < today);
  const completed = past.filter((b) => b.status === "Completed");
  const cancelled = BOOKINGS.filter((b) => b.status === "Cancelled");
  const monthRevenue = BOOKINGS.filter((b) => b.date.startsWith(today.slice(0, 7)))
    .reduce((s, b) => s + bookingTotal(b), 0);
  const lastMonthRevenue = BOOKINGS.filter((b) => b.date.startsWith("2026-05"))
    .reduce((s, b) => s + bookingTotal(b), 0);
  const totalHours = completed.reduce((s, b) => s + b.hours, 0);
  const totalPatients = BOOKINGS.reduce((s, b) => s + b.patients, 0);
  const attendance = past.length === 0 ? 0 : Math.round((completed.length / past.length) * 100);
  const revenueDelta = lastMonthRevenue === 0 ? 0 : ((monthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
  return {
    upcoming,
    past,
    completed,
    cancelled,
    monthRevenue,
    lastMonthRevenue,
    revenueDelta,
    totalHours,
    totalPatients,
    attendance,
  };
}

/** Aggregate revenue per ISO week-day for the trailing N weeks (oldest→newest). */
export function revenueSeries(weeks = 8): { label: string; value: number }[] {
  const buckets: { label: string; value: number }[] = [];
  const today = new Date(TODAY_ISO + "T00:00:00");
  for (let i = weeks - 1; i >= 0; i--) {
    const end = new Date(today);
    end.setDate(end.getDate() - i * 7);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    const value = BOOKINGS.filter((b) => {
      const d = new Date(b.date + "T00:00:00");
      return d >= start && d <= end;
    }).reduce((s, b) => s + bookingTotal(b), 0);
    buckets.push({
      label: end.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value,
    });
  }
  return buckets;
}

export function topRooms(limit = 4) {
  const map = new Map<string, { hours: number; revenue: number; bookings: number }>();
  for (const b of BOOKINGS) {
    if (b.status === "Cancelled") continue;
    const cur = map.get(b.roomId) ?? { hours: 0, revenue: 0, bookings: 0 };
    cur.hours += b.hours;
    cur.revenue += bookingTotal(b);
    cur.bookings += 1;
    map.set(b.roomId, cur);
  }
  return Array.from(map.entries())
    .map(([roomId, v]) => ({ room: roomById(roomId)!, ...v }))
    .filter((r) => r.room)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}

export const STATUS_STYLES: Record<BookingStatus, string> = {
  Confirmed: "bg-brand-muted text-brand",
  Completed: "bg-neutral-100 text-text-muted",
  Cancelled: "bg-red-50 text-red-600",
  Pending: "bg-amber-50 text-amber-700",
};