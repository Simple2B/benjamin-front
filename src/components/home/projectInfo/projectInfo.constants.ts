export interface IProjectInfoToDisplay {
  heading: string;
  text: string;
  vireoUrl: string;
}

export const PROJECT_INFO_TO_DISPLAY: IProjectInfoToDisplay[] = [
  {
    heading: 'What is Operation Benjamin?',
    text: 'Operation Benjamin identifies Jewish soldiers at American military cemeteries all over the world who were mistakenly buried under Latin Crosses and replaces the headstones with a Star of David.',
    vireoUrl: '/video/onboarding_1.mp4',
  },
  {
    heading: 'Learn more about our soldiers',
    text: 'The Operation Benjamin app will help you navigate the foreign American Military Cemeteries.  You’ll be able to find Jewish soldiers and learn more about their lives and their incredible sacrifices. Explore with us!',
    vireoUrl: '/video/onboarding_2.mp4',
  },
  {
    heading: 'Remember our soldiers',
    text: 'When visiting individual graves, you can commemorate the soldiers through prayers, mourners Kaddish, and even leave a message for the family in the virtual visitors book.',
    vireoUrl: '/video/onboarding_3.mp4',
  },
];
