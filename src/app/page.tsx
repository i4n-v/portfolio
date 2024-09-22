'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import {
  CodeCard,
  FormationCard,
  CourseCard,
  ExperiencieCard,
  ProjectCard,
} from '@/components/Cards';
import animations from '@/../styles/animations.module.scss';
import { PrimaryButton } from '@/components/Buttons';
import Image from 'next/image';
import Link from 'next/link';
import { socialLinks, tecnologies, formations, courses, experiencies } from '@/mocks/';
import projects from '@/mocks/projects';
import styles from './styles.module.scss';
import TextField from '@/components/FormFields/TextField';
import { useForm, useWatch } from 'react-hook-form';
import { AutocompleteField } from '@/components/FormFields';
import projectTecnologies from '@/mocks/projectTecnologies';
import { useDebounce, useDebounceCallBack } from '@/hooks';
import { z } from 'zod';

const validations = z.object({
  project: z.string(),
  tecnologies: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

type IFilters = z.infer<typeof validations>;

export default function Home() {
  const { control } = useForm<IFilters>({
    defaultValues: {
      project: '',
      tecnologies: [],
    },
  });

  const filters = useWatch({ control });
  const debouncedFilters = useDebounce(filters, 500);

  const animateSections = useCallback(
    useDebounceCallBack((sections, height) => {
      sections.forEach((section: HTMLElement) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionIsVisible = sectionTop - height < 0;

        if (sectionIsVisible) {
          section.classList.add(animations[section.dataset.scroll || '']);
        }
      });
    }, 200),
    []
  );

  useEffect(() => {
    const sections: any = document.querySelectorAll('[data-scroll]');
    const height = window.innerHeight * 0.7;

    function handleAnimateSections() {
      animateSections(sections, height);
    }

    if (sections.length) {
      window.addEventListener('scroll', handleAnimateSections);
      handleAnimateSections();

      return () => window.removeEventListener('scroll', handleAnimateSections);
    }
  }, [animateSections]);

  const filteredProjects = useMemo(() => {
    if (debouncedFilters) {
      const { project, tecnologies } = debouncedFilters;

      const filteredProjects = projects.filter((item) => {
        const regex = new RegExp(`^${project}`, 'i');
        const matchName = regex.test(item.name);
        let matchTecnologies = true;

        if (tecnologies?.length) {
          matchTecnologies = tecnologies.some((tecnology) =>
            item.tecnologies.includes(tecnology.name!)
          );
        }

        return matchName && matchTecnologies;
      });

      return filteredProjects;
    }

    return projects;
  }, [debouncedFilters]);

  return (
    <main className={styles.mainContainer}>
      <section id="introduction" aria-label="Apresentação">
        <div data-scroll="animeLeft">
          <h1>
            Desenvolvedor Full Stack <span>&</span> UI/UX Designer
          </h1>
          <CodeCard />
        </div>
      </section>

      <section id="contact" aria-label="Contato" data-scroll="animeRight">
        <h2 className={styles.title}>Contato</h2>
        <span>localizado em Recife-PE &#128293;</span>
        <p className={styles.description}>
          Interassado no meu trabalho ? Inicie uma conversa através do <span>linkedin</span>, ou
          envie me um <span>email</span>! :D
        </p>
        <PrimaryButton href="/files/resume.pdf" download>
          Baixar currículo
        </PrimaryButton>
        <ul>
          {socialLinks.map(({ icon, alt, name, href }, index) => (
            <li key={`${name}-${index}`}>
              <Image src={icon} alt={alt} width={32} height={32} />
              {href ? <Link href={href}>{name}</Link> : <span>{name}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section id="tecnologies" aria-labelledby="tecnolgies-title">
        {tecnologies.map((tecnologie, index) => (
          <span
            key={tecnologie}
            className={`${styles[`tecnologie-${index + 1}`]} ${
              animations[index % 2 === 0 ? 'animeJump' : 'animeJumpReverse']
            }`}
          >
            {tecnologie}
          </span>
        ))}
        <div data-scroll="animeLeft">
          <h2 id="tecnolgies-title" className={styles.title}>
            Tecnologias
          </h2>
          <ul>
            <li>
              <Image src="/icons/react.svg" alt="React" width={120} height={120} />
            </li>
            <li>
              <Image src="/icons/node.svg" alt="Node" width={120} height={120} />
            </li>
            <li>
              <Image src="/icons/typescript.svg" alt="TypeScript" width={120} height={120} />
            </li>
          </ul>
        </div>
      </section>

      <section id="formation" aria-labelledby="formation-title" data-scroll="animeRight">
        <h2 id="formation-title" className={styles.title}>
          Formação
        </h2>
        <p className={styles.description}>
          Atualmente estou me graduando no curso superior de <span>Sistemas para Internet</span> no
          Instituto Federal de Ciências e Tecnologia de Pernambuco <span>(IFPE)</span>. Mas, também,
          sempre estou buscando me aperfeiçoar nas tecnologias de mercado.
        </p>
        <div>
          {formations.map(({ name, period, institution, category }) => (
            <FormationCard
              key={name}
              title={name}
              subtitle={period}
              tags={[institution, category]}
            />
          ))}
        </div>
        <div>
          <Image src="/icons/courses.svg" alt="Cursos" width={32} height={32} />
          <h3>Principais Cursos Intensivos</h3>
        </div>
        {courses.map(({ name, workload }) => (
          <CourseCard key={name} title={name} workload={workload} />
        ))}
      </section>

      <section id="experiencies" aria-labelledby="experiencies-title">
        <div data-scroll="animeLeft">
          <h2 id="experiencies-title" className={styles.title}>
            Experiências
          </h2>
          <div>
            {experiencies.map(({ name, period, description, tecnologies }) => (
              <ExperiencieCard
                key={name}
                title={name}
                period={period}
                description={description}
                tags={tecnologies}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-title" data-scroll="animeRight">
        <h2 id="projects-title" className={styles.title}>
          Projetos
        </h2>
        <div>
          <TextField
            name="project"
            placeholder="Buscar..."
            control={control}
            rightIcon={<Image src="/icons/search.svg" alt="search" width={32} height={32} />}
          />
          <AutocompleteField
            label="Tecnologias"
            name="tecnologies"
            control={control}
            multiple
            optionCompareKey="id"
            optionLabelKey="name"
            options={projectTecnologies}
          />
        </div>
        <div>
          {filteredProjects.map(({ name, description, githubUrl, imageSrc, url, tecnologies }) => (
            <ProjectCard
              key={name}
              title={name}
              description={description}
              imageSrc={imageSrc}
              url={url}
              githubUrl={githubUrl}
              tags={tecnologies}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
