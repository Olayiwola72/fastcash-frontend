export const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
        ref.current.focus(); // Optionally focus on the element
    }
}