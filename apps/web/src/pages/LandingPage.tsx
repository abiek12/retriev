import {
  ArrowRight,
  Bot,
  Brain,
  Database,
  MessageSquare,
  Puzzle,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Bot,
    title: "AI Agents",
    description:
      "Create specialized agents with their own instructions, behavior, and model configuration.",
  },
  {
    icon: Database,
    title: "Knowledge",
    description:
      "Connect your knowledge sources and give agents the context they need to respond accurately.",
  },
  {
    icon: MessageSquare,
    title: "Conversations",
    description:
      "Understand how users interact with your agents and turn conversations into better experiences.",
  },
  {
    icon: Puzzle,
    title: "Integrations",
    description:
      "Connect the tools and services your agents need to become useful beyond the chat window.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Create",
    description: "Define your agent and its behavior.",
  },
  {
    number: "02",
    title: "Connect",
    description: "Give it access to your knowledge.",
  },
  {
    number: "03",
    title: "Equip",
    description: "Connect tools and integrations.",
  },
  {
    number: "04",
    title: "Deploy",
    description: "Put your agent in front of users.",
  },
];

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <LandingNavbar />

      <main>
        <Hero />

        <ProductFeatures />

        <WorkflowSection />

        <KnowledgeSection />

        <DeploymentSection />

        <FinalCta />
      </main>

      <LandingFooter />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Navbar                                                                     */
/* -------------------------------------------------------------------------- */

const LandingNavbar = () => {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-md bg-brand-primary text-sm font-semibold text-white">
            R
          </div>

          <span className="text-lg font-semibold tracking-tight">Retriev</span>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#product"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Product
          </a>

          <a
            href="#workflow"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </a>

          <a
            href="#knowledge"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Knowledge
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign in
          </Button>

          <Button className="rounded-sm px-5">Get started</Button>
        </div>
      </div>
    </header>
  );
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-8 lg:pb-28 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-surface-container-low px-3 py-1.5 text-xs font-medium">
            <Sparkles className="size-3.5" />
            Build intelligent agents with context
          </div>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Build AI agents that{" "}
            <span className="text-muted-foreground">actually know</span> what
            they&apos;re talking about.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Create, connect, and deploy intelligent agents with your knowledge,
            tools, and workflows, all from one workspace.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-11 rounded-sm px-6">
              Start building
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-sm px-6"
            >
              Explore platform
            </Button>
          </div>
        </div>

        {/* Product Preview */}
        <div className="mx-auto mt-20 max-w-5xl">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Product Preview                                                            */
/* -------------------------------------------------------------------------- */

