import { ToolSeoData } from "@/lib/tool-seo-content";

type ToolSeoContentProps = {
  title: string;
  description?: string;
  data: ToolSeoData;
};

export default function ToolSeoContent({
  title,
  description,
  data,
}: ToolSeoContentProps) {
  return (
    <section className="mt-16 border-t border-muted/30 bg-muted/5">
      <div className="container px-4 mx-auto max-w-6xl py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
              {data.overview.title}
            </h2>
            {description && (
              <p className="text-muted-foreground text-lg">{description}</p>
            )}
            {data.overview.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold">
              {data.howTo.title}
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              {data.howTo.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold">
              {data.useCases.title}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {data.useCases.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold">
              {data.faq.title}
            </h3>
            <div className="space-y-6">
              {data.faq.items.map((item) => (
                <div key={item.question}>
                  <p className="font-medium">{item.question}</p>
                  <p className="text-muted-foreground mt-2">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            {title} runs locally in your browser for fast, private results.
          </div>
        </div>
      </div>
    </section>
  );
}
