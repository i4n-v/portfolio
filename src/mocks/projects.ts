import { IProject } from '@/models';

const projects: IProject[] = [
  {
    name: 'Rescue',
    description: `Rescue é uma plataforma onde as pessoas postam e alertam instituições sobre possíveis causas de desastres pluviais.`,
    tecnologies: ['Svelte', 'PHP', 'Mysql', 'HTML', 'CSS', 'Figma'],
    link: 'https://rescue-blog.netlify.app',
  },
  {
    name: 'Bikcraft',
    description: `É um web-site para promoção de bicicletas modernas feitas a mão, com todo o detalhamento e segurança.`,
    tecnologies: ['React', 'Styled-components', 'TypeScript', 'Figma'],
    link: 'https://bikcratft.netlify.app',
  },
  {
    name: 'Dogs media',
    description: `Uma rede social voltada especialmente para você mimar o seu pet e o mostrar ao mundo! :P`,
    tecnologies: ['React', 'CSS modules'],
    link: 'https://dogs-media.netlify.app',
  },
  {
    name: 'Forca',
    description: `O jogo clássico da forca, onde dois jogadores advinham as palavras para sobreviver.`,
    tecnologies: ['Svelte', 'HTML', 'CSS', 'Figma'],
    link: 'https://forca-game.netlify.app',
  },
  {
    name: 'Animais fantásticos',
    description: 'Uma simples landpage com tudo que o HTML, CSS e JavaScript podem oferecer. :`)',
    tecnologies: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://fantastic-animals-blog.netlify.app',
  },
];

export default projects;
