import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const darkTheme = 'dark';
const lightTheme = 'light';

// if (!window.location.pathname.includes('docs')) {
//   console.log("yes")
//   document.querySelector('.navbar').classList.add('navbarE');
//   // document.navbar?.style.setProperty('position', 'sticky')
// }

// if (window.location.pathname.includes('docs')) {
//   document.querySelector('.header').style.backgroundColor = '#F7F7F7';
// }

if (ExecutionEnvironment.canUseDOM) {
  const mediaMatch = window.matchMedia('(prefers-color-scheme: dark)');
  const htmlElement = document.querySelector('html');

  const setInitialTheme = () => {
    const newTheme = mediaMatch.matches ?  darkTheme : darkTheme;
    htmlElement?.setAttribute('data-theme', newTheme);
  };
  setInitialTheme();

  const colorSchemeChangeListener = (e) => {
    const newTheme = e.matches ? darkTheme : lightTheme;
    htmlElement?.setAttribute('data-theme', newTheme);
  };
  mediaMatch.addEventListener('change', colorSchemeChangeListener);

  
}
