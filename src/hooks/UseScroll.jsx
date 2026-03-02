import { useEffect } from "react";

export const useScroll = () => {



  useEffect(() => {

    const selectElementos = () => {

        
        const elements = document.querySelectorAll('.reveal');
        console.log('Found elements to observe:', elements);
    
        const observer = new IntersectionObserver(
    
          ([entry]) => {
    
            const el = entry.target;
    
            if (entry.isIntersecting) {
    
              const index = el.dataset.index || 0;
    
              el.style.transitionDelay = `${index * 0.2}s`;
    
              el.classList.add('visible');
    
            } else {
    
              el.classList.remove('visible');
            }
          },
    
          { threshold: 0.1 }
        );
    }


    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
};
