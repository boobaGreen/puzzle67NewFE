// HeaderAndHeroProps.ts
export interface IHeaderAndHeroProps {
  scrollToForm: () => void; // Funzione che esegue lo scroll al form
  currentImage: number; // Indice dell'immagine attuale
  images: string[]; // array di stinghe con le immagini locali
  setIsVisible: (visible: boolean) => void; // Funzione per settare la visibilità del modal
  isOpen: boolean; // Flag per il menu mobile
  setOpen: (open: boolean) => void; // Funzione per settare il flag del menu mobile
}
