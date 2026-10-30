import Btn from "@/components/Btn";
import { TICKET_ACTION } from "@/lib/event";

/**
 * THE ticket button. Every page footer, hero and menu renders this instead of
 * a hand-written <Btn href={EVENT.ticketUrl}>, so the TICKETING_OPEN switch in
 * lib/event.ts changes them all at once: "Get a ticket — KES …" to TikoHub
 * while tickets are on sale, "Register" to the sign-up form on the
 * homepage while they are not.
 */
export default function TicketBtn({
  tone,
  className,
  children,
}: {
  tone?: "primary" | "outline" | "onDark" | "gold";
  className?: string;
  /** Overrides the label (never the destination). */
  children?: React.ReactNode;
}) {
  return (
    <Btn href={TICKET_ACTION.href} internal={TICKET_ACTION.internal} tone={tone} className={className}>
      {children ?? TICKET_ACTION.label}
    </Btn>
  );
}
