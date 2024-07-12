import { IProject } from '@/models';

const projects: IProject[] = [
  {
    name: 'Booked',
    description: `Uma livraria virtual onde seus livros se tornam mundos incríveis onde qualquer pessoa pode mergulhar e sonhar!.`,
    tecnologies: [
      'Figma',
      'React',
      'MUI',
      'Storybook',
      'Node',
      'Swagger',
      'TypeScript',
      'Postgres',
      'Docker',
    ],
    imageSrc: '/images/booked.jpg',
    url: 'https://booked-library.netlify.app/',
    githubUrl: 'https://github.com/i4n-v/booked',
  },
  {
    name: 'Rescue',
    description: `Rescue é uma plataforma onde as pessoas postam e alertam instituições sobre possíveis causas de desastres pluviais.`,
    tecnologies: ['Svelte', 'PHP', 'Mysql', 'HTML', 'CSS', 'Figma'],
    imageSrc: '/images/rescue.jpg',
    url: 'https://rescue-blog.netlify.app',
    githubUrl: 'https://github.com/i4n-v/Rescue',
  },
  {
    name: 'Bikcraft',
    description: `É um web-site para promoção de bicicletas modernas feitas a mão, com todo o detalhamento e segurança.`,
    tecnologies: ['React', 'Styled-components', 'TypeScript', 'Figma'],
    imageSrc: '/images/bikcraft.jpg',
    url: 'https://bikcratft.netlify.app',
    githubUrl: 'https://github.com/i4n-v/Bikcraft',
  },
  {
    name: 'Dogs media',
    description: `Uma rede social voltada especialmente para você mimar o seu pet e o mostrar ao mundo! :P`,
    tecnologies: ['React', 'CSS modules'],
    imageSrc: '/images/dogs.jpg',
    url: 'https://dogs-media.netlify.app',
    githubUrl: 'https://github.com/i4n-v/Dogs',
  },
  {
    name: 'Fintech',
    description: `Um Dashboard de organização e gestão financeira, para a tomada de decisão do seu negócio!`,
    tecnologies: ['React', 'Redux', 'CSS modules'],
    imageSrc: '/images/fintech.jpg',
    url: 'https://fintech-panel.netlify.app/',
    githubUrl: 'https://github.com/i4n-v/fintech',
  },
  {
    name: 'Forca',
    description: `O jogo clássico da forca, onde dois jogadores advinham as palavras para sobreviver.`,
    tecnologies: ['Svelte', 'HTML', 'CSS', 'Figma'],
    imageSrc: '/images/forca.jpg',
    url: 'https://forca-game.netlify.app',
    githubUrl: 'https://dogs-media.netlify.app',
  },
  {
    name: 'Wildbeast',
    description: 'Uma landingpage com tudo que o Grid layout pode oferecer.',
    tecnologies: ['HTML', 'CSS', 'JavaScript'],
    imageSrc: '/images/wildbeast.jpg',
    url: 'https://app.netlify.com/sites/wildbeast-grid-design/',
    githubUrl: 'https://github.com/i4n-v/Wildbeast',
  },
  {
    name: 'Animais fantásticos',
    description:
      'Uma simples landingpage com tudo que o HTML, CSS e JavaScript podem oferecer. :`)',
    tecnologies: ['HTML', 'CSS', 'JavaScript'],
    imageSrc: '/images/fantastic-animals.jpg',
    url: 'https://fantastic-animals-blog.netlify.app',
    githubUrl: 'https://github.com/i4n-v/fantastic-animals',
  },
];

export default projects;
