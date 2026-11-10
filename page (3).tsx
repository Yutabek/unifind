import { notFound } from "next/navigation";

/** Any unknown path under a valid language ("/uz/xyz") shows the 404 page inside the normal layout. */
export default function CatchAllPage() {
  notFound();
}
