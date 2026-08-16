'use client';

import * as React from 'react';
import { Building2, Layers, Network, Target } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageModal } from '@/components/ui/image-modal';
import { SkillBadge } from '@/components/ui/skill-badge';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/data';

type TabId = 'description' | 'stack' | 'galerie';

const TABS: ReadonlyArray<{ id: TabId; label: string }> = [
  { id: 'description', label: 'Description' },
  { id: 'stack', label: 'Stack' },
  { id: 'galerie', label: 'Galerie' },
];

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [activeTab, setActiveTab] = React.useState<TabId>('description');
  const tabRefs = React.useRef<Record<TabId, HTMLButtonElement | null>>({
    description: null,
    stack: null,
    galerie: null,
  });

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const next = TABS[(index + offset + TABS.length) % TABS.length];
    if (!next) return;
    setActiveTab(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <Card className="overflow-hidden transition-colors duration-200 hover:border-primary/40">
      <CardHeader className="gap-3 border-b border-border">
        {project.client ? (
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
            {project.client}
          </p>
        ) : null}
        <CardTitle className="text-xl sm:text-2xl">{project.title}</CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
      </CardHeader>

      <div
        role="tablist"
        aria-label={`Détails du projet ${project.title}`}
        className="flex gap-1 overflow-x-auto border-b border-border px-3 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              type="button"
              role="tab"
              id={`${project.id}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${project.id}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={cn(
                'shrink-0 rounded-t-md border-b-2 px-3 py-2.5 text-sm font-medium transition-[color,border-color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <CardContent className="p-5 sm:p-6">
        {/* Les panneaux restent montes : passer de `display:none` a visible
            relance l'animation d'entree, sans remontage React. */}
        <div
          role="tabpanel"
          id={`${project.id}-panel-description`}
          aria-labelledby={`${project.id}-tab-description`}
          hidden={activeTab !== 'description'}
          className="space-y-5 duration-300 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1"
        >
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Target className="h-4 w-4 text-primary" aria-hidden="true" />
              Problématique
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
          </div>
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
              Solution
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
          </div>
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Network className="h-4 w-4 text-primary" aria-hidden="true" />
              Infrastructure
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.infrastructure}
            </p>
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${project.id}-panel-stack`}
          aria-labelledby={`${project.id}-tab-stack`}
          hidden={activeTab !== 'stack'}
          className="duration-300 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1"
        >
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item}>
                <SkillBadge label={item} />
              </li>
            ))}
          </ul>
        </div>

        <div
          role="tabpanel"
          id={`${project.id}-panel-galerie`}
          aria-labelledby={`${project.id}-tab-galerie`}
          hidden={activeTab !== 'galerie'}
          className="duration-300 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1"
        >
          <ImageModal images={project.images} />
        </div>
      </CardContent>
    </Card>
  );
}
