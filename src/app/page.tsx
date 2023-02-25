import React from 'react';
import { CodeCard } from '@/components/Cards';
import animations from '@/../styles/animations.module.scss';
import { PrimaryButton } from '@/components/Buttons';
import Image from 'next/image';
import Link from 'next/link';
import socialLinks from '@/mocks/socialLinks';
import tecnologies from '@/mocks/tecnologies';
import styles from './styles.module.scss';

export const metadata = {
  title: 'Ian Vinícius | Portifolio',
  description: 'Desenvolvedor Full Stack, Next, React, React Native, Node e TypeScript.',
};

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <section id="introduction" aria-label="Apresentação">
        <div className={animations.animeLeft}>
          <h1>
            Desenvolvedor Full Stack <span>&</span> UI/UX Designer
          </h1>
          <CodeCard />
        </div>
      </section>

      <section id="contact" aria-label="Contato" className={animations.animeRight}>
        <h2 className={styles.title}>Contato</h2>
        <span>localizado em Recife-PE &#128293;</span>
        <p>
          Interassado no meu trabalho ? Inicie uma conversa através do <span>linkedin</span>, ou
          envie me um <span>email</span>! :D
        </p>
        <PrimaryButton href="/files/resume.pdf" download>
          Baixar currículo
        </PrimaryButton>
        <ul>
          {socialLinks.map(({ icon, alt, name, href }) => (
            <li>
              <Image src={icon} alt={alt} width={32} height={32} />
              {href ? <Link href={href}>{name}</Link> : <span>{name}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section id="tecnologies">
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
        <div className={animations.animeLeft}>
          <h2 className={styles.title}>Tecnologias</h2>
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
    </main>
  );
}
