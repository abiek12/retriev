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
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { RetrievLogo } from "@/components/common/RetrievLogo";
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

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label="Retriev home"
        >
          <RetrievLogo className="size-8 shrink-0 transition-transform duration-300 motion-safe:group-hover:scale-105 motion-safe:group-hover:rotate-6" />
          <span className="text-lg font-semibold tracking-tight">Retriev</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#product"
            className="relative text-sm text-muted-foreground transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:text-foreground hover:after:w-full"
          >
            Product
          </a>

          <a
            href="#workflow"
            className="relative text-sm text-muted-foreground transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:text-foreground hover:after:w-full"
          >
            How it works
          </a>

          <a
            href="#knowledge"
            className="relative text-sm text-muted-foreground transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:text-foreground hover:after:w-full"
          >
            Knowledge
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            render={<Link to="/login" />}
            variant="ghost"
            className="hidden sm:inline-flex"
          >
            Sign in
          </Button>

          <Button
            render={<Link to="/register" />}
            className="rounded-sm px-5 transition-transform motion-safe:hover:-translate-y-0.5"
          >
            Get started
          </Button>
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
      <div
        className="landing-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-8 lg:pb-28 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-surface-container-low px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface-container">
              <Sparkles className="size-3.5 motion-safe:animate-pulse" />
              Build intelligent agents with context
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Build AI agents that{" "}
              <span className="text-muted-foreground">actually know</span> what
              they&apos;re talking about.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Create, connect, and deploy intelligent agents with your
              knowledge, tools, and workflows, all from one workspace.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                render={<Link to="/register" />}
                size="lg"
                className="group h-11 rounded-sm px-6 transition-transform motion-safe:hover:-translate-y-0.5"
              >
                Start building
                <ArrowRight className="ml-2 size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
              </Button>

              <Button
                render={<a href="#product" />}
                size="lg"
                variant="outline"
                className="h-11 rounded-sm px-6 transition-transform motion-safe:hover:-translate-y-0.5"
              >
                Explore platform
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Product Preview */}
        <Reveal className="mx-auto mt-20 max-w-5xl" delay={0.24}>
          <ProductPreview />
        </Reveal>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Product Preview                                                            */
/* -------------------------------------------------------------------------- */

