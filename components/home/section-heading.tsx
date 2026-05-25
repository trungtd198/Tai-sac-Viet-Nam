import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "inverted";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default"
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.18em]",
            tone === "inverted" ? "text-accent" : "text-primary"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold tracking-normal md:text-5xl">{title}</h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-7 md:text-lg",
            tone === "inverted" ? "text-secondary-foreground/80" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