const ProductPreview = () => {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl">
      {/* Window header */}
      <div className="flex h-11 items-center border-b bg-surface-container-low px-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-outline-variant" />
          <span className="size-2.5 rounded-full bg-outline-variant" />
          <span className="size-2.5 rounded-full bg-outline-variant" />
        </div>

        <div className="mx-auto rounded-md border bg-background px-16 py-1 text-[10px] text-muted-foreground">
          app.retriev.ai
        </div>
      </div>

      <div className="flex min-h-[420px]">
        {/* Sidebar */}
        <div className="hidden w-48 border-r bg-surface-container-lowest p-4 sm:block">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-brand-primary text-[10px] font-semibold text-white">
              R
            </div>

            <span className="text-xs font-semibold">Retriev</span>
          </div>

          <div className="space-y-1">
            {[
              "Dashboard",
              "Agents",
              "Knowledge Base",
              "Conversations",
              "Usage",
              "Integrations",
            ].map((item, index) => (
              <div
                key={item}
                className={`rounded-md px-3 py-2 text-xs ${
                  index === 1
                    ? "bg-surface-container-high font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Agents</div>

              <div className="mt-1 text-xs text-muted-foreground">
                Manage and configure your AI assistants.
              </div>
            </div>

            <div className="rounded-md bg-brand-primary px-3 py-2 text-[10px] font-medium text-white">
              + Create Agent
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <PreviewAgent
              name="Customer Support"
              description="Handles customer inquiries."
            />

            <PreviewAgent
              name="Research Assistant"
              description="Finds and summarizes information."
            />

            <PreviewAgent
              name="Product Assistant"
              description="Helps users understand products."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PreviewAgent = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <div className="rounded-lg border bg-background p-4 text-left">
      <div className="flex items-center justify-between">
        <div className="flex size-8 items-center justify-center rounded-md bg-surface-container text-xs font-medium">
          {name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-green-500" />
          Live
        </div>
      </div>

      <div className="mt-5">
        <div className="text-sm font-semibold">{name}</div>

        <div className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Features                                                                   */
/* -------------------------------------------------------------------------- */

const ProductFeatures = () => {
  return (
    <section id="product" className="border-b">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">
            THE PLATFORM
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            One workspace for every part of your AI stack.
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Everything you need to build useful, context-aware agents without
            stitching together a collection of disconnected tools.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="bg-background p-6 lg:p-7">
                <div className="flex size-10 items-center justify-center rounded-md border bg-surface-container-low">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-6 font-semibold">{feature.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Workflow                                                                   */
/* -------------------------------------------------------------------------- */

const WorkflowSection = () => {
  return (
    <section id="workflow" className="border-b">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-muted-foreground">
              THE WORKFLOW
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              From prompt to production.
            </h2>

            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Build your agent step by step. Keep the complexity where it
              belongs, behind a simple workspace.
            </p>
          </div>

          <Workflow className="hidden size-16 text-muted-foreground/30 lg:block" />
        </div>

        <div className="mt-16 grid border-y sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((step, index) => (
            <div
              key={step.number}
              className={`relative p-6 lg:p-8 ${
                index !== workflow.length - 1
                  ? "border-b sm:border-r lg:border-b-0"
                  : ""
              }`}
            >
              <div className="font-mono text-xs text-muted-foreground">
                {step.number}
              </div>

              <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>

              {index !== workflow.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 bg-surface text-muted-foreground lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Knowledge                                                                  */
/* -------------------------------------------------------------------------- */

const KnowledgeSection = () => {
  return (
    <section id="knowledge" className="border-b">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-xl border bg-card p-6">
              <div className="text-xs font-medium text-muted-foreground">
                YOUR KNOWLEDGE
              </div>

              <div className="mt-6 space-y-3">
                <KnowledgeSource label="Product documentation" />
                <KnowledgeSource label="Internal knowledge base" />
                <KnowledgeSource label="Customer resources" />
              </div>

              <div className="my-6 flex justify-center">
                <div className="flex size-12 items-center justify-center rounded-lg border bg-surface-container-low">
                  <Brain className="size-5" />
                </div>
              </div>

              <div className="rounded-lg border bg-surface-container-low p-4">
                <div className="flex items-center gap-3">
                  <Bot className="size-5" />

                  <div>
                    <div className="text-sm font-medium">
                      Customer Support Agent
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Retrieves relevant context
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-medium text-muted-foreground">
              KNOWLEDGE
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Give your agents the context they need.
            </h2>

            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Connect the information your organization already relies on and
              make it available to the agents that need it.
            </p>

            <div className="mt-8 space-y-4">
              <FeaturePoint>
                Centralize the knowledge your agents depend on.
              </FeaturePoint>

              <FeaturePoint>
                Retrieve relevant information when conversations need it.
              </FeaturePoint>

              <FeaturePoint>
                Keep agent responses grounded in your content.
              </FeaturePoint>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const KnowledgeSource = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
      <div className="flex size-8 items-center justify-center rounded-md bg-surface-container">
        <Database className="size-4" />
      </div>

      <span className="text-sm">{label}</span>
    </div>
  );
};

const FeaturePoint = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3">
      <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-primary" />

      <p className="text-sm leading-6 text-muted-foreground">{children}</p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Deployment                                                                 */
/* -------------------------------------------------------------------------- */

const DeploymentSection = () => {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-muted-foreground">
            BUILT TO DEPLOY
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Build once. Put your agents to work.
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Retriev gives you a single workspace to configure agents, connect
            their knowledge, and understand their interactions.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl rounded-xl border bg-card p-6 lg:p-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <DeploymentItem
              title="Configure"
              description="Define your agent."
            />

            <DeploymentItem
              title="Connect"
              description="Add knowledge and tools."
            />

            <DeploymentItem title="Deploy" description="Reach your users." />
          </div>
        </div>
      </div>
    </section>
  );
};

const DeploymentItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="rounded-lg border bg-background p-5">
      <div className="text-sm font-semibold">{title}</div>

      <div className="mt-1 text-sm text-muted-foreground">{description}</div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* CTA                                                                        */
/* -------------------------------------------------------------------------- */

const FinalCta = () => {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:py-32">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Ready to build your first agent?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          Start building intelligent agents with the context, knowledge, and
          tools they need.
        </p>

        <Button size="lg" className="mt-8 h-11 rounded-sm px-6">
          Start building
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

const LandingFooter = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-7 items-center justify-center rounded-md bg-brand-primary text-xs font-semibold text-white">
            R
          </div>

          <span className="text-sm font-semibold">Retriev</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#product" className="hover:text-foreground">
            Product
          </a>

          <a href="#workflow" className="hover:text-foreground">
            How it works
          </a>

          <a href="#knowledge" className="hover:text-foreground">
            Knowledge
          </a>
        </div>

        <p className="text-xs text-muted-foreground">© 2026 Retriev</p>
      </div>
    </footer>
  );
};
