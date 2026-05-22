import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Star, GitFork, Code2, MapPin } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  updated_at: string;
};

const GITHUB_USER = "Nicolas-Gatt";

const STACK = [
  ".NET", "C#", "Python", "JavaScript", "Node.js",
  "SQL", "REST API", "React", "TypeScript", "Git",
];

const ROLES = [
  "Backend Developer",
  "Frontend Developer",
  "Software Developer",
  "Full Stack Developer",
];

export function Portfolio() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
      .then((r) => {
        if (!r.ok) throw new Error("GitHub API error");
        return r.json();
      })
      .then((data: Repo[]) => {
        const filtered = data
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.updated_at) - +new Date(a.updated_at))
          .slice(0, 9);
        setRepos(filtered);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-mono text-sm font-semibold">
            ng<span className="text-muted-foreground">.dev</span>
          </a>
          <nav className="hidden gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex">
            <a href="#projects" className="hover:text-foreground">projects</a>
            <a href="#stack" className="hover:text-foreground">stack</a>
            <a href="#contact" className="hover:text-foreground">contact</a>
          </nav>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs hover:border-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative border-b border-border">
        <div className="grid-paper absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h1 className="font-mono text-5xl font-semibold leading-[1.05] md:text-7xl">
            Nicolas Gatti
            <br />
            <span className="text-muted-foreground">Alves Lino.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Desenvolvedor de software — construindo APIs, interfaces e sistemas
            de ponta a ponta com .NET, Python, Node.js e JavaScript.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <span
                key={r}
                className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs"
              >
                {r}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-sm text-primary-foreground transition hover:translate-y-[-1px]"
            >
              Ver projetos <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 font-mono text-sm hover:border-foreground"
            >
              Contato
            </a>
          </div>
        </div>
      </section>

      {/* BENTO */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              // 01
            </p>
            <h2 className="mt-2 font-mono text-3xl font-semibold md:text-4xl">
              Projetos selecionados
            </h2>
          </div>
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground md:inline-flex"
          >
            ver todos <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-3">
          {/* About card */}
          <div className="bento-card col-span-1 flex flex-col justify-between p-6 md:col-span-1 md:row-span-2">
            <div>
              <Code2 className="mb-4 h-6 w-6" />
              <h3 className="font-mono text-xl">Sobre</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Foco em construir software bem testado e legível. Trabalho com
                back-end em .NET e Python, front-end em React/JavaScript e
                bancos relacionais.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Brasil
            </div>
          </div>

          {!repos && !error &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bento-card animate-pulse p-6">
                <div className="h-4 w-2/3 rounded bg-muted" />
                <div className="mt-3 h-3 w-full rounded bg-muted" />
                <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
              </div>
            ))}

          {error && (
            <div className="bento-card col-span-2 p-6">
              <p className="font-mono text-sm">Não foi possível carregar os repositórios.</p>
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-mono text-xs underline"
              >
                Abrir GitHub <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          )}

          {repos?.map((repo, i) => {
            const featured = i === 0;
            return (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className={`bento-card group flex flex-col justify-between p-6 ${
                  featured ? "md:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-mono text-lg font-semibold">
                      {repo.name}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {repo.description || "Sem descrição."}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-foreground" />
                      {repo.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" /> {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3 w-3" /> {repo.forks_count}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // 02
          </p>
          <h2 className="mt-2 font-mono text-3xl font-semibold md:text-4xl">
            Stack
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-card px-4 py-2 font-mono text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // 03
          </p>
          <h2 className="mt-2 font-mono text-3xl font-semibold md:text-5xl">
            Vamos conversar.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Aberto a projetos, oportunidades e colaborações. Me chame onde
            preferir.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="bento-card flex items-center justify-between p-5"
            >
              <span className="inline-flex items-center gap-3 font-mono text-sm">
                <Github className="h-4 w-4" /> GitHub
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="bento-card flex items-center justify-between p-5"
            >
              <span className="inline-flex items-center gap-3 font-mono text-sm">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
            <a
              href="mailto:contato@example.com"
              className="bento-card flex items-center justify-between p-5"
            >
              <span className="inline-flex items-center gap-3 font-mono text-sm">
                <Mail className="h-4 w-4" /> Email
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Nicolas Gatti</span>
          <span>built with care</span>
        </div>
      </footer>
    </div>
  );
}
