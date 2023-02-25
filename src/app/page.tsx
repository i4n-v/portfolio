import React from 'react';
import { CodeCard } from '@/components/Cards';
import animations from '@/../styles/animations.module.scss';
import { PrimaryButton } from '@/components/Buttons';
import styles from './styles.module.scss';

export const metadata = {
  title: 'Ian Vinícius | Portifolio',
  description: 'Desenvolvedor Full Stack, Next, React, React Native, Node e TypeScript.',
};

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <section id="introduction" aria-label="Apresentação">
        <div>
          <h1 className={animations.animeLeft}>
            Desenvolvedor Full Stack <span>&</span> UI/UX Designer
          </h1>
          <CodeCard className={animations.animeRight} />
        </div>
      </section>
      <section id="contact" aria-label="Contato">
        <h2>Contato</h2>
        <span>localizado em Recife-PE &#128293;</span>
        <div>
          <p>
            Interassado no meu trabalho ? Inicie uma conversa através do linkedin, ou envie me um
            email! :D{' '}
          </p>
          <PrimaryButton href="">Baixar currículo</PrimaryButton>
        </div>
      </section>
    </main>
  );
}
