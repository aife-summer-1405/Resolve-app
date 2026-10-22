import HeaderSlider from "./Slider";

const images = [
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
    "https://golimood.com/wp-content/uploads/2025/04/aks-gol-bara-porofail.jpg",
 
  
  
];

const Header = () => {
    return (
        <div className="mx-auto mt-10  px-4 ">
            <HeaderSlider images={images} />
        </div>
    );
};

export default Header;