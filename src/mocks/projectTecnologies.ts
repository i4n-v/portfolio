import projects from './projects';
import { v4 } from 'uuid';

interface IProjectTecnology {
  id: string;
  name: string;
}

const projectTecnologies: IProjectTecnology[] = [];

projects.forEach(({ tecnologies }) => {
  tecnologies.forEach((tecnology) => {
    const alreadyExists = projectTecnologies.some(
      (projectTecnology) => projectTecnology.name === tecnology
    );

    if (!alreadyExists) {
      const newTecnology = {
        id: v4(),
        name: tecnology,
      };

      projectTecnologies.push(newTecnology);
    }
  });
});

projectTecnologies.sort((a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});

export default projectTecnologies;