const ProductPreview = () => {
  return (
    <div className="group/preview relative overflow-hidden rounded-xl border bg-card shadow-2xl transition-[transform,box-shadow] duration-500 motion-safe:hover:-translate-y-1 hover:shadow-[0_28px_70px_-28px_rgba(0,0,0,0.35)]">
      {/* Window header */}
      <div className="flex h-11 items-center border-b bg-surface-container-low px-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-outline-variant transition-colors group-hover/preview:bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-outline-variant transition-colors group-hover/preview:bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-outline-variant transition-colors group-hover/preview:bg-green-400/70" />
        </div>

        <div className="mx-auto rounded-md border bg-background px-16 py-1 text-[10px] text-muted-foreground">
          app.retriev.ai
        </div>
      </div>

      <div className="flex min-h-105">
        {/* Sidebar */}
        <div className="hidden w-48 border-r bg-surface-container-lowest p-4 sm:block">
          <div className="mb-8 flex items-center gap-2">
            <RetrievLogo className="size-6 shrink-0" />
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
                className={`rounded-md px-3 py-2 text-xs transition-colors ${
                  index === 1
                    ? "bg-surface-container-high font-medium"
                    : "text-muted-foreground hover:bg-surface-container-low hover:text-foreground"
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

            <div className="rounded-md bg-brand-primary px-3 py-2 text-[10px] font-medium text-white transition-transform motion-safe:group-hover/preview:-translate-y-0.5">
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
    <div className="rounded-lg border bg-background p-4 text-left transition-[transform,border-color,box-shadow] duration-300 hover:border-ring hover:shadow-sm motion-safe:hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex size-8 items-center justify-center rounded-md bg-surface-container text-xs font-medium">
          {name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-40 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
          </span>
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
    <section id="product" className="scroll-mt-16 border-b">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
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
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal
                key={feature.title}
                className="h-full"
                delay={index * 0.06}
              >
                <div className="group h-full bg-background p-6 transition-colors hover:bg-surface-container-lowest lg:p-7">
                  <div className="flex size-10 items-center justify-center rounded-md border bg-surface-container-low transition-[transform,background-color] duration-300 group-hover:bg-surface-container motion-safe:group-hover:-translate-y-1">
                    <Icon className="size-5 transition-transform duration-300 motion-safe:group-hover:scale-110" />
                  </div>

                  <h3 className="mt-6 font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
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
    <section id="workflow" className="scroll-mt-16 border-b">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <Reveal className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
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

          <Workflow className="hidden size-16 text-muted-foreground/30 transition-colors duration-300 hover:text-muted-foreground/60 lg:block" />
        </Reveal>

        <Reveal
          className="mt-16 grid border-y sm:grid-cols-2 lg:grid-cols-4"
          delay={0.1}
        >
          {workflow.map((step, index) => (
            <div
              key={step.number}
              className={`group relative p-6 transition-colors hover:bg-surface-container-low lg:p-8 ${
                index !== workflow.length - 1
                  ? "border-b sm:border-r lg:border-b-0"
                  : ""
              }`}
            >
              <div className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                {step.number}
              </div>

              <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>

              {index !== workflow.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 bg-surface text-muted-foreground transition-transform duration-300 motion-safe:group-hover:translate-x-1 lg:block" />
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Knowledge                                                                  */
/* -------------------------------------------------------------------------- */

const KnowledgeSection = () => {
  return (
    <section id="knowledge" className="scroll-mt-16 border-b">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Visual */}
          <Reveal className="order-2 lg:order-1">
            <div className="group/knowledge relative rounded-xl border bg-card p-6 transition-shadow duration-300 hover:shadow-lg">
              <div className="text-xs font-medium text-muted-foreground">
                YOUR KNOWLEDGE
              </div>

              <div className="mt-6 space-y-3">
                <KnowledgeSource label="Product documentation" />
                <KnowledgeSource label="Internal knowledge base" />
                <KnowledgeSource label="Customer resources" />
              </div>

              <div className="my-6 flex justify-center">
                <div className="flex size-12 items-center justify-center rounded-lg border bg-surface-container-low transition-[transform,box-shadow] duration-300 group-hover/knowledge:shadow-md motion-safe:group-hover/knowledge:scale-105">
                  <Brain className="size-5 transition-transform duration-500 motion-safe:group-hover/knowledge:rotate-6" />
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
          </Reveal>

          {/* Content */}
          <Reveal className="order-1 lg:order-2" delay={0.08}>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const KnowledgeSource = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-background p-3 transition-[transform,border-color] duration-300 hover:border-ring motion-safe:hover:translate-x-1">
      <div className="flex size-8 items-center justify-center rounded-md bg-surface-container">
        <Database className="size-4" />
      </div>

      <span className="text-sm">{label}</span>
    </div>
  );
};

const FeaturePoint = ({ children }: { children: ReactNode }) => {
  return (
    <div className="group flex gap-3">
      <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-primary transition-transform duration-200 motion-safe:group-hover:scale-150" />

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
        <Reveal className="mx-auto max-w-3xl text-center">
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
        </Reveal>

        <Reveal
          className="mx-auto mt-14 max-w-4xl rounded-xl border bg-card p-6 transition-shadow duration-300 hover:shadow-lg lg:p-8"
          delay={0.1}
        >
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
        </Reveal>
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
    <div className="rounded-lg border bg-background p-5 transition-[transform,border-color] duration-300 hover:border-ring motion-safe:hover:-translate-y-1">
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
      <Reveal className="mx-auto max-w-5xl px-6 py-24 text-center lg:py-32">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Ready to build your first agent?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          Start building intelligent agents with the context, knowledge, and
          tools they need.
        </p>

        <Button
          render={<Link to="/register" />}
          size="lg"
          className="group mt-8 h-11 rounded-sm px-6 transition-transform motion-safe:hover:-translate-y-0.5"
        >
          Start building
          <ArrowRight className="ml-2 size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
        </Button>
      </Reveal>
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
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label="Retriev home"
        >
          <RetrievLogo className="size-7 shrink-0 transition-transform duration-300 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-105" />
          <span className="text-sm font-semibold">Retriev</span>
        </Link>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="#product"
            className="transition-colors hover:text-foreground"
          >
            Product
          </a>

          <a
            href="#workflow"
            className="transition-colors hover:text-foreground"
          >
            How it works
          </a>

          <a
            href="#knowledge"
            className="transition-colors hover:text-foreground"
          >
            Knowledge
          </a>

          <a
            href="https://github.com/abiek12/retriev"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>

        <p className="text-xs text-muted-foreground">© 2026 Retriev</p>
      </div>
    </footer>
  );
};
