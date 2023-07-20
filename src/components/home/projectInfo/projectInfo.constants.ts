export interface IProjectInfoToDisplay {
  heading: string;
  text: string;
  videoUrl: string;
}

export const PROJECT_INFO_TO_DISPLAY: IProjectInfoToDisplay[] = [
  {
    heading: 'What is Operation Benjamin?',
    text: 'Operation Benjamin identifies Jewish soldiers at American military cemeteries all over the world who were mistakenly buried under Latin Crosses and replaces the headstones with a Star of David.',
    videoUrl: '/video/onboarding_1.mp4',
  },
  {
    heading: 'Learn more about our soldiers',
    text: 'With this app, you’ll be able to find Jewish soldiers in American military cemeteries and learn more about their lives and incredible sacrifices. Explore with us!',
    videoUrl: '/video/onboarding_2.mp4',
  },
  {
    heading: 'Remember our soldiers',
    text: 'With this app, you’ll be able to locate Jewish soldiers’ graves in American military cemeteries and learn more about their lives and incredible sacrifices. Explore with us!',
    videoUrl: '/video/onboarding_3.mp4',
  },
];
