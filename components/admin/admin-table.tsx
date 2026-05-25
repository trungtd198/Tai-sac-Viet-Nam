import { Card } from "@/components/ui/card";

export function AdminTable({
  headers,
  children,
  emptyMessage
}: {
  headers: string[];
  children: React.ReactNode;
  emptyMessage?: string;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border bg-muted/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">{children}</tbody>
        </table>
      </div>
      {emptyMessage ? (
        <div className="border-t border-border p-4 text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ) : null}
    </Card>
  );
}

export function AdminTableCell({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
